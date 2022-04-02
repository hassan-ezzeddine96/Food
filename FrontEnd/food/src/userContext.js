import React from 'react';

const userContext = React.createContext({
    token: "",
    setToken: () => {}
    });

export { userContext };