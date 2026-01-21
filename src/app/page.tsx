"use client";

import Link from "next/link";
import PhotoMarquee from "@/components/PhotoMarquee";

const photos = [
  "/Website_photos/0144A801-7990-4FC3-BAF3-C32FF1EFDF4C.jpg",
  "/Website_photos/64926183873__02939CE4-938A-4145-8EA3-10F03F7F17D8.jpg",
  "/Website_photos/74457637230__1C62690A-11DB-4F1A-84C3-E32E998FDA76.jpg",
  "/Website_photos/IMG_0071.jpg",
  "/Website_photos/IMG_0195.jpg",
  "/Website_photos/IMG_0449.jpg",
  "/Website_photos/IMG_0895.jpg",
  "/Website_photos/IMG_0958.jpg",
  "/Website_photos/IMG_0968.jpg",
  "/Website_photos/IMG_1115.jpg",
  "/Website_photos/IMG_1299.jpg",
  "/Website_photos/IMG_1620.jpg",
  "/Website_photos/IMG_2165.jpg",
  "/Website_photos/IMG_2267.jpg",
  "/Website_photos/IMG_2380.jpg",
  "/Website_photos/IMG_2892.jpg",
  "/Website_photos/IMG_3226.jpg",
  "/Website_photos/IMG_3805.jpg",
  "/Website_photos/IMG_3954.jpg",
  "/Website_photos/IMG_4206.jpg",
  "/Website_photos/IMG_4650.jpg",
  "/Website_photos/IMG_4671.jpg",
  "/Website_photos/IMG_4847.jpg",
  "/Website_photos/IMG_4943.jpg",
  "/Website_photos/IMG_5146.jpg",
  "/Website_photos/IMG_5486.jpg",
  "/Website_photos/IMG_6363.jpg",
  "/Website_photos/IMG_6404.jpg",
  "/Website_photos/IMG_7618.jpg",
  "/Website_photos/IMG_9742.jpg",
];


const viewerPhotos = [
  "/Setup/IMG_1574.jpeg",
  "/Setup/IMG_1573.jpeg",
  "/Setup/IMG_1575.jpeg",
  "/Setup/IMG_1576.jpeg",
];

export default function Home() {
  return (
    <main className="page min-h-screen flex flex-col items-center justify-center gap-10 p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Welcome to Trevor&apos;s Pi Website
      </h1>

      {/* Top looping photos */}
      <div className="w-full">
        <PhotoMarquee images={photos} height={120} speedSeconds={40} />
      </div>

      {/* Description */}
      <p className="text-lg text-center max-w-xl muted">
        This site is hosted directly from my Raspberry Pi and was created on July 2nd, 2025.
        I built it with Next.js, styled it using Tailwind CSS, and it displays real-time
        system statistics from my Raspberry Pi while serving as a personal IT portfolio.
      </p>
      <p>
      Featuring Rudy!!!
      </p>

      {/* Bottom looping photos */}
      <div className="w-full">
        <PhotoMarquee images={photos} reverse height={120} speedSeconds={40} />
      </div>

      {/* NEW: Two-column section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT: About Me summary */}
        <div className="box p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">A brief summary on me:</h2>
          {/* Headshot */}
          <div className="w-full flex justify-center">
            <img
              src="/Headshot.png"
              alt="Trevor Poltrack"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md"
              style={{
                display: "block",
                backgroundColor: "rgba(255,255,255,0.06)", // helps if PNG has transparency
              }}
            />
          </div>
          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            I studied Information Science at the University of Maryland, where I focused on
            cloud, security, and building practical systems. I have worked hands-on in IT
            operations and automation, including my Cloud Architect Internship at CPower Energy,
            where I built compliance and security workflows using Azure, PowerShell, and
            Microsoft 365 tools. I want to work in cloud engineering, infrastructure, and
            cybersecurity. I like building real systems that run reliably, securely, and fast.
          </p>

          <div className="pt-1">
            <Link
              href="/about-me"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md font-semibold"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--foreground)",
              }}
            >
              Read more
            </Link>
          </div>
        </div>

        {/* RIGHT: How you're viewing this website */}
        <div className="box p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">How does this website work?</h2>

          {/* 4 photos */}
          <div className="grid grid-cols-2 gap-3">
            {viewerPhotos.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="w-full h-28 sm:h-32 object-cover rounded-md"
                loading="lazy"
              />
            ))}
          </div>
          <Link
            href="/stats"
            className="inline-flex items-center justify-center mt-2 px-4 py-2 rounded-md font-semibold text-sm"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--foreground)",
            }}
          >
            View Performance
          </Link>


          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            This site runs locally on my Raspberry Pi. The Pi hosts the Next.js application,
            serves the pages, and exposes it securely to the internet through a Cloudflare Tunnel.
            The Stats page pulls live system info directly from the Pi, and the AI page runs
            locally using Ollama, so the assistant does not rely on external APIs.
          </p>
        </div>
      </section>
    </main>
  );
}
