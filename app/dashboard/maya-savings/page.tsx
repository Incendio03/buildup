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

    const grossBase = (balance * baseInterest * days) / (365 * 100);
    const taxBase = grossBase * 0.2;
    const netBase = grossBase - taxBase;

    const grossBoosted = (balance * boostedRate * days) / (365 * 100);
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
    <div className="">
      <h1 className="text-2xl font-bold text-primary">
        Calculate your Maya Savings
      </h1>
      <div className="mt-10 space-y-5">
        <div>
          <Label className="mb-2 font-normal">Enter Account Balance:</Label>
          <Input
            inputMode="numeric"
            value={accountBalance}
            placeholder="10,000.00"
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
          Boosted Interest Rate: {calculateAllInterest(1).boostedRate}%
        </Label>
        <Label className="font-bold text-lg">
          Total Interest Rate:{" "}
          {Math.max(parsePercentage(totalInterestRate) || 3.5, 3.5)}%
        </Label>
      </div>

      <Separator orientation="horizontal" className="bg-primary mt-2" />

      <div className="flex-row mt-5">
        <Label className="font-semibold">
          Your total net interest (Net Base Interest + Net Boosted Interest):
        </Label>
        <div className="mt-5 flex gap-4">
          <Card className="p-3">
            <CardHeader>
              <CardTitle>1 Day</CardTitle>
            </CardHeader>
            <CardContent>
              <h2>₱{formatCurrency(calculateAllInterest(1).total)}</h2>
            </CardContent>
            <Separator orientation="horizontal" className="bg-bg mt-2" />
            <div className="mt-2">
              <Label className="block font-normal text-sm">
                <span className="font-bold">Net Base Interest:</span> ₱
                {formatCurrency(calculateAllInterest(1).base)}
              </Label>
              <Label className="font-normal text-sm mt-1">
                <span className="font-bold">Net Boosted Interest:</span> ₱
                {formatCurrency(calculateAllInterest(1).boosted)}
              </Label>
            </div>
          </Card>
          <Card className="p-3">
            <CardHeader>
              <CardTitle>30 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <h2>₱{formatCurrency(calculateAllInterest(30).total)}</h2>
            </CardContent>
            <Separator orientation="horizontal" className="bg-bg mt-2" />
            <div className="mt-2">
              <Label className="font-normal text-sm">
                <span className="font-bold">Net Base Interest:</span> ₱
                {formatCurrency(calculateAllInterest(30).base)}
              </Label>
              <Label className="font-normal text-sm mt-1">
                <span className="font-bold">Net Boosted Interest:</span> ₱
                {formatCurrency(calculateAllInterest(30).boosted)}
              </Label>
            </div>
          </Card>
          <Card className="p-3">
            <CardHeader>
              <CardTitle>1 Year</CardTitle>
            </CardHeader>
            <CardContent>
              <h2>₱{formatCurrency(calculateAllInterest(365).total)}</h2>
            </CardContent>
            <Separator orientation="horizontal" className="bg-bg mt-2" />
            <div className="mt-2">
              <Label className="font-normal text-sm">
                <span className="font-bold">Net Base Interest:</span> ₱
                {formatCurrency(calculateAllInterest(365).base)}
              </Label>
              <Label className="font-normal text-sm mt-1">
                <span className="font-bold">Net Boosted Interest:</span> ₱
                {formatCurrency(calculateAllInterest(365).boosted)}
              </Label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
