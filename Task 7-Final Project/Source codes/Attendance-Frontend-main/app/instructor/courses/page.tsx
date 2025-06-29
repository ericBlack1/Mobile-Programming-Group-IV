"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Calendar, MapPin, Plus, Settings, MessageSquare, BarChart3 } from "lucide-react"

const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    students: 30,
    enrolled: 30,
    avgAttendance: 93,
    nextSession: "Today 9:00 AM",
    location: "Room A-101",
    semester: "Fall 2024",
    description: "Fundamentals of programming using Python",
  },
  {
    id: 2,
    code: "CS201",
    name: "Data Structures",
    students: 25,
    enrolled: 25,
    avgAttendance: 89,
    nextSession: "Today 2:00 PM",
    location: "Lab B-205",
    semester: "Fall 2024",
    description: "Advanced data structures and algorithms",
  },
  {
    id: 3,
    code: "CS301",
    name: "Algorithms",
    students: 20,
    enrolled: 22,
    avgAttendance: 91,
    nextSession: "Tomorrow 10:00 AM",
    location: "Room C-301",
    semester: "Fall 2024",
    description: "Algorithm design and analysis",
  },
]

const recentStudents = [
  { name: "John Smith", email: "john@student.edu", attendance: 95 },
  { name: "Emily Davis", email: "emily@student.edu", attendance: 88 },
  { name: "Michael Johnson", email: "michael@student.edu", attendance: 92 },
  { name: "Sarah Wilson", email: "sarah@student.edu", attendance: 87 },
]

export default function InstructorCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)

  const selectedCourseData = courses.find((c) => c.id === selectedCourse)

  return (
    <AppLayout userRole="instructor" userName="Dr. Sarah Johnson" userEmail="sarah.johnson@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Courses</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your courses and students</p>
          </div>
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
                <DialogDescription>Create a new class session</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Select course...</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Room A-101" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Session notes..." rows={3} />
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

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{course.code}</Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.students} students</span>
                </div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Avg. Attendance</span>
                      <span className="font-medium">{course.avgAttendance}%</span>
                    </div>
                    <Progress value={course.avgAttendance} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {course.nextSession}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {course.location}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" onClick={() => setSelectedCourse(course.id)}>
                      <Users className="mr-1 h-4 w-4" />
                      View Students
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Details Modal */}
        <Dialog open={selectedCourse !== null} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {selectedCourseData?.code} - {selectedCourseData?.name}
              </DialogTitle>
              <DialogDescription>Course details and student management</DialogDescription>
            </DialogHeader>

            {selectedCourseData && (
              <div className="space-y-6">
                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCourseData.students}</div>
                      <p className="text-sm text-muted-foreground">Enrolled Students</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">{selectedCourseData.avgAttendance}%</div>
                      <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-sm text-muted-foreground">Sessions Held</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Students List */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Students</h3>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Message All
                      </Button>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="mr-1 h-4 w-4" />
                        View Reports
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {recentStudents.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{student.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{student.attendance}%</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Attendance</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common course management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Make-up Session
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Course Announcement
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Attendance Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Export Student List
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest course updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">CS101 session completed</p>
                    <p className="text-xs text-gray-500">28/30 students attended</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">New student enrolled in CS201</p>
                    <p className="text-xs text-gray-500">Sarah Wilson joined</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">CS301 session scheduled</p>
                    <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
