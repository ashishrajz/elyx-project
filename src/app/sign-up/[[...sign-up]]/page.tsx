"use client";
import { useSearchParams } from "next/navigation";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const sp = useSearchParams();
  const type = sp.get("type") === "team" ? "team" : "member";
  // After sign-up, ALWAYS go to our DB sync page with the role attached
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl={`/auth/after-sign-up?type=${type}`}
      />
    </div>
  );
}

