import { map } from "lodash";
import React from "react";

const Checkbox = (props) => {
  const { options } = props;
  return (
    <div className="checkbox-list">
      {map(options, (option, index) => (
        <div>
          <input type="checkbox" id={option} name={option} value={option} />
          <label for={option}>{option}</label>
        </div>
      ))}
       <div>
          <input type="checkbox" id="other" name="other" value="other" />
          <label for="other">Other</label>
        </div>
    </div>
  );
};

export default React.memo(Checkbox);
