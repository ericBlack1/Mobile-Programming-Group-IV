"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, MapPin, User, CalendarIcon, Plus, Bell } from "lucide-react"
import { format } from "date-fns"

const weeklySchedule = [
  {
    id: 1,
    day: "Monday",
    sessions: [
      {
        course: "CS101",
        name: "Introduction to Programming",
        instructor: "Dr. Sarah Johnson",
        time: "09:00 AM - 10:30 AM",
        location: "Room A-101",
        type: "lecture",
      },
      {
        course: "MATH201",
        name: "Calculus II",
        instructor: "Prof. Michael Chen",
        time: "02:00 PM - 03:30 PM",
        location: "Room B-205",
        type: "lecture",
      },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    sessions: [
      {
        course: "PHY301",
        name: "Quantum Physics",
        instructor: "Dr. Emily Davis",
        time: "10:00 AM - 11:30 AM",
        location: "Lab C-301",
        type: "lab",
      },
      {
        course: "ENG101",
        name: "Technical Writing",
        instructor: "Prof. Lisa Brown",
        time: "01:00 PM - 02:30 PM",
        location: "Room D-102",
        type: "seminar",
      },
    ],
  },
  {
    id: 3,
    day: "Wednesday",
    sessions: [
      {
        course: "CS101",
        name: "Introduction to Programming",
        instructor: "Dr. Sarah Johnson",
        time: "09:00 AM - 10:30 AM",
        location: "Room A-101",
        type: "lecture",
      },
      {
        course: "STAT201",
        name: "Statistics",
        instructor: "Dr. Robert Wilson",
        time: "11:00 AM - 12:30 PM",
        location: "Room E-203",
        type: "lecture",
      },
    ],
  },
  {
    id: 4,
    day: "Thursday",
    sessions: [
      {
        course: "PHY301",
        name: "Quantum Physics",
        instructor: "Dr. Emily Davis",
        time: "10:00 AM - 11:30 AM",
        location: "Lab C-301",
        type: "lab",
      },
      {
        course: "MATH201",
        name: "Calculus II",
        instructor: "Prof. Michael Chen",
        time: "02:00 PM - 03:30 PM",
        location: "Room B-205",
        type: "tutorial",
      },
    ],
  },
  {
    id: 5,
    day: "Friday",
    sessions: [
      {
        course: "CS101",
        name: "Introduction to Programming",
        instructor: "Dr. Sarah Johnson",
        time: "09:00 AM - 10:30 AM",
        location: "Room A-101",
        type: "lecture",
      },
      {
        course: "ENG101",
        name: "Technical Writing",
        instructor: "Prof. Lisa Brown",
        time: "03:00 PM - 04:30 PM",
        location: "Room D-102",
        type: "workshop",
      },
    ],
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "CS101 Midterm Exam",
    date: "2024-02-15",
    time: "09:00 AM - 11:00 AM",
    location: "Exam Hall A",
    type: "exam",
  },
  {
    id: 2,
    title: "MATH201 Assignment Due",
    date: "2024-02-12",
    time: "11:59 PM",
    location: "Online Submission",
    type: "assignment",
  },
  {
    id: 3,
    title: "PHY301 Lab Report Due",
    date: "2024-02-10",
    time: "05:00 PM",
    location: "Lab C-301",
    type: "assignment",
  },
]

export default function StudentSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"week" | "calendar">("week")

  const today = new Date()
  const todaySchedule = weeklySchedule.find((day) => day.day === format(today, "EEEE"))

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "lab":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "tutorial":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "seminar":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "workshop":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "assignment":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <AppLayout userRole="student" userName="John Smith" userEmail="john.smith@student.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
            <p className="text-gray-600 dark:text-gray-400">View your class schedule and upcoming events</p>
          </div>
          <div className="flex space-x-2">
            <Button variant={viewMode === "week" ? "default" : "outline"} onClick={() => setViewMode("week")} size="sm">
              Week View
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() => setViewMode("calendar")}
              size="sm"
            >
              Calendar View
            </Button>
          </div>
        </div>

        {/* Today's Classes Alert */}
        {todaySchedule && todaySchedule.sessions.length > 0 && (
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>
              You have {todaySchedule.sessions.length} classes today. Next class:{" "}
              <strong>{todaySchedule.sessions[0].course}</strong> at{" "}
              <strong>{todaySchedule.sessions[0].time.split(" - ")[0]}</strong>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Schedule View */}
          <div className="lg:col-span-2 space-y-6">
            {viewMode === "week" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your classes for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {weeklySchedule.map((day) => (
                      <div key={day.id}>
                        <div className="flex items-center space-x-2 mb-3">
                          <h3 className="font-semibold text-lg">{day.day}</h3>
                          {day.day === format(today, "EEEE") && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Today</Badge>
                          )}
                        </div>
                        {day.sessions.length > 0 ? (
                          <div className="space-y-3">
                            {day.sessions.map((session, index) => (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-2 sm:gap-0"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                                    <Badge variant="outline">{session.course}</Badge>
                                    <Badge className={getSessionTypeColor(session.type)}>{session.type}</Badge>
                                  </div>
                                  <h4 className="font-medium text-gray-900 dark:text-white truncate">{session.name}</h4>
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="flex items-center min-w-0">
                                      <Clock className="mr-1 h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">{session.time}</span>
                                    </span>
                                    <span className="flex items-center min-w-0">
                                      <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">{session.location}</span>
                                    </span>
                                    <span className="flex items-center min-w-0">
                                      <User className="mr-1 h-3 w-3 flex-shrink-0" />
                                      <span className="truncate">{session.instructor}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CalendarIcon className="mx-auto h-8 w-8 mb-2" />
                            <p>No classes scheduled</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>Select a date to view your schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      className="rounded-md border"
                    />
                  </div>
                  {selectedDate && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Schedule for {format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
                      {/* Show schedule for selected date */}
                      <div className="text-center py-4 text-gray-500">
                        <CalendarIcon className="mx-auto h-8 w-8 mb-2" />
                        <p>Calendar integration coming soon</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
                <CardDescription>{format(today, "EEEE, MMMM d")}</CardDescription>
              </CardHeader>
              <CardContent>
                {todaySchedule && todaySchedule.sessions.length > 0 ? (
                  <div className="space-y-3">
                    {todaySchedule.sessions.map((session, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{session.course}</Badge>
                          <Badge className={getSessionTypeColor(session.type)}>{session.type}</Badge>
                        </div>
                        <h4 className="font-medium text-sm">{session.name}</h4>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {session.time}
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="mr-1 h-3 w-3" />
                            {session.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <CalendarIcon className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">No classes today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Exams, assignments, and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="mr-1 h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Personal Event
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Export Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
