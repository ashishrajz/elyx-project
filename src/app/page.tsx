"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Show landing buttons only if user is not logged in
  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-4">
        <Button onClick={() => router.push("/sign-up?type=member")}>
          Sign up / Login as Member
        </Button>
        <Button variant="secondary" onClick={() => router.push("/sign-up?type=team")}>
          Sign up / Login as Team Member
        </Button>
      </div>
    );
  }

  return null; // will redirect anyway
}

