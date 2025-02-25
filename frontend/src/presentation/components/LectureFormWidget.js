import React, { useCallback, useEffect } from "react";
import OutlineTextfield from "../common/Inputs/OutlineTextfield";
import { FormProvider, useForm } from "react-hook-form";
import DatePicker from "../common/Inputs/DatePicker";
import {
  useCreateLectureMutation,
  useSearchForUserMutation,
} from "../../state/asynchronous/users";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import MultiValueAutoSelect from "../common/Inputs/MultiValueAutoSelect";

const LectureFormWidget = (props) => {
  const { onCancel, courseId } = props;

  const [searchForUser, { data }] = useSearchForUserMutation();
  const [createLecture, { isSuccess }] = useCreateLectureMutation();
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      speakers: [],
      startTime: "",
      endTime: "",
      course: { id: courseId },
    },
  });

  const parseValue = (option) => option.email;

  const onSubmit = useCallback(createLecture, [createLecture]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    if (!isEmpty(value)) searchForUser(value);
  }, []);

  useEffect(() => {
    if (isSuccess) onCancel();
  }, [isSuccess]);

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="lecture-creation-form"
        >
          <OutlineTextfield required inputId="title" label="Title" />
          <MultiValueAutoSelect
            required
            inputId="speakers"
            label="Speakers"
            onChange={handleSearch}
            options={data}
            parseValue={parseValue}
          />
          <DatePicker isHourly required inputId="startTime" label="Start at" />
          <DatePicker isHourly required inputId="endTime" label="Ends at" />
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

LectureFormWidget.propTypes = {
  courseId: PropTypes.number.isRequired,
};

export default React.memo(LectureFormWidget);
