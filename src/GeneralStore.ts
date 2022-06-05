import { action, makeObservable, observable } from "mobx";

export class GeneralStoreImpl {
  isAmountLoaded = false;
  isTermLoaded = false;
  monthlyPayment = 0;
  totalRepayableAmount = 0;
  interest = 0;

  constructor() {
    makeObservable(this, {
      isAmountLoaded: observable,
      isTermLoaded: observable,
      monthlyPayment: observable,
      totalRepayableAmount: observable,
      interest: observable,
      setIsAmountLoaded: action,
      setIsTermLoaded: action,
      setMonthlyPayment: action,
      setTotalRepayableAmount: action,
      setInterestToPay: action,
    });
  }

  setIsAmountLoaded(isAmountLoaded: boolean) {
    this.isAmountLoaded = isAmountLoaded;
  }

  setIsTermLoaded(isTermLoaded: boolean) {
    this.isTermLoaded = isTermLoaded;
  }

  setMonthlyPayment(monthlyPayment: number) {
    this.monthlyPayment = monthlyPayment;
  }

  setTotalRepayableAmount(totalRepayableAmount: number) {
    this.totalRepayableAmount = totalRepayableAmount;
  }

  setInterestToPay(totalRepayableAmount: number, amountCurrentValue: number) {
    this.interest = totalRepayableAmount - amountCurrentValue;
  }
}

export const GeneralStore = new GeneralStoreImpl();
