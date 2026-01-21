"use client";

import Link from "next/link";

export default function Footer() {
  const backToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="w-full mt-auto"
      style={{
        backgroundColor: "var(--box-bg)",
        color: "var(--box-fg)",
        borderTop: "1px solid var(--box-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">Trevor Poltrack</div>
            <p className="text-sm leading-relaxed opacity-90">
              I’m an IT and cloud-focused builder with hands-on experience in cloud
              automation, endpoint compliance, and systems work, including Microsoft
              Azure, Azure Functions, Intune, Purview, and security tooling. I’m
              aiming for roles in cloud engineering, systems engineering, or
              cybersecurity, where I can build reliable infrastructure and automate
              secure operations.
            </p>
          </div>

          {/* Mini navigation */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">Navigation</div>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <Link className="hover:underline" href="/">
                Home
              </Link>
              <Link className="hover:underline" href="/stats">
                Stats
              </Link>
              <Link className="hover:underline" href="/about-me">
                About Me
              </Link>
              <Link className="hover:underline" href="/ai">
                AI
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-semibold">Contact Me</div>

            <div className="flex flex-col gap-2 text-sm">
              <a className="hover:underline" href="mailto:trevorpoltrack@gmail.com">
                trevorpoltrack@gmail.com
              </a>

              <a
                className="hover:underline"
                href="https://www.linkedin.com/in/trevorpoltrack/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>

              <a
                className="hover:underline"
                href="https://app.joinhandshake.com/profiles/trevorpoltrack"
                target="_blank"
                rel="noopener noreferrer"
              >
                Handshake
              </a>

              <a
                className="hover:underline"
                href="https://github.com/trevorpoltrack"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>

              <a
                className="hover:underline"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-8"
          style={{ borderTop: "1px solid var(--box-border)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="opacity-80">
            © {new Date().getFullYear()} Trevor's Pi Trevor Poltrack. All rights reserved.
          </div>

          <button
            type="button"
            onClick={backToTop}
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: "transparent",
              color: "var(--box-fg)",
              border: "1px solid var(--box-border)",
            }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
