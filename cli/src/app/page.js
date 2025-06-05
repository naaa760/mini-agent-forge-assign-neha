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
            {/* Main Title */}
            <h1
              className="font-normal main-gradient text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Power Every Agent Runner
              <br />
              Touchpoint – at Scale.
            </h1>

            <p
              className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-normal"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: "400",
                lineHeight: "1.8",
              }}
            >
              Integrate 300+ wearables, streamline lab operations, and build
              your own lab testing experience spanning all 50 states – with a
              single API.
            </p>

            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1 shadow-2xl">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("simple")}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      activeTab === "simple"
                        ? "bg-gray-900 text-white shadow-xl"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
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
                        ? "bg-gray-900 text-white shadow-xl"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
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
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="transition-opacity duration-300">
                {activeTab === "simple" ? <SimpleMode /> : <VisualMode />}
              </div>
            </div>
          </div>

          {/* Status Footer */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-6 py-3 shadow-xl">
              <div className="flex items-center space-x-6">
                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 shadow-sm"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-green-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Backend Ready
                  </span>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 shadow-sm"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-blue-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Neon PostgreSQL
                  </span>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2 shadow-sm"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-red-400 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Redis Cache
                  </span>
                </div>

                <div className="flex items-center group cursor-pointer">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 shadow-sm"></div>
                  <span
                    className="text-gray-300 text-xs font-medium group-hover:text-orange-400 transition-colors"
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
