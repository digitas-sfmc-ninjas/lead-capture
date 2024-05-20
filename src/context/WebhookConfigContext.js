import React, { createContext, useState } from 'react';

const WebhookConfigContext = createContext();

export const WebhookConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        callbackUrl: '',
        authToken: '',
    });

    return (
        <WebhookConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </WebhookConfigContext.Provider>
    );
};

export default WebhookConfigContext;
