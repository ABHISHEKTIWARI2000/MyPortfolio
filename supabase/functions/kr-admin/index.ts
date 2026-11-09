import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function safeEqual(a: string, b: string) {
  const encoder = new TextEncoder();
  const x = encoder.encode(a);
  const y = encoder.encode(b);
  let diff = x.length ^ y.length;
  const len = Math.max(x.length, y.length);
  for (let i = 0; i < len; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

type Json = Record<string, unknown>;

const str = (v: unknown, max: number) => {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length > 0 && t.length <= max ? t : null;
};
const optStr = (v: unknown, max: number) => {
  if (v === undefined || v === null) return "";
  if (typeof v !== "string" || v.length > max) return null;
  return v.trim();
};
const pos = (v: unknown) => (Number.isInteger(v) && (v as number) >= 0 ? (v as number) : 0);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword) return json({ error: "Admin access is not configured" }, 500);

    const body = (await req.json().catch(() => null)) as Json | null;
    if (!body || typeof body !== "object") return json({ error: "Invalid request" }, 400);

    const password = typeof body.password === "string" ? body.password : "";
    if (!password || !safeEqual(password, adminPassword)) {
      return json({ error: "Incorrect admin password" }, 401);
    }

    const action = body.action;
    if (action === "verify") return json({ ok: true });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (action === "create_subject") {
      const name = str(body.name, 200);
      const code = optStr(body.code, 40);
      const description = optStr(body.description, 2000);
      if (!name || code === null || description === null) return json({ error: "Invalid subject" }, 400);
      const { data, error } = await supabase
        .from("university_subjects")
        .insert({ name, code, description, position: pos(body.position) })
        .select()
        .single();
      if (error) return json({ error: "Could not save subject" }, 500);
      return json({ data });
    }

    if (action === "update_subject") {
      const id = str(body.id, 64);
      const name = str(body.name, 200);
      const code = optStr(body.code, 40);
      const description = optStr(body.description, 2000);
      if (!id || !name || code === null || description === null) return json({ error: "Invalid subject" }, 400);
      const { data, error } = await supabase
        .from("university_subjects")
        .update({ name, code, description, position: pos(body.position) })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) return json({ error: "Could not update subject" }, 500);
      if (!data) return json({ error: "Subject not found" }, 404);
      return json({ data });
    }

    if (action === "delete_subject") {
      const id = str(body.id, 64);
      if (!id) return json({ error: "Invalid subject" }, 400);
      const { error } = await supabase.from("university_subjects").delete().eq("id", id);
      if (error) return json({ error: "Could not delete subject" }, 500);
      return json({ ok: true });
    }

    if (action === "create_content") {
      const subjectId = str(body.subject_id, 64);
      const title = str(body.title, 200);
      const content = str(body.body, 20000);
      if (!subjectId || !title || !content) return json({ error: "Invalid content" }, 400);
      const { data, error } = await supabase
        .from("subject_contents")
        .insert({ subject_id: subjectId, title, body: content, position: pos(body.position) })
        .select()
        .single();
      if (error) return json({ error: "Could not save content" }, 500);
      return json({ data });
    }

    if (action === "update_content") {
      const id = str(body.id, 64);
      const title = str(body.title, 200);
      const content = str(body.body, 20000);
      if (!id || !title || !content) return json({ error: "Invalid content" }, 400);
      const { data, error } = await supabase
        .from("subject_contents")
        .update({ title, body: content, position: pos(body.position) })
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) return json({ error: "Could not update content" }, 500);
      if (!data) return json({ error: "Content not found" }, 404);
      return json({ data });
    }

    if (action === "delete_content") {
      const id = str(body.id, 64);
      if (!id) return json({ error: "Invalid content" }, 400);
      const { error } = await supabase.from("subject_contents").delete().eq("id", id);
      if (error) return json({ error: "Could not delete content" }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (_err) {
    return json({ error: "Something went wrong" }, 500);
  }
});
