"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  Archive,
  Users,
  Megaphone,
} from "lucide-react"
import { format } from "date-fns"

const conversations = [
  {
    id: 1,
    participant: "John Smith",
    role: "Student",
    course: "CS101",
    lastMessage: "Thank you for the assignment extension.",
    timestamp: "2024-01-15T14:30:00Z",
    unread: false,
    priority: "normal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    participant: "Emily Davis",
    role: "Student",
    course: "CS201",
    lastMessage: "Could you please clarify the lab requirements?",
    timestamp: "2024-01-15T11:20:00Z",
    unread: true,
    priority: "normal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    participant: "Admin Office",
    role: "Admin",
    course: "System",
    lastMessage: "Please submit your grade reports by Friday.",
    timestamp: "2024-01-14T16:45:00Z",
    unread: true,
    priority: "high",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    participant: "Michael Johnson",
    role: "Student",
    course: "CS101",
    lastMessage: "I missed today's class due to illness.",
    timestamp: "2024-01-14T09:15:00Z",
    unread: false,
    priority: "normal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const students = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@student.edu",
    course: "CS101",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@student.edu",
    course: "CS201",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@student.edu",
    course: "CS101",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@student.edu",
    course: "CS301",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const messageHistory = [
  {
    id: 1,
    sender: "Emily Davis",
    content: "Hi Dr. Johnson, I'm having trouble understanding the linked list implementation from today's lab.",
    timestamp: "2024-01-15T10:00:00Z",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Emily, I'd be happy to help. Which specific part are you struggling with?",
    timestamp: "2024-01-15T10:15:00Z",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Emily Davis",
    content: "Could you please clarify the lab requirements? I'm not sure about the deletion method implementation.",
    timestamp: "2024-01-15T11:20:00Z",
    isOwn: false,
  },
]

const announcements = [
  {
    id: 1,
    title: "CS101 - Assignment Extension",
    content: "Due to technical issues with the lab computers, Assignment 3 deadline has been extended to January 25th.",
    course: "CS101",
    timestamp: "2024-01-15T08:00:00Z",
    recipients: 30,
  },
  {
    id: 2,
    title: "CS201 - Lab Session Change",
    content: "Tomorrow's lab session will be moved to Room C-302 due to maintenance in our regular lab.",
    course: "CS201",
    timestamp: "2024-01-14T16:30:00Z",
    recipients: 25,
  },
  {
    id: 3,
    title: "Office Hours Update",
    content: "My office hours this week will be extended on Thursday from 2-5 PM to accommodate extra help sessions.",
    course: "All",
    timestamp: "2024-01-13T12:00:00Z",
    recipients: 75,
  },
]

export default function InstructorMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(2)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterCourse, setFilterCourse] = useState("all")
  const [newMessage, setNewMessage] = useState("")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("messages")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [broadcastMessage, setBroadcastMessage] = useState({
    title: "",
    content: "",
    course: "all",
    priority: "normal",
  })

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || conv.priority === filterPriority
    const matchesCourse = filterCourse === "all" || conv.course === filterCourse
    return matchesSearch && matchesPriority && matchesCourse
  })

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "normal":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-blue-600" />
    }
  }

  const handleStudentSelect = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  return (
    <AppLayout userRole="instructor" userName="Dr. Sarah Johnson" userEmail="sarah.johnson@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <p className="text-gray-600 dark:text-gray-400">Communicate with students and manage announcements</p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Compose Message</DialogTitle>
                  <DialogDescription>Send a message to a student or admin</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name} ({student.course})
                          </SelectItem>
                        ))}
                        <SelectItem value="admin">Admin Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Message subject" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Type your message here..." rows={4} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsComposeOpen(false)}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isBroadcastOpen} onOpenChange={setIsBroadcastOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Megaphone className="mr-2 h-4 w-4" />
                  Broadcast
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Broadcast Announcement</DialogTitle>
                  <DialogDescription>Send an announcement to multiple students</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="course">Course</Label>
                      <Select
                        value={broadcastMessage.course}
                        onValueChange={(value) => setBroadcastMessage({ ...broadcastMessage, course: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          <SelectItem value="CS101">CS101</SelectItem>
                          <SelectItem value="CS201">CS201</SelectItem>
                          <SelectItem value="CS301">CS301</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={broadcastMessage.priority}
                        onValueChange={(value) => setBroadcastMessage({ ...broadcastMessage, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Announcement title"
                      value={broadcastMessage.title}
                      onChange={(e) => setBroadcastMessage({ ...broadcastMessage, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Announcement content..."
                      rows={4}
                      value={broadcastMessage.content}
                      onChange={(e) => setBroadcastMessage({ ...broadcastMessage, content: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Select Recipients</Label>
                    <div className="max-h-32 overflow-y-auto border rounded-md p-2 space-y-2">
                      {students
                        .filter(
                          (student) => broadcastMessage.course === "all" || student.course === broadcastMessage.course,
                        )
                        .map((student) => (
                          <div key={student.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`student-${student.id}`}
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() => handleStudentSelect(student.id)}
                            />
                            <Label htmlFor={`student-${student.id}`} className="text-sm">
                              {student.name} ({student.course})
                            </Label>
                          </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{selectedStudents.length} students selected</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsBroadcastOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsBroadcastOpen(false)}>
                    <Megaphone className="mr-2 h-4 w-4" />
                    Send Announcement
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Conversations</span>
                    <Badge variant="outline">{conversations.filter((c) => c.unread).length} unread</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search messages..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Select value={filterCourse} onValueChange={setFilterCourse}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          <SelectItem value="CS101">CS101</SelectItem>
                          <SelectItem value="CS201">CS201</SelectItem>
                          <SelectItem value="CS301">CS301</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={filterPriority} onValueChange={setFilterPriority}>
                        <SelectTrigger className="w-24">
                          <Filter className="h-4 w-4" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      {filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedConversation === conversation.id
                              ? "bg-primary/10 border-primary"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {conversation.participant
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm truncate">{conversation.participant}</h4>
                                <div className="flex items-center space-x-1">
                                  {getPriorityIcon(conversation.priority)}
                                  {conversation.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {conversation.course}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {conversation.role}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                                {conversation.lastMessage}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {format(new Date(conversation.timestamp), "MMM d, h:mm a")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Thread */}
              <div className="lg:col-span-2">
                {selectedConv ? (
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {selectedConv.participant
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{selectedConv.participant}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {selectedConv.course}
                              </Badge>
                              <Badge className={getPriorityColor(selectedConv.priority)} size="sm">
                                {selectedConv.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-4">
                        {messageHistory.map((message) => (
                          <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.isOwn ? "bg-primary text-primary-foreground" : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.isOwn ? "text-primary-foreground/70" : "text-gray-500"
                                }`}
                              >
                                {format(new Date(message.timestamp), "MMM d, h:mm a")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your reply..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              // Handle send message
                              setNewMessage("")
                            }
                          }}
                        />
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select a conversation</h3>
                      <p className="text-gray-600 dark:text-gray-400">Choose a conversation to start messaging</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Announcements</CardTitle>
                <CardDescription>Announcements you've sent to your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{announcement.title}</h3>
                            <Badge variant="outline" size="sm">
                              {announcement.course}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{announcement.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Users className="mr-1 h-3 w-3" />
                              {announcement.recipients} recipients
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {format(new Date(announcement.timestamp), "MMM d, h:mm a")}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Archive className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
