"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import UserList from "@/components/UserList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [role, setRole] = useState<"team" | "member" | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await axiosInstance.get("/auth/me");
        setRole(me.data.role);
        setCurrentUserId(me.data.clerkId);

        if (me.data.role === "team") {
          const resMembers = await axiosInstance.get("/members");
          setMembers(resMembers.data);

          const resTeam = await axiosInstance.get("/team-members");
          // exclude self from teamMembers list
          setTeamMembers(resTeam.data.filter((u: any) => u.clerkId !== me.data.clerkId));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!role) return <div className="p-6">Loading dashboard...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {role === "team" ? (
        <Tabs defaultValue="members" className="w-full">
          <TabsList>
            <TabsTrigger value="members">Users</TabsTrigger>
            <TabsTrigger value="team">Team Members</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="members">
            <UserList
              users={members}
              onClickUser={(clerkId) => router.push(`/chat/${clerkId}`)}
            />
          </TabsContent>

          {/* Team Members Tab */}
          <TabsContent value="team">
            <UserList
              users={teamMembers}
              onClickUser={(clerkId) =>
                router.push(`/chat/member-to-member/${clerkId}`)
              }
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div
          className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-3"
          onClick={() => router.push("/chat/elyx")}
        >
          {/* Elyx group image */}
          <img
            src="/elyx.jpeg"
            alt="Elyx Group"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-medium">Chat with Elyx</h2>
            <p className="text-sm text-gray-500">Talk with all experts in one place</p>
          </div>
        </div>
      )}
    </div>
  );
}
