'use client'

import { useFormState, useFormStatus } from "react-dom";
import { handleRegister, ProfileState } from "../_actions/actionHandler";
import ValidationErrors from "./ValidationErrors";

const RegisterForm: React.FC = () => {
    const [state, dispatch] = useFormState<ProfileState, FormData>(handleRegister, {})
    const { pending } = useFormStatus()
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={dispatch}>
                <label htmlFor="name">Name</label>
                <input id='name' name='name' />
                <button type="submit">Submit</button>
                {pending && <div>saving...</div>}
                <ValidationErrors state={state} />
                {'success' in state && <div>Success</div>}
            </form>
        </div>
    );
}

export default RegisterForm