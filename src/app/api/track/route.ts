import { createVisitHistory } from "@/actions/visit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    await createVisitHistory({ ip, userAgent });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Error logging visit:", e);
    return NextResponse.json({ success: false });
  }
}
