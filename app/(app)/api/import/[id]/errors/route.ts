import { loadImportErrors } from "@/loader/import/loadImportErrors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const errors = await loadImportErrors(parseInt(id));
    return NextResponse.json(errors);
}