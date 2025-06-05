"use client";

import { useState } from "react";
import SimpleMode from "../components/SimpleMode";
import VisualMode from "../components/VisualMode";
import Head from "next/head";

export default function Home() {
  const [activeTab, setActiveTab] = useState("simple");

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Hand+Pre:wght@400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className="min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpg')",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600/30 to-gray-400/20 border border-purple-400/40 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <span
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full mr-2 shadow-lg"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                New
              </span>
              <span
                className="text-purple-200 text-sm font-medium tracking-wide"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                Automated Lead Generation
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "700" }}
            >
              Agent Runner
              <br />
              <span
                className="text-white font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                }}
              >
                for Modern Businesses.
              </span>
            </h1>

            <p
              className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-normal"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: "400",
                lineHeight: "1.8",
              }}
            >
              Craft prompts, select tools, and watch AI work its{" "}
              <span className="text-white font-medium">magic</span> to
              streamline your workflow.
            </p>

            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-gradient-to-r from-purple-900/30 to-gray-800/20 backdrop-blur-lg border border-purple-400/30 rounded-2xl p-1 shadow-2xl">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("simple")}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === "simple"
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl shadow-purple-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-800/20 hover:to-gray-700/20"
                    }`}
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📝</span>
                      <span className="tracking-wide">Simple Mode</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("visual")}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === "visual"
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl shadow-purple-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-800/20 hover:to-gray-700/20"
                    }`}
                    style={{
                      fontFamily: "'Raleway', sans-serif",
                      fontWeight: "600",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">🎨</span>
                      <span className="tracking-wide">Visual Flow</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-purple-900/20 via-gray-800/10 to-purple-800/15 backdrop-blur-lg border border-purple-400/20 rounded-3xl p-8 shadow-2xl">
              <div className="transition-opacity duration-300">
                {activeTab === "simple" ? <SimpleMode /> : <VisualMode />}
              </div>
            </div>
          </div>

          {/* Status Footer */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-900/40 to-gray-800/30 backdrop-blur-lg border border-purple-400/30 rounded-xl px-6 py-3 shadow-xl">
              <div className="flex items-center space-x-6">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2 shadow-sm shadow-green-400/50"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-green-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Backend Ready
                  </span>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 shadow-sm shadow-blue-400/50"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Neon PostgreSQL
                  </span>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-2 shadow-sm shadow-red-400/50"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-red-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Redis Cache
                  </span>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mr-2 shadow-sm shadow-purple-400/50"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-purple-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Groq LLM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
