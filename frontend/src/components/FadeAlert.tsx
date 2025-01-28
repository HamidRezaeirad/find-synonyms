import { Alert, Fade } from "@mui/material";
import React from "react";
import { AlertProps } from "../props";

/**
 * `FadeAlert` is a React functional component that displays an alert message with a fade-in and fade-out animation.
 *
 * @param {AlertProps} props - The properties passed to the component.
 * @param {string} props.alert - The alert message to be displayed.
 * @param {function} props.onFadeTimeout - The callback function to be called based on props.timeout to fade-out animation.
 * @param {number} props.timeout - The duration (in milliseconds) for which the alert should be displayed before triggering the fade-out animation.
 * @param {AlertType|undefined} props.alerType - The type of alert to be displayed.
 *
 * @returns {JSX.Element} The rendered `FadeAlert` component.
 */
const FadeAlert: React.FC<AlertProps> = ({
  alert,
  onFadeTimeout,
  timeout,
  alerType,
}) => {
  return (
    <>
      <Fade
        in={alert !== undefined}
        timeout={{ enter: 1000, exit: 1000 }}
        addEndListener={() => {
          if (timeout != null) {
            setTimeout(() => {
              onFadeTimeout();
            }, timeout);
          }
        }}
      >
        <Alert
          data-testid="alert"
          severity={alerType ?? "success"}
          variant="standard"
        >
          {alert}
        </Alert>
      </Fade>
    </>
  );
};

export default FadeAlert;
