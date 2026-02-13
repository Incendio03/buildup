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
import { format } from "date-fns";

export default function MayaPersonalGoals() {
  const [amountDeposited, setAmountDeposited] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalTerm, setGoalTerm] = useState<Date>();

  return (
    <div className="space-y-6">
      <div className="space-y-5 max-w-md">
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
        <div className="w-[180px] space-y-2">
          <Field className="mx-auto w-44">
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
                />
              </PopoverContent>
            </Popover>
          </Field>
        </div>
      </div>
    </div>
  );
}
