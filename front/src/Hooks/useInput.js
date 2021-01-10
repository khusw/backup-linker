import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange };
};
