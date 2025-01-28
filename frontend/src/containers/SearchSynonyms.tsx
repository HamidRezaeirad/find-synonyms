import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid2,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../components";
import useAxios from "../hooks/useAxios";
import { SynonymModel } from "../moodels";
import { SearchSynonymsProps } from "../props";

/**
 * `SearchSynonyms` is a React functional component that provides a user interface
 * for searching synonyms of a given word. It includes a search bar where users can
 * input a word and trigger a lookup for synonyms either by pressing the "Enter" key
 * or by clicking a search button.
 *
 * The component maintains the state for the lookup word and the label to display
 * the search results. It uses a custom hook `useAxios` to make an API request to
 * fetch synonyms from the endpoint `/synonyms/lookup`.
 *
 * The search results are displayed in a card format, with each synonym presented
 * as a chip inside a tooltip. If no synonyms are found, the results section remains
 * empty.
 *
 * @component
 * @example
 * return (
 *   <SearchSynonyms />
 * )
 */
const SearchSynonyms: React.FC<SearchSynonymsProps> = ({ onSetAlert }) => {
  const [lookupWord, setLookupWord] = useState<string>("");
  const [lookupLabel, setLookupLabel] = useState<string>("");

  const {
    data: lookupResults,
    error,
    axiosRequest,
  } = useAxios<SynonymModel>("/synonyms/lookup");

  const LookupSynonymsHandler = async () => {
    try {
      await axiosRequest({ method: "GET", params: { word: lookupWord } });
      setLookupWord("");
    } catch (error) {
      console.error("Error fetching synonyms:", error);
    }
  };

  useEffect(() => {
    if (error) {
      onSetAlert(error, "error");
    }
  }, [error]);

  useEffect(() => {
    if (lookupResults?.synonyms.length == 0) {
      onSetAlert(`Oops! No matches for "${lookupLabel}"`, "error");
    }
  }, [lookupResults]);

  const lookupWordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLookupWord(value);
    setLookupLabel(value);
  };

  const searchBarHandleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      LookupSynonymsHandler();
    }
  };

  return (
    <>
      <Grid2 data-testid="SearchSynonyms" container spacing={4}>
        <Grid2 size={12}>
          <SearchBar
            value={lookupWord}
            onChange={lookupWordChangeHandler}
            onClick={LookupSynonymsHandler}
            onKeyDown={searchBarHandleKeyPress}
          />
        </Grid2>
        <Grid2 size={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }} variant="outlined">
            <Typography variant="h6" gutterBottom textAlign={"left"}>
              {lookupLabel ? `Results for ${lookupLabel}` : "Results"}
            </Typography>
            <Card className="bg-color" elevation={0} variant="outlined">
              <CardContent>
                <Typography
                  align="left"
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Synonyms:
                </Typography>
                {lookupResults && lookupResults.synonyms?.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      {lookupResults &&
                        lookupResults.synonyms?.map((synonym, index) => (
                          <Tooltip title={synonym} key={index}>
                            <Chip
                              label={synonym}
                              sx={{
                                maxWidth: 150, // Limit width
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            />
                          </Tooltip>
                        ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default SearchSynonyms;
