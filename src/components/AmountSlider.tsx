import React, { useEffect } from "react";
import { Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { AmountStoreImpl } from "../AmountStore";
import { GeneralStoreImpl } from "../GeneralStore";

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
    amountStore.setPossibleAmountsArray(generalStore.isAmountLoaded, amountStore.amountConstraints!);
  }, [amountStore.amountConstraints]);

  return (
    <>
      <Box>
        <Typography gutterBottom>
          You are about to borrow <Typography style={{ fontWeight: 600, display: "inline" }}>${amountStore.amountCurrentValue}</Typography>
        </Typography>
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

        <select onChange={(e) => amountStore.setCurrentAmount(+e.target.value)}>
          {amountStore.possibleAmountsArray.map((amount) => {
            if (amount === amountStore.amountCurrentValue) {
              return (
                <option value={amount} selected>
                  {amount}
                </option>
              );
            }
            return <option value={amount}>{amount}</option>;
          })}
        </select>
      </Box>
    </>
  );
});

export default Amountslider;
