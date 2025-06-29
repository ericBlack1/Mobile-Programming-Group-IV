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
import { MessageSquare, Send, Search, Filter, Plus, Clock, CheckCircle, AlertCircle, User, Archive } from "lucide-react"
import { format } from "date-fns"

const conversations = [
  {
    id: 1,
    participant: "Dr. Sarah Johnson",
    role: "Instructor",
    course: "CS101",
    lastMessage: "Please submit your assignment by Friday.",
    timestamp: "2024-01-15T10:30:00Z",
    unread: true,
    priority: "normal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    participant: "Prof. Michael Chen",
    role: "Instructor",
    course: "MATH201",
    lastMessage: "Great work on the midterm exam!",
    timestamp: "2024-01-14T15:45:00Z",
    unread: false,
    priority: "normal",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    participant: "Admin Office",
    role: "Admin",
    course: "System",
    lastMessage: "Your attendance record has been updated.",
    timestamp: "2024-01-14T09:15:00Z",
    unread: true,
    priority: "high",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    participant: "Dr. Emily Davis",
    role: "Instructor",
    course: "PHY301",
    lastMessage: "Lab session moved to Room C-302.",
    timestamp: "2024-01-13T14:20:00Z",
    unread: false,
    priority: "urgent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const announcements = [
  {
    id: 1,
    title: "Campus Closure Notice",
    content: "The campus will be closed on January 20th due to maintenance work.",
    sender: "Admin Office",
    timestamp: "2024-01-15T08:00:00Z",
    priority: "urgent",
    course: "All",
  },
  {
    id: 2,
    title: "CS101 - Assignment Extension",
    content: "The deadline for Assignment 3 has been extended to January 25th.",
    sender: "Dr. Sarah Johnson",
    timestamp: "2024-01-14T16:30:00Z",
    priority: "normal",
    course: "CS101",
  },
  {
    id: 3,
    title: "Library Hours Update",
    content: "Library will have extended hours during exam week.",
    sender: "Library Services",
    timestamp: "2024-01-13T12:00:00Z",
    priority: "normal",
    course: "All",
  },
]

const messageHistory = [
  {
    id: 1,
    sender: "Dr. Sarah Johnson",
    content: "Hi John, I noticed you missed the last class. Please catch up on the material we covered.",
    timestamp: "2024-01-14T10:00:00Z",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Thank you for letting me know. I was sick that day. Could you please share the notes?",
    timestamp: "2024-01-14T10:15:00Z",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Dr. Sarah Johnson",
    content: "Of course! I've uploaded the notes to the course portal. Also, please submit your assignment by Friday.",
    timestamp: "2024-01-15T10:30:00Z",
    isOwn: false,
  },
]

export default function StudentMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [newMessage, setNewMessage] = useState("")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("messages")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || conv.priority === filterPriority
    return matchesSearch && matchesPriority
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

  return (
    <AppLayout userRole="student" userName="John Smith" userEmail="john.smith@student.edu">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
            <p className="text-gray-600 dark:text-gray-400">Communicate with instructors and view announcements</p>
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compose Message</DialogTitle>
                <DialogDescription>Send a message to an instructor or admin</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Dr. Sarah Johnson (CS101)</SelectItem>
                      <SelectItem value="michael">Prof. Michael Chen (MATH201)</SelectItem>
                      <SelectItem value="emily">Dr. Emily Davis (PHY301)</SelectItem>
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
                          placeholder="Type your message..."
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
                <CardTitle>Course Announcements</CardTitle>
                <CardDescription>Important updates from your instructors and administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{announcement.title}</h3>
                            <Badge className={getPriorityColor(announcement.priority)} size="sm">
                              {announcement.priority}
                            </Badge>
                            <Badge variant="outline" size="sm">
                              {announcement.course}
                            </Badge>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{announcement.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {announcement.sender}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {format(new Date(announcement.timestamp), "MMM d, h:mm a")}
                            </span>
                          </div>
                        </div>
                        {getPriorityIcon(announcement.priority)}
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
