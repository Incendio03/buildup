"use client";

import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { differenceInDays, format } from "date-fns";
import { formatCurrency, parseNumber } from "@/lib/utils";
import { IconCalendarWeek } from "@tabler/icons-react";

// Tier Structure
interface TierInfo {
  min: number;
  max: number;
  rate: number;
  name: String;
}

const TIERS: TierInfo[] = [
  { min: 0.01, max: 20000, rate: 0.04, name: "Tier 1" },
  { min: 20000.01, max: 40000, rate: 0.045, name: "Tier 2" },
  { min: 40000.01, max: 60000, rate: 0.05, name: "Tier 3" },
  { min: 60000.01, max: 80000, rate: 0.065, name: "Tier 4" },
  { min: 80000.01, max: 100000, rate: 0.08, name: "Tier 5" },
];

const TAX_RATE = 0.2;

export default function MayaPersonalGoals() {
  const [depositedAmount, setDepositedAmount] = useState("");
  const [maturityDate, setMaturityDate] = useState<Date>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const termDuration = maturityDate ? differenceInDays(maturityDate, today) : 0;

  const calculateTieredInterest = () => {
    const deposit = parseNumber(depositedAmount);

    // If deposit is 0 or 0 term durations, then set all to 0, cards are muted by default
    if (deposit === 0 || termDuration <= 0) {
      return TIERS.map((tier) => ({
        ...tier,
        isUnlocked: false,
        tierAmount: 0,
        grossInterest: 0,
        taxAmount: 0,
        netInterest: 0,
      }));
    }

    // map every tier in TIERS array of objects
    return TIERS.map((tier) => {
      let tierAmount = 0; // initializing that tierAmount starts from 0 first

      if (deposit > tier.max) {
        // A condition to determine the tier according to deposit
        tierAmount = tier.max - tier.min + 0.01;
      } else if (deposit > tier.min) {
        tierAmount = deposit - tier.min + 0.01;
      }

      const isUnlocked = tierAmount > 0;

      if (!isUnlocked) {
        // other cards values are set to 0 if tierAmount is not greater than 0
        return {
          ...tier,
          isUnlocked: false,
          tierAmount: 0,
          grossInterest: 0,
          taxAmount: 0,
          netInterest: 0,
        };
      }

      const perAnnumInterest = tierAmount * tier.rate;

      const dailyInterest = perAnnumInterest / 365;

      const grossInterestForTerm = dailyInterest * termDuration;

      const taxAmount = grossInterestForTerm * TAX_RATE;

      const netInterest = grossInterestForTerm - taxAmount;

      return {
        ...tier,
        isUnlocked: true,
        tierAmount,
        grossInterest: grossInterestForTerm,
        taxAmount,
        netInterest,
      };
    });
  };

  const tierResults = calculateTieredInterest();

  // Calculate all total across all tiers
  const totals = tierResults.reduce(
    (acc, tier) => ({
      totalNetInterest: acc.totalNetInterest + tier.netInterest,
      totalGrossInterest: acc.totalGrossInterest + tier.grossInterest,
      totalTaxAmount: acc.totalTaxAmount + tier.taxAmount,
    }),
    { totalNetInterest: 0, totalGrossInterest: 0, totalTaxAmount: 0 },
  );

  const totalMaturityAmount =
    parseNumber(depositedAmount) + totals.totalNetInterest;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Personal Goals
      </h1>

      <div className="space-y-5 max-w-5xl">
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label className="text-foreground">Deposited Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bg">
                ₱
              </span>
              <Input
                inputMode="numeric"
                value={depositedAmount}
                placeholder="5,000.00"
                className="text-lg pl-8"
                onChange={(e) => {
                  setDepositedAmount(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="date-picker-simple">Select Maturity Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-simple"
                  className="w-full justify-start font-normal text-bg bg-foreground cursor-pointer"
                >
                  <IconCalendarWeek className="h-4 w-4 text-bg" />
                  {maturityDate ? (
                    format(maturityDate, "PPP")
                  ) : (
                    <span className="text-muted-foreground">Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={maturityDate}
                  onSelect={setMaturityDate}
                  defaultMonth={maturityDate}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 space-y-2">
            <Label>Term Duration</Label>
            <div className="flex items-center h-9 px-3 rounded-md border border-input text-bg bg-foreground">
              <span className="text-lg">
                {termDuration > 0 ? termDuration : 0}{" "}
                {termDuration > 1 ? "days" : "day"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card className="mt-5 bg-transparent border-foreground">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">
            Interest Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Total Gross Interest
              </p>
              <p className="text-2xl font-bold text-foreground">
                ₱{formatCurrency(totals.totalGrossInterest)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Tax Amount (20%)
              </p>
              <p className="text-2xl font-bold text-foreground">
                -₱{formatCurrency(totals.totalTaxAmount)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Total Net Interest
              </p>
              <p className="text-2xl font-bold text-primary">
                ₱{formatCurrency(totals.totalNetInterest)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-foreground uppercase tracking-wide">
                Total at Maturity
              </p>
              <p className="text-2xl font-bold text-primary">
                ₱{formatCurrency(totalMaturityAmount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tier Breakdown */}
      <div className="flex-row mt-8">
        <h2 className="text-xl font-semibold mb-2">Interest Rate Per Tiers</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Each tier earns its exclusive interest rate on the balance within that
          range.
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tierResults.map((tier, index) => (
            <Card
              key={index}
              className={`border-2 transition-all ${
                tier.isUnlocked
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/20 opacity-60"
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-foreground">
                  {tier.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  ₱{formatCurrency(tier.min)} - ₱{formatCurrency(tier.max)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Interest Rate
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    {(tier.rate * 100).toFixed(2)}% p.a.
                  </h2>
                </div>

                <>
                  <Separator className="bg-foreground/20" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Amount in Tier
                      </span>
                      <span className="font-semibold text-foreground">
                        ₱{formatCurrency(tier.tierAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Gross Interest
                      </span>
                      <span className="font-semibold text-foreground">
                        ₱{formatCurrency(tier.grossInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Tax (20%)</span>
                      <span className="font-semibold text-foreground">
                        -₱{formatCurrency(tier.taxAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Net Interest
                      </span>
                      <span className="font-semibold text-foreground">
                        ₱{formatCurrency(tier.netInterest)}
                      </span>
                    </div>
                  </div>
                </>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
