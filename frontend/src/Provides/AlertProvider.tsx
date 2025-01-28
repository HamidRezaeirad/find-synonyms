import { ReactNode, useState } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { AlertType } from "../types/alertType";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<string | undefined>(undefined);
  const [alerType, setAlertType] = useState<AlertType | undefined>(undefined);

  const onSetAlert = (alert: string | undefined, alerType?: AlertType) => {
    setAlert(alert);
    setAlertType(alerType);
  };

  return (
    <AlertContext.Provider value={{ alert, alerType, onSetAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
