import { useEffect, useMemo, useState } from "react";
import {
  Github,
  ExternalLink,
  Users,
  GitPullRequest,
} from "lucide-react";

export default function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/Suhani1234-5/TourEase/contributors?per_page=100"
        );

        const data = await response.json();

        // only contributors with 3+ contributions
        const filtered = data.filter(
          (user) => user.contributions >= 3
        );

        setContributors(filtered);
      } catch (error) {
        console.error("Failed to fetch contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  const totalContributions = useMemo(() => {
    return contributors.reduce(
      (acc, curr) => acc + curr.contributions,
      0
    );
  }, [contributors]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/40 via-cyan-100/20 to-orange-100/20 dark:from-cyan-900/10 dark:via-indigo-900/10 dark:to-orange-900/10" />

        <div className="relative max-w-7xl mx-auto">

          <div className="max-w-3xl">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 dark:border-cyan-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md px-4 py-2 mb-8">
              <Github className="w-4 h-4 text-teal-600 dark:text-cyan-400" />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Open Source Community
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">
              Meet Our
              <span className="block bg-gradient-to-r from-teal-500 via-cyan-500 to-orange-500 bg-clip-text text-transparent">
                Contributors
              </span>
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400 max-w-2xl">
              TourEase is powered by passionate developers and open-source
              contributors worldwide helping travelers build smarter journeys.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-teal-500" />

                <span className="text-sm uppercase tracking-widest text-gray-500">
                  Contributors
                </span>
              </div>

              <h2 className="text-5xl font-black text-gray-900 dark:text-white">
                {contributors.length}+
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <GitPullRequest className="w-6 h-6 text-orange-500" />

                <span className="text-sm uppercase tracking-widest text-gray-500">
                  Contributions
                </span>
              </div>

              <h2 className="text-5xl font-black text-gray-900 dark:text-white">
                {totalContributions}+
              </h2>
            </div>

            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl p-8 shadow-lg">
              
              <div className="flex items-center gap-3 mb-4">
                <Github className="w-6 h-6 text-cyan-500" />

                <span className="text-sm uppercase tracking-widest text-gray-500">
                  Repository
                </span>
              </div>

              <a
                href="https://github.com/Suhani1234-5/TourEase"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-teal-600 dark:text-cyan-400 hover:gap-3 transition-all font-semibold"
              >
                View Repository
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-80 rounded-3xl bg-gray-100 dark:bg-gray-900 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {contributors.map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                >
                  
                  {/* glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-orange-500/10" />

                  <div className="relative z-10">
                    
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                    />

                    <div className="mt-6">
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {contributor.login}
                      </h3>

                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {contributor.contributions} contributions
                      </p>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-teal-600 dark:text-cyan-400 font-semibold">
                      GitHub Profile
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}