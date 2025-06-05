"use client";

import { useState } from "react";
import SimpleMode from "../components/SimpleMode";
import VisualMode from "../components/VisualMode";
import { Button } from "../components/ui/button";
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
        {/* Decorative Square Grid Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large Squares */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rotate-12"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white/15 -rotate-45"></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 border border-white/8 rotate-45"></div>
          <div className="absolute bottom-20 right-32 w-28 h-28 border border-white/12 -rotate-12"></div>

          {/* Medium Squares */}
          <div className="absolute top-60 left-1/3 w-20 h-20 border border-white/15 rotate-30"></div>
          <div className="absolute top-32 right-1/3 w-16 h-16 border border-white/20 -rotate-30"></div>
          <div className="absolute bottom-48 left-1/2 w-24 h-24 border border-white/10 rotate-60"></div>
          <div className="absolute top-80 right-10 w-18 h-18 border border-white/18 -rotate-60"></div>

          {/* Small Squares */}
          <div className="absolute top-24 left-1/2 w-12 h-12 border border-white/25 rotate-15"></div>
          <div className="absolute top-96 left-16 w-14 h-14 border border-white/20 -rotate-15"></div>
          <div className="absolute bottom-40 right-16 w-10 h-10 border border-white/30 rotate-75"></div>
          <div className="absolute top-52 right-1/2 w-16 h-16 border border-white/15 -rotate-45"></div>

          {/* Half Squares (L-shapes) */}
          <div className="absolute top-16 left-2/3 w-20 h-20 border-l border-t border-white/20 rotate-45"></div>
          <div className="absolute bottom-60 left-8 w-24 h-24 border-r border-b border-white/15 -rotate-30"></div>
          <div className="absolute top-72 right-1/4 w-18 h-18 border-l border-b border-white/25 rotate-60"></div>
          <div className="absolute bottom-24 left-1/3 w-22 h-22 border-r border-t border-white/18 -rotate-45"></div>

          {/* Corner Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/30"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/30"></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/30"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/30"></div>

          {/* Grid Lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/8 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Main Title */}
            <h1
              className="font-normal text-3xl sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #a8a8a8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Agents at the Core
              <br />
              Touchpoints Everywhere
            </h1>

            <br />
            <br />

            <p
              className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-normal"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: "400",
                lineHeight: "1.8",
              }}
            >
              Mini Agent Forge - Your AI-Powered Development Companion
            </p>

            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-16">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-1 shadow-2xl">
                <div className="flex space-x-1">
                  <Button
                    onClick={() => setActiveTab("simple")}
                    variant={activeTab === "simple" ? "default" : "ghost"}
                    size="lg"
                    className={`px-6 py-3 rounded-xl font-semibold text-sm ${
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
                  </Button>

                  <Button
                    onClick={() => setActiveTab("visual")}
                    variant={activeTab === "visual" ? "default" : "ghost"}
                    size="lg"
                    className={`px-6 py-3 rounded-xl font-semibold text-sm ${
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
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-16">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div>
                {activeTab === "simple" ? <SimpleMode /> : <VisualMode />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
