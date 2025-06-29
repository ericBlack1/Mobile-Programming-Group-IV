"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, GraduationCap, CheckCircle, AlertTriangle, TrendingUp, Calendar, Clock, MapPin } from "lucide-react"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const attendanceData = [
  { day: "Mon", present: 85, absent: 15 },
  { day: "Tue", present: 92, absent: 8 },
  { day: "Wed", present: 78, absent: 22 },
  { day: "Thu", present: 88, absent: 12 },
  { day: "Fri", present: 95, absent: 5 },
]

const courseData = [
  { name: "Computer Science", value: 45, color: "#2F80ED" },
  { name: "Mathematics", value: 30, color: "#56CCF2" },
  { name: "Physics", value: 25, color: "#27AE60" },
]

const recentActivities = [
  {
    id: 1,
    type: "attendance",
    message: "John Smith marked present in CS101",
    time: "2 minutes ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "alert",
    message: "Facial recognition failed for 3 students",
    time: "5 minutes ago",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
  {
    id: 3,
    type: "course",
    message: "New course 'Data Structures' created",
    time: "1 hour ago",
    icon: GraduationCap,
    color: "text-blue-600",
  },
]

export default function AdminDashboard() {
  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Instructors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <Progress value={92} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="destructive" className="text-xs">
                  3 Critical
                </Badge>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
              <CardDescription>Daily attendance rates for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#2F80ED" name="Present" />
                  <Bar dataKey="absent" fill="#EB5757" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
              <CardDescription>Student enrollment by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={courseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {courseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add New User
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <GraduationCap className="mr-2 h-4 w-4" />
                Create Course
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Sessions</CardTitle>
            <CardDescription>Scheduled classes and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  course: "CS101 - Introduction to Programming",
                  instructor: "Dr. Sarah Johnson",
                  time: "09:00 AM - 10:30 AM",
                  location: "Room A-101",
                  status: "In Progress",
                  attendance: "28/30",
                },
                {
                  course: "MATH201 - Calculus II",
                  instructor: "Prof. Michael Chen",
                  time: "11:00 AM - 12:30 PM",
                  location: "Room B-205",
                  status: "Upcoming",
                  attendance: "0/25",
                },
                {
                  course: "PHY301 - Quantum Physics",
                  instructor: "Dr. Emily Davis",
                  time: "02:00 PM - 03:30 PM",
                  location: "Lab C-301",
                  status: "Scheduled",
                  attendance: "0/20",
                },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{session.course}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.instructor}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {session.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {session.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        session.status === "In Progress"
                          ? "default"
                          : session.status === "Upcoming"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {session.status}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{session.attendance}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
