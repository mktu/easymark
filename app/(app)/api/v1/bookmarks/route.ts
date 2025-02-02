import { NextRequest } from "next/server";
import { get } from "./_api/get";
import { post } from "./_api/post";

export async function GET(request: NextRequest) {
    return get(request);
}

export async function POST(request: NextRequest) {
    return post(request);
}