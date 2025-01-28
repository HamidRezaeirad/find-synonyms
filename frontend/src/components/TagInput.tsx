import { Close } from "@mui/icons-material";
import { Box, Chip, IconButton, TextField } from "@mui/material";
import React from "react";
import { TagInputProps } from "../props";

/**
 * TagInput component allows users to input and manage a list of tags.
 *
 * @component
 * @param {object} props - The properties object.
 * @param {string} props.inputValue - The current value of the input field.
 * @param {string[]} props.tags - The list of tags.
 * @param {boolean} props.error - Indicates if there is an error in the input field validation.
 * @param {string} props.helperText - The helper text to display below the input field validation.
 * @param {boolean} props.required - Indicates if the input field is required.
 * @param {function} props.handleAddTag - Function to handle adding a new tag.
 * @param {function} props.setInputValue - Function to set the input field value.
 * @param {function} props.handleDeleteTag - Function to handle deleting a tag.
 *
 * @returns {JSX.Element} The rendered TagInput component.
 */
const TagInput: React.FC<TagInputProps> = ({
  inputValue,
  tags,
  error,
  helperText,
  required,
  handleAddTag,
  setInputValue,
  handleDeleteTag,
}) => {
  return (
    <Box>
      <TextField
        data-testid="Synonyms"
        label="Synonyms"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Type a synonym and press Enter"
        sx={{ mb: 2 }}
        size="small"
        margin="normal"
        error={error}
        helperText={helperText}
        required={required}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {tags.map((tag, index) => (
          <Chip
            data-testid={tag}
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
            deleteIcon={
              <IconButton data-testid={`delete-${tag}`} size="small">
                <Close fontSize="small" />
              </IconButton>
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagInput;
