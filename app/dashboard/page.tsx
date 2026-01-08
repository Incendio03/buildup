import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Calculate. Compare. Decide.
            </p>
            <h1 className="text-7xl font-bold text-primary leading-tight">
              BuildUp
            </h1>
          </div>

          <p>
            BuildUp is a free savings interest calculator that helps you
            estimate and compare earnings across banks and financial services
            like Maya, MariBank, and more.
          </p>
          <p>
            It’s easy to use and continuously improved with new features and
            supported banks. Suggestions are always welcome, and if you find
            BuildUp helpful, optional donations are greatly appreciated.
          </p>

          <div className="flex gap-4 pt-4">
            <Link href="/dashboard/support-buildup">
              <Button className="bg-primary text-bg hover:bg-primary/90 cursor-pointer">
                Support BuildUp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
