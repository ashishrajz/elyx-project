"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import ChatWindow from "@/components/ChatWindow";
import { useUser } from "@clerk/nextjs";

export default function TeamChatPage() {
  const { id } = useParams<{ id: string }>(); // other team member clerkId
  const { user } = useUser();
  const [messages, setMessages] = useState<any[]>([]);
  const [chatUser, setChatUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/messages/member-to-member/${id}`);
        setMessages(res.data);

        const userRes = await axiosInstance.get(`/team-members/${id}`);
        setChatUser(userRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleSend = async (text: string) => {
    try {
      const res = await axiosInstance.post(`/messages`, {
        receiverClerkId: id,
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
        <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
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
        currentUserId={user?.id}
      />
    </div>
  );
}
