import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { connected: false, message: "Error al conectar con Supabase." },
        { status: 503 }
      );
    }

    return NextResponse.json({ connected: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { connected: false, message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
