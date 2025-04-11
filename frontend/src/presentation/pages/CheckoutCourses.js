import React, { Fragment, useState } from "react";
import { map } from "lodash";
import { Grid2, Typography, Stack, Button, Box } from "@mui/material";
import CheckoutStep from "../components/CheckoutStep";
import InputFactory from "../components/InputFactory";

import LoginImage from "../../static/images/image1_0.jpg";
import TopBarNavigation from "../common/TopBarNavigation";

const CheckoutCourses = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const config = [
    {
      stepName: "Personal",
      inputs: [
        {
          name: "first_name",
          label: "First name",
          inputType: "textfield",
        },
        {
          name: "middle_name",
          label: "Middle name",
          inputType: "textfield",
        },
        {
          name: "last_name",
          label: "Last name",
          inputType: "textfield",
        },
        {
          name: "birth_date",
          label: "Birth date",
          inputType: "textfield",
        },
      ],
    },
    {
      stepName: "General",
      inputs: [
        {
          name: "email",
          label: "Email",
          inputType: "textfield",
        },
        {
          name: "phone_number",
          label: "Phone number",
          inputType: "textfield",
        },
        {
          name: "password",
          label: "Password",
          inputType: "textfield",
        },
      ],
    },
    {
      stepName: "Payment",
      inputs: [
        {
          name: "payment",
          label: "Payment",
          inputType: "payment",
        },
      ],
    },
  ];

  const onCheckoutStepToggle = ({ index }) => {
    setCurrentStep(index);
  };

  const onContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <Fragment>
      <TopBarNavigation />
      <Grid2 container minHeight="calc(100vh - 64px)">
        <Grid2 size={{ xs: 4 }}>
          <Stack p={4} spacing={2}>
            <Typography variant="h4">Registration</Typography>
            <Stack>
              {map(config, (item, index) => (
                <CheckoutStep
                  key={index}
                  step={item}
                  index={index + 1}
                  totalCount={config.length}
                  onToggle={onCheckoutStepToggle}
                  currentStep={currentStep}
                >
                  <Stack spacing={2}>
                    {map(item.inputs, (input, index) => (
                      <InputFactory key={index} {...input} />
                    ))}
                    {index + 1 !== config.length && (
                      <Button onClick={onContinue}>Continue</Button>
                    )}
                  </Stack>
                </CheckoutStep>
              ))}
            </Stack>
          </Stack>
        </Grid2>
        <Grid2
          size={{ xs: 8 }}
          sx={{
            overflow: "hidden",
            position: "relative",
            img: {
              position: "absolute",
              top: 0,
              left: "50%",
              bottom: 0,
              right: 0,
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transform: "translateX(-50%)",
            },
          }}
        >
          <img src={LoginImage} />
        </Grid2>
      </Grid2>
    </Fragment>
  );
};

export default CheckoutCourses;
