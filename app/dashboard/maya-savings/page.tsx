"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SavingsPage() {
  const [totalInterestRate, setTotalInterestRate] = useState(0);

  return (
    <div className="s">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Savings
      </h1>
      <div className="mt-10 space-y-5">
        <div>
          <Label className="mb-2 font-normal">Enter Account Balance:</Label>
          <Input placeholder="10,000" />
        </div>

        <div>
          <Label className="mb-2 font-normal">
            Enter Total Boosted Interest Rate:
          </Label>
          <Input placeholder="5%" />
        </div>
      </div>

      <div className="mt-5">
        <Label className="font-bold text-lg">
          Total Interest Rate: {totalInterestRate}%
        </Label>
      </div>

      <div className="flex gap-4">
        <Card>
          <CardHeader>
            <CardTitle>1 Day</CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Interest Amount Here</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>30 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Interest Amount Here</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>1 Year</CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Interest Amount Here</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
