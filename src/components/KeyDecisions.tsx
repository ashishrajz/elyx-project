"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyDecision {
  _id: string;
  userClerkId: string;
  date: string;
  decisionBy: string;
  context: string;
  decision: string;
  rationale: string;
}

export default function KeyDecisions({ userId }: { userId: string }) {
  const [decisions, setDecisions] = useState<KeyDecision[]>([]);

  useEffect(() => {
    axiosInstance.get(`/key-decisions/${userId}`).then((res) => {
      setDecisions(res.data);
    });
  }, [userId]);

  if (!decisions.length) return <p>No key decisions recorded.</p>;

  return (
    <div className="grid gap-4">
      {decisions.map((d) => (
        <Card key={d._id} className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>
              {new Date(d.date).toLocaleDateString()} – {d.decisionBy}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p><b>Context:</b> {d.context}</p>
            <p><b>Decision:</b> {d.decision}</p>
            <p className="text-sm italic text-muted-foreground">
              Rationale: {d.rationale}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
