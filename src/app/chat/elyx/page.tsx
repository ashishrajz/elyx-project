"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { axiosInstance } from "@/lib/axios";
import ChatWindow from "@/components/ChatWindow";

export default function ElyxChatPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get("/messages/elyx");
        // only messages involving this user

        setMessages(res.data.filter((m: any) => m.group === "elyx" || m.senderClerkId === user?.id
));
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [user?.id]);

  const handleSend = async (text: string) => {
    try {
      const res = await axiosInstance.post("/messages", {
        group: "elyx",
        text,
        senderClerkId: user?.id,
        senderName: user?.fullName,
        senderRole: "Member"
      });
      setMessages(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] border rounded-lg">
      <div className="p-4 border-b bg-gray-50 font-semibold">Chat with Elyx Team</div>
      <ChatWindow messages={messages} onSend={handleSend} currentUserId={user?.id!} />
    </div>
  );
}
