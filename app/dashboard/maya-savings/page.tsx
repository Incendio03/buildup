"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SavingsPage() {
  const [accountBalance, setAccountBalance] = useState("");
  const [totalInterestRate, setTotalInterestRate] = useState("3.5");
  const [showError, setShowError] = useState(false);

  const calculateInterest = (days: number) => {
    const baseInterest = 3.5;
    const balance = parseFloat(accountBalance) || 0;
    const totalRate = parseFloat(totalInterestRate) || baseInterest;

    const interest = (balance * totalRate * days) / (365 * 100);

    return interest.toFixed(2);
  };

  const getBoostedRate = () => {
    const baseInterest = 3.5;
    const totalRate = parseFloat(totalInterestRate) || baseInterest;
    const boosted = totalRate - baseInterest;
    return boosted >= 0 ? boosted.toFixed(1) : "0.0";
  };

  return (
    <div className="s">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Savings
      </h1>
      <div className="mt-10 space-y-5">
        <div>
          <Label className="mb-2 font-normal">Enter Account Balance:</Label>
          <Input
            inputMode="numeric"
            value={accountBalance}
            placeholder="10,000"
            onChange={(e) => {
              setAccountBalance(e.target.value);
            }}
          />
        </div>

        <div>
          <Label className="mb-2 font-normal">Enter Total Interest Rate:</Label>
          <Input
            inputMode="numeric"
            value={totalInterestRate}
            placeholder="3.5%"
            onChange={(e) => {
              setTotalInterestRate(e.target.value);
              setShowError(false);
            }}
            onBlur={() => {
              if (totalInterestRate && parseFloat(totalInterestRate) < 3.5) {
                setShowError(true);
              }
            }}
          />
          {showError && (
            <Alert className="mt-2" variant="destructive">
              <AlertDescription>
                Maya’s base interest rate is 3.5%. The total interest rate must
                not be less than 3.5%.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="mt-5">
        <Label className="font-light text-sm">Base Interest Rate: 3.5%</Label>
        <Label className="font-light text-sm">
          Boosted Interest Rate: {getBoostedRate() || 0}%
        </Label>
        <Label className="font-bold text-lg">
          Total Interest Rate:{" "}
          {Math.max(parseFloat(totalInterestRate) || 3.5, 3.5)}%
        </Label>
      </div>

      <div className="mt-5 flex gap-4">
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
