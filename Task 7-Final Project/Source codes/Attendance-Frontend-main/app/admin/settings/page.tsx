"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Camera,
  MapPin,
  Bell,
  Shield,
  Database,
  Upload,
  Save,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function SettingsPage() {
  const [faceRecognitionEnabled, setFaceRecognitionEnabled] = useState(true)
  const [geofencingEnabled, setGeofencingEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@university.edu">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Configure system preferences and security settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="facial">Facial Recognition</TabsTrigger>
            <TabsTrigger value="geofencing">Geofencing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic system configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="systemName">System Name</Label>
                    <Input id="systemName" defaultValue="AttendanceHub" />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Standard Time</SelectItem>
                        <SelectItem value="cst">Central Standard Time</SelectItem>
                        <SelectItem value="mst">Mountain Standard Time</SelectItem>
                        <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Enable daily automatic backups</p>
                  </div>
                  <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Facial Recognition Settings
                </CardTitle>
                <CardDescription>Configure facial recognition parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Facial Recognition</Label>
                    <p className="text-sm text-muted-foreground">Use AI-powered facial recognition for attendance</p>
                  </div>
                  <Switch checked={faceRecognitionEnabled} onCheckedChange={setFaceRecognitionEnabled} />
                </div>

                {faceRecognitionEnabled && (
                  <>
                    <div>
                      <Label htmlFor="confidence">Confidence Threshold (%)</Label>
                      <Input id="confidence" type="number" defaultValue="85" min="50" max="100" />
                      <p className="text-sm text-muted-foreground mt-1">Higher values require more accurate matches</p>
                    </div>

                    <div>
                      <Label htmlFor="maxAttempts">Max Recognition Attempts</Label>
                      <Input id="maxAttempts" type="number" defaultValue="3" min="1" max="10" />
                    </div>

                    <div>
                      <Label>Upload Training Model</Label>
                      <div className="mt-2 flex items-center space-x-2">
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Model
                        </Button>
                        <Badge variant="outline">Current: v2.1.0</Badge>
                      </div>
                    </div>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        Facial recognition is currently active and processing normally.
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geofencing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Geofencing Settings
                </CardTitle>
                <CardDescription>Configure location-based attendance verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Geofencing</Label>
                    <p className="text-sm text-muted-foreground">Verify student location before check-in</p>
                  </div>
                  <Switch checked={geofencingEnabled} onCheckedChange={setGeofencingEnabled} />
                </div>

                {geofencingEnabled && (
                  <>
                    <div>
                      <Label htmlFor="radius">Default Geofence Radius (meters)</Label>
                      <Input id="radius" type="number" defaultValue="50" min="10" max="500" />
                    </div>

                    <div>
                      <Label htmlFor="accuracy">GPS Accuracy Requirement (meters)</Label>
                      <Input id="accuracy" type="number" defaultValue="10" min="1" max="50" />
                    </div>

                    <div>
                      <Label>Classroom Locations</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Room A-101</div>
                            <div className="text-sm text-muted-foreground">40.7128, -74.0060</div>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Room B-205</div>
                            <div className="text-sm text-muted-foreground">40.7130, -74.0058</div>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        Add Location
                      </Button>
                    </div>
                  </>
                )}

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send system notifications to users</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>

                {notificationsEnabled && (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send attendance alerts via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send urgent alerts via SMS</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Send mobile app notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="emailTemplate">Email Template</Label>
                      <Textarea
                        id="emailTemplate"
                        placeholder="Customize your notification email template..."
                        rows={4}
                        defaultValue="Dear {student_name}, you have been marked absent from {course_name} on {date}. Please contact your instructor if this is incorrect."
                      />
                    </div>
                  </>
                )}

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - 6 characters minimum</SelectItem>
                      <SelectItem value="medium">Medium - 8 characters, mixed case</SelectItem>
                      <SelectItem value="high">High - 12 characters, symbols required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Attempt Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Monitor and block suspicious login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label htmlFor="sessionDuration">Max Session Duration (hours)</Label>
                  <Input id="sessionDuration" type="number" defaultValue="8" min="1" max="24" />
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Security settings changes will require all users to re-authenticate.
                  </AlertDescription>
                </Alert>

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Backup and data retention settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="retentionPeriod">Data Retention Period (months)</Label>
                  <Input id="retentionPeriod" type="number" defaultValue="24" min="6" max="120" />
                </div>

                <div>
                  <Label>Last Backup</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">January 15, 2024 at 3:00 AM</span>
                    <Badge variant="outline">Success</Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Create Backup
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Restore Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
