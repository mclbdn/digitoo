import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { GeneralStoreImpl } from "../GeneralStore";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { TermStoreImpl } from "../TermStore";
import { AmountStoreImpl } from "../AmountStore";

interface AppProps {
  amountStore: AmountStoreImpl;
  generalStore: GeneralStoreImpl;
  termStore: TermStoreImpl;
}

const Result: React.FC<AppProps> = observer(({ generalStore, termStore, amountStore }) => {
  const calculateLoan = async () => {
    const response = await fetch(
      `https://js-developer-second-round.herokuapp.com/api/v1/application/first-loan-offer?amount=${amountStore.amountCurrentValue}&term=${termStore.termCurrentValue}`
    );

    const data = await response.json();

    generalStore.setMonthlyPayment(data.monthlyPayment);
    generalStore.setTotalRepayableAmount(data.totalRepayableAmount);
  };

  // If the current amount / term changes, recalculate
  useEffect(() => {
    calculateLoan();
  }, [amountStore.amountCurrentValue, termStore.termCurrentValue]);

  // Set interest to pay
  useEffect(() => {
    generalStore.setInterestToPay(generalStore.totalRepayableAmount, amountStore.amountCurrentValue);
  }, [generalStore.monthlyPayment, generalStore.totalRepayableAmount]);

  return (
    <>
      <Box>
        <Typography style={{ display: "inline" }}>The monthly payment you are going to pay is: </Typography>
        <Typography style={{ fontWeight: 600, display: "inline" }}>
          ${generalStore.monthlyPayment ? generalStore.monthlyPayment.toFixed(2) : ""}
        </Typography>
      </Box>
      <Box>
        <Typography style={{ display: "inline" }}>The total repayable amount is: </Typography>
        <Typography style={{ fontWeight: 600, display: "inline" }}>
          ${generalStore.totalRepayableAmount ? generalStore.totalRepayableAmount : ""}
        </Typography>
      </Box>
      <Box>
        <Typography style={{ display: "inline" }}>The interest is: </Typography>
        <Typography style={{ fontWeight: 600, display: "inline" }}>${generalStore.interest ? generalStore.interest : ""}</Typography>
      </Box>
    </>
  );
});

export default Result;
