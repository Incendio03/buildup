"use client";

import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { Label } from "@/components/ui/label";

export default function MayaPersonalGoals() {
  const [amountDeposited, setAmountDeposited] = useState("");
  return (
    <div className="space-y-6">
      <div className="space-y-5 max-w-md">
        <div className="space-y-2">
          <Label className="text-foreground">Deposited Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">
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
      </div>
    </div>
  );
}
