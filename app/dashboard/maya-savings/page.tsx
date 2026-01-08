"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency, parseNumber, parsePercentage } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function SavingsPage() {
  const [accountBalance, setAccountBalance] = useState("");
  const [totalInterestRate, setTotalInterestRate] = useState("3.5");
  const [showError, setShowError] = useState(false);

  const calculateAllInterest = (days: number) => {
    const baseInterest = 3.5;
    const balance = parseNumber(accountBalance) || 0;
    const totalRate = parsePercentage(totalInterestRate) || baseInterest;
    const boostedRate = Math.max(totalRate - baseInterest, 0);

    const boostedCap = 100000;
    const boostedBalance = Math.min(balance, boostedCap);

    // Daily compound interest formula: P × [(1 + r/365)^days - 1]
    // Base interest on entire balance
    const grossBase =
      balance * (Math.pow(1 + baseInterest / (365 * 100), days) - 1);
    const taxBase = grossBase * 0.2;
    const netBase = grossBase - taxBase;

    // Boosted interest on capped balance
    const grossBoosted =
      boostedBalance * (Math.pow(1 + boostedRate / (365 * 100), days) - 1);
    const taxBoosted = grossBoosted * 0.2;
    const netBoosted = grossBoosted - taxBoosted;

    const netTotal = netBase + netBoosted;

    return {
      base: netBase.toFixed(2),
      boosted: netBoosted.toFixed(2),
      total: netTotal.toFixed(2),
      boostedRate: boostedRate.toFixed(1),
    };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Savings
      </h1>

      <div className="space-y-5 max-w-md">
        <div className="space-y-2">
          <Label className="text-foreground">Account Balance</Label>
          <Input
            inputMode="numeric"
            value={accountBalance}
            placeholder="10,000.00"
            className="text-lg"
            onChange={(e) => {
              setAccountBalance(e.target.value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Total Interest Rate</Label>
          <Input
            inputMode="numeric"
            value={totalInterestRate}
            placeholder="3.5%"
            className="text-lg"
            onChange={(e) => {
              setTotalInterestRate(e.target.value);
              setShowError(false);
            }}
            onBlur={() => {
              if (
                totalInterestRate &&
                parsePercentage(totalInterestRate) < 3.5
              ) {
                setShowError(true);
              }
            }}
          />
          {showError && (
            <Alert className="mt-2" variant="destructive">
              <AlertDescription>
                Maya's base interest rate is 3.5%. The total interest rate must
                not be less than 3.5%.
              </AlertDescription>
            </Alert>
          )}
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
                Boosted Rate
              </p>
              <p className="text-2xl font-bold text-primary">
                {calculateAllInterest(1).boostedRate}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Total Rate
              </p>
              <p className="text-2xl font-bold text-foreground">
                {Math.max(parsePercentage(totalInterestRate) || 3.5, 3.5)}%
              </p>
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
                <h2 className="text-3xl font-bold text-bg">
                  ₱{formatCurrency(calculateAllInterest(1).total)}
                </h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">
                    ₱{formatCurrency(calculateAllInterest(1).base)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">
                    ₱{formatCurrency(calculateAllInterest(1).boosted)}
                  </span>
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
                <h2 className="text-3xl font-bold text-bg">
                  ₱{formatCurrency(calculateAllInterest(30).total)}
                </h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">
                    ₱{formatCurrency(calculateAllInterest(30).base)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">
                    ₱{formatCurrency(calculateAllInterest(30).boosted)}
                  </span>
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
                <h2 className="text-3xl font-bold text-bg">
                  ₱{formatCurrency(calculateAllInterest(365).total)}
                </h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Interest</span>
                  <span className="font-semibold">
                    ₱{formatCurrency(calculateAllInterest(365).base)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Boosted Interest
                  </span>
                  <span className="font-semibold">
                    ₱{formatCurrency(calculateAllInterest(365).boosted)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
