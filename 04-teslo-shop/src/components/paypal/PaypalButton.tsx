"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending)
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-slate-200 rounded"></div>
        <div className="h-12 mt-4 bg-slate-200 rounded"></div>
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",

      purchase_units: [
        {
          invoice_id: orderId,
          amount: { value: `${roundedAmount}`, currency_code: "USD" },
        },
      ],
    });

    // console.log({ transactionId });
    const resp = await setTransactionId(orderId, transactionId);

    console.log(resp);
    if (!resp.ok) throw new Error("No se pudo registrar la transacción");

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
