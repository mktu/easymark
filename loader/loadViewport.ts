'use server';

import { NextRequest, NextResponse, userAgent } from "next/server";

export const loadViewport = async (request: NextRequest, response: NextResponse) => {
    const { device } = userAgent(request)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    response.cookies.set('viewport', viewport)
    return response
}