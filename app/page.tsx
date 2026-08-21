import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* TOP BAR */}
      <div className="bg-green-800 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
          <p>Murang'a County Government</p>

          <p className="hidden sm:block">
            Service • Integrity • Excellence
          </p>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-800 text-xl font-bold text-white shadow">
              MC
            </div>

            <div>
              <h1 className="text-lg font-bold text-green-900">
                Murang'a County
              </h1>

              <p className="text-xs text-slate-500">
                Digital Services
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-2 sm:gap-3">

            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="font-medium text-green-800 hover:bg-green-50 hover:text-green-900"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="bg-green-800 font-semibold text-white shadow-sm hover:bg-green-900">
                Sign Up
              </Button>
            </Link>

            <Link href="/dashboard" className="hidden sm:block">
              <Button
                variant="outline"
                className="border-green-800 text-green-800 hover:bg-green-50"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800">
        {/* Decorative circles */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-yellow-400/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-800/50 px-4 py-2 text-sm font-medium text-green-100">
              <CheckCircle2 className="h-4 w-4 text-yellow-400" />
              Murang'a County Digital Platform
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
              Digital Services
              <span className="block text-yellow-400">
                Made Simple
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100 sm:text-xl">
              Access county services, manage information, and monitor
              activities through one secure and convenient digital
              platform.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full bg-yellow-400 px-7 font-bold text-green-950 hover:bg-yellow-300 sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white bg-transparent px-7 text-white hover:bg-white hover:text-green-900 sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* GOLD LINE */}
      <div className="h-1 bg-yellow-400" />

      {/* FEATURES */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-wider text-green-700">
              Our Platform
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-green-950 sm:text-4xl">
              Everything You Need
            </h2>

            <p className="mt-4 text-slate-600">
              A modern platform designed to make county operations
              easier, faster, and more accessible.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <Card className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Users className="h-6 w-6 text-green-800" />
                </div>

                <CardTitle className="text-green-950">
                  Easy to Use
                </CardTitle>

                <CardDescription>
                  Simple and intuitive
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-slate-600">
                  Access the services and information you need
                  through a clean and user-friendly interface.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <ShieldCheck className="h-6 w-6 text-green-800" />
                </div>

                <CardTitle className="text-green-950">
                  Secure Platform
                </CardTitle>

                <CardDescription>
                  Your information is protected
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-slate-600">
                  Secure authentication and controlled access help
                  protect important county information.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="border-0 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <BarChart3 className="h-6 w-6 text-green-800" />
                </div>

                <CardTitle className="text-green-950">
                  Powerful Dashboard
                </CardTitle>

                <CardDescription>
                  Manage everything in one place
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-slate-600">
                  Monitor activities, access reports, and manage
                  your information from a centralized dashboard.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-900 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            Create an account and access the Murang'a County digital
            platform today.
          </p>

          <div className="mt-8">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="bg-yellow-400 px-8 font-bold text-green-950 hover:bg-yellow-300"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-950 px-6 py-8 text-green-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div>
            <p className="font-semibold text-white">
              Murang'a County Government
            </p>

            <p className="text-sm text-green-300">
              Digital Services Platform
            </p>
          </div>

          <p className="text-sm text-green-300">
            © {new Date().getFullYear()} Murang'a County Government.
            All rights reserved.
          </p>

        </div>
      </footer>

    </main>
  );
}