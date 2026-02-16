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
import { format } from "date-fns";

export default function MayaPersonalGoals() {
  const [amountDeposited, setAmountDeposited] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalTerm, setGoalTerm] = useState<Date>();

  const goalTiers = [
    {
      range: "PHP 0.01 - PHP 20,000.00",
      rate: "4.00% p.a.",
      isUnlocked: true,
      totalNetInterest: "15,234.50",
      netBaseInterest: "10,500.00",
      netBoostedInterest: "4,734.50",
    },
    {
      range: "PHP 20,000.00 - PHP 40,000.00",
      rate: "4.50% p.a.",
      isUnlocked: true,
      totalNetInterest: "15,234.50",
      netBaseInterest: "10,500.00",
      netBoostedInterest: "4,734.50",
    },
    {
      range: "PHP 40,000.00 - PHP 60,000.00",
      rate: "5.00% p.a.",
      isUnlocked: false,
      totalNetInterest: "15,234.50",
      netBaseInterest: "10,500.00",
      netBoostedInterest: "4,734.50",
    },
    {
      range: "PHP 60,000.00 - PHP 80,000.00",
      rate: "6.50% p.a.",
      isUnlocked: false,
      totalNetInterest: "15,234.50",
      netBaseInterest: "10,500.00",
      netBoostedInterest: "4,734.50",
    },
    {
      range: "PHP 80,000.00 - PHP 100,000.00",
      rate: "8.00% p.a.",
      isUnlocked: false,
      totalNetInterest: "15,234.50",
      netBaseInterest: "10,500.00",
      netBoostedInterest: "4,734.50",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Personal Goals
      </h1>

      <div className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <Label className="text-foreground">Deposited Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bg">
              ₱
            </span>
            <Input
              inputMode="numeric"
              value={amountDeposited}
              placeholder="5,000.00"
              className="text-lg pl-8"
              onChange={(e) => {
                setAmountDeposited(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Goal Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bg">
              ₱
            </span>
            <Input
              inputMode="numeric"
              value={goalAmount}
              placeholder="50,000.00"
              className="text-lg pl-8"
              onChange={(e) => {
                setGoalAmount(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Field>
            <FieldLabel htmlFor="date-picker-simple">
              Select Due Date
            </FieldLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker-simple"
                  className="w-full justify-start font-normal text-muted-foreground bg-foreground cursor-pointer"
                >
                  {goalTerm ? (
                    format(goalTerm, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={goalTerm}
                  onSelect={setGoalTerm}
                  defaultMonth={goalTerm}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </Field>
        </div>
      </div>

      <div className="flex-row mt-8">
        <h2 className="text-xl font-semibold mb-2">Goal Tier Projections</h2>
        <p className="text-sm text-muted-foreground mb-5">
          View your estimated net interest earnings based on different goal
          tiers (after 20% tax deduction)
        </p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goalTiers.map((tier, index) => (
            <Card
              key={index}
              className={`border-2 transition-all ${
                tier.isUnlocked
                  ? "border-primary bg-primary/5"
                  : "border-muted bg-muted/20 opacity-60"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">
                      {tier.range}
                    </p>
                    <CardTitle className="text-lg text-foreground">
                      {tier.rate}
                    </CardTitle>
                  </div>
                  {tier.isUnlocked && (
                    <div className="flex h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Total Net Interest
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    ₱{tier.totalNetInterest}
                  </h2>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Net Base Interest
                    </span>
                    <span className="font-semibold text-foreground">
                      ₱{tier.netBaseInterest}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Net Boosted Interest
                    </span>
                    <span className="font-semibold text-foreground">
                      ₱{tier.netBoostedInterest}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
