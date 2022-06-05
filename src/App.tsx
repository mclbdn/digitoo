import React, { useEffect } from "react";
import "./App.css";
import { Typography, Stack, Divider } from "@mui/material";
import { Container } from "@mui/system";
import { GeneralStore } from "./GeneralStore";
import { TermStore } from "./TermStore";
import Amountslider from "./components/AmountSlider";
import TermSlider from "./components/TermSlider";
import Result from "./components/Result";
import { AmountStore } from "./AmountStore";

const App: React.FC = () => {
  const getConstraints = async () => {
    const response = await fetch("https://js-developer-second-round.herokuapp.com/api/v1/application/constraints");

    const data = await response.json();

    AmountStore.addAmountConstraints(data.amountInterval);
    GeneralStore.setIsAmountLoaded(false);
    TermStore.addTermConstraints(data.termInterval);
    GeneralStore.setIsTermLoaded(true);
  };

  // First, get constraints
  useEffect(() => {
    getConstraints();
  }, []);

  return (
    <Container>
      <Typography variant="h3" align="center">
        Loan Calculator
      </Typography>

      <Stack spacing={2} divider={<Divider orientation="horizontal" />}>
        <Amountslider generalStore={GeneralStore} amountStore={AmountStore} />
        <TermSlider generalStore={GeneralStore} termStore={TermStore} />
        <Result generalStore={GeneralStore} termStore={TermStore} amountStore={AmountStore} />
      </Stack>
    </Container>
  );
};

export default App;
