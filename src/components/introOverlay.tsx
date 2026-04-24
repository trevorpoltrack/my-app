"use client";

import { useEffect, useState } from "react";

export default function IntroOverlay() {
  const titleText = "Welcome to Trevor's Pi Website";
  const subText = "Scroll to enter";

  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");

  const [stage, setStage] = useState<"title" | "sub" | "done">("title");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;

    const typeTitle = setInterval(() => {
      setTitle(titleText.slice(0, i + 1));
      i++;

      if (i === titleText.length) {
        clearInterval(typeTitle);
        setStage("sub");

        let j = 0;

        const typeSub = setInterval(() => {
          setSub(subText.slice(0, j + 1));
          j++;

          if (j === subText.length) {
            clearInterval(typeSub);
            setStage("done");
          }
        }, 60);
      }
    }, 70);

    return () => clearInterval(typeTitle);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight * 0.8;
      const p = Math.min(window.scrollY / max, 1);
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="intro-overlay"
      style={{
        opacity: 1 - progress,
        transform: `translateY(${progress * -40}px)`,
        pointerEvents: progress >= 1 ? "none" : "auto",
      }}
    >
      <div className="grid-container">
        <div className="plane">
          <div className="grid" />
          <div className="glow" />
        </div>

        <div className="plane">
          <div className="grid" />
          <div className="glow" />
        </div>
      </div>

      <div className="intro-content">
        <h1>
          {title}
          {stage === "title" && <span className="cursor blink" />}
        </h1>

        <p>
          {sub}
          {stage === "sub" && <span className="cursor blink" />}
        </p>
      </div>
    </section>
  );
}