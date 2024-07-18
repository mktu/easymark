import Link from "next/link";

export default async function Verification() {
    return (
        <div>
            Email sended, please check your inbox
            <Link href="/signin">Signin</Link>
        </div>
    )
}