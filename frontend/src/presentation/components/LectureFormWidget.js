import React, { useCallback } from "react";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import { FormProvider, useForm } from "react-hook-form";
import DatePicker from "../common/Inputs/DatePicker";

const LectureFormWidget = (props) => {
  const { onCancel } = props;

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      speakers: "",
      startsAt: "",
      duration: "",
    },
  });

  const onSubmit = useCallback((data) => console.log({ data }), []);

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="lecture-creation-form"
        >
          <OutlineTextfield required inputId="title" label="Title" />
          <OutlineTextfield required inputId="speakers" label="Speakers" />
          <DatePicker required inputId="startsAt" label="Start at" />
          <DatePicker required inputId="duration" label="Duration" />
          <div className="actions">
            <button
              type="button"
              onClick={onCancel}
              className="button black medium outlined"
            >
              Cancel
            </button>
            <button className="button black medium">Create</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default React.memo(LectureFormWidget);
