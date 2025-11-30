"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <NavBar />

      <div className="pt-28 px-6 pb-20 bg-gray-100 dark:bg-[#0d1628] min-h-screen transition-colors duration-300">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          About Trading Portfolio
        </h1>

        <p className="text-lg max-w-3xl text-gray-700 dark:text-gray-300">
          This platform helps you track your active holdings, completed trades,
          profit/loss trends, and overall trading performance.
        </p>

        <p className="text-lg max-w-3xl mt-4 text-gray-700 dark:text-gray-300">
          You can add trades, analyze your portfolio, check historical
          performance, and visualize your progress through charts and analytics.
        </p>

        {/* FEATURES */}
        <div className="mt-12 bg-white dark:bg-[#111827] shadow-lg p-8 rounded-2xl max-w-3xl transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Features
          </h2>

          <ul className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
            <li>• Track active holdings</li>
            <li>• Automatic profit/loss calculation</li>
            <li>• Trading calendar & heatmap</li>
            <li>• Beautiful analytics dashboard</li>
            <li>• Responsive & mobile-friendly UI</li>
          </ul>
        </div>

        {/* DEVELOPER SECTION */}
        <div className="mt-12 bg-white dark:bg-[#111827] shadow-lg p-8 rounded-2xl max-w-3xl transition-colors duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Developer
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            This project is developed and maintained by:
          </p>

          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Asif Ansari
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Email: asifnasimansari10@gmail.com
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
