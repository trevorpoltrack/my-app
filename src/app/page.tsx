'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 p-6 min-h-screen bg-background text-foreground">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Welcome to Trevor's Pi Website
      </h1>

      {/* Description */}
      <p className="text-lg text-center text-muted-foreground max-w-xl">
        This site is hosted directly from my Raspberry Pi and was created on July 2nd, 2025. 
        I built it with Next.js, styled it using Tailwind CSS, and displays real-time system statistics of my RaspPi!
        
      </p>
      {/* LinkedIn Button */}
      <a
        href="https://www.linkedin.com/in/trevorpoltrack/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          background: '#0A66C2',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        Connect on LinkedIn
      </a>

      {/* Image */}
      <Image
        src="/pup.jpg"
        alt="Pup"
        width={350}
        height={350}
        className="rounded-xl shadow-lg"
        priority
      />
    </main>
  );
}