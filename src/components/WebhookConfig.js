import React, { useState, useContext } from 'react';
import WebhookConfigContext from '../context/WebhookConfigContext';
import { useNavigate } from 'react-router-dom';

const WebhookConfig = () => {
    const { config, setConfig } = useContext(WebhookConfigContext);
    const [callbackUrl, setCallbackUrl] = useState(config.callbackUrl);
    const [authToken, setAuthToken] = useState(config.authToken);
    const navigate = useNavigate();

    const handleSave = () => {
        setConfig({ callbackUrl, authToken });
        alert('Configuration saved!');
        navigate('/');
    };

    const inputStyle = {
        width: '400px', // Set the width to 400px or any desired value
        padding: '8px',
        margin: '8px 0',
        boxSizing: 'border-box'
    };

    return (
        <div className="form-container">
            <h1>Webhook Config</h1>
            <div>
                <label>
                    Callback URL:
                    <input
                        type="text" style={inputStyle}
                        value={callbackUrl}
                        onChange={(e) => setCallbackUrl(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Auth Token:
                    <input
                        type="text"
                        value={authToken} style={inputStyle}
                        onChange={(e) => setAuthToken(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default WebhookConfig;