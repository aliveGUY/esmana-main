import React, { Fragment, useState } from "react";
import { map } from "lodash";
import { Grid2, Typography, Stack, Button } from "@mui/material";
import CheckoutStep from "../components/CheckoutStep";
import InputFactory from "../components/InputFactory";

import LoginImage from "../../static/images/image1_0.jpg";
import TopBarNavigation from "../common/TopBarNavigation";

const CheckoutMembership = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const config = [
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
      ],
    },
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
      stepName: "Education",
      inputs: [
        {
          name: "education",
          label: "Education",
          inputType: "textfield",
        },
        {
          name: "education_institution",
          label: "Education institution",
          inputType: "textfield",
        },
        {
          name: "diploma_number",
          label: "Diploma number",
          inputType: "textfield",
        },
      ],
    },
    {
      stepName: "Work",
      inputs: [
        {
          name: "workplace",
          label: "Workplace",
          inputType: "textfield",
        },
        {
          name: "field_of_work",
          label: "Field of work",
          inputType: "textfield",
        },
        {
          name: "position",
          label: "Position",
          inputType: "textfield",
        },
        {
          name: "experience",
          label: "Experience",
          inputType: "textfield",
        },
      ],
    },
    {
      stepName: "Location",
      inputs: [
        {
          name: "country",
          label: "Country",
          inputType: "textfield",
        },
        {
          name: "region",
          label: "Region",
          inputType: "textfield",
        },
        {
          name: "city",
          label: "City",
          inputType: "textfield",
        },
        {
          name: "residence_address",
          label: "Residence address",
          inputType: "textfield",
        },
      ],
    },
    {
      stepName: "Secures",
      inputs: [
        {
          name: "password",
          label: "Password",
          inputType: "textfield",
        },
        {
          name: "taxpayer_id",
          label: "Taxpayer id",
          inputType: "textfield",
        },
        {
          name: "passport id",
          label: "Passport id",
          inputType: "textfield",
        },
        {
          name: "passport_issued_by",
          label: "Passport issued by",
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
          <Stack p={4} spacing={2} mb={10}>
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

export default CheckoutMembership;
