import React from "react";

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Jake Ryan</h1>
        <p className="text-sm">
          123-456-7890 | <a href="mailto:jake@su.edu" className="underline">jake@su.edu</a> |
          <a href="https://linkedin.com/in/..." className="underline ml-1">linkedin.com/in/jake</a> |
          <a href="https://github.com/..." className="underline ml-1">github.com/jake</a>
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Education</h2>
        <ul>
          <li className="mb-2">
            <p className="font-bold">Southwestern University, Georgetown, TX</p>
            <p className="italic text-sm">Bachelor of Arts in Computer Science, Minor in Business (Aug. 2018 -- May 2021)</p>
          </li>
          <li>
            <p className="font-bold">Blinn College, Bryan, TX</p>
            <p className="italic text-sm">Associate's in Liberal Arts (Aug. 2014 -- May 2018)</p>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Experience</h2>
        <div className="mb-4">
          <p className="font-bold">Undergraduate Research Assistant - Texas A&M University</p>
          <p className="text-sm italic">June 2020 -- Present, College Station, TX</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Developed a REST API using FastAPI and PostgreSQL</li>
            <li>Built a full-stack web app with Flask, React, PostgreSQL, Docker</li>
            <li>Visualized GitHub collaboration data</li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="font-bold">IT Support Specialist - Southwestern University</p>
          <p className="text-sm italic">Sep. 2018 -- Present, Georgetown, TX</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Setup and troubleshoot campus computers and equipment</li>
            <li>Maintained over 200 printers and classroom tech</li>
          </ul>
        </div>

        <div>
          <p className="font-bold">AI Research Assistant - Southwestern University</p>
          <p className="text-sm italic">May 2019 -- July 2019, Georgetown, TX</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Generated video game dungeons using AI techniques</li>
            <li>Developed Java-based game for testing</li>
            <li>Presented at World Conference on Computational Intelligence</li>
          </ul>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Projects</h2>
        <div className="mb-4">
          <p className="font-bold">Gitlytics</p>
          <p className="text-sm italic">Python, Flask, React, PostgreSQL, Docker (June 2020 -- Present)</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Full-stack web app with GitHub OAuth integration</li>
            <li>Data visualization and async task processing (Celery + Redis)</li>
          </ul>
        </div>

        <div>
          <p className="font-bold">Simple Paintball</p>
          <p className="text-sm italic">Spigot API, Java, Maven, TravisCI, Git (May 2018 -- May 2020)</p>
          <ul className="list-disc pl-5 text-sm">
            <li>Developed and published a Minecraft plugin (2K+ downloads)</li>
            <li>CI/CD with TravisCI</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">Technical Skills</h2>
        <ul className="text-sm list-disc pl-5">
          <li><strong>Languages:</strong> Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R</li>
          <li><strong>Frameworks:</strong> React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI</li>
          <li><strong>Developer Tools:</strong> Git, Docker, TravisCI, GCP, VS Code, PyCharm, IntelliJ, Eclipse</li>
          <li><strong>Libraries:</strong> pandas, NumPy, Matplotlib</li>
        </ul>
      </section>
    </div>
  );
}
