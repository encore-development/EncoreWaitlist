"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface CookieConsentProps {
  onAccept: () => void
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleAllowAll = () => {
    localStorage.setItem("cookieConsent", "allowed")
    setIsVisible(false)
    onAccept()
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setIsVisible(false)
    onAccept()
  }

  const handleClose = () => {
    handleReject()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="w-full max-w-md rounded-2xl p-6 sm:p-8 relative"
        style={{
          backgroundColor: "#000000",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="pr-8">
          <p
            className="font-poppins font-light text-white mb-6"
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              letterSpacing: "0px",
            }}
          >
            This website uses cookies, pixel tags, and local storage for performance, personalization, and marketing
            purposes. We use our own cookies and some from third parties. Only essential cookies are turned on by
            default.
          </p>

          <a
            href="#"
            className="text-white underline font-poppins font-light text-sm mb-6 inline-block hover:opacity-70 transition-opacity"
          >
            Cookies settings
          </a>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAllowAll}
              className="w-full py-3 px-4 rounded-lg font-poppins font-semibold text-black bg-white hover:bg-opacity-90 transition-all text-center"
              style={{
                fontSize: "14px",
              }}
            >
              Allow all cookies
            </button>

            <button
              onClick={handleReject}
              className="w-full py-3 px-4 rounded-lg font-poppins font-semibold text-black bg-white hover:bg-opacity-90 transition-all text-center"
              style={{
                fontSize: "14px",
              }}
            >
              Do not allow cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
