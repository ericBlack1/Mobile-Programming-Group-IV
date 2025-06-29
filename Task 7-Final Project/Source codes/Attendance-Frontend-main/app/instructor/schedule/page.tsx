"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Users, Plus, Edit, Trash2, CalendarIcon, AlertTriangle } from "lucide-react"
import { format } from "date-fns"

const weeklySchedule = [
  {
    id: 1,
    day: "Monday",
    sessions: [
      {
        id: 1,
        course: "CS101",
        name: "Introduction to Programming",
        time: "09:00 AM - 10:30 AM",
        location: "Room A-101",
        students: 30,
        type: "lecture",
        status: "scheduled",
      },
      {
        id: 2,
        course: "CS201",
        name: "Data Structures",
        time: "02:00 PM - 03:30 PM",
        location: "Lab B-205",
        students: 25,
        type: "lab",
        status: "scheduled",
      },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    sessions: [
      {
        id: 3,
        course: "CS301",
        name: "Algorithms",
        time: "10:00 AM - 11:30 AM",
        location: "Room C-301",
        students: 20,
        type: "lecture",
        status: "scheduled",
      },
    ],
  },
  {
    id: 3,
    day: "Wednesday",
    sessions: [
      {
        id: 4,
        course: "CS101",
        name: "Introduction to Programming",
        time: "09:00 AM - 10:30 AM",
        location: "Room A-101",
        students: 30,
        type: "lecture",
        status: "scheduled",
      },
      {
        id: 5,
        course: "CS201",
        name: "Data Structures - Tutorial",
        time: "11:00 AM - 12:30 PM",
        location: "Lab B-205",
        students: 25,
        type: "tutorial",
        status: "scheduled",
      },
    ],
  },
  {
    id: 4,
    day: "Thursday",
    sessions: [
      {
        id: 6,
        course: "CS301",
        name: "Algorithms",
        time: "10:00 AM - 11:30 AM",
        location: "Room C-301",
        students: 20,
        type: "lecture",
        status: "cancelled",
      },
    ],
  },
  {
    id: 5,
    day: "Friday",
    sessions: [
      {
        id: 7,
        course: "CS101",
        name: "Introduction to Programming",
        time: "09:00 AM - 10:30 AM",
        location: "Room A-101",
        students: 30,
        type: "lecture",
        status: "scheduled",
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
    course: "CS101",
  },
  {
    id: 2,
    title: "Faculty Meeting",
    date: "2024-02-12",
    time: "02:00 PM - 03:30 PM",
    location: "Conference Room",
    type: "meeting",
    course: "Admin",
  },
  {
    id: 3,
    title: "CS201 Project Presentations",
    date: "2024-02-18",
    time: "10:00 AM - 12:00 PM",
    location: "Lab B-205",
    type: "presentation",
    course: "CS201",
  },
]

export default function InstructorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"week" | "calendar">("week")
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [newSession, setNewSession] = useState({
    course: "",
    type: "lecture",
    date: "",
    time: "",
    location: "",
    notes: "",
  })

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
      case "exam":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "completed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    }
  }

  const handleEditSession = (session: any) => {
    setSelectedSession(session)
    setIsEditOpen(true)
  }

  return (
    <AppLayout userRole="instructor" userName="Dr. Sarah Johnson" userEmail="sarah.johnson@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your teaching schedule and sessions</p>
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
            <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Session</DialogTitle>
                  <DialogDescription>Create a new class session or event</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select
                      value={newSession.course}
                      onValueChange={(value) => setNewSession({ ...newSession, course: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS101">CS101 - Introduction to Programming</SelectItem>
                        <SelectItem value="CS201">CS201 - Data Structures</SelectItem>
                        <SelectItem value="CS301">CS301 - Algorithms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Session Type</Label>
                    <Select
                      value={newSession.type}
                      onValueChange={(value) => setNewSession({ ...newSession, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lecture">Lecture</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newSession.date}
                        onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        placeholder="09:00 AM - 10:30 AM"
                        value={newSession.time}
                        onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Room A-101"
                      value={newSession.location}
                      onChange={(e) => setNewSession({ ...newSession, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Session notes or special instructions..."
                      rows={3}
                      value={newSession.notes}
                      onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsScheduleOpen(false)}>Schedule Session</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Today's Sessions Alert */}
        {todaySchedule && todaySchedule.sessions.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Today's Schedule</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You have {todaySchedule.sessions.length} sessions today. Next:{" "}
                  <strong>{todaySchedule.sessions[0].course}</strong> at{" "}
                  <strong>{todaySchedule.sessions[0].time.split(" - ")[0]}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Schedule View */}
          <div className="lg:col-span-2 space-y-6">
            {viewMode === "week" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Your teaching schedule for this week</CardDescription>
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
                            {day.sessions.map((session) => (
                              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Badge variant="outline">{session.course}</Badge>
                                    <Badge className={getSessionTypeColor(session.type)}>{session.type}</Badge>
                                    <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                                    {session.status === "cancelled" && (
                                      <AlertTriangle className="h-4 w-4 text-red-600" />
                                    )}
                                  </div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">{session.name}</h4>
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
                                      {session.students} students
                                    </span>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline" onClick={() => handleEditSession(session)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CalendarIcon className="mx-auto h-8 w-8 mb-2" />
                            <p>No sessions scheduled</p>
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
                  <CardDescription>Select a date to view or schedule sessions</CardDescription>
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
            {/* Today's Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Sessions</CardTitle>
                <CardDescription>{format(today, "EEEE, MMMM d")}</CardDescription>
              </CardHeader>
              <CardContent>
                {todaySchedule && todaySchedule.sessions.length > 0 ? (
                  <div className="space-y-3">
                    {todaySchedule.sessions.map((session) => (
                      <div key={session.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{session.course}</Badge>
                          <Badge className={getSessionTypeColor(session.type)} size="sm">
                            {session.type}
                          </Badge>
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
                          <div className="flex items-center mt-1">
                            <Users className="mr-1 h-3 w-3" />
                            {session.students} students
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <CalendarIcon className="mx-auto h-8 w-8 mb-2" />
                    <p className="text-sm">No sessions today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Exams, meetings, and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getSessionTypeColor(event.type)} size="sm">
                          {event.type}
                        </Badge>
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

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Teaching Hours</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Students</span>
                  <span className="font-medium">75</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cancelled</span>
                  <span className="font-medium text-red-600">1</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Session Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Session</DialogTitle>
              <DialogDescription>Modify session details</DialogDescription>
            </DialogHeader>
            {selectedSession && (
              <div className="space-y-4">
                <div>
                  <Label>Course</Label>
                  <Input defaultValue={selectedSession.course} disabled />
                </div>
                <div>
                  <Label>Session Name</Label>
                  <Input defaultValue={selectedSession.name} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Time</Label>
                    <Input defaultValue={selectedSession.time} />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input defaultValue={selectedSession.location} />
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select defaultValue={selectedSession.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea placeholder="Session notes..." rows={3} />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
