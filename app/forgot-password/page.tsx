"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: "/reset-password",
      });

      // Request failed
      if (error) {
        console.error("Password reset error:", error);

        setError("Unable to process your request. Please try again.");

        setLoading(false);
        return;
      }

      console.log("Password reset request successful:", data);

      // Success
      setSuccess(true);
    } catch (err) {
      console.error("Unexpected password reset error:", err);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-800 px-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        {/* Card Header */}
        <CardHeader className="space-y-3 text-center">
          {/* Logo */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-xl font-bold text-white shadow-md">
            MC
          </div>

          {/* Title */}
          <CardTitle className="text-3xl font-bold text-green-950">
            Forgot Password?
          </CardTitle>

          {/* Description */}
          <CardDescription>
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>

        {/* Card Content */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
                autoComplete="email"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div
                role="status"
                className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700"
              >
                If an account exists with this email, a password reset link has
                been sent.
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full bg-green-800 font-semibold text-white hover:bg-green-900"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : success ? (
                "Reset Link Sent"
              ) : (
                "Send Reset Link"
              )}
            </Button>

            {/* Back to Sign In */}
            <p className="text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-green-800 hover:text-green-900 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
