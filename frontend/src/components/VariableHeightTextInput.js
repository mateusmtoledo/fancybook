import React from "react";
import TextArea from "../styles/TextArea";

const VariableHeightTextInput = React.forwardRef(
  ({ text, setText, ...props }, ref) => {
    function handleChange(event) {
      const element = event.target;
      setText(element.value);
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    }

    return (
      <TextArea
        ref={ref}
        value={text}
        onChange={handleChange}
        rows="1"
        {...props}
      />
    );
  }
);

export default VariableHeightTextInput;
