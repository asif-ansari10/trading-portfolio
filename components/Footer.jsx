"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-700 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Trading Portfolio
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              A smart way to track your trades and portfolio performance.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-400">
  {[
    { name: "Home", href: "/" },
    { name: "Trades", href: "/trades" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Markets", href: "/markets" },
    { name: "About", href: "/about" }
  ].map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        className="transition text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
      >
        {link.name}
      </Link>
    </li>
  ))}
</ul>

          </div>

          {/* DEVELOPER INFO */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Developer
            </h3>

            <p className="text-gray-700 dark:text-gray-400">
              <span className="font-semibold text-white">Asif Ansari</span><br/>
              Full-Stack Developer
            </p>

            <p className="mt-2">
              <a
                href="mailto:asifnasimansari10@gmail.com"
                className="text-blue-600 dark:text-blue-400 underline"
              >
                asifnasimansari10@gmail.com
              </a>
            </p>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-10 pt-6 text-center border-t border-gray-700 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Trading Portfolio — Developed by{" "}
            <span className="text-blue-500">Asif Ansari</span>.  
            All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
