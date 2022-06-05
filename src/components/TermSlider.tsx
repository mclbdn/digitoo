import React, { useEffect } from "react";
import { Slider, Typography } from "@mui/material";
import { TermStoreImpl } from "../TermStore";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { GeneralStoreImpl } from "../GeneralStore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface AppProps {
  generalStore: GeneralStoreImpl;
  termStore: TermStoreImpl;
}

const TermSlider: React.FC<AppProps> = observer(({ termStore, generalStore }) => {
  // Set the default term value once we have term data
  useEffect(() => {
    if (termStore.termConstraints?.defaultValue) {
      termStore.setCurrentTerm(termStore.termConstraints.defaultValue);
    }
  }, [termStore.termConstraints]);

  // Set an array of options for terms
  useEffect(() => {
    termStore.setPossibleTermsArray(generalStore.isTermLoaded, termStore.termConstraints!);
  }, [termStore.termConstraints]);

  return (
    <>
      <Box>
        <Typography style={{ display: "inline" }}>You are going to pay it in </Typography>
        <Typography style={{ fontWeight: 600, display: "inline" }}>{termStore.termCurrentValue} installments</Typography>
        <Slider
          name="term"
          id="term"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (target) {
              termStore.setCurrentTerm(+target.value);
            }
          }}
          value={termStore.termCurrentValue}
          min={termStore.termConstraints?.min}
          max={termStore.termConstraints?.max}
          step={termStore.termConstraints?.step}
        />
        <FormControl size="medium">
          <InputLabel id="demo-simple-select-label">Term</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={termStore.termCurrentValue}
            label="Amount"
            onChange={(e) => termStore.setCurrentTerm(+e.target.value)}
          >
            {termStore.possibleTermsArray.map((term, i) => {
              if (term === termStore.termCurrentValue) {
                return (
                  <MenuItem key={i} value={term} selected>
                    {term}
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={i} value={term}>
                  {term}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
});

export default TermSlider;
