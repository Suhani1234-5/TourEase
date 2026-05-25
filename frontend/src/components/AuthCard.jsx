import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';
import { API_BASE_URL } from '../config/auth';

export default function AuthCard({ initialMode = 'signup' }) {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(initialMode === 'login');
  const [animating, setAnimating] = useState(false);

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    level: '',
    requirements: {
      minLength: false,
      hasLowercase: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home2', { replace: true });
    }
  }, [navigate]);

  const calculatePasswordStrength = (password) => {
    if (!password) {
      return {
        score: 0,
        level: '',
        requirements: {
          minLength: false,
          hasLowercase: false,
          hasUppercase: false,
          hasNumber: false,
          hasSpecial: false,
        },
      };
    }

    let score = 0;
    const requirements = {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (requirements.minLength) score++;
    if (requirements.hasLowercase) score++;
    if (requirements.hasUppercase) score++;
    if (requirements.hasNumber) score++;
    if (requirements.hasSpecial) score++;

    if (password.length >= 12) score++;

    let level = '';
    if (score <= 2) {
      level = 'Weak';
    } else if (score <= 4) {
      level = 'Medium';
    } else {
      level = 'Strong';
    }

    return { score, level, requirements };
  };

  const handleToggleMode = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      setErrors({});
      setSuccess(false);
      setAnimating(false);
    }, 300);
  };

  const handleGoogleAuth = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateSignup = () => {
    const newErrors = {};

    if (!signupData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (signupData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.confirmPassword !== signupData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (signupData.phone && !/^[\d\s\-+()]+$/.test(signupData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignup()) return;

    setLoading(true);

    try {
      const { confirmPassword: _confirmPassword, ...data } = signupData;
      const response = await api.signup(data);

      if (response.success) {
        setSuccess(true);

        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        setTimeout(() => {
          navigate('/home2', { state: { signupSuccess: true } });
        }, 2000);
      }
    } catch (error) {
      setErrors({
        submit: error.message || 'Failed to create account. Try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    setLoading(true);

    try {
      const response = await api.login(loginData);

      if (response.success) {
        setSuccess(true);

        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        setTimeout(() => {
          navigate('/home2', { state: { loginSuccess: true } });
        }, 1200);
      }
    } catch (error) {
      setErrors({
        submit: error.message || 'Unable to sign in. Try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card-scene">
      <div className="auth-card-container">
        {/* Login Form */}
        <div
          className={`${
            isFlipped ? 'auth-form-enter' : 'auth-form-exit'
          } ${
            isFlipped
              ? 'pointer-events-auto'
              : 'pointer-events-none'
          }`}
        >
          <LoginForm
            formData={loginData}
            errors={errors}
            loading={loading}
            showPassword={showPassword}
            success={success}
            onToggle={handleToggleMode}
            onGoogleAuth={handleGoogleAuth}
            onPasswordToggle={() => setShowPassword(!showPassword)}
            onChange={handleLoginChange}
            onSubmit={handleLoginSubmit}
          />
        </div>

        {/* Signup Form */}
        <div
          className={`${
            !isFlipped ? 'auth-form-enter' : 'auth-form-exit'
          } ${
            !isFlipped
              ? 'pointer-events-auto'
              : 'pointer-events-none'
          }`}
        >
          <SignupForm
            formData={signupData}
            errors={errors}
            loading={loading}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            passwordStrength={passwordStrength}
            success={success}
            onToggle={handleToggleMode}
            onGoogleAuth={handleGoogleAuth}
            onPasswordToggle={() => setShowPassword(!showPassword)}
            onConfirmPasswordToggle={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            onChange={handleSignupChange}
            onSubmit={handleSignupSubmit}
          />
        </div>
      </div>
    </div>
  );
}

// Signup Form Component — full single-column layout, no compression
function SignupForm({
  formData,
  errors,
  loading,
  showPassword,
  showConfirmPassword,
  passwordStrength,
  success,
  onToggle,
  onGoogleAuth,
  onPasswordToggle,
  onConfirmPasswordToggle,
  onChange,
  onSubmit,
}) {
  return (
    <div className="w-full flex items-center justify-center px-4">
      {/* auth-card-box: wider card, hidden scrollbar fallback */}
      <div className="auth-card-box">

        {/* ── LOGO ── */}
        <Link to="/" className="block mb-3 text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            TourEase
          </h1>
        </Link>

        {/* ── HEADER ── */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-0.5 text-center">
          Create your account
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
          Already have an account?{' '}
          <button
            onClick={onToggle}
            className="text-teal-600 dark:text-indigo-400 hover:text-teal-700 dark:hover:text-indigo-300 font-semibold transition-colors"
          >
            Sign in
          </button>
        </p>

        {/* ── SUCCESS ── */}
        {success && (
          <div className="mb-3 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-xl py-2 px-3 fade-slide-in">
            <p className="text-green-700 dark:text-green-300 font-medium text-xs text-center">
              ✓ Account created successfully! Redirecting…
            </p>
          </div>
        )}

        {/* ── SUBMIT ERROR ── */}
        {errors.submit && (
          <div className="mb-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl py-2 px-3 fade-slide-in">
            <p className="text-xs font-medium text-red-700 dark:text-red-300">{errors.submit}</p>
          </div>
        )}

        {/* ── GOOGLE SIGNUP ── */}
        <GoogleButton onClick={onGoogleAuth} />

        {/* ── DIVIDER ── */}
        <div className="auth-divider mb-3">
          <span>or continue with email</span>
        </div>

        {/* ── FORM (single column, comfortable spacing) ── */}
        <form onSubmit={onSubmit} className="auth-form-fields">

          {/* NAME */}
          <FieldWrapper label="Full Name" error={errors.name}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 dark:text-gray-500 pointer-events-none" style={{width:'1.1rem',height:'1.1rem'}} />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={onChange}
                className={`auth-input ${errors.name ? 'auth-input--error' : ''}`}
                placeholder="Your full name"
              />
            </div>
          </FieldWrapper>

          {/* EMAIL */}
          <FieldWrapper label="Email Address" error={errors.email}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" style={{width:'1.1rem',height:'1.1rem'}} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={onChange}
                className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                placeholder="you@example.com"
              />
            </div>
          </FieldWrapper>

          {/* PHONE */}
          <FieldWrapper label={<>Phone <span className="text-gray-400 font-normal text-xs">(Optional)</span></>} error={errors.phone}>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" style={{width:'1.1rem',height:'1.1rem'}} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                className={`auth-input ${errors.phone ? 'auth-input--error' : ''}`}
                placeholder="+91 98765 43210"
              />
            </div>
          </FieldWrapper>

          {/* PASSWORD */}
          <FieldWrapper label="Password" error={errors.password}>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" style={{width:'1.1rem',height:'1.1rem'}} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={onChange}
                className={`auth-input pr-10 ${errors.password ? 'auth-input--error' : ''}`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={onPasswordToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff style={{width:'1rem',height:'1rem'}} /> : <Eye style={{width:'1rem',height:'1rem'}} />}
              </button>
            </div>
          </FieldWrapper>

          {/* PASSWORD STRENGTH INDICATOR */}
          {formData.password && (
            <PasswordStrengthIndicator strength={passwordStrength} />
          )}

          {/* CONFIRM PASSWORD */}
          <FieldWrapper label="Confirm Password" error={errors.confirmPassword}>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" style={{width:'1.1rem',height:'1.1rem'}} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={onChange}
                className={`auth-input pr-10 ${errors.confirmPassword ? 'auth-input--error' : ''}`}
                placeholder="Repeat your password"
              />
              <button
                type="button"
                onClick={onConfirmPasswordToggle}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff style={{width:'1rem',height:'1rem'}} /> : <Eye style={{width:'1rem',height:'1rem'}} />}
              </button>
            </div>
          </FieldWrapper>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn w-full bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {loading ? 'Creating Account…' : 'Create Account'}
          </button>

        </form>
      </div>
    </div>
  );
}

// Login Form Component
function LoginForm({
  formData,
  errors,
  loading,
  showPassword,
  success,
  onToggle,
  onGoogleAuth,
  onPasswordToggle,
  onChange,
  onSubmit,
}) {
  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl dark:shadow-2xl border border-white/20 dark:border-gray-800/50 relative">
        {/* BACK BUTTON */}
        <Link
          to="/"
          className="absolute top-6 right-6 flex items-center justify-center gap-1 text-sm font-semibold text-white px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-indigo-500 dark:hover:to-purple-500 shadow-lg hover:shadow-xl transition"
        >
          <ArrowLeft size={16} className="hidden sm:inline" />
          <span className="text-xs sm:text-sm">Home</span>
        </Link>

        {/* LOGO */}
        <Link to="/" className="block mb-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            TourEase
          </h1>
        </Link>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Welcome back
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          New here?{' '}
          <button
            onClick={onToggle}
            className="text-teal-600 dark:text-indigo-400 hover:text-teal-700 dark:hover:text-indigo-300 font-semibold transition"
          >
            Create account
          </button>
        </p>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-300 font-medium text-sm">
              ✓ Signed in successfully!
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Redirecting...
            </p>
          </div>
        )}

        {/* SUBMIT ERROR */}
        {errors.submit && (
          <div className="mb-6 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              {errors.submit}
            </p>
          </div>
        )}

        {/* GOOGLE LOGIN */}
        <GoogleButton onClick={onGoogleAuth} />

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400 text-xs font-medium">
              or email
            </span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* EMAIL */}
          <FormInput
            icon={Mail}
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
            placeholder="your.email@example.com"
            required
          />

          {/* PASSWORD */}
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={onChange}
            error={errors.password}
            showPassword={showPassword}
            onToggle={onPasswordToggle}
            placeholder="••••••••"
            required
          />

          {/* ACTIONS */}
          <div className="flex items-center justify-between text-sm mt-4">
            <label className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 cursor-pointer"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <button
              type="button"
              className="text-teal-600 dark:text-indigo-400 hover:text-teal-700 dark:hover:text-indigo-300 font-medium transition"
            >
              Forgot password?
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 dark:from-indigo-600 dark:to-purple-600 hover:from-teal-600 hover:to-cyan-700 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── FieldWrapper: label + children + optional error message ──
function FieldWrapper({ label, error, children }) {
  return (
    <div>
      <label className="auth-field-label">{label}</label>
      {children}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// Reusable Components
function FormInput({
  icon: Icon,
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  optional = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
        {label} {optional && <span className="text-gray-400 font-normal">(Optional)</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-3 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-teal-500 dark:focus:ring-indigo-400 transition ${
            error
              ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/50'
              : 'border-gray-300 dark:border-gray-700'
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

/* Compact version of FormInput — smaller label + tighter padding */
function CompactInput({
  icon: Icon,
  label,
  type,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  optional = false,
}) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">
        {label} {optional && <span className="text-gray-400 font-normal text-xs">(opt)</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full pl-8 pr-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-teal-500 dark:focus:ring-indigo-400 transition ${
            error ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/50' : 'border-gray-300 dark:border-gray-700'
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

/* Compact password input */
function CompactPasswordInput({ label, name, value, onChange, error, showPassword, onToggle, placeholder, required = false }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full pl-8 pr-8 py-2 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-teal-500 dark:focus:ring-indigo-400 transition ${
            error ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/50' : 'border-gray-300 dark:border-gray-700'
          }`}
          placeholder={placeholder}
        />
        <button type="button" onClick={onToggle} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition">
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-red-500 dark:text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  showPassword,
  onToggle,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-10 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-teal-500 dark:focus:ring-indigo-400 transition ${
            error
              ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/50'
              : 'border-gray-300 dark:border-gray-700'
          }`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}

/* PasswordStrengthIndicator — full checklist version */
function PasswordStrengthIndicator({ strength }) {
  const colorClass =
    strength.level === 'Weak'
      ? 'bg-red-500'
      : strength.level === 'Medium'
      ? 'bg-yellow-500'
      : 'bg-green-500';
  const textClass =
    strength.level === 'Weak'
      ? 'text-red-500'
      : strength.level === 'Medium'
      ? 'text-yellow-500'
      : 'text-green-600 dark:text-green-400';

  return (
    <div className="px-1 py-2 space-y-2">
      {/* Bar + label */}
      <div className="flex items-center gap-3">
        <div className="strength-bar-track">
          <div
            className={`strength-bar-fill ${colorClass}`}
            style={{ width: `${(strength.score / 6) * 100}%` }}
          />
        </div>
        <span className={`text-xs font-bold min-w-[52px] ${textClass}`}>
          {strength.level || '—'}
        </span>
      </div>
      {/* Requirement pills */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {[
          ['minLength', '8+ chars'],
          ['hasLowercase', 'a–z'],
          ['hasUppercase', 'A–Z'],
          ['hasNumber', '0–9'],
          ['hasSpecial', '!@#…'],
        ].map(([key, lbl]) => (
          <span
            key={key}
            className={`flex items-center gap-0.5 font-medium transition-colors ${
              strength.requirements[key]
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {strength.requirements[key] ? '✓' : '○'} {lbl}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Compact inline strength bar — just the bar + label, no checklist */
function InlineStrengthBar({ strength }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            strength.level === 'Weak' ? 'bg-red-500' : strength.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${(strength.score / 6) * 100}%` }}
        />
      </div>
      <span className={`text-xs font-semibold w-14 ${
        strength.level === 'Weak' ? 'text-red-500' : strength.level === 'Medium' ? 'text-yellow-500' : 'text-green-500'
      }`}>{strength.level || '—'}</span>
    </div>
  );
}

function RequirementItem({ met, text }) {
  return (
    <div
      className={`flex items-center gap-1.5 transition-colors ${
        met
          ? 'text-green-600 dark:text-green-400'
          : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      <span className="font-bold">{met ? '✓' : '○'}</span>
      <span>{text}</span>
    </div>
  );
}

function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="google-btn w-full mb-5 flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 font-medium text-sm text-gray-700 dark:text-gray-300"
    >
      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}
