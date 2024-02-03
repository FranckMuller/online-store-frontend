"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";

const Checkout = () => {
  const { amount, paymentUrl } = useCart();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  useEffect(() => {
    if (amount) {
      setTotalAmount(amount);
    }
  }, [amount]);

  return (
    <div>
      <h3>Order</h3>

      <a href={paymentUrl} target="_blank">
        pay $<span>{totalAmount}</span>
      </a>
    </div>
  );
};

export default Checkout;
