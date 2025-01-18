import { loadImportingStatus } from "@/loader/import/loadImportingStaus";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const status = await loadImportingStatus(parseInt(id));
    return NextResponse.json(status);
}