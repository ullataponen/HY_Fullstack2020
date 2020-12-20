import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef(
  ({ children, buttonLabel, cancelLabel = "Cancel" }, ref) => {
    const [visible, setVisible] = useState(false);

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
        {!visible ? (
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        ) : (
          <span className="togglableContent">
            <button onClick={toggleVisibility}>{cancelLabel}</button>
            {children}
          </span>
        )}
      </>
    );
  }
);

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
