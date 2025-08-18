"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Wearable {
  _id: string;
  userClerkId: string;
  date: string;
  device: string;
  metrics: {
    restingHR?: number;
    HRV?: number;
    sleepHours?: number;
    steps?: number;
    caloriesBurned?: number;
  };
  scientistNotes?: string;
}

export default function WearableData({ userId }: { userId: string }) {
  const [wearables, setWearables] = useState<Wearable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    axiosInstance
      .get(`/wearables/${userId}`)
      .then((res) => {
        const data = (res.data || []).map((w: any) => ({
          _id: w._id,
          userClerkId: w.userClerkId,
          date: w.date,
          device: w.device,
          metrics: w.metrics || {},
          scientistNotes: w.scientistNotes || "No notes",
        }));
        setWearables(data);
      })
      .catch((err) => {
        console.error("Error fetching wearable data:", err);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading wearable data…</p>;
  if (!wearables.length) return <p>No wearable data.</p>;

  return (
    <div className="grid gap-4">
      {wearables.map((w) => (
        <Card key={w._id} className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>
              {w.device} – {new Date(w.date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p><b>Resting HR:</b> {w.metrics?.restingHR ?? "-" } bpm</p>
            <p><b>HRV:</b> {w.metrics?.HRV ?? "-" } ms</p>
            <p><b>Sleep:</b> {w.metrics?.sleepHours ?? "-" } hrs</p>
            <p><b>Steps:</b> {w.metrics?.steps ?? "-"}</p>
            <p><b>Calories:</b> {w.metrics?.caloriesBurned ?? "-"}</p>
            <p className="italic text-muted-foreground">{w.scientistNotes}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
