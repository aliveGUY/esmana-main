import React, { Fragment, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid2,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Elements,
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FormProvider, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import { useCreateMembershipPaymentIntentMutation as createPaymentIntentMut } from "../../state/asynchronous";
import CardPayment from "../components/CardPayment";
import useInputFactory from "../../hooks/useInputFactory";
import { INPUT_TYPE_TEXTFIELD } from "../../constants";
import { map } from "lodash";

const Payment = () => {
  const [createPaymentIntent, { data, isLoading }] = createPaymentIntentMut();
  const stripe = useStripe();
  const elements = useElements();
  const factory = useInputFactory();

  const config = [
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "firstName",
          label: "First name",
          placeholder: "Enter your first name",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "middleName",
          label: "Middle name",
          placeholder: "Enter your middle name",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "lastName",
          label: "Last name",
          placeholder: "Enter your last name",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "birthDate",
          label: "Birth date",
          placeholder: "Enter your birth date",
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "country",
          label: "Country",
          placeholder: "Enter your country",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "region",
          label: "Region",
          placeholder: "Enter your region",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "city",
          label: "City",
          placeholder: "Enter your city",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "residenceAddress",
          label: "Residence address",
          placeholder: "Enter your residence address",
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "education",
          label: "Education",
          placeholder: "Enter your education",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "diplomaNumber",
          label: "Diploma number",
          placeholder: "Enter your diploma number",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "educationInstitution",
          label: "Education institution",
          placeholder: "Enter your education institution",
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "fieldOfWork",
          label: "Field of work",
          placeholder: "Enter your field of work",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "workplace",
          label: "Workplace",
          placeholder: "Enter your workplace",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "position",
          label: "Position",
          placeholder: "Enter your position",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "workExperience",
          label: "Work experience",
          placeholder: "Enter your work experience",
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "phone",
          label: "Phone",
          placeholder: "Enter your phone",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "password",
          label: "Password",
          placeholder: "Enter your password",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "confirmPassword",
          label: "Confirm password",
          placeholder: "Enter your confirm password",
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "taxpayerId",
          label: "Taxpayer id",
          placeholder: "Enter your taxpayer id",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "passportId",
          label: "Passport id",
          placeholder: "Enter your passport id",
        },
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "passportIssuedBy",
          label: "Passport issued by",
          placeholder: "Enter your passport issued by",
        },
      ],
    },
    {
      inputs: [
        {
          inputType: INPUT_TYPE_TEXTFIELD,
          name: "personalDataCollectionConsent",
          label: "Agreement",
          placeholder: "Enter your agreement",
        },
      ],
    },
  ];

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
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        py: 5,
        px: 3,
      }}
    >
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
              <Paper sx={{ p: 2, position: "sticky", top: 40 }}>
                <Typography>Student membership</Typography>
                <Typography>400 UAH</Typography>
                <Button fullWidth variant="contained" type="submit">
                  Buy
                </Button>
              </Paper>
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Box>
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
