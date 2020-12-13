import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef(
  ({ children, buttonLabel, cancelLabel = "Cancel" }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <>
        <span style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </span>
        <span style={showWhenVisible}>
          <button onClick={toggleVisibility}>{cancelLabel}</button>
          {children}
        </span>
      </>
    );
  }
);

export default Togglable;