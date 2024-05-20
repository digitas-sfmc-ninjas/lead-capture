import React, { useState, useContext } from 'react';
import './Form.css'; // Importing CSS file
import { useNavigate } from 'react-router-dom';
import WebhookConfigContext from '../context/WebhookConfigContext';

const LeadCaptureForm = () => {

    const { config } = useContext(WebhookConfigContext);

    const navigate = useNavigate();

    const handleGoToConfig = () => {
        navigate('/webhook-config');
    };



    const [formState, setFormState] = useState({
        date: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        addressLine1: '',
        addressLine2: '',
        postalCode: '',
        birthday: '',
        jobTitle: '',
        companyName: '',
        customField1: '',
        customField2: '',
        customField3: '',
        consent1: false,
        consent2: false,
        adAccountId: 'e01bd96a-b090-4a52-a059-389144c27f5a',
        campaignId: 'ed58b43a-e3f4-4fc9-88b4-7310639fe834',
        adSetId: 'f67d2bef-97d0-49e7-8530-31e292017c72',
        adId: '3a004747-2f7c-4a4c-9081-33bc637634d4'
    });

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formState);


        const { callbackUrl, authToken } = config;

        if (!callbackUrl || !authToken) {
            alert('Please configure the webhook settings first.');
            return;
        }

        try {

            console.log(JSON.stringify(formState));
            const response = await fetch(callbackUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                    'Authorization': `${authToken}`, // Assuming the auth token should be sent this way
                },
                body: JSON.stringify(formState),
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Success:', responseData);
            alert('Lead captured successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to capture lead.');
        }
    };

    return (
        <div className="form-container">
            <h1>Lead Capture Form</h1>
            <button onClick={handleGoToConfig}>Configure Webhook</button>

            <form onSubmit={handleSubmit} className="lead-form">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formState.date} onChange={handleChange} />

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formState.firstName} onChange={handleChange} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formState.lastName} onChange={handleChange} />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} />

                <label htmlFor="emailAddress">Email Address</label>
                <input type="email" id="emailAddress" name="emailAddress" value={formState.emailAddress} onChange={handleChange} />

                <label htmlFor="addressLine1">Address Line 1</label>
                <input type="text" id="addressLine1" name="addressLine1" value={formState.addressLine1} onChange={handleChange} />

                <label htmlFor="addressLine2">Address Line 2</label>
                <input type="text" id="addressLine2" name="addressLine2" value={formState.addressLine2} onChange={handleChange} />

                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" id="postalCode" name="postalCode" value={formState.postalCode} onChange={handleChange} />

                <label htmlFor="birthday">Birthday</label>
                <input type="date" id="birthday" name="birthday" value={formState.birthday} onChange={handleChange} />

                <label htmlFor="jobTitle">Job Title</label>
                <input type="text" id="jobTitle" name="jobTitle" value={formState.jobTitle} onChange={handleChange} />

                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" value={formState.companyName} onChange={handleChange} />

                <label htmlFor="customField1">Custom Field 1</label>
                <input type="text" id="customField1" name="customField1" value={formState.customField1} onChange={handleChange} />

                <label htmlFor="customField2">Custom Field 2</label>
                <input type="text" id="customField2" name="customField2" value={formState.customField2} onChange={handleChange} />

                <label htmlFor="customField3">Custom Field 3</label>
                <input type="text" id="customField3" name="customField3" value={formState.customField3} onChange={handleChange} />

                <label htmlFor="consent1">
                    <input type="checkbox" id="consent1" name="consent1" checked={formState.consent1} onChange={handleChange} />
                    Consent 1
                </label>

                <label htmlFor="consent2">
                    <input type="checkbox" id="consent2" name="consent2" checked={formState.consent2} onChange={handleChange} />
                    Consent 2
                </label>

                <input type="submit" value="Submit" className="submit-button" />
            </form>
        </div>
    );
};

export default LeadCaptureForm;