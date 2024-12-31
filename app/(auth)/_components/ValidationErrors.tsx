import React from 'react';
import { SigninState } from '@/actions/auth/authHandler';


const ValidationErrors: React.FC<{ state: SigninState }> = ({ state }) => {
    return (
        <div>
            {'error' in state && <p>{state?.error}</p>}
            {'validatedErrors' in state && state.validatedErrors?.email && <p>{state.validatedErrors?.email}</p>}
            {'validatedErrors' in state && state.validatedErrors?.password && <p>{state.validatedErrors?.password}</p>}
        </div>
    );
};

export default ValidationErrors;