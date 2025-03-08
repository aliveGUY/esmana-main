import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCreateCheckoutSessionMutation } from "../../state/asynchronous/users";
import { isEmpty } from "lodash";
import Paper from "@mui/material/Paper";

// public key
const stripePromise = loadStripe(
  "pk_test_51QxmlVJ0C91nYQSaZ2EIU2SNoyb0hyt5I6GE4BqD5OQvflvvXDqder9yqV6fMoVp9CWXIOMis1pfjmcyveRyyYjV00dy5XBmNI"
);

const Checkout = () => {
  const [createCheckoutSession, { data }] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    createCheckoutSession();
  }, []);

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
