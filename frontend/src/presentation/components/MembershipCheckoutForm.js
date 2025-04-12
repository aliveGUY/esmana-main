import {
  Box,
  Button,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CardPayment from "./CardPayment";
import { isEmpty, map } from "lodash";
import { useCreateMembershipPaymentIntentMutation as createPaymentIntentMut } from "../../state/asynchronous";
import {
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useInputFactory from "../../hooks/useInputFactory";
import { loadStripe } from "@stripe/stripe-js";
import SecurityIcon from '@mui/icons-material/Security';

const MembershipCheckoutForm = ({ config }) => {
  const [createPaymentIntent, { data, isLoading }] = createPaymentIntentMut();
  const stripe = useStripe();
  const elements = useElements();
  const factory = useInputFactory();

  const methods = useForm({
    defaultValues: {
      fieldOfWork: "",
      workplace: "",
      position: "",
      workExperience: "",
      education: [],
      diplomaNumber: "",
      educationInstitution: "",
      taxpayerId: "",
      passportId: "",
      passportIssuedBy: "",
      city: "",
      residenceAddress: "",
      country: "",
      region: "",
      phone: "",
      email: "",
      password: "",
      birthDate: "",
      cardOwner: "",
      personalDataCollectionConsent: false,
    },
  });

  const onSubmit = (formData) => {
    createPaymentIntent(formData);
  };

  const handlePaymentConfirmation = useCallback(async () => {
    if (!stripe || !elements) return;

    const formData = methods.getValues();
    const cardNumberElement = elements.getElement(CardNumberElement);

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: formData.cardOwner,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded and account created!");
    }
  }, [data, elements, methods, stripe]);

  useEffect(() => {
    if (isLoading || isEmpty(data)) return;
    handlePaymentConfirmation();
  }, [isLoading, data, handlePaymentConfirmation]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 8 }}>
            <Stack spacing={2}>
              <Paper sx={{ p: 4 }}>
                <CardPayment />
              </Paper>
              <Paper sx={{ p: 4 }}>
                <Stack spacing={4}>
                  {map(config, (section, index) => (
                    <Fragment>
                      <Grid2 container spacing={2}>
                        {map(section.inputs, (input, index) => (
                          <Grid2 size={{ xs: 6 }}>{factory(input)}</Grid2>
                        ))}
                      </Grid2>
                      <Divider />
                    </Fragment>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <Paper sx={{ px: 2, py: 3, position: "sticky", top: 40 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight={700}>Student membership</Typography>
                <Typography>per year</Typography>
              </Stack>
              <Box pl={2} pb={2}>
                <Typography>Starts - Today</Typography>
                <Typography>Ends - 01.01.2026</Typography>
              </Box>
              <Divider />
              <Typography fontSize={24} fontWeight={700} pt={2} pb={1}>
                400 UAH
              </Typography>
              <Button
                endIcon={<SecurityIcon />}
                fullWidth
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "#A644E5" }}
              >
                Submit Order
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </form>
    </FormProvider>
  );
};

const MembershipCheckoutFormWrapper = ({ config }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      <MembershipCheckoutForm config={config} />
    </Elements>
  );
};

export default MembershipCheckoutFormWrapper;
