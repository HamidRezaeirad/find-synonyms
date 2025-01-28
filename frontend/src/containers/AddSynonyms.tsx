import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TagInput } from "../components";
import { useAlertContext } from "../hooks/useAlertContext";
import useAxios from "../hooks/useAxios";

/**
 * AddSynonyms component allows users to add a new word along with its synonyms.
 * It provides input fields for the word and its synonyms, validates the inputs,
 * and sends a request to add the synonyms to the server.
 *
 * @component
 * @param {AddSynonymsProps} props - The props for the AddSynonyms component.
 * @param {function} props.onSetAlert - Function to set alert messages.
 *
 * @returns {JSX.Element} The rendered AddSynonyms component.
 *
 * @example
 * <AddSynonyms onSetAlert={handleSetAlert} />
 *
 * @remarks
 * This component uses the `useAxios` hook to send a POST request to the server
 * to add the synonyms. It also includes validation for the word and synonyms
 * before sending the request.
 */
const AddSynonyms: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [wordError, setWordError] = useState<string | null>(null);
  const [synonymsError, setSynonymsError] = useState<string | null>(null);

  const { AlertSate } = useAlertContext();
  const { onSetAlert } = AlertSate;

  const { axiosRequest, error } = useAxios<{ success: boolean }>(
    "/synonyms/add"
  );

  useEffect(() => {
    if (error) {
      onSetAlert(error, "error");
    }
  }, [error]);

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!synonyms.includes(inputValue.trim())) {
        setSynonyms((prevTags) => [...prevTags, inputValue.trim()]);
        setInputValue("");
        setSynonymsError(null);
      }
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setSynonyms((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const addSynonymsHandler = async () => {
    try {
      // Validate word and tags before saving
      const isWordValid = handleWordValidation();

      if (!isWordValid || synonyms.length === 0) {
        if (synonyms.length === 0)
          setSynonymsError("At least one synonym is required.");
        return;
      }
      await axiosRequest({ method: "POST", data: { word, synonyms } });
      onSetAlert(`Synonyms for '${word}' added successfully!`);
      setWord("");
      setSynonyms([]);
    } catch (error) {
      console.error("Error adding synonyms:", error);
    }
  };

  const handleWordValidation = () => {
    const trimmedWord = word.trim();

    // Validation for word
    if (!trimmedWord) {
      setWordError("Word cannot be empty.");
      return false;
    }
    if (trimmedWord.length > 30) {
      setWordError("Word cannot exceed 30 characters.");
      return false;
    }

    setWordError(null); // Clear word error if valid
    return true;
  };

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 2 }} variant="outlined">
        <Typography variant="h6" gutterBottom align="left">
          Add New Word
        </Typography>
        <TextField
          data-testid="Word"
          label="Word"
          fullWidth
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onBlur={handleWordValidation}
          error={!!wordError}
          helperText={wordError}
          variant="outlined"
          margin="normal"
          size="small"
        />
        <TagInput
          inputValue={inputValue}
          tags={synonyms}
          handleAddTag={handleAddTag}
          setInputValue={setInputValue}
          handleDeleteTag={handleDeleteTag}
          error={!!synonymsError}
          helperText={synonymsError}
          required={true}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addSynonymsHandler}
          fullWidth
          sx={{ mt: 2, bgcolor: "text.primary", borderRadius: 2 }}
        >
          Add Synonyms
        </Button>
      </Paper>
    </>
  );
};

export default AddSynonyms;
