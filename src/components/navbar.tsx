"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = useMemo(() => currentTheme === "dark", [currentTheme]);

  const linkStyle: React.CSSProperties = { color: "var(--navbar-fg)" };
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--navbar-hover)";
  };
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--navbar-fg)";
  };

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav
      className="sticky top-0 z-50 w-full px-4 sm:px-6 h-14 flex items-center shadow-md"
      style={{
        backgroundColor: "var(--navbar-bg)",
        color: "var(--navbar-fg)",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-lg sm:text-xl font-bold whitespace-nowrap">
          Trevor&apos;s Pi
        </div>

        {/* Mobile links: right of brand */}
        <ul className="flex items-center gap-4 text-sm font-medium md:hidden">
          <li>
            <Link
              href="/"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/stats"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              Stats
            </Link>
          </li>
          <li>
            <Link
              href="/about-me"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/ai"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              AI
            </Link>
          </li>
        </ul>
      </div>

      {/* CENTER (desktop): centered links */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li>
            <Link
              href="/"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/stats"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              Stats
            </Link>
          </li>
          <li>
            <Link
              href="/about-me"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              href="/ai"
              className="transition-colors hover:underline"
              style={linkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              AI
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT: theme switch */}
      <div className="flex-1 md:flex-none flex justify-end items-center">
        {mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle p-0 bg-transparent focus:outline-none"
            style={{
              border: "none",
              boxShadow: "none",
              // haptic-style press
              transform: pressed ? "scale(0.96)" : "scale(1)",
              transition: "transform 120ms ease",
              WebkitTapHighlightColor: "transparent",
            }}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerCancel={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
          >
            {/* Track */}
            <span
              className="relative inline-flex items-center"
              style={{
                width: 56,
                height: 30,
                borderRadius: 9999,
                backgroundColor: isDark ? "#111827" : "#f8fafc",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.22)"
                  : "1px solid rgba(0,0,0,0.18)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.18)",
                padding: 3,
                transition: "background-color 150ms ease, border-color 150ms ease",
              }}
            >
              {/* Icon in the track (subtle) */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 10,
                  fontSize: 12,
                  opacity: isDark ? 0.35 : 0.65,
                  transition: "opacity 150ms ease",
                  userSelect: "none",
                }}
              >
                ⏾
              </span>
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: 10,
                  fontSize: 12,
                  opacity: isDark ? 0.65 : 0.35,
                  transition: "opacity 150ms ease",
                  userSelect: "none",
                }}
              >
                ☀︎
              </span>

              {/* Knob */}
              <span
                className="block"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 9999,
                  backgroundColor: isDark ? "#ffffff" : "#111827",
                  transform: isDark ? "translateX(26px)" : "translateX(0px)",
                  transition: "transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.28)",
                }}
              />
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
