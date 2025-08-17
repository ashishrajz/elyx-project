"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import ProfileCard from "@/components/ProfileCard";
import TestReports from "@/components/TestReports";
import KeyDecisions from "@/components/KeyDecisions";
import WearableData from "@/components/WearableData";
import PlanViewer from "@/components/PlanViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/members/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card stays visible at top */}
      <ProfileCard profile={profile} />

      {/* Tabs for detailed sections */}
      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="flex space-x-4 border-b pb-2">
          <TabsTrigger value="tests">Test Reports</TabsTrigger>
          <TabsTrigger value="decisions">Key Decisions</TabsTrigger>
          <TabsTrigger value="wearables">Wearable Data</TabsTrigger>
          <TabsTrigger value="plan">Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="mt-4">
          <TestReports userId={userId} />
        </TabsContent>
        <TabsContent value="decisions" className="mt-4">
          <KeyDecisions userId={userId} />
        </TabsContent>
        <TabsContent value="wearables" className="mt-4">
          <WearableData userId={userId} />
        </TabsContent>
        <TabsContent value="plan" className="mt-4">
          <PlanViewer userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
