// src/components/SignUp.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './SignUp.css'; // Assurez-vous que ce fichier existe et est correctement stylisé

function SignUp() {
    const stripe = useStripe();
    const elements = useElements();

    // États pour le formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [promoCode, setPromoCode] = useState('');

    // États pour debug
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // BACKEND_URL : Changez cette URL pour votre vrai backend
    const BACKEND_URL = 'https://api.promete-it.fr';
    // Ex : 'https://api.promete-it.fr' si c'est déployé

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('[SignUp] >> Formulaire soumis.');
        setError('');

        // 1. Vérifier le code promo (facultatif)
        if (promoCode && promoCode !== 'cacaboudin') {
            console.log('[SignUp] >> Code promo invalide:', promoCode);
            setError('Code promo invalide.');
            return;
        }

        // 2. Vérifier que Stripe est chargé
        if (!stripe || !elements) {
            console.log('[SignUp] >> Stripe pas prêt.');
            setError('Stripe non chargé.');
            return;
        }

        try {
            setIsSubmitting(true);
            console.log('[SignUp] >> Création du Payment Intent...');

            // 3. Appeler votre backend pour créer un PaymentIntent
            const paymentIntentRes = await axios.post(`${BACKEND_URL}/create-payment-intent`, {
                email,
                amount: 50, // Montant en cents, ex : 10.00 EUR
            });
            console.log('[SignUp] >> paymentIntentRes data:', paymentIntentRes.data);

            // 4. Récupérer le clientSecret
            const { clientSecret } = paymentIntentRes.data;
            console.log('[SignUp] >> clientSecret =', clientSecret);

            if (!clientSecret) {
                console.log('[SignUp] >> Pas de clientSecret reçu !');
                setError('Erreur : pas de clientSecret');
                setIsSubmitting(false);
                return;
            }

            // 5. Confirmer le paiement côté client
            console.log('[SignUp] >> On appelle stripe.confirmCardPayment');
            const cardElement = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { email },
                },
            });
            console.log('[SignUp] >> paymentResult =', paymentResult);

            if (paymentResult.error) {
                // Erreur de paiement
                console.log('[SignUp] >> Erreur de paiement :', paymentResult.error.message);
                setError(paymentResult.error.message);
                setIsSubmitting(false);
                return;
            }

            if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
                // 6. Paiement OK, on appelle /signup pour finaliser l'inscription
                console.log('[SignUp] >> Paiement OK, on appelle /signup...');
                const signupRes = await axios.post(`${BACKEND_URL}/signup`, {
                    email,
                    password,
                    promoCode: promoCode || null, // Envoyer null si pas de code promo
                    paymentIntentId: paymentResult.paymentIntent.id,
                });
                console.log('[SignUp] >> signupRes data:', signupRes.data);

                if (signupRes.data.message) {
                    // Succès inscription
                    console.log('[SignUp] >> Succès inscription :', signupRes.data.message);
                    alert('Inscription réussie !');
                    // Réinitialiser le formulaire
                    setEmail('');
                    setPassword('');
                    setPromoCode('');
                    cardElement.clear();
                } else if (signupRes.data.error) {
                    // Erreur inscription
                    console.log('[SignUp] >> Erreur inscription côté back :', signupRes.data.error);
                    setError(signupRes.data.error);
                }
            } else {
                // Statut != succeeded
                console.log('[SignUp] >> paymentIntent.status != succeeded');
                setError('Le paiement n\'a pas été complété ou est en statut ' + (paymentResult?.paymentIntent?.status || 'inconnu'));
                setIsSubmitting(false);
            }
        } catch (err) {
            console.log('[SignUp] >> Catch error :', err);
            setError('Une erreur est survenue. Vérifiez la console.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container" style={{ maxWidth: 500, margin: '0 auto' }}>
            <h2>Inscription (avec paiement)</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }}
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                        required
                    />
                </div>

                <div>
                    <label>Code Promo (facultatif) :</label>
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); }}
                        placeholder="Entrez un code promo si vous en avez un"
                    />
                </div>

                <div>
                    <label>Informations de paiement :</label>
                    <CardElement className="StripeElement" />
                </div>

                {error && (
                    <p className="error-message" style={{ color: 'red' }}>
                        {error}
                    </p>
                )}

                <button type="submit" disabled={isSubmitting || !stripe}>
                    {isSubmitting ? 'Paiement en cours...' : 'S\'inscrire'}
                </button>
            </form>
        </div>
    );
}

export default SignUp;
