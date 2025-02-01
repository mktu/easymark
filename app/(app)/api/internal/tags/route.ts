import { searchTags } from "@/loader/tags/searchTags";
import { z } from "zod";

const searchQuerySchema = z.object({
    query: z.string().optional(),
});

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams
    const parseResult = searchQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parseResult.success) {
        return Response.json({ error: parseResult.error.errors }, { status: 400 });
    }

    const { query } = parseResult.data;


    const result = await searchTags(query);
    if ('error' in result) {
        return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json(result);
}