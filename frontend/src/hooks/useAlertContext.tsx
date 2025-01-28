import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";

export const useAlertContext = () => {
  const alertContext = useContext(AlertContext);

  if (alertContext === undefined) {
    throw new Error("Alert Conetxt is undefined");
  }

  return { ...alertContext };
};
