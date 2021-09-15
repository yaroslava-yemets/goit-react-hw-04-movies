import { useState } from 'react';

const useSearchQuery = (value) => {
    const [state, setState] = useState(() => {
        if(value) {
            return value.substring(1);
        }
    });
    return [state, setState];
};

export default useSearchQuery;