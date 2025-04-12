import React, { Fragment } from "react";
import { Grid2, Box, TextField } from "@mui/material";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log({ data });

    if (!stripe || !elements) {
      return;
    }

    // Send registration data and item ID to the server
    const response = await fetch(
      "http://localhost:8080/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          itemId: "your_item_id",
        }),
      }
    );

    const { clientSecret } = await response.json();

    const cardNumberElement = elements.getElement(CardNumberElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: data.name,
          email: data.email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded and account created!");
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <TextField />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <Box
              sx={{
                border: "1px solid #ced4da",
                borderRadius: 1,
                padding: 2,
                backgroundColor: "#fff",
              }}
            >
              <CardNumberElement />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Box
              sx={{
                border: "1px solid #ced4da",
                borderRadius: 1,
                padding: 2,
                backgroundColor: "#fff",
              }}
            >
              <CardExpiryElement />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6 }}>
            <Box
              sx={{
                border: "1px solid #ced4da",
                borderRadius: 1,
                padding: 2,
                backgroundColor: "#fff",
              }}
            >
              <CardCvcElement />
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <TextField {...register("name")} />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField {...register("email")} />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField {...register("phone")} />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField {...register("password")} />
          </Grid2>
        </Grid2>
        <button type="submit">Buy</button>
      </form>
    </Fragment>
  );
};

const CheckoutMembership = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default CheckoutMembership;
