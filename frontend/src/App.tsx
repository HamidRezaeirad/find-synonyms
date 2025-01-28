import { Box, Grid2, Typography } from "@mui/material";
import React, { useState } from "react";
import { FadeAlert, Navbar } from "./components";
import { AddSynonyms, SearchSynonyms } from "./containers";
import { AlertType } from "./types/alertType";

const App: React.FC = () => {
  const [alert, setAlert] = useState<string | undefined>(undefined);
  const [alerType, setAlertType] = useState<AlertType | undefined>(undefined);

  const onCloseAlertHandler = () => {
    setAlert(undefined);
  };

  const onSetAlertHandler = (message: string, type?: AlertType) => {
    setAlert(message);
    setAlertType(type);
  };

  return (
    <Box sx={{ margin: "auto" }}>
      <Grid2 size={12}>
        <Navbar />
      </Grid2>
      <Grid2 size={6} sx={{ p: 2, maxWidth: 500, margin: "auto" }}>
        <FadeAlert
          alert={alert}
          onCloseAlert={onCloseAlertHandler}
          alerType={alerType}
        />
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
            <SearchSynonyms onSetAlert={onSetAlertHandler} />
          </Grid2>

          <Grid2 size={12}>
            <AddSynonyms onSetAlert={onSetAlertHandler} />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default App;
