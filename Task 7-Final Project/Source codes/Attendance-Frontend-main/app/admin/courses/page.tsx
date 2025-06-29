"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, BookOpen, Users, Calendar, MapPin } from "lucide-react"

const courses = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    instructorId: 2,
    students: 30,
    schedule: "Mon, Wed, Fri 9:00-10:30 AM",
    location: "Room A-101",
    coordinates: { lat: 40.7128, lng: -74.006 },
    status: "active",
    semester: "Fall 2024",
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    instructor: "Prof. Michael Chen",
    instructorId: 4,
    students: 25,
    schedule: "Tue, Thu 11:00 AM-12:30 PM",
    location: "Room B-205",
    coordinates: { lat: 40.713, lng: -74.0058 },
    status: "active",
    semester: "Fall 2024",
  },
  {
    id: 3,
    code: "PHY301",
    name: "Quantum Physics",
    instructor: "Dr. Emily Davis",
    instructorId: 3,
    students: 20,
    schedule: "Mon, Wed 2:00-3:30 PM",
    location: "Lab C-301",
    coordinates: { lat: 40.7125, lng: -74.0062 },
    status: "inactive",
    semester: "Fall 2024",
  },
]

const instructors = [
  { id: 2, name: "Dr. Sarah Johnson" },
  { id: 3, name: "Dr. Emily Davis" },
  { id: 4, name: "Prof. Michael Chen" },
  { id: 5, name: "Dr. Robert Wilson" },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    instructorId: "",
    schedule: "",
    location: "",
    description: "",
    maxStudents: "",
  })

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Course Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage courses, schedules, and assignments</p>
          </div>
          <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>Add a new course to the system</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="e.g., CS101"
                  />
                </div>
                <div>
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={newCourse.maxStudents}
                    onChange={(e) => setNewCourse({ ...newCourse, maxStudents: e.target.value })}
                    placeholder="30"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="Introduction to Programming"
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">Instructor</Label>
                  <Select
                    value={newCourse.instructorId}
                    onValueChange={(value) => setNewCourse({ ...newCourse, instructorId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      {instructors.map((instructor) => (
                        <SelectItem key={instructor.id} value={instructor.id.toString()}>
                          {instructor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newCourse.location}
                    onChange={(e) => setNewCourse({ ...newCourse, location: e.target.value })}
                    placeholder="Room A-101"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input
                    id="schedule"
                    value={newCourse.schedule}
                    onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                    placeholder="Mon, Wed, Fri 9:00-10:30 AM"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Course description..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddCourseOpen(false)}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.filter((c) => c.status === "active").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Class Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(courses.reduce((sum, course) => sum + course.students, 0) / courses.length)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Courses</CardTitle>
            <CardDescription>Manage all courses in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{course.code}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{course.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-gray-400" />
                          {course.students}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                          {course.schedule}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                          {course.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Students
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
