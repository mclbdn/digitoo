import React, { useEffect } from "react";
import { Slider, Typography } from "@mui/material";
import { TermStoreImpl } from "../TermStore";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { GeneralStoreImpl } from "../GeneralStore";

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
        <Typography gutterBottom>
          You are going to pay it in <Typography style={{ fontWeight: 600, display: "inline" }}>{termStore.termCurrentValue} installments</Typography>
        </Typography>
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

        <select onChange={(e) => termStore.setCurrentTerm(+e.target.value)}>
          {termStore.possibleTermsArray.map((term) => {
            if (term === termStore.termCurrentValue) {
              return (
                <option value={term} selected>
                  {term}
                </option>
              );
            }
            return <option value={term}>{term}</option>;
          })}
        </select>
      </Box>
    </>
  );
});

export default TermSlider;
