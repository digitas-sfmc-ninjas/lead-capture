import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WebhookConfigProvider } from './context/WebhookConfigContext';
import LeadCaptureForm from './components/LeadCaptureForm';
import WebhookConfig from './components/WebhookConfig';

function App() {
  return (
    <WebhookConfigProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LeadCaptureForm />} />
          <Route path="/webhook-config" element={<WebhookConfig />} />
        </Routes>
      </Router>
    </WebhookConfigProvider>
  );
}

export default App;



