import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactEmailRequest {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
  formFillTime?: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, firstName, lastName, email, subject, message, website, formFillTime }: ContactEmailRequest = await req.json();

    const fullName = name || `${firstName} ${lastName}`;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Anti-spam checks
    // 1. Honeypot check
    if (website) {
      console.log('Spam detected via honeypot');

      await supabase.from('spam_attempts').insert({
        email,
        name: fullName,
        message,
        honeypot_filled: true,
        submission_time_ms: formFillTime || 0,
        user_agent: req.headers.get('user-agent'),
        attempted_at: new Date().toISOString(),
      });

      return new Response(
        JSON.stringify({ success: false, error: "Invalid submission" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // 2. Time-based check (form filled too quickly - less than 3 seconds)
    if (formFillTime && formFillTime < 3000) {
      console.log('Spam detected via timing check');

      await supabase.from('spam_attempts').insert({
        email,
        name: fullName,
        message,
        honeypot_filled: false,
        submission_time_ms: formFillTime,
        user_agent: req.headers.get('user-agent'),
        attempted_at: new Date().toISOString(),
      });

      return new Response(
        JSON.stringify({ success: false, error: "Invalid submission" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Use Resend API to send email
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const fullName = name || `${firstName} ${lastName}`;

    const emailBody = `
Nouveau message de contact depuis Ecarte.fr

Nom: ${fullName}
Email: ${email}
Sujet: ${subject}

Message:
${message}

---
Ce message a été envoyé via le formulaire de contact d'Ecarte.fr
Temps de remplissage: ${formFillTime ? Math.round(formFillTime / 1000) + 's' : 'N/A'}
    `.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Ecarte.fr <onboarding@resend.dev>",
        to: ["lk@manufactur-e.com"],
        reply_to: email,
        subject: `[Ecarte.fr] ${subject}`,
        text: emailBody,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();

    await supabase.from('contact_messages').insert({
      name: fullName,
      email,
      subject,
      message,
      submitted_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
