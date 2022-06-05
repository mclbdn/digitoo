import React, { useEffect } from "react";
import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { AmountStoreImpl } from "../AmountStore";
import { GeneralStoreImpl } from "../GeneralStore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface AppProps {
  amountStore: AmountStoreImpl;
  generalStore: GeneralStoreImpl;
}

const Amountslider: React.FC<AppProps> = observer(({ amountStore, generalStore }) => {
  // Set the default amount value once we have amount data
  useEffect(() => {
    if (amountStore.amountConstraints?.defaultValue) {
      amountStore.setCurrentAmount(amountStore.amountConstraints.defaultValue);
    }
  }, [amountStore.amountConstraints]);

  // Set an array of options for amounts
  useEffect(() => {
    amountStore.setPossibleAmountsArray(generalStore.loadAmounts, amountStore.amountConstraints!);
  }, [amountStore.amountConstraints]);

  return (
    <>
      <Box>
        <Typography style={{ display: "inline" }}>You are about to borrow </Typography>
        <Typography style={{ fontWeight: 600, display: "inline" }}>${amountStore.amountCurrentValue}</Typography>
        <Slider
          name="amount"
          id="amount"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            if (target) {
              amountStore.setCurrentAmount(+target.value);
            }
          }}
          value={amountStore.amountCurrentValue}
          min={amountStore.amountConstraints?.min}
          max={amountStore.amountConstraints?.max}
          step={amountStore.amountConstraints?.step}
        />
        <FormControl size="medium">
          <InputLabel id="demo-simple-select-label">Amount $</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={amountStore.amountCurrentValue}
            label="Amount"
            onChange={(e) => amountStore.setCurrentAmount(+e.target.value)}
          >
            {amountStore.possibleAmountsArray.map((amount, i) => {
              if (amount === amountStore.amountCurrentValue) {
                return (
                  <MenuItem key={i} value={amount} selected>
                    {amount}
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={i} value={amount}>
                  {amount}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
});

export default Amountslider;
