"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, MapPin, AlertTriangle, BookOpen, TrendingUp, Camera } from "lucide-react"

const upcomingSessions = [
  {
    id: 1,
    course: "CS101 - Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    time: "09:00 AM - 10:30 AM",
    location: "Room A-101",
    status: "upcoming",
    canCheckIn: true,
  },
  {
    id: 2,
    course: "MATH201 - Calculus II",
    instructor: "Prof. Michael Chen",
    time: "11:00 AM - 12:30 PM",
    location: "Room B-205",
    status: "scheduled",
    canCheckIn: false,
  },
  {
    id: 3,
    course: "PHY301 - Quantum Physics",
    instructor: "Dr. Emily Davis",
    time: "02:00 PM - 03:30 PM",
    location: "Lab C-301",
    status: "scheduled",
    canCheckIn: false,
  },
]

const attendanceHistory = [
  { course: "CS101", date: "Today", status: "present", time: "08:55 AM" },
  { course: "MATH201", date: "Yesterday", status: "present", time: "10:58 AM" },
  { course: "PHY301", date: "Yesterday", status: "absent", time: "-" },
  { course: "CS101", date: "2 days ago", status: "present", time: "09:02 AM" },
]

export default function StudentDashboard() {
  return (
    <AppLayout userRole="student" userName="John Smith" userEmail="john.smith@student.edu">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, John! Here's your schedule for today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <Progress value={92} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  Next in 30 min
                </Badge>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missed Classes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have an upcoming class in 30 minutes. Don't forget to check in when you arrive!
          </AlertDescription>
        </Alert>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
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
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 mt-2 sm:mt-0 min-w-[120px]">
                    <Badge variant={session.status === "upcoming" ? "default" : "secondary"} className="w-fit self-start sm:self-auto">
                      {session.status === "upcoming" ? "Starting Soon" : "Scheduled"}
                    </Badge>
                    {session.canCheckIn && (
                      <Button size="sm" className="flex items-center justify-center">
                        <Camera className="mr-1 h-4 w-4" />
                        Check In
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Check-in & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Check-in</CardTitle>
              <CardDescription>Check in to your current class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium">CS101 - Programming</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Room A-101</p>
              </div>
              <Button className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Start Check-in
              </Button>
              <div className="text-xs text-center text-gray-500">
                Make sure you're in the classroom and have good lighting
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Your attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          record.status === "present" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{record.course}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{record.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={record.status === "present" ? "default" : "destructive"}>
                        {record.status === "present" ? "Present" : "Absent"}
                      </Badge>
                      {record.time !== "-" && <p className="text-xs text-gray-500 mt-1">{record.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your attendance rate for each course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { code: "CS101", name: "Introduction to Programming", attendance: 95, sessions: 20 },
                { code: "MATH201", name: "Calculus II", attendance: 88, sessions: 18 },
                { code: "PHY301", name: "Quantum Physics", attendance: 92, sessions: 16 },
                { code: "ENG101", name: "Technical Writing", attendance: 100, sessions: 12 },
                { code: "STAT201", name: "Statistics", attendance: 85, sessions: 15 },
              ].map((course, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{course.code}</Badge>
                      <span className="text-sm font-medium">{course.attendance}%</span>
                    </div>
                    <CardTitle className="text-base">{course.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={course.attendance} className="h-2" />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      {Math.round((course.attendance / 100) * course.sessions)}/{course.sessions} sessions attended
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
