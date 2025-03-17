"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  // console.log({ transactionId });

  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de paypal",
    };
  }

  const response = await verifyPaypalPayment(authToken, transactionId);

  if (!response) {
    return {
      ok: false,
      message: "No se pudo verificar el pago de paypal",
    };
  }

  const { status, purchase_units } = response;

  const { invoice_id } = purchase_units[0];

  if (status !== "COMPLETED")
    return { ok: false, message: "El pago no se completó" };

  try {
    const order = await prisma.order.update({
      where: { id: invoice_id },
      data: { isPaid: true, paidAt: new Date() },
    });

    // Revalidar un path
    revalidatePath(`/orders/${order.id}`);

  } catch (error) {
    void error;
    return { ok: false, message: "500 - El pago no se pudo registrar" };
  }

  console.log({ status, purchase_units });
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((response) => response.json());

    return result.access_token;
  } catch (error) {
    void error;
    return null;
  }
};

const verifyPaypalPayment = async (
  bearerToken: string,
  transactionId: string
): Promise<PaypalOrderStatusResponse | null> => {
  const paypalOrderUrl = process.env.PAYPAL_ORDERS_URL;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(`${paypalOrderUrl}/${transactionId}`, {
      ...requestOptions,
      cache: "no-store",
    }).then((response) => response.json());

    return result;
  } catch (error) {
    void error;
    return null;
  }
};
