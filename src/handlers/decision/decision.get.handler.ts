import { Request, Response } from 'express';
import storage from '../../storage/mem_storage';
import {
  MIN_AMOUNT, MAX_AMOUNT, MAX_PERIOD, MIN_PERIOD, getDecision,
} from '../../helpers/decisionMaker';

// @ts-ignore
function validateInput({ regCode, amount, period }) {
  if (regCode === '') {
    return false;
  }
  const parsedAmount = Number.parseFloat(amount);
  const isAmountValid = !Number.isNaN(parsedAmount)
    && parsedAmount >= MIN_AMOUNT
    && parsedAmount <= MAX_AMOUNT;

  const parsedPeriod = Number.parseInt(period, 10);
  const isPeriodValid = !Number.isNaN(parsedPeriod)
    && parsedPeriod >= MIN_PERIOD
    && parsedPeriod <= MAX_PERIOD;

  return isAmountValid && isPeriodValid;
}

export default async function decisionMakerHandler(req: Request, res: Response) {
  const { regCode, amount, period } = req.query;
  if (!validateInput({ regCode, amount, period })) {
    res.send({ error: 'You have entered wrong input' });
    return;
  }

  const modifier = storage.getModifierByRegCode(regCode as string);
  if (modifier == null) {
    res.send({ error: `User with regCode ${regCode} not found` });
    return;
  }

  if (modifier < 0) {
    res.send({ error: 'Loan not possible' });
    return;
  }

  const parsedAmount = Number.parseFloat(amount as string);
  const parsedPeriod = Number.parseInt(period as string, 10);
  const decision = getDecision(modifier, parsedAmount, parsedPeriod as number);

  if (decision.approved) {
    res.send(decision);
  } else {
    res.send({ error: 'Could not find suitable offer' });
  }
}
