import { getDecision, MAX_AMOUNT } from '../../src/helpers/decisionMaker';

describe('decision maker processor', () => {
  it('should give exact amount', () => {
    expect.assertions(3);
    const modifier = 100;
    const period = 20;
    const amount = 2000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeTruthy();
    expect(result.amount).toStrictEqual(amount);
    expect(result.period).toStrictEqual(period);
  });

  it('should give higher amount than requested', () => {
    expect.assertions(3);
    const modifier = 300;
    const period = 20;
    const amount = 2000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeTruthy();
    expect(result.amount).toBe(6000);
    expect(result.period).toStrictEqual(period);
  });

  it('should give maximum possible amount', () => {
    expect.assertions(3);
    const modifier = 1000;
    const period = 20;
    const amount = 2000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeTruthy();
    expect(result.amount).toStrictEqual(MAX_AMOUNT);
    expect(result.period).toStrictEqual(period);
  });

  it('should give lower amount than requested', () => {
    expect.assertions(3);
    const modifier = 300;
    const period = 15;
    const amount = 5000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeTruthy();
    expect(result.amount).toBe(4500);
    expect(result.period).toStrictEqual(period);
  });

  it('should adjust period if not possible if not possible to adjust amount', () => {
    expect.assertions(3);
    const modifier = 100;
    const period = 12;
    const amount = 5000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeTruthy();
    expect(result.amount).toStrictEqual(amount);
    expect(result.period).toBe(50);
  });

  it('should adjust period and amount if amount is to high', () => {
    expect.assertions(3);
    const modifier = 100;
    const period = 12;
    const amount = 10000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeTruthy();
    expect(result.amount).toBe(6000);
    expect(result.period).toBe(60);
  });

  it('should not approve', () => {
    expect.assertions(1);
    const modifier = 10;
    const period = 12;
    const amount = 10000;
    const result = getDecision(modifier, amount, period);
    expect(result.approved).toBeFalsy();
  });
});
