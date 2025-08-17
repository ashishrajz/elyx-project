"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TestReport {
  _id: string;
  userClerkId: string;
  date: string;
  panel: {
    LDL: number;
    HDL: number;
    TotalCholesterol: number;
    Triglycerides: number;
    CRP: number;
    GlucoseFasting: number;
  };
  summary: string;
  doctorNotes: string;
}

export default function TestReports({ userId }: { userId: string }) {
  const [reports, setReports] = useState<TestReport[]>([]);

  useEffect(() => {
    axiosInstance.get(`/test-reports/${userId}`).then((res) => {
      setReports(res.data);
    });
  }, [userId]);

  if (!reports.length) return <p>No reports available.</p>;

  return (
    <div className="grid gap-4">
      {reports.map((report) => (
        <Card key={report._id} className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>
              Lab Report – {new Date(report.date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">{report.summary}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><b>LDL:</b> {report.panel.LDL}</p>
              <p><b>HDL:</b> {report.panel.HDL}</p>
              <p><b>Total Cholesterol:</b> {report.panel.TotalCholesterol}</p>
              <p><b>Triglycerides:</b> {report.panel.Triglycerides}</p>
              <p><b>CRP:</b> {report.panel.CRP}</p>
              <p><b>Fasting Glucose:</b> {report.panel.GlucoseFasting}</p>
            </div>
            <p className="text-sm italic text-muted-foreground">
              Notes: {report.doctorNotes}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
