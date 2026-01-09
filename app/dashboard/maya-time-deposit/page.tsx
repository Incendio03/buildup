"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function MayaTimeDeposit() {
  const [depositedAmount, setDepositedAmount] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Time Deposit
      </h1>

      <div className="space-y-5 max-w-5xl">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label>Deposited Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">
                ₱
              </span>
              <Input
                inputMode="numeric"
                value={depositedAmount}
                placeholder="5,000.00"
                className="text-lg pl-8"
                onChange={(e) => setDepositedAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <Label>Target Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">
                ₱
              </span>
              <Input
                inputMode="numeric"
                value={depositedAmount}
                placeholder="30,000.00"
                className="text-lg pl-8"
                onChange={(e) => setDepositedAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="w-[180px] space-y-2">
            <Label className="text-foreground">Select Term</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="3 Months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Card className="mt-5 bg-transparent border-foreground">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">
            Interest Rate Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Base Rate
              </p>
              <p className="text-2xl font-bold text-foreground">3.5%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Boosted Rate (After reaching target amount)
              </p>
              <p className="text-2xl font-bold text-primary">0.00%</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Total Rate
              </p>
              <p className="text-2xl font-bold text-foreground">0.00%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex-row mt-8">
        <h2 className="text-xl font-semibold mb-2">Interest Projections</h2>
        <p className="text-sm text-muted-foreground mb-5">
          View your estimated net interest earnings over different time periods
          (after 20% tax deduction)
        </p>

        <h2>Interest in Base Rate</h2>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg">1 Day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">₱0.00</h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">₱0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg">30 Days</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">₱0.00</h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">₱0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg">1 Year</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">₱0.00</h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">₱0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">₱0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2>Interest with Boosted Rate</h2>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg">1 Day</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">₱0.00</h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">₱0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">₱0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg">30 Days</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">₱0.00</h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">₱0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">₱0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg">1 Year</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">₱0.00</h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">₱0.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">₱0.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
