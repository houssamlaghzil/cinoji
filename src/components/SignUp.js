// src/components/SignUp.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const stripe = useStripe();
    const elements = useElements();

    // États pour les champs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [promoCode, setPromoCode] = useState('');

    // États pour gérer les erreurs et le statut de soumission
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // URL de votre fonction Firebase déployée
    const PAYMENT_INTENT_URL = 'https://us-central1-your-project-id.cloudfunctions.net/createPaymentIntent';

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser les erreurs
        setError('');

        // Valider le code promo
        if (promoCode !== 'cacaboudin') {
            setError('Code promo invalide.');
            return;
        }

        if (!stripe || !elements) {
            setError('Stripe n\'est pas encore chargé.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Appeler la fonction Firebase pour créer un Payment Intent
            const response = await axios.post(PAYMENT_INTENT_URL, {
                email,
                amount: 1000, // Montant en cents (par exemple, 10.00 EUR)
            });

            const clientSecret = response.data.clientSecret;

            // Confirmer le paiement avec Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        email: email,
                    },
                },
            });

            if (result.error) {
                // Afficher l'erreur au client
                setError(result.error.message);
                setIsSubmitting(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Créer l'utilisateur dans Firebase Authentication
                    await firebase.auth().createUserWithEmailAndPassword(email, password);

                    // Optionnel : Ajouter des données supplémentaires dans Firestore ou autre

                    // Afficher un message de succès ou rediriger
                    alert('Inscription réussie ! Bienvenue !');

                    // Réinitialiser le formulaire
                    setEmail('');
                    setPassword('');
                    setPromoCode('');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Une erreur est survenue. Veuillez réessayer.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Email :
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Mot de passe :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Code Promo :
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Informations de paiement :
                    <CardElement />
                </label>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={!stripe || isSubmitting}>
                    {isSubmitting ? 'Inscription en cours…' : 'S\'inscrire'}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
