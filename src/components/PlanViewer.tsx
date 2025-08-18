"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Plan {
  _id: string;
  userClerkId: string;
  date: string;
  planType: "Nutrition" | "Exercise" | "Supplements";
  assignedBy: string;
  details?: Record<string, any>;
  goal?: string;
}

export default function PlanViewer({ userId }: { userId: string }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/plans/${userId}`)
      .then((res) => {
        // normalize details to always be an object
        const data = res.data.map((p: any) => ({
          ...p,
          details: p.details || {},
          goal: p.goal || "-",
          assignedBy: p.assignedBy || "-",
        }));
        setPlans(data);
      })
      .catch((err) => console.error("Error fetching plans:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading plans…</p>;
  if (!plans.length) return <p>No plans available.</p>;

  return (
    <div className="grid gap-4">
      {plans.map((plan) => (
        <Card key={plan._id} className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>
              {plan.planType} Plan – {new Date(plan.date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><b>Assigned By:</b> {plan.assignedBy}</p>
            <p><b>Goal:</b> {plan.goal}</p>
            <div className="text-sm space-y-1">
              {plan.planType === "Nutrition" && (
                <>
                  <p><b>Breakfast:</b> {plan.details?.breakfast || "-"}</p>
                  <p><b>Lunch:</b> {plan.details?.lunch || "-"}</p>
                  <p><b>Dinner:</b> {plan.details?.dinner || "-"}</p>
                  <p><b>Snacks:</b> {plan.details?.snacks || "-"}</p>
                  <p>
                    <b>Supplements:</b> {(plan.details?.supplements || []).join(", ") || "-"}
                  </p>
                </>
              )}
              {plan.planType === "Exercise" && (
                <ul className="list-disc pl-5">
                  {(plan.details?.weeklySchedule || []).map((ex: string, idx: number) => (
                    <li key={idx}>{ex}</li>
                  ))}
                  {!(plan.details?.weeklySchedule?.length) && <li>No exercises assigned</li>}
                </ul>
              )}
              {plan.planType === "Supplements" && (
                <p>{(plan.details?.daily || []).join(", ") || "-"}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
