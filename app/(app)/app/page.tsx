'use server'
import { redirect } from "next/navigation";

export default async function App() {
    redirect('/app/home')
}
