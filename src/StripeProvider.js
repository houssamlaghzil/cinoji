// src/StripeProvider.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_live_51QlUthIB5RskngVG7IGg9c9pjaPq9KbhxIGdB9q1FgkrvcB7qw7OiJlPEXyolYmL5HTkiyU6KYyc4pInNmr8EWqN00zGwxtgrb');

const StripeProvider = ({ children }) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
