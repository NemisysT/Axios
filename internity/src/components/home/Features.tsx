"use client";

import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Search, Target, FileText, Send } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">

        {/* AI Tools Overview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Powered Tools for Effortless Job Search
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Leverage InternGeanie to streamline your job search. Our AI-driven tools customize resumes based on your profile and job description, while filtering and ranking job postings, ensuring only the best-fit opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FeatureCard
              title="Job Search with ease"
              description="Axios analyzes your profile and the job description to provide you with the jobs that are best compatible with you."
            />
            <FeatureCard
              title="On-demand Resumes"
              description="ProAI detects your skills and job roles from your profile."
            />
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Works like Magic, but How?
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Choose the jobs you like. We take care of the rest. Our goal is to help you find the best job offers quickly and with the least possible effort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardSpotlight className="p-6 h-full">
            <Search className="text-blue-500 w-6 h-6 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">Search</h3>
            <p className="text-neutral-300 text-sm mb-2">
              We crawl job boards and listings to surface roles that suit you.
            </p>
            <ul className="text-xs text-neutral-400 list-disc ml-4 space-y-1">
              <li>Real-time job sourcing</li>
              <li>Filtered by domain & location</li>
              <li>No duplicate listings</li>
            </ul>
          </CardSpotlight>

          <CardSpotlight className="p-6 h-full">
            <Target className="text-green-500 w-6 h-6 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">Match</h3>
            <p className="text-neutral-300 text-sm mb-2">
              AI compares your skills & experience with job descriptions.
            </p>
            <ul className="text-xs text-neutral-400 list-disc ml-4 space-y-1">
              <li>Compatibility scores</li>
              <li>Highlights skill gaps</li>
              <li>Tailored suggestions</li>
            </ul>
          </CardSpotlight>

          <CardSpotlight className="p-6 h-full">
            <FileText className="text-yellow-400 w-6 h-6 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">Generate</h3>
            <p className="text-neutral-300 text-sm mb-2">
              We craft ATS-optimized resumes for each selected job.
            </p>
            <ul className="text-xs text-neutral-400 list-disc ml-4 space-y-1">
              <li>Dynamic resume builder</li>
              <li>Highlights key skills</li>
              <li>Multiple formats supported</li>
            </ul>
          </CardSpotlight>

          <CardSpotlight className="p-6 h-full">
            <Send className="text-purple-500 w-6 h-6 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">Apply</h3>
            <p className="text-neutral-300 text-sm mb-2">
              We apply automatically with your customized documents.
            </p>
            <ul className="text-xs text-neutral-400 list-disc ml-4 space-y-1">
              <li>One-click apply</li>
              <li>Status tracking built-in</li>
              <li>Email confirmations</li>
            </ul>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-gradient-to-br from-purple-900/10 to-transparent rounded-2xl p-8 backdrop-blur-sm border border-purple-900/20">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Features;
