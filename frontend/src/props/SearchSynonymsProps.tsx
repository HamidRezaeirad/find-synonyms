import { AlertType } from "../types/alertType";

/**
 * Props for the SearchSynonyms component.
 */
export interface SearchSynonymsProps {
  /**
   * Callback function to set an alert message.
   *
   * @param message - The alert message to be displayed.
   * @param type - The type of alert to be displayed.
   */
  onSetAlert: (message: string, type: AlertType) => void;
}
