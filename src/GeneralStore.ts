import { action, makeObservable, observable } from "mobx";

export class GeneralStoreImpl {
  loadAmounts = true;
  isTermLoaded = false;
  monthlyPayment = 0;
  totalRepayableAmount = 0;
  interest = 0;

  constructor() {
    makeObservable(this, {
      loadAmounts: observable,
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

  setIsAmountLoaded(loadAmounts: boolean) {
    this.loadAmounts = loadAmounts;
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
