const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET environment variable is required");
}

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  NODE_ENV,
  JWT_SECRET,
  APP_URL,
} = process.env;

const oauthConfigured = Boolean(
  GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_CALLBACK_URL
);

if (!oauthConfigured) {
  const missing = [
    !GOOGLE_CLIENT_ID && "GOOGLE_CLIENT_ID",
    !GOOGLE_CLIENT_SECRET && "GOOGLE_CLIENT_SECRET",
    !GOOGLE_CALLBACK_URL && "GOOGLE_CALLBACK_URL",
  ].filter(Boolean);

  if (NODE_ENV === "production") {
    throw new Error(`FATAL: Google OAuth misconfigured. Missing: ${missing.join(", ")}`);
  } else {
    console.warn(`[Auth] Google OAuth disabled. Missing env vars: ${missing.join(", ")}`);
  }
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const emailEntry = profile.emails?.[0];
          const email = emailEntry?.value;
          const isVerified =
            emailEntry?.verified === true || emailEntry?.verified === "true";

          if (!email || !isVerified) {
            return done(
              new Error("A verified Google email address is required"),
              null
            );
          }

          const avatar = profile.photos?.[0]?.value ?? "";

          // Clamp name to schema bounds before hitting runValidators
          const rawName = (profile.displayName || "").trim();
          const name = rawName.length >= 2 ? rawName.slice(0, 50) : "Google User";

          // Removed duplicate index declarations — schema field options are sufficient
          let user;
          try {
            user = await User.findOneAndUpdate(
              { googleId: profile.id },
              {
                $set: { name, avatar },
                $setOnInsert: { googleId: profile.id, email, authProvider: "google" },
              },
              { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
            );
          } catch (dbErr) {
            if (dbErr.code === 11000) {
              return done(
                new Error(
                  "An account with this email already exists. Please log in with your password."
                ),
                null
              );
            }
            throw dbErr;
          }

          const token = jwt.sign(
            { sub: user._id.toString(), id: user._id },
            JWT_SECRET,
            { expiresIn: "7d", algorithm: "HS256", issuer: APP_URL || "your-app" }
          );

          const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          };

          return done(null, { user: safeUser, token });
        } catch (err) {
          console.error("[Google OAuth Error]", err.message);
          return done(err, null);
        }
      }
    )
  );
}

module.exports = passport;