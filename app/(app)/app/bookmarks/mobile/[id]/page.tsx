"use server";
import { redirect, RedirectType } from "next/navigation";

export default async function Bookmark({ params }: { params: { id: string } }) {
    redirect(`/app/bookmarks/${params.id}`, RedirectType.replace);
}