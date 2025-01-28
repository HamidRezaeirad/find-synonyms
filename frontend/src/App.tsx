import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { FadeAlert, Navbar } from "./components";
import { AddSynonyms, SearchSynonyms } from "./containers";
import { AlertProvider } from "./Provides/AlertProvider";

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Box sx={{ margin: "auto" }}>
        <Grid2 size={12}>
          <Navbar />
        </Grid2>
        <Grid2 size={6} sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
          <FadeAlert />
        </Grid2>
        <Box sx={{ p: 1, maxWidth: 800, margin: "auto" }}>
          <Grid2 size={12}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ fontWeight: 500 }}
            >
              Find Synonyms
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="h6" align="center" sx={{ pb: 3 }}>
              Enter a word to find its synonyms
            </Typography>
          </Grid2>
        </Box>
        <Box sx={{ p: 1, maxWidth: 800, margin: "auto" }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <SearchSynonyms />
            </Grid2>

            <Grid2 size={12}>
              <AddSynonyms />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </AlertProvider>
  );
};

export default App;
