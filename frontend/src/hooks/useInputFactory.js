import { INPUT_TYPE_TEXTFIELD } from "../constants";
import TextField from "../presentation/common/inputs/TextField";

export default function useInputFactory() {
  const inputs = {
    [INPUT_TYPE_TEXTFIELD]: TextField,
  };

  return ({ inputType, ...rest }) => {
    const Component = inputs[inputType];
    return <Component {...rest} />;
  };
}
