"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  _id: string;
  text: string;
  senderClerkId: string;
  senderName: string;
  senderRole: string;
  createdAt: string;
  group?: string;
}

interface ChatWindowProps {
  messages: Message[];
  onSend: (text: string) => void;
  currentUserId?: string; // optional
}

export default function ChatWindow({
  messages,
  onSend,
  currentUserId,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSend(newMessage);
    setNewMessage("");
  };

  // format date-time helper
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg) => {
          const isMine = msg.senderClerkId === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex flex-col max-w-[70%] ${
                isMine ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              {/* Sender Info */}
              <span className="text-xs text-gray-500 mb-1">
                {msg.senderName ?? "Unknown"}
              </span>

              {/* Message Bubble */}
              <div
                className={`px-4 py-2 rounded-2xl shadow ${
                  isMine
                    ? "bg-purple-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-gray-400 mt-1">
                {formatDateTime(msg.createdAt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
