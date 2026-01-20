"use client";

import { useState } from "react";

const sections = [
  {
    title: "Education",
    content: (
      <ul className="list-disc ml-6 text-muted-foreground">
        <li>
          <strong>University of Maryland College Park, MD</strong>
          <br />
          Bachelor of Science, Information Science, May 2025
          <br />
          Dean’s List: Fall 2023, Fall 2024, Spring 2025
        </li>
      </ul>
    ),
  },
  {
    title: "Skills & Interests",
    content: (
      <ul className="list-disc ml-6 text-muted-foreground">
        <li>
          <strong>Programming Languages:</strong> C#, Java, JavaScript, Python, R,
          SQL
        </li>
        <li>
          <strong>Web Technologies:</strong> HTML, CSS
        </li>
        <li>
          <strong>Cloud & Security:</strong> Microsoft Azure, Azure Functions,
          Microsoft Intune, Microsoft Purview, CrowdStrike Falcon
        </li>
        <li>
          <strong>Data & Platforms:</strong> Oracle (ERD, schema normalization),
          .NET 8, Git, Jupyter, Windows PowerShell
        </li>
      </ul>
    ),
  },
  {
    title: "Professional Experience",
    content: (
      <ul className="list-disc ml-6 text-muted-foreground">
        <li>
          <strong>CPower Energy, Baltimore, MD</strong> — Cloud Architect Intern
          <br />
          June 2025 – August 2025
          <ul className="list-disc ml-6">
            <li>
              Automated data classification, labeling, and policy enforcement in
              Microsoft Purview and Exchange Online, strengthening governance,
              compliance, and audit readiness.
            </li>
            <li>
              Developed PowerShell and Azure Function workflows for mailbox
              retention, litigation holds, and compliance audits, reducing manual
              effort by 100% and ensuring regulatory alignment.
            </li>
            <li>
              Engineered automated endpoint compliance monitoring using Intune and
              CrowdStrike APIs; scheduled Azure Functions to trigger alerts and
              reports that closed security gaps across workstations and servers.
            </li>
            <li>
              Designed and documented an Entity Relationship Diagram (ERD) to model
              legacy contact and drop-item data, guiding creation and normalization
              of Oracle database tables.
            </li>
            <li>
              Architected C#/.NET 8 data access layers and Azure Functions to
              ingest, synchronize, and process contact and drop-item records from
              Oracle for both initial and incremental loads.
            </li>
            <li>
              Deployed compliance checks comparing CrowdStrike Windows Sensor coverage
              across Intune-enrolled devices and servers, identifying discrepancies
              and inactive devices.
            </li>
            <li>
              Leveraged Microsoft 365 Copilot and GitHub Copilot to accelerate
              PowerShell and C# development, improve code quality, and standardize
              documentation.
            </li>
          </ul>
        </li>
        <li>
          <strong>Anne Arundel County Quiet Waters Ice Rink, Annapolis, MD</strong>{" "}
          — Manager
          <br />
          October 2018 - March 2025
          <ul className="list-disc ml-6">
            <li>
              Oversaw daily operations for a 25-person team; coordinated scheduling,
              cash handling, and customer service to maintain a safe, efficient
              facility.
            </li>
          </ul>
        </li>
        <li>
          <strong>Anchor Aquatics, Annapolis, MD</strong> — Supervisor
          <br />
          May 2023 – September 2023
          <ul className="list-disc ml-6">
            <li>
              Trained and supervised lifeguards; enforced safety protocols and
              improved incident response readiness through recurring drills.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    title: "Academic Projects",
    content: (
      <ul className="list-disc ml-6 text-muted-foreground">
        <li>
          <strong>Finance Tracker Project</strong> — Object-Oriented Programming for
          Information Science, UMD
          <br />
          January - May 2024
          <ul className="list-disc ml-6">
            <li>
              Fabricated a 10,000-row relational dataset; reverse-engineered and
              maintained ERDs; wrote complex SQL queries for analysis and
              reporting.
            </li>
          </ul>
        </li>
        <li>
          <strong>Basic Firewall Implementation</strong> — Network Security Project,
          UMD
          <br />
          January - May 2024
          <ul className="list-disc ml-6">
            <li>
              Designed a simple packet-filtering firewall in Python to monitor and
              filter network traffic based on rules and source IPs.
            </li>
          </ul>
        </li>
        <li>
          <strong>Campaign Finance Expenditures Dataset</strong> — Database Design
          and Modeling, UMD
          <br />
          January - May 2024
          <ul className="list-disc ml-6">
            <li>
              Built an OOP-based personal finance system (transactions, budgets,
              reports) with JSON persistence and period reporting.
            </li>
          </ul>
        </li>
      </ul>
    ),
  },
  {
    title: "Professional Organizations",
    content: (
      <ul className="list-disc ml-6 text-muted-foreground">
        <li>Member, IEEE — September 2024 – Present</li>
        <li>Member, ACM — September 2024 – Present</li>
      </ul>
    ),
  },
];

export default function AboutMe() {
  const [open, setOpen] = useState(Array(sections.length).fill(false));
  const toggle = (idx: number) =>
    setOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)));

  return (
    <main className="min-h-screen flex flex-col items-center bg-background text-foreground p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-center">About Me</h1>

      {/* Header card */}
      <section className="box w-full max-w-3xl text-center mb-10 p-6">
        <h2 className="text-3xl font-bold mb-2">Trevor Poltrack</h2>
        <p className="text-lg text-muted-foreground mb-4">Baltimore, MD 21218</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <a href="mailto:trevorpoltrack@gmail.com" className="underline">
            trevorpoltrack@gmail.com
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="https://www.linkedin.com/in/trevorpoltrack/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            LinkedIn
          </a>
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 rounded-lg font-semibold shadow transition"
          style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
        >
          View My Resume
        </a>
      </section>

      <hr className="w-full max-w-2xl border-t-2 my-8 box-border" />

      {/* Sections card */}
      <section className="box w-full max-w-3xl space-y-6 p-6">
        {sections.map((section, idx) => (
          <div
            key={section.title}
            className="mb-4 border-b last:border-b-0 pb-4 box-border"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold">{section.title}</h3>
              <button
                onClick={() => toggle(idx)}
                className="ml-4 px-3 py-1 rounded transition"
                style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
              >
                {open[idx] ? "Hide" : "Show"}
              </button>
            </div>
            {open[idx] && <div className="mt-4">{section.content}</div>}
          </div>
        ))}
      </section>
    </main>
  );
}
