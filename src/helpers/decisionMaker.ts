export type DecisionResult = {
  approved: boolean,
  amount: number,
  period: number
};
const MIN_AMOUNT = 2000;
const MAX_AMOUNT = 10000;
const MIN_PERIOD = 12;
const MAX_PERIOD = 60;

function calculateAmount(modifier: number, amount: number, period: number): DecisionResult {
  const result: DecisionResult = {
    approved: false,
    amount,
    period,
  };

  let calcAmount = modifier * period;
  calcAmount = calcAmount > MAX_AMOUNT ? MAX_AMOUNT : calcAmount;

  if (calcAmount >= amount || calcAmount >= MIN_AMOUNT) {
    result.amount = calcAmount;
    result.approved = true;
  }

  return result;
}

function calculatePeriod(modifier: number, amount: number, period: number): DecisionResult {
  const result: DecisionResult = {
    approved: false,
    amount,
    period,
  };

  const calcPeriod = Math.floor(amount / modifier);
  if (calcPeriod > MAX_PERIOD) {
    const calcAmount = MAX_PERIOD * modifier;
    if (calcAmount >= MIN_AMOUNT) {
      result.period = MAX_PERIOD;
      result.amount = calcAmount;
      result.approved = true;
    }

    return result;
  }

  result.period = calcPeriod;
  result.approved = true;

  return result;
}

export function getDecision(modifier: number, amount: number, period: number): DecisionResult {
  const calculatedAmount: DecisionResult = calculateAmount(modifier, amount, period);
  if (calculatedAmount.approved) {
    return calculatedAmount;
  }
  return calculatePeriod(modifier, amount, period);
}

export {
  MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD,
};
