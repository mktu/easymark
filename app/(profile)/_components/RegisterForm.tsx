'use client'
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { handleRegisterProfile, ProfileState } from "@/actions/profile/handleRegisterProfile";
import ValidationErrors from "./ValidationErrors";
import { Input } from "@/components/ui/input";

const RegisterForm: React.FC = () => {
    const [state, dispatch] = useActionState<ProfileState, FormData>(handleRegisterProfile, {})
    const { pending } = useFormStatus()
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={dispatch}>
                <label htmlFor="name">Name</label>
                <Input id='name' name='name' />
                <button type="submit">Submit</button>
                {pending && <div>saving...</div>}
                <ValidationErrors state={state} />
                {'success' in state && <div>Success</div>}
            </form>
        </div>
    );
}

export default RegisterForm