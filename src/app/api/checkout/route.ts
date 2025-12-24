import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-12-15.clover", // Naujausia versija
});

export async function POST(req: NextRequest) {
  try {
    const { reportId } = await req.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 1. GAUNAME KAINĄ IŠ .ENV (arba naudojame 9.99 kaip atsarginį)
    const priceEur = parseFloat(process.env.NEXT_PUBLIC_STRIPE_PRICE_EUR || "9.99");
    
    // 2. KONVERTUOJAME Į CENTUS (Stripe reikalavimas: 9.99 -> 999)
    const unitAmount = Math.round(priceEur * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Pilna Kosminė Numerologijos Analizė",
              description: "Išsami karmos, karjeros ir ateities prognozė + PDF knyga.",
              images: ["https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80"],
            },
            unit_amount: unitAmount, // Čia naudojame apskaičiuotą kainą
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/?payment_status=success`,
      cancel_url: `${baseUrl}/?payment_status=cancelled`,
      metadata: {
        reportId: reportId || "unknown",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe Error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
