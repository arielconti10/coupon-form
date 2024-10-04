"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type DiscountType =
  | "percent"
  | "amount_off_subtotal"
  | "nightly_amount_off"
  | "flat_rate";

const discountOptions: { type: DiscountType; label: string }[] = [
  { type: "percent", label: "Percent" },
  { type: "amount_off_subtotal", label: "Amount Off Subtotal" },
  { type: "nightly_amount_off", label: "Nightly Amount Off" },
  { type: "flat_rate", label: "Flat Rate" },
];

export default function CouponForm() {
  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [isEnabled, setIsEnabled] = useState(true);

  const getDiscountUnit = (type: DiscountType) => {
    return type === "percent" ? "%" : "USD";
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Coupon</h2>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="coupon_name">Name</Label>
          <Input id="coupon_name" type="text" placeholder="Coupon name" />
        </div>

        <fieldset className="flex flex-col space-y-2">
          <Label>Discount Type</Label>
          <div className="flex space-x-2">
            {discountOptions.map(({ type, label }) => (
              <Button
                key={type}
                onClick={() => setDiscountType(type)}
                variant={discountType === type ? "selected" : "outline"}
              >
                {label}
              </Button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col space-y-2">
          <Label htmlFor="discount_amount">Discount Amount</Label>
          <div className="relative">
            <Input
              id="discount_amount"
              type="number"
              min="0"
              className="pr-10"
            />
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              {getDiscountUnit(discountType)}
            </span>
          </div>
        </fieldset>

        <div className="flex items-center space-x-2">
          <Label htmlFor="is_enabled">Is Enabled</Label>
          <Switch
            id="is_enabled"
            checked={isEnabled}
            onCheckedChange={() => setIsEnabled(!isEnabled)}
          />
        </div>

        <div className="flex w-full">
          <div className="flex-1">
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <span className="text-red-600 underline">Remove Coupon</span>
            </Button>
          </div>
          <div className="space-x-4 self-end">
            <Button variant="outline">Cancel</Button>
            <Button variant="default">Update Coupon</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
