"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ import router
import { axiosInstance } from "@/lib/axios";
import ChatWindow from "@/components/ChatWindow";
import { useUser } from "@clerk/nextjs";

interface Member {
  clerkId: string;
  name: string;
  role: string;
  imageUrl?: string;
}

interface Message {
  _id: string;
  text: string;
  senderClerkId: string;
  senderName: string;
  senderRole: string;
  createdAt: string;
  group?: string;
}

export default function ChatPage() {
  const { userId } = useParams<{ userId: string }>(); // Member clerkId
  const { user } = useUser(); // Logged-in team member
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUser, setChatUser] = useState<Member | null>(null);
  const router = useRouter(); // ✅ router for navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch all messages for this member (team member view)
        const res = await axiosInstance.get(`/messages/${userId}`);
        setMessages(res.data);

        // ✅ Fetch member info
        const userRes = await axiosInstance.get(`/members/${userId}`);
        setChatUser(userRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const handleSend = async (text: string) => {
    try {
      const res = await axiosInstance.post(`/messages`, {
        receiverClerkId: userId,
        text,
      });
      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] border rounded-lg">
      {chatUser && (
        <div
          className="flex items-center gap-3 p-4 border-b bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => router.push(`/profile/${chatUser.clerkId}`)} // ✅ redirect
        >
          <img
            src={chatUser.imageUrl || "/default-avatar.png"}
            alt={chatUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{chatUser.name}</h2>
            <p className="text-sm text-gray-500">{chatUser.role}</p>
          </div>
        </div>
      )}
      <ChatWindow
        messages={messages}
        onSend={handleSend}
        currentUserId={user?.id} // ✅ optional, handled in ChatWindow
      />
    </div>
  );
}
