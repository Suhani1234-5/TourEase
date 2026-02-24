import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex items-center justify-center text-center text-white bg-linear-to-br from-cyan-400 via-indigo-500 to-purple-700 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="max-w-md px-8 py-10 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-xl shadow-2xl">
        <div className="text-[70px]">🧭</div>

        <h1 className="text-[70px] tracking-[2px] mb-1 font-bold">404</h1>

        <h2 className="mt-0 text-xl font-semibold text-slate-100 dark:text-slate-50">
          Lost your way, traveler?
        </h2>

        <p className="mt-2 text-sm text-slate-100/90 dark:text-slate-200/80">
          This route isn’t on our map. Maybe the destination moved… or the
          adventure is somewhere else ✈️
        </p>

        <button
          onClick={() => navigate("/")}
          type="button"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white bg-linear-to-r from-amber-500 to-orange-600 shadow-lg shadow-black/40 transition-transform transition-shadow duration-200 hover:-translate-y-[3px] hover:scale-[1.03] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 focus-visible:ring-offset-slate-900"
        >
          Take Me Home 🏠
        </button>
      </div>
    </div>
  );
};

export default NotFound;
