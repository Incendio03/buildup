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
import { Stepper } from "@/components/ui/stepper";
import { format } from "date-fns";

export default function MayaPersonalGoals() {
  const [amountDeposited, setAmountDeposited] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalTerm, setGoalTerm] = useState<Date>();

  const goalTiers = [
    { label: "PHP 0.01 - PHP 20,000.00", description: "4.00% p.a." },
    { label: "PHP 20,000.00 - PHP 40,000.00", description: "4.50% p.a." },
    { label: "PHP 40,000.00 - PHP 60,000.00", description: "5.00% p.a." },
    { label: "PHP 60,000.00 - PHP 80,000.00", description: "6.50% p.a." },
    { label: "PHP 80,000.00 - PHP 100,000.00", description: "8.00% p.a." },
  ];

  const getCurrentTier = () => {
    const amount = parseFloat(amountDeposited.replace(/,/g, "")) || 0;
    if (amount <= 20000) return 0;
    if (amount <= 40000) return 1;
    if (amount <= 60000) return 2;
    if (amount <= 80000) return 3;
    if (amount <= 100000) return 4;
    return 4;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Personal Goals
      </h1>

      <div className="flex gap-6"> 
        <div className="flex-1 max-w-l space-y-5">
          <div className="space-y-4">
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
                  placeholder="5,000.00"
                  className="text-lg pl-8"
                  onChange={(e) => {
                    setAmountDeposited(e.target.value);
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
                      className="justify-start font-normal text-muted-foreground bg-foreground cursor-pointer"
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
        </div>
        <Card className="max-w-3xl bg-muted/50 border-foreground ml-auto mr-5">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Goal Tier</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <Stepper steps={goalTiers} currentStep={getCurrentTier()} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
