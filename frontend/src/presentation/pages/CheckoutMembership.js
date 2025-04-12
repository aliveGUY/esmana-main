import React, { Fragment, useCallback, useEffect } from "react";
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
import { isEmpty } from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import { useCreateMembershipPaymentIntentMutation as createPaymentIntentMut } from "../../state/asynchronous";

const Payment = () => {
  const [createPaymentIntent, { data, isLoading }] = createPaymentIntentMut();
  const stripe = useStripe();
  const elements = useElements();

  const { handleSubmit, register, getValues } = useForm({
    defaultValues: {
      city: "",
      birthDate: "",
      workplace: "",
      position: "",
      education: [],
      fieldOfWork: "",
      diplomaNumber: "",
      personalDataCollectionConsent: false,
      residenceAddress: "",
      country: "",
      region: "",
      taxpayerId: "",
      passportId: "",
      passportIssuedBy: "",
      educationInstitution: "",
      workExperience: "",
      relevantTopics: "",
      user: {},
    },
  });

  const onSubmit = (formData) => {
    createPaymentIntent(formData);
  };

  const handlePaymentConfirmation = useCallback(async () => {
    if (!stripe || !elements) return;

    console.log({ data });

    const formData = getValues();
    const cardNumberElement = elements.getElement(CardNumberElement);

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    }

    if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded and account created!");
    }
  }, [data, elements, getValues, stripe]);

  useEffect(() => {
    if (isLoading || isEmpty(data)) return;
    handlePaymentConfirmation();
  }, [isLoading, data, handlePaymentConfirmation]);

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
