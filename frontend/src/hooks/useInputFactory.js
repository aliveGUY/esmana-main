import {
  INPUT_TYPE_CHECKBOX,
  INPUT_TYPE_PASSWORD,
  INPUT_TYPE_RADIO,
  INPUT_TYPE_TEXTAREA,
  INPUT_TYPE_TEXTFIELD,
} from "../constants";
import Checkbox from "../presentation/common/inputs/Checkbox";
import Password from "../presentation/common/inputs/Password";
import RadioButton from "../presentation/common/inputs/RadioButton";
import TextArea from "../presentation/common/inputs/TextArea";
import TextField from "../presentation/common/inputs/TextField";

export default function useInputFactory() {
  const inputs = {
    [INPUT_TYPE_TEXTFIELD]: TextField,
    [INPUT_TYPE_PASSWORD]: Password,
    [INPUT_TYPE_TEXTAREA]: TextArea,
    [INPUT_TYPE_RADIO]: RadioButton,
    [INPUT_TYPE_CHECKBOX]: Checkbox,
  };

  return ({ inputType, ...rest }) => {
    const Component = inputs[inputType];
    return <Component {...rest} />;
  };
}
