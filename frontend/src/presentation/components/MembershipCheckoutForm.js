import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CardPayment from "./CardPayment";
import { isEmpty, map } from "lodash";
import {
  useCreateMembershipPaymentIntentMutation,
  useCheckRegistrationStatusMutation,
} from "../../state/asynchronous";
import {
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useInputFactory from "../../hooks/useInputFactory";
import useInterval from "../../hooks/useInterval";
import { loadStripe } from "@stripe/stripe-js";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { INPUT_SPREAD_HALF } from "../../constants";

const MembershipCheckoutForm = ({ config }) => {
  const [
    createPaymentIntent,
    { data: paymentIntentData, isLoading: isPaymentIntentLoading },
  ] = useCreateMembershipPaymentIntentMutation();
  const [
    checkRegistrationStatus,
    { data: registrationData, isLoading: isRegisterLoading },
  ] = useCheckRegistrationStatusMutation();

  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [retries, setRetries] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const maxRetries = 20;
  const navigate = useNavigate();

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
    setIsLoading(true);
  };

  const handleInputSizing = ({ spread }) => {
    if (spread === INPUT_SPREAD_HALF) return { xs: 6 };
    return { xs: 12 };
  };

  useInterval(
    () => {
      if (retries >= maxRetries) {
        setIsLoading(false);
        return;
      }

      if (!isRegisterLoading) {
        checkRegistrationStatus(paymentIntentId);
        setRetries((prev) => prev + 1);
      }
    },
    isLoading ? 1000 : null
  );

  const handlePaymentConfirmation = useCallback(async () => {
    if (!stripe || !elements || !paymentIntentData) return;

    const formData = methods.getValues();
    const cardNumberElement = elements.getElement(CardNumberElement);

    const result = await stripe.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: formData.cardOwner,
          },
        },
      }
    );

    if (result.error) {
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      setPaymentIntentId(result.paymentIntent.id);
      setRetries(0);
    }
  }, [paymentIntentData, elements, methods, stripe]);

  useEffect(() => {
    if (isPaymentIntentLoading || isEmpty(paymentIntentData)) return;
    handlePaymentConfirmation();
  }, [isPaymentIntentLoading, paymentIntentData, handlePaymentConfirmation]);

  useEffect(() => {
    if (registrationData?.success) {
      setIsLoading(false);
      navigate("/dashboard");
    }
  }, [registrationData, navigate]);

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
                    <Fragment key={index}>
                      <Grid2 container spacing={2}>
                        {map(section.inputs, (input, inputIndex) => (
                          <Grid2
                            size={handleInputSizing(input)}
                            key={inputIndex}
                          >
                            {factory(input)}
                          </Grid2>
                        ))}
                      </Grid2>
                      {config.length - 1 !== index && <Divider />}
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
                endIcon={!isLoading && <SecurityIcon />}
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{ backgroundColor: "#A644E5" }}
              >
                {isLoading ? (
                  <CircularProgress
                    color="secondary"
                    sx={{ width: "26px !important", height: "26px !important" }}
                  />
                ) : (
                  "Submit Order"
                )}
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
