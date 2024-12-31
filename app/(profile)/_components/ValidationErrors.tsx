import React from 'react';
import { ProfileState } from '@/actions/profile/handleRegisterProfile';


const ValidationErrors: React.FC<{ state: ProfileState }> = ({ state }) => {
    return (
        <div>
            {'error' in state && <p>{state.error?.message}</p>}
            {'validatedErrors' in state && state.validatedErrors?.name && <p>{state.validatedErrors?.name}</p>}
        </div>
    );
};

export default ValidationErrors;