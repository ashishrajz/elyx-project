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
  details?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
    snacks?: string;
    supplements?: string[];
    weeklySchedule?: string[];
    daily?: string[];
  };
  goal?: string;
}

export default function PlanViewer({ userId }: { userId: string }) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    axiosInstance
      .get(`/plans/${userId}`)
      .then((res) => {
        const data = (res.data || []).map((p: any) => ({
          ...p,
          details: p.details || {},
          detailsBreakfast: p.details?.breakfast || "-",
          detailsLunch: p.details?.lunch || "-",
          detailsDinner: p.details?.dinner || "-",
          detailsSnacks: p.details?.snacks || "-",
          detailsSupplements: Array.isArray(p.details?.supplements) ? p.details.supplements : [],
          detailsWeeklySchedule: Array.isArray(p.details?.weeklySchedule) ? p.details.weeklySchedule : [],
          detailsDaily: Array.isArray(p.details?.daily) ? p.details.daily : [],
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
                  <p><b>Supplements:</b> {(plan.details?.supplements ?? []).join(", ") || "-"}</p>
                </>
              )}

              {plan.planType === "Exercise" && (
                <ul className="list-disc pl-5">
                  {(plan.details?.weeklySchedule ?? ["No exercises assigned"]).map((ex, idx) => (
                    <li key={idx}>{ex}</li>
                  ))}
                </ul>
              )}

              {plan.planType === "Supplements" && (
                <p>{(plan.details?.daily ?? []).join(", ") || "-"}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
