import { action, makeObservable, observable } from "mobx";

interface amountConstraintsI {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export class AmountStoreImpl {
  amountConstraints: amountConstraintsI = {};
  amountCurrentValue: number = 0;
  possibleAmountsArray: number[] = [];

  constructor() {
    makeObservable(this, {
      amountConstraints: observable,
      amountCurrentValue: observable,
      possibleAmountsArray: observable,
      addAmountConstraints: action,
      setPossibleAmountsArray: action,
      setCurrentAmount: action,
    });
  }

  addAmountConstraints(fetchedAmountConstraints: amountConstraintsI) {
    this.amountConstraints = fetchedAmountConstraints;
  }

  setPossibleAmountsArray(isAmountLoaded: boolean, fetchedAmountConstraints: amountConstraintsI) {
    if (!isAmountLoaded && fetchedAmountConstraints.min && fetchedAmountConstraints.max && fetchedAmountConstraints.step) {
      for (let i = fetchedAmountConstraints?.min; i <= fetchedAmountConstraints?.max; i += fetchedAmountConstraints.step) {
        this.possibleAmountsArray.push(i);
      }
    }
  }

  setCurrentAmount(currentAmount: number) {
    this.amountCurrentValue = currentAmount;
  }
}

export const AmountStore = new AmountStoreImpl();
