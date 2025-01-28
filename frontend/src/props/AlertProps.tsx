import { AlertType } from "../types/alertType";

/**
 * Interface representing the properties for the Alert component.
 */

export interface AlertProps {
  /**
   * The alert message to be displayed. It can be a string or undefined.
   */
  alert: string | undefined;

  /**
   * Callback function to be called when the alert close occurs.
   */
  onCloseAlert: () => void;

  /**
   * The type of alert to be displayed.
   */
  alerType?: AlertType;
}
