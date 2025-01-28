import { Alert, Fade } from "@mui/material";
import React from "react";
import { useAlertContext } from "../hooks/useAlertContext";

/**
 * `FadeAlert` is a React functional component that displays an alert message with a fade-in and fade-out animation.
 *
 * @param {string} props.alert - The alert message to be displayed.
 * @param {function} props.CloseAlert - The callback function to be called to close Alert.
 * @param {AlertType|undefined} props.alerType - The type of alert to be displayed.
 *
 * @returns {JSX.Element} The rendered `FadeAlert` component.
 */

const FadeAlert: React.FC = () => {
  const { alert, onSetAlert, alerType } = useAlertContext();

  const onCloseAlert = () => {
    onSetAlert(undefined, alerType ? alerType : "success");
  };

  return (
    <>
      <Fade in={alert !== undefined} timeout={{ enter: 1000, exit: 1000 }}>
        <Alert
          data-testid="alert"
          severity={alerType ?? "success"}
          variant="standard"
          onClose={onCloseAlert}
        >
          {alert}
        </Alert>
      </Fade>
    </>
  );
};

export default FadeAlert;
