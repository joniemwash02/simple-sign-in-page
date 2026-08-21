"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-white p-8 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-900">
                Dashboard
              </h1>

              <p className="mt-2 text-gray-600">
                Welcome, {session.user.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {session.user.email}
              </p>
            </div>

            <Button
              onClick={handleSignOut}
              className="bg-green-800 hover:bg-green-900"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}