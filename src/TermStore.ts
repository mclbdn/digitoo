import { action, makeObservable, observable } from "mobx";

interface termConstraintsI {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export class TermStoreImpl {
  termConstraints: termConstraintsI = {};
  termCurrentValue = 0;
  possibleTermsArray: number[] = [];

  constructor() {
    makeObservable(this, {
      termConstraints: observable,
      termCurrentValue: observable,
      possibleTermsArray: observable,
      addTermConstraints: action,
      setPossibleTermsArray: action,
      setCurrentTerm: action,
    });
  }

  addTermConstraints(fetchedTermConstraints: termConstraintsI) {
    this.termConstraints = fetchedTermConstraints;
  }

  setPossibleTermsArray(isTermLoaded: boolean, fetchedTermConstraints: termConstraintsI) {
    if (isTermLoaded && fetchedTermConstraints.min && fetchedTermConstraints.max && fetchedTermConstraints.step) {
      for (let i = fetchedTermConstraints?.min; i <= fetchedTermConstraints?.max; i += fetchedTermConstraints.step) {
        this.possibleTermsArray.push(i);
      }
    }
  }

  setCurrentTerm(currentTerm: number) {
    this.termCurrentValue = currentTerm;
  }
}

export const TermStore = new TermStoreImpl();
