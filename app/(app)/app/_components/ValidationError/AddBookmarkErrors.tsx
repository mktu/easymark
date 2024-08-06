import React from 'react';
import { AddBookmarkState } from '../../_actions/handleAddBookmark';


const AddBookmarkErrors: React.FC<{ state: AddBookmarkState }> = ({ state }) => {
    return (
        <div>
            {'error' in state && <p>{state?.error}</p>}
            {'validatedErrors' in state && state.validatedErrors?.url && <p>{state.validatedErrors?.url}</p>}
        </div>
    );
};

export default AddBookmarkErrors;