"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Clock, Shield, Smartphone, ArrowRight, Sparkles, Globe } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const features = [
    {
      icon: Smartphone,
      title: "Smart Check-In",
      description: "Facial recognition and geofencing for seamless attendance tracking",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with real-time data synchronization",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description: "Designed for students, instructors, and administrators",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Cloud-Based",
      description: "Access your data anywhere, anytime with our cloud platform",
      color: "from-orange-500 to-red-500",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  const handleGetStarted = () => {
    router.push("/auth/login")
  }

  const handleSkip = () => {
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fillRule='evenodd'%3E%3Cg%20fill='%23ffffff'%20fillOpacity='0.05'%3E%3Ccircle%20cx='30'%20cy='30'%20r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Clock className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-800" />
            </motion.div>
          </div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Attendance
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
          </motion.h1>

          <motion.p
            className="text-xl text-blue-100 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Smart attendance management with facial recognition and real-time tracking
          </motion.p>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          className="w-full max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="relative h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[currentSlide].color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  {React.createElement(features[currentSlide].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{features[currentSlide].title}</h3>
                <p className="text-blue-100 text-sm text-center px-4">{features[currentSlide].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {features.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-blue-400 w-8" : "bg-blue-400/30"
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <Button
            onClick={handleGetStarted}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Get Started
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>

          <Button
            onClick={handleSkip}
            variant="outline"
            className="flex-1 border-blue-400/50 text-blue-100 hover:bg-blue-500/20 hover:border-blue-400 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Skip Intro
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div>
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
            >
              99.9%
            </motion.div>
            <div className="text-blue-200 text-sm">Accuracy</div>
          </div>
          <div>
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            >
              &lt;2s
            </motion.div>
            <div className="text-blue-200 text-sm">Check-in Time</div>
          </div>
          <div>
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            >
              24/7
            </motion.div>
            <div className="text-blue-200 text-sm">Support</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-blue-500/10">
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            animate={{
              d: [
                "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                "M0,80 C300,40 900,100 1200,40 L1200,120 L0,120 Z",
                "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </div>
  )
}
