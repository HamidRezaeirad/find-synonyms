/**
 * Props for the TagInput component.
 */
export interface TagInputProps {
  /**
   * Array of tags to be displayed.
   */
  tags: string[];

  /**
   * Current value of the input field.
   */
  inputValue: string;

  /**
   * Indicates if there is an error.
   * @default false
   */
  error?: boolean;

  /**
   * Helper text to be displayed below the input field.
   * @default null
   */
  helperText?: string | null;

  /**
   * Indicates if the input field is required.
   * @default false
   */
  required?: boolean;

  /**
   * Function to set the value of the input field.
   */
  setInputValue: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Function to handle adding a tag when a keyboard event occurs.
   * @param event - The keyboard event.
   */
  handleAddTag: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Function to handle deleting a tag.
   * @param tagToDelete - The tag to be deleted.
   */
  handleDeleteTag: (tagToDelete: string) => void;
}
