import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCreateCheckoutSessionMutation } from "../../state/asynchronous/users";
import { isEmpty } from "lodash";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [createCheckoutSession, { data }] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    createCheckoutSession();
  }, [createCheckoutSession]);

  if (isEmpty(data?.clientSecret)) return "Loading...";

  return (
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={{ clientSecret: data.clientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default Payment;
