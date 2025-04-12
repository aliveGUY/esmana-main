import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { INPUT_TYPE_TEXTFIELD } from "../../constants";
import MembershipCheckoutForm from "../components/MembershipCheckoutForm";
import SectionWrapper from "../common/SectionWrapper";
import NavLogo from "../../static/images/logo-big.png";

const CheckoutMembership = () => {
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

  return (
    <Box pb={4}>
      <Box
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(135deg,#0045a2 10%,#A644E5 100%)",
        }}
      >
        <SectionWrapper>
          <Stack>
            <Box sx={{ img: { height: 44 } }}>
              <img src={NavLogo} alt="Esmana logo" className="logo" />
            </Box>
            <Typography color="white" fontSize={32} textAlign="center">
              Join a Public Association
            </Typography>
          </Stack>
        </SectionWrapper>
      </Box>
      <SectionWrapper>
        <MembershipCheckoutForm config={config} />
      </SectionWrapper>
    </Box>
  );
};

export default CheckoutMembership;
