"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ProfileHeader from "./components/profile-header"
import StatsCards from "./components/stats-cards"
import ResumeList from "./components/resume-list"
import ActivityFeed from "./components/activity-feed"
import AccountSettings from "./components/account-settings"

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader />

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <Card className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl rounded-2xl overflow-hidden">
            <TabsContent value="overview" className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
              <StatsCards />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Resumes</h3>
                  <ResumeList limit={3} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <ActivityFeed limit={5} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resumes" className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Resumes</h2>
              <ResumeList />
            </TabsContent>

            <TabsContent value="activity" className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity History</h2>
              <ActivityFeed />
            </TabsContent>

            <TabsContent value="settings" className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
              <AccountSettings />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  )
}

