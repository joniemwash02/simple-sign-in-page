"use client";

import {
  Activity,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [signingOut, setSigningOut] = useState(false);

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  // ==========================================
  // SIGN OUT
  // ==========================================

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out error:", error);
        setSigningOut(false);
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      setSigningOut(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-800 border-t-transparent" />

          <p className="text-sm text-gray-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!session) {
    router.push("/sign-in");

    return null;
  }

  // ==========================================
  // USER DATA
  // ==========================================

  const userName = session.user.name || "User";

  const userEmail =
    session.user.email || "";

  const initials =
    userName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ==================================================
          MOBILE SIDEBAR OVERLAY
      ================================================== */}

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() =>
            setMobileSidebarOpen(false)
          }
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col
          border-r border-gray-200
          bg-white
          transition-all duration-300

          lg:sticky
          lg:top-0
          lg:h-screen

          ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

          ${
            sidebarCollapsed
              ? "lg:w-20"
              : "w-72 lg:w-64"
          }
        `}
      >

        {/* ==================================================
            SIDEBAR HEADER
        ================================================== */}

        <div className="flex h-16 items-center justify-between border-b px-4">

          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-800 font-bold text-white">
                MC
              </div>

              <div>
                <h2 className="font-bold text-green-900">
                  Murang&apos;a
                </h2>

                <p className="text-xs text-gray-500">
                  County System
                </p>
              </div>

            </div>
          ) : (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-green-800 font-bold text-white">
              MC
            </div>
          )}

          {/* MOBILE CLOSE */}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
          >
            <X className="h-5 w-5" />
          </Button>

        </div>

        {/* ==================================================
            SIDEBAR NAVIGATION
        ================================================== */}

        <nav className="flex-1 space-y-2 overflow-y-auto p-3">

          <SidebarItem
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            active
            collapsed={sidebarCollapsed}
          />

          <SidebarItem
            icon={<Users className="h-5 w-5" />}
            label="Users"
            collapsed={sidebarCollapsed}
          />

          <SidebarItem
            icon={
              <ClipboardList className="h-5 w-5" />
            }
            label="Applications"
            collapsed={sidebarCollapsed}
          />

          <SidebarItem
            icon={
              <FileText className="h-5 w-5" />
            }
            label="Documents"
            collapsed={sidebarCollapsed}
          />

          <SidebarItem
            icon={
              <BarChart3 className="h-5 w-5" />
            }
            label="Reports"
            collapsed={sidebarCollapsed}
          />

          <Separator className="my-4" />

          <SidebarItem
            icon={
              <Bell className="h-5 w-5" />
            }
            label="Notifications"
            collapsed={sidebarCollapsed}
            badge="4"
          />

          <SidebarItem
            icon={
              <Settings className="h-5 w-5" />
            }
            label="Settings"
            collapsed={sidebarCollapsed}
          />

        </nav>

        {/* ==================================================
            SECURITY
        ================================================== */}

        <div className="border-t p-3">

          <SidebarItem
            icon={
              <Shield className="h-5 w-5" />
            }
            label="Security"
            collapsed={sidebarCollapsed}
          />

        </div>

      </aside>

      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <div className="flex min-h-screen flex-1 flex-col">

        {/* ==================================================
            STICKY NAVBAR
        ================================================== */}

        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-4 shadow-sm backdrop-blur md:px-6">

          {/* LEFT */}

          <div className="flex items-center gap-2">

            {/* MOBILE MENU */}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() =>
                setMobileSidebarOpen(true)
              }
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* COLLAPSE SIDEBAR */}

            <Button
              variant="outline"
              size="icon"
              className="hidden lg:flex"
              onClick={() =>
                setSidebarCollapsed(
                  !sidebarCollapsed
                )
              }
              title={
                sidebarCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            <div className="ml-1">

              <h1 className="text-lg font-semibold text-gray-900">
                Dashboard
              </h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                Murang&apos;a County Management System
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">

            {/* NOTIFICATION */}

            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5" />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            <Separator
              orientation="vertical"
              className="mx-2 hidden h-7 sm:block"
            />

            {/* ==================================================
                USER DROPDOWN
            ================================================== */}

            <DropdownMenu>

              {/* IMPORTANT:
                  No "asChild" here
              */}

              <DropdownMenuTrigger>
                <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-gray-100">

                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-green-800 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden text-left sm:block">

                    <p className="max-w-40 truncate text-sm font-medium text-gray-900">
                      {userName}
                    </p>

                    <p className="max-w-40 truncate text-xs text-gray-500">
                      {userEmail}
                    </p>

                  </div>

                </div>
              </DropdownMenuTrigger>

              {/* ==================================================
                  DROPDOWN CONTENT
              ================================================== */}

              <DropdownMenuContent
                align="end"
                className="w-64"
              >

                <DropdownMenuGroup>
                  <DropdownMenuLabel>

                    <div className="flex flex-col">

                      <span className="font-semibold">
                        {userName}
                      </span>

                      <span className="truncate text-xs font-normal text-gray-500">
                        {userEmail}
                      </span>

                    </div>

                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() =>
                    router.push("/profile")
                  }
                >
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    router.push("/settings")
                  }
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    router.push("/security")
                  }
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* SIGN OUT */}

                <DropdownMenuItem
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="text-red-600 focus:bg-red-50 focus:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {signingOut ? "Signing Out..." : "Sign Out"}
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

        </header>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <main className="flex-1 p-4 md:p-6 lg:p-8">

          {/* WELCOME */}

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome back,{" "}
              {userName.split(" ")[0]}!
            </h2>

            <p className="mt-1 text-gray-500">
              Here&apos;s what&apos;s happening in your
              system today.
            </p>

          </div>

          {/* ==================================================
              STATISTICS
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Users"
              value="1,248"
              description="+12% from last month"
              icon={
                <Users className="h-5 w-5" />
              }
            />

            <StatCard
              title="Applications"
              value="386"
              description="+8% from last month"
              icon={
                <ClipboardList className="h-5 w-5" />
              }
            />

            <StatCard
              title="Documents"
              value="742"
              description="+15% from last month"
              icon={
                <FileText className="h-5 w-5" />
              }
            />

            <StatCard
              title="Pending"
              value="28"
              description="Requires attention"
              icon={
                <Activity className="h-5 w-5" />
              }
            />

          </div>

          {/* ==================================================
              CONTENT GRID
          ================================================== */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            {/* RECENT ACTIVITY */}

            <Card className="lg:col-span-2">

              <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle>
                  Recent Activity
                </CardTitle>

                <Button
                  variant="outline"
                  size="sm"
                >
                  View All
                </Button>

              </CardHeader>

              <CardContent>

                <div className="space-y-5">

                  <ActivityItem
                    title="New user registered"
                    description="A new user account was created."
                    time="10 minutes ago"
                    badge="User"
                  />

                  <ActivityItem
                    title="Document submitted"
                    description="A document has been submitted for review."
                    time="35 minutes ago"
                    badge="Document"
                  />

                  <ActivityItem
                    title="Application approved"
                    description="An application was approved successfully."
                    time="1 hour ago"
                    badge="Approved"
                  />

                  <ActivityItem
                    title="Report generated"
                    description="Monthly report was generated."
                    time="2 hours ago"
                    badge="Report"
                  />

                </div>

              </CardContent>

            </Card>

            {/* ACCOUNT */}

            <Card>

              <CardHeader>
                <CardTitle>
                  Account Information
                </CardTitle>
              </CardHeader>

              <CardContent>

                <div className="flex flex-col items-center text-center">

                  <Avatar className="h-20 w-20">

                    <AvatarFallback className="bg-green-800 text-xl text-white">
                      {initials}
                    </AvatarFallback>

                  </Avatar>

                  <h3 className="mt-4 font-semibold">
                    {userName}
                  </h3>

                  <p className="mt-1 break-all text-sm text-gray-500">
                    {userEmail}
                  </p>

                  <Badge className="mt-3 bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>

                  <Separator className="my-5" />

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      router.push("/profile")
                    }
                  >
                    View Profile
                  </Button>

                </div>

              </CardContent>

            </Card>

          </div>

          {/* ==================================================
              QUICK ACTIONS
          ================================================== */}

          <Card className="mt-6">

            <CardHeader>
              <CardTitle>
                Quick Actions
              </CardTitle>
            </CardHeader>

            <CardContent>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <Button
                  variant="outline"
                  className="h-20 justify-start gap-3"
                >
                  <Users className="h-5 w-5 text-green-800" />

                  <div className="text-left">

                    <p className="font-semibold">
                      Manage Users
                    </p>

                    <p className="text-xs text-gray-500">
                      Add or manage users
                    </p>

                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 justify-start gap-3"
                >
                  <FileText className="h-5 w-5 text-green-800" />

                  <div className="text-left">

                    <p className="font-semibold">
                      Documents
                    </p>

                    <p className="text-xs text-gray-500">
                      Manage documents
                    </p>

                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 justify-start gap-3"
                >
                  <BarChart3 className="h-5 w-5 text-green-800" />

                  <div className="text-left">

                    <p className="font-semibold">
                      Reports
                    </p>

                    <p className="text-xs text-gray-500">
                      Generate reports
                    </p>

                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-20 justify-start gap-3"
                >
                  <Settings className="h-5 w-5 text-green-800" />

                  <div className="text-left">

                    <p className="font-semibold">
                      Settings
                    </p>

                    <p className="text-xs text-gray-500">
                      System settings
                    </p>

                  </div>
                </Button>

              </div>

            </CardContent>

          </Card>

        </main>

        {/* ==================================================
            STICKY FOOTER
        ================================================== */}

        <footer className="sticky bottom-0 border-t bg-white px-4 py-4 md:px-6">

          <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">

            <p>
              © {new Date().getFullYear()} Murang&apos;a
              County Government
            </p>

            <p className="hidden sm:block">
              Murang&apos;a County Management System
            </p>

          </div>

        </footer>

      </div>
    </div>
  );
}

/* ==================================================
   SIDEBAR ITEM
================================================== */

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
  active?: boolean;
  badge?: string;
};

function SidebarItem({
  icon,
  label,
  collapsed,
  active,
  badge,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      className={`
        flex w-full items-center rounded-lg
        px-3 py-2.5
        text-sm font-medium
        transition-colors

        ${
          active
            ? "bg-green-800 text-white"
            : "text-gray-600 hover:bg-green-50 hover:text-green-800"
        }

        ${collapsed ? "justify-center" : "gap-3"}
      `}
    >
      {icon}

      {!collapsed && (
        <>
          <span className="flex-1 text-left">
            {label}
          </span>

          {badge && (
            <Badge
              className={
                active
                  ? "bg-white text-green-800"
                  : "bg-green-100 text-green-800"
              }
            >
              {badge}
            </Badge>
          )}
        </>
      )}
    </button>
  );
}

/* ==================================================
   STAT CARD
================================================== */

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              {title}
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {value}
            </p>

          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-green-800">
            {icon}
          </div>

        </div>

        <p className="mt-4 text-xs text-gray-500">
          {description}
        </p>

      </CardContent>
    </Card>
  );
}

/* ==================================================
   ACTIVITY ITEM
================================================== */

type ActivityItemProps = {
  title: string;
  description: string;
  time: string;
  badge: string;
};

function ActivityItem({
  title,
  description,
  time,
  badge,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4">

      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
        <Activity className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex flex-col justify-between gap-1 sm:flex-row">

          <h4 className="font-medium text-gray-900">
            {title}
          </h4>

          <span className="text-xs text-gray-400">
            {time}
          </span>

        </div>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>

      </div>

      <Badge
        variant="outline"
        className="hidden sm:block"
      >
        {badge}
      </Badge>

    </div>
  );
}