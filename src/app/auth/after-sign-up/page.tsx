"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { axiosInstance } from "@/lib/axios";

function AfterSignUpInner() {
  const { user, isLoaded } = useUser();
  const sp = useSearchParams();
  const type = sp.get("type") === "team" ? "team" : "member";
  const router = useRouter();
  const once = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || once.current) return;
    once.current = true;

    (async () => {
      const payload = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
        role: "Concierge",
      };

      const url =
        type === "team" ? "/auth/save-team-member" : "/auth/save-member";

      await axiosInstance.post(url, payload);
      router.replace("/dashboard");
    })();
  }, [isLoaded, user, type, router]);

  return <div className="p-6">Setting up your account…</div>;
}

export default function AfterSignUpPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <AfterSignUpInner />
    </Suspense>
  );
}
