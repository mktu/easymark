'use server';

import { NextRequest, NextResponse, userAgent } from "next/server";

export const loadViewport = async (request: NextRequest, init?: NextResponse) => {
    const { device } = userAgent(request)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    const response = NextResponse.next()
    response.cookies.set('viewport', viewport)
    return response
}