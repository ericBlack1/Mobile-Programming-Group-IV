"use client"

import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Camera, MapPin, Clock, CheckCircle, AlertTriangle, Loader2, RefreshCw, MapPinIcon } from "lucide-react"

const availableSessions = [
  {
    id: 1,
    course: "CS101 - Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    time: "09:00 AM - 10:30 AM",
    location: "Room A-101",
    status: "active",
    distance: "12m away",
  },
  {
    id: 2,
    course: "MATH201 - Calculus II",
    instructor: "Prof. Michael Chen",
    time: "11:00 AM - 12:30 PM",
    location: "Room B-205",
    status: "upcoming",
    distance: "Too far",
  },
]

export default function CheckInPage() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null)
  const [checkInStep, setCheckInStep] = useState<"select" | "location" | "camera" | "processing" | "success" | "error">(
    "select",
  )
  const [locationPermission, setLocationPermission] = useState<"pending" | "granted" | "denied">("pending")
  const [cameraPermission, setCameraPermission] = useState<"pending" | "granted" | "denied">("pending")
  const [showCameraPreview, setShowCameraPreview] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Clean up stream when preview closes or component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
        streamRef.current = null
      }
    }
  }, [])

  const handleSessionSelect = (sessionId: number) => {
    setSelectedSession(sessionId)
    setCheckInStep("location")
    // Simulate location check
    setTimeout(() => {
      setLocationPermission("granted")
      setCheckInStep("camera")
    }, 2000)
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraPermission("granted")
      setShowCameraPreview(true)
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setTimeout(() => {
        // Stop camera after 2 seconds
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }
        setShowCameraPreview(false)
        setCheckInStep("processing")
        setTimeout(() => {
          setCheckInStep("success")
        }, 3000)
      }, 2000)
    } catch (err) {
      setCameraPermission("denied")
      alert("Camera access denied. Please allow camera access to check in.")
    }
  }

  const resetCheckIn = () => {
    setSelectedSession(null)
    setCheckInStep("select")
    setLocationPermission("pending")
    setCameraPermission("pending")
  }

  const selectedSessionData = availableSessions.find((s) => s.id === selectedSession)

  return (
    <AppLayout userRole="student" userName="John Smith" userEmail="john.smith@student.edu">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Check-in</h1>
          <p className="text-gray-600 dark:text-gray-400">Mark your attendance for today's classes</p>
        </div>

        {checkInStep === "select" && (
          <>
            {/* Available Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Available Sessions</CardTitle>
                <CardDescription>Select a session to check in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-2 sm:gap-0"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">{session.course}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{session.instructor}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                          <span className="flex items-center min-w-0">
                            <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{session.time}</span>
                          </span>
                          <span className="flex items-center min-w-0">
                            <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{session.location}</span>
                          </span>
                          <span className="flex items-center min-w-0">
                            <MapPinIcon className="mr-1 h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{session.distance}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 mt-2 sm:mt-0 min-w-[120px]">
                        <Badge variant={session.status === "active" ? "default" : "secondary"} className="w-fit self-start sm:self-auto">
                          {session.status === "active" ? "Active Now" : "Upcoming"}
                        </Badge>
                        <Button
                          size="sm"
                          className="flex items-center justify-center"
                          disabled={session.status !== "active" || session.distance === "Too far"}
                          onClick={() => handleSessionSelect(session.id)}
                        >
                          <Camera className="mr-1 h-4 w-4" />
                          Check In
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Make sure you're physically present in the classroom before checking in. The system will verify your
                location and identity.
              </AlertDescription>
            </Alert>
          </>
        )}

        {checkInStep === "location" && selectedSessionData && (
          <Card>
            <CardHeader>
              <CardTitle>Verifying Location</CardTitle>
              <CardDescription>Checking if you're in the correct classroom</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="font-medium">{selectedSessionData.course}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSessionData.location}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Verifying your location...</span>
                </div>
                <Progress value={60} className="w-full" />
              </div>
            </CardContent>
          </Card>
        )}

        {checkInStep === "camera" && selectedSessionData && (
          <Card>
            <CardHeader>
              <CardTitle>Facial Recognition</CardTitle>
              <CardDescription>Position your face in the camera frame</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-64 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                {showCameraPreview ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-lg"
                    autoPlay
                    playsInline
                    muted
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Camera preview will appear here</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">{selectedSessionData.course}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make sure your face is clearly visible and well-lit
                </p>
              </div>
              <div className="flex space-x-2 justify-center">
                <Button variant="outline" onClick={resetCheckIn} disabled={showCameraPreview}>
                  Cancel
                </Button>
                <Button onClick={handleCameraCapture} disabled={showCameraPreview}>
                  <Camera className="mr-2 h-4 w-4" />
                  Capture Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {checkInStep === "processing" && selectedSessionData && (
          <Card>
            <CardHeader>
              <CardTitle>Processing Check-in</CardTitle>
              <CardDescription>Verifying your identity...</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="font-medium">{selectedSessionData.course}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Processing facial recognition...</p>
              </div>
              <Progress value={80} className="w-full" />
            </CardContent>
          </Card>
        )}

        {checkInStep === "success" && selectedSessionData && (
          <Card>
            <CardHeader>
              <CardTitle>Check-in Successful!</CardTitle>
              <CardDescription>Your attendance has been recorded</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-600">{selectedSessionData.course}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Checked in at {new Date().toLocaleTimeString()}
                </p>
              </div>
              <Button onClick={resetCheckIn} className="w-full">
                Check in to Another Session
              </Button>
            </CardContent>
          </Card>
        )}

        {checkInStep === "error" && selectedSessionData && (
          <Card>
            <CardHeader>
              <CardTitle>Check-in Failed</CardTitle>
              <CardDescription>There was an issue with your check-in</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium text-red-600">Facial recognition failed</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Please ensure good lighting and try again</p>
              </div>
              <div className="flex space-x-2 justify-center">
                <Button variant="outline" onClick={resetCheckIn}>
                  Cancel
                </Button>
                <Button onClick={() => setCheckInStep("camera")}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Check-in Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Check-in Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Be within 50 meters of the classroom</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Camera className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Camera</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ensure good lighting and clear face visibility
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Timing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check in within 15 minutes of class start</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Verification</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Both location and face must be verified</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
