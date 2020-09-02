export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if(serializedState === null) {
            if (key === 'cart') {
                return [];
            } else if (key === 'auth') {
                return {}
            }
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return undefined;
    }
};

export const saveState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};