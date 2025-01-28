import { ChangeEventHandler } from "react";

/**
 * Props for the SearchBar component.
 */
export interface SearchBarProps {
  /**
   * The current value of the search input.
   */
  value: string;

  /**
   * Event handler for when the value of the search input changes.
   */
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /**
   * Event handler for when the search button is clicked.
   */
  onClick: () => void;

  /**
   * Event handler for when a key is pressed down in the search input.
   */
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
