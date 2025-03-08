import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCreateCheckoutSessionMutation } from "../../state/asynchronous/users";
import { isEmpty } from "lodash";
import Paper from "@mui/material/Paper";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [createCheckoutSession, { data }] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    createCheckoutSession();
  }, [createCheckoutSession]);

  if (isEmpty(data?.clientSecret)) return "Loading...";

  return (
    <Paper>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret: data.clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </Paper>
  );
};

export default Checkout;
