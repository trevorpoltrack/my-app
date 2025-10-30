"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Trevor's Pi</div>
      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/stats" className="hover:text-blue-400 transition-colors">
            Stats
          </Link>
        </li>
        <li>
          <Link href="/about-me" className="hover:text-blue-400 transition-colors">
            About Me
          </Link>
        </li>
      </ul>
    </nav>
  );
}
