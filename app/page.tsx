"use client"

import { useState, useEffect } from "react"
import CountdownTimer from "@/components/countdown-timer"
import WaitlistForm from "@/components/waitlist-form"
import SocialIcons from "@/components/social-icons"
import CookieConsent from "@/components/cookie-consent"

export default function ComingSoonPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cookiesAccepted, setCookiesAccepted] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (cookieConsent) {
      setCookiesAccepted(true)
      setIsLoaded(true)
    }
  }, [])

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Show cookie consent if not accepted */}
      {!cookiesAccepted && (
        <CookieConsent
          onAccept={() => {
            setCookiesAccepted(true)
            setIsLoaded(true)
          }}
        />
      )}

      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/images/crowd-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-16">
        <div
          className={`transform transition-all duration-700 mb-6 sm:mb-8 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            width: "100px",
            height: "38px",
            borderRadius: "50px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <span className="font-poppins font-semibold text-white" style={{ fontSize: "10px" }}>
            Encore
          </span>
        </div>

        <div
          className={`text-center mb-0 transform transition-all duration-700 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h1
            className="font-poppins font-semibold text-white"
            style={{
              fontSize: "clamp(40px, 10vw, 80px)",
              letterSpacing: "-8px",
              lineHeight: "130%",
              background: "linear-gradient(135deg, #FFFFFF 0%, #888888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Coming soon!
          </h1>
        </div>

        <div
          className={`w-full max-w-[600px] transform transition-all duration-700 delay-100 mb-8 sm:mb-16 px-4 sm:px-4 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div
            className="relative p-6 sm:p-8 rounded-[32px] flex flex-col items-center justify-center"
            style={{
              background: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.2), 0 10px 20px rgba(0, 0, 0, 0.4)",
              minHeight: "280px",
              overflow: "visible",
            }}
          >
            <h2
              className="font-poppins font-semibold text-white text-center mb-4"
              style={{
                fontSize: "clamp(24px, 6vw, 30px)",
                letterSpacing: "0px",
                lineHeight: "100%",
              }}
            >
              Join our waitlist!
            </h2>

            <p
              className="font-poppins font-light text-white text-center mb-6"
              style={{
                fontSize: "clamp(12px, 4vw, 14px)",
                letterSpacing: "0px",
                lineHeight: "130%",
                maxWidth: "90%",
              }}
            >
              Sign up our newsletter to receive the latest updates and insights straight to your inbox
            </p>

            <div className="w-full px-4">
              <WaitlistForm />
            </div>
          </div>
        </div>

        <div
          className={`transform transition-all duration-700 delay-200 w-full ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <CountdownTimer targetDate={new Date("2026-01-01")} />
        </div>

        <div
          className={`mt-8 sm:mt-12 transform transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <SocialIcons />
        </div>
      </div>
    </main>
  )
}
