import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, interest, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const recipientEmail = "Naresh1955.nk@gmail.com";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. Forward directly to Naresh1955.nk@gmail.com via FormSubmit AJAX gateway
    let emailDelivered = false;
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `[Capital Grow Inquiry] ${fullName} - ${interest || "Advisory Desk"}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
          "Contact Person Name": fullName,
          "Contact Email": email,
          "Contact Phone Number": phone || "Not provided",
          "Service / Topic": interest || "General Advisory",
          "Client Inquiry / Message": message,
          "Submission Timestamp (IST)": timestamp,
          "Source Portal": "Capital Grow Equity Research",
        }),
      });

      if (formSubmitRes.ok) {
        emailDelivered = true;
      }
    } catch (deliveryError) {
      console.warn("External forwarding gateway warning:", deliveryError);
    }

    // 2. Also record in Supabase leads database if configured
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          {
            cookies: {
              getAll() { return request.cookies.getAll(); },
              setAll() {},
            },
          }
        );

        await supabase.from("leads").insert({
          name: fullName,
          phone: phone || "No Phone",
          source: `Web: ${interest || "Contact Form"}`,
          status: "new",
          telecaller_notes: `Inquiry from ${email}: ${message}`,
        });
      }
    } catch (dbError) {
      console.warn("Supabase lead insertion notice:", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully transmitted. Our advisory team will review your requirements and reach out promptly.",
      recipient: recipientEmail,
      timestamp,
      delivered: emailDelivered,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please email directly to capitalgrow8651@gmail.com or call +91 7659801348." },
      { status: 500 }
    );
  }
}
