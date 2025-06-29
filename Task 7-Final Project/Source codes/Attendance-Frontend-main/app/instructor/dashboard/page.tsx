"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, CheckCircle, Clock, Calendar, MapPin, Play, MessageSquare, TrendingUp } from "lucide-react"

const todaysSessions = [
  {
    id: 1,
    course: "CS101 - Introduction to Programming",
    time: "09:00 AM - 10:30 AM",
    location: "Room A-101",
    enrolled: 30,
    present: 0,
    status: "upcoming",
  },
  {
    id: 2,
    course: "CS201 - Data Structures",
    time: "02:00 PM - 03:30 PM",
    location: "Lab B-205",
    enrolled: 25,
    present: 0,
    status: "scheduled",
  },
]

const recentAttendance = [
  {
    course: "CS101",
    date: "Today",
    present: 28,
    total: 30,
    rate: 93,
  },
  {
    course: "CS201",
    date: "Yesterday",
    present: 23,
    total: 25,
    rate: 92,
  },
  {
    course: "CS301",
    date: "2 days ago",
    present: 18,
    total: 20,
    rate: 90,
  },
]

export default function InstructorDashboard() {
  return (
    <AppLayout userRole="instructor" userName="Dr. Sarah Johnson" userEmail="sarah.johnson@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Instructor Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Good morning! Ready to start today's classes?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Active this semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <Progress value={91} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  Next in 30 min
                </Badge>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Sessions</CardTitle>
            <CardDescription>Your scheduled classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{session.course}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {session.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {session.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {session.enrolled} students
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={session.status === "upcoming" ? "default" : "secondary"}>
                      {session.status === "upcoming" ? "Starting Soon" : "Scheduled"}
                    </Badge>
                    <Button size="sm" className="ml-2">
                      <Play className="mr-1 h-4 w-4" />
                      Start Session
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Attendance rates for your recent classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{record.course}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{record.rate}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {record.present}/{record.total} present
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Students
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Course Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>Your courses and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  code: "CS101",
                  name: "Introduction to Programming",
                  students: 30,
                  avgAttendance: 93,
                  nextSession: "Today 9:00 AM",
                },
                {
                  code: "CS201",
                  name: "Data Structures",
                  students: 25,
                  avgAttendance: 89,
                  nextSession: "Today 2:00 PM",
                },
                {
                  code: "CS301",
                  name: "Algorithms",
                  students: 20,
                  avgAttendance: 91,
                  nextSession: "Tomorrow 10:00 AM",
                },
              ].map((course, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{course.code}</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{course.students} students</span>
                    </div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Avg. Attendance</span>
                        <span className="font-medium">{course.avgAttendance}%</span>
                      </div>
                      <Progress value={course.avgAttendance} className="h-2" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Next: {course.nextSession}</p>
                    </div>
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
