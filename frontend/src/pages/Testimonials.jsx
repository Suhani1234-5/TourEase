import { useState } from "react";

const testimonials = [
  {
    name: "Aarav Mehta",
    review:
      "TourEase planned our entire trip flawlessly. Everything felt premium and stress-free.",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    name: "Sneha Kapoor",
    review:
      "Loved the itinerary suggestions and smooth booking experience.",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 4,
  },
  {
    name: "Rohan Verma",
    review:
      "One of the best travel planning platforms I've used so far.",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
  },
  {
    name: "Neha Sharma",
    review:
      "Clean UI, smart recommendations, and great destinations.",
    image: "https://i.pravatar.cc/150?img=28",
    rating: 5,
  },
];

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          What Travelers Say
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            className="marquee-track flex gap-6 w-max"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="
                  min-w-[320px]
                  rounded-2xl
                  p-6
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-105
                  bg-white
                  dark:bg-gray-900
                  border
                  border-gray-200
                  dark:border-gray-800
                "
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t.name}
                    </h4>
                    <div className="text-yellow-400 text-sm">
                      {[...Array(5)].map((_, j) => (
                        <span key={j}>{j < t.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "{t.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
