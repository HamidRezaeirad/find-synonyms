import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export const useAlertContext = () => {
  const AlertSate = useContext(AlertContext);

  if (AlertSate === undefined) {
    throw new Error("Alert Conetxt is undefined");
  }

  return { AlertSate };
};
