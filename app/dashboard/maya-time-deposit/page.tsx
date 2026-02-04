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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { formatCurrency, parseNumber } from "@/lib/utils";

export default function MayaTimeDeposit() {
  const [depositedAmount, setDepositedAmount] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [depositTerm, setDepositTerm] = useState("3");

  const calculateAllInterest = () => {
    const deposit = parseNumber(depositedAmount);
    const target = parseNumber(targetAmount);
    const term = parseInt(depositTerm);

    if (deposit === 0) {
      return {
        baseOnlyInterest: 0,
        boostedInterest: 0,
        boostedOnlyInterest: 0,
        totalNetInterest: 0,
        hasReachedTarget: false,
        boostRate: 0,
      };
    }

    const baseInterest = 3.5 / 100;
    const taxRate = 0.2;

    // Boost rates based on term
    const boostRates: { [key: number]: number } = {
      3: 1.5 / 100,
      6: 2.5 / 100,
      12: 2.0 / 100,
    };

    const boostRate = boostRates[term] || 0;
    const hasReachedTarget = deposit >= target && target > 0;

    // Calculate base only (3.5%)
    let baseOnlyBalance = deposit;
    let baseOnlyInterest = 0;

    for (let month = 1; month <= term; month++) {
      const daysInMonth = 30;
      const monthlyInterest =
        (baseOnlyBalance * baseInterest * daysInMonth) / 365;
      const netInterest = monthlyInterest * (1 - taxRate);
      baseOnlyInterest += netInterest;
      baseOnlyBalance += netInterest;
    }

    // Calculate with boost (if target reached)
    let boostedBalance = deposit;
    let boostedInterest = 0;

    if (hasReachedTarget) {
      const totalRate = baseInterest + boostRate;
      for (let month = 1; month <= term; month++) {
        const daysInMonth = 30;
        const monthlyInterest =
          (boostedBalance * totalRate * daysInMonth) / 365;
        const netInterest = monthlyInterest * (1 - taxRate);
        boostedInterest += netInterest;
        boostedBalance += netInterest;
      }
    }

    return {
      baseOnlyInterest,
      baseInterest,
      boostedInterest,
      boostedOnlyInterest: hasReachedTarget
        ? boostedInterest - baseOnlyInterest
        : 0,
      totalNetInterest: hasReachedTarget ? boostedInterest : baseOnlyInterest,
      hasReachedTarget,
      boostRate: boostRate * 100,
    };
  };

  const results = calculateAllInterest();

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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bg">
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
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bg">
                ₱
              </span>
              <Input
                inputMode="numeric"
                value={targetAmount}
                placeholder="30,000.00"
                className="text-lg pl-8"
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="w-[180px] space-y-2">
            <Label className="text-foreground">Select Term</Label>
            <Select value={depositTerm} onValueChange={setDepositTerm}>
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
              <p className="text-2xl font-bold text-primary">
                {results.boostRate.toFixed(1)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Total Rate
              </p>
              <p className="text-2xl font-bold text-foreground">
                {results.hasReachedTarget
                  ? (3.5 + results.boostRate).toFixed(1)
                  : "3.5"}
                %
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
              <CardTitle className="text-bg">
                {depositTerm ? depositTerm : "3"} Months (If Base Interest only)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">
                  ₱{formatCurrency(results.baseOnlyInterest)}
                </h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Net Base Interest
                  </span>
                  <span className="font-semibold">
                    ₱{formatCurrency(results.baseOnlyInterest)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Net Base Interest
                  </span>
                  <span className="font-semibold">
                    ₱
                    {formatCurrency(
                      parseNumber(depositedAmount) + results.baseOnlyInterest,
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-bg flex items-center gap-2">
                {depositTerm ? depositTerm : "3"} Months (With Boosted Interest
                Rate)
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center">
                      <IconInfoCircle className="w-4 h-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    Actual value may vary based on when target amount is
                    reached. Calculation assumes full term with boost.
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Total Net Interest
                </p>
                <h2 className="text-3xl font-bold text-bg">
                  ₱{formatCurrency(results.boostedInterest || 0)}
                </h2>
              </div>

              <Separator className="bg-bg/20" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Net Base Interest
                  </span>
                  <span className="font-semibold">
                    ₱
                    {formatCurrency(
                      results.hasReachedTarget ? results.baseOnlyInterest : 0,
                    )}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Net Boosted Interest
                  </span>
                  <span className="font-semibold">
                    ₱{formatCurrency(results.boostedOnlyInterest)}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Total Amount at Maturity
                  </span>
                  <span className="font-semibold">
                    ₱
                    {formatCurrency(
                      results.hasReachedTarget
                        ? parseNumber(depositedAmount) +
                            (results.boostedInterest || 0)
                        : 0,
                    )}
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
