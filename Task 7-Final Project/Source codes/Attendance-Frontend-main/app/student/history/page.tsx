"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertTriangle, CalendarIcon, Filter, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const attendanceHistory = [
  {
    id: 1,
    date: "2024-01-15",
    course: "CS101",
    courseName: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    status: "present",
    checkInTime: "08:55 AM",
    location: "Room A-101",
  },
  {
    id: 2,
    date: "2024-01-15",
    course: "MATH201",
    courseName: "Calculus II",
    instructor: "Prof. Michael Chen",
    status: "present",
    checkInTime: "10:58 AM",
    location: "Room B-205",
  },
  {
    id: 3,
    date: "2024-01-14",
    course: "PHY301",
    courseName: "Quantum Physics",
    instructor: "Dr. Emily Davis",
    status: "absent",
    checkInTime: "-",
    location: "Lab C-301",
  },
  {
    id: 4,
    date: "2024-01-14",
    course: "CS101",
    courseName: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    status: "present",
    checkInTime: "09:02 AM",
    location: "Room A-101",
  },
  {
    id: 5,
    date: "2024-01-13",
    course: "MATH201",
    courseName: "Calculus II",
    instructor: "Prof. Michael Chen",
    status: "flagged",
    checkInTime: "11:15 AM",
    location: "Room B-205",
  },
]

const courseStats = [
  { course: "CS101", name: "Introduction to Programming", present: 18, total: 20, rate: 90 },
  { course: "MATH201", name: "Calculus II", present: 16, total: 18, rate: 89 },
  { course: "PHY301", name: "Quantum Physics", present: 14, total: 16, rate: 88 },
  { course: "ENG101", name: "Technical Writing", present: 12, total: 12, rate: 100 },
  { course: "STAT201", name: "Statistics", present: 13, total: 15, rate: 87 },
]

export default function StudentHistoryPage() {
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const filteredHistory = attendanceHistory.filter((record) => {
    const matchesCourse = courseFilter === "all" || record.course === courseFilter
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    return matchesCourse && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "flagged":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Flagged</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const overallAttendance = Math.round(
    (attendanceHistory.filter((r) => r.status === "present").length / attendanceHistory.length) * 100,
  )

  return (
    <AppLayout userRole="student" userName="John Smith" userEmail="john.smith@student.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance History</h1>
            <p className="text-gray-600 dark:text-gray-400">View your complete attendance record</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export History
          </Button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAttendance}%</div>
              <Progress value={overallAttendance} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceHistory.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {attendanceHistory.filter((r) => r.status === "present").length}
              </div>
              <p className="text-xs text-muted-foreground">Sessions attended</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Missed</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {attendanceHistory.filter((r) => r.status === "absent").length}
              </div>
              <p className="text-xs text-muted-foreground">Sessions missed</p>
            </CardContent>
          </Card>
        </div>

        {/* Course-wise Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your attendance rate for each course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseStats.map((course, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{course.course}</h4>
                      <span className="text-sm font-medium">{course.rate}%</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.name}</p>
                    <Progress value={course.rate} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      {course.present}/{course.total} sessions attended
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and History */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Detailed history of your attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="CS101">CS101</SelectItem>
                    <SelectItem value="MATH201">MATH201</SelectItem>
                    <SelectItem value="PHY301">PHY301</SelectItem>
                    <SelectItem value="ENG101">ENG101</SelectItem>
                    <SelectItem value="STAT201">STAT201</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 min-w-[320px] rounded-lg shadow-lg border bg-white dark:bg-gray-900 flex justify-center">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className="mx-auto my-2" />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 min-w-[320px] rounded-lg shadow-lg border bg-white dark:bg-gray-900 flex justify-center">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="mx-auto my-2" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-3">
              {filteredHistory.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <div className="font-medium">
                        {record.course} - {record.courseName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {record.instructor} • {record.location}
                      </div>
                      <div className="text-sm text-gray-500">{record.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(record.status)}
                    {record.checkInTime !== "-" && (
                      <div className="text-xs text-gray-500 mt-1">{record.checkInTime}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No records found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
