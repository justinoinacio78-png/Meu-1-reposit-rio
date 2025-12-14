export interface CalculationResult {
  month: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
  monthlyInterest: number;
}

export interface SimulationData {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  rateType: 'annual' | 'monthly';
  period: number;
  periodType: 'years' | 'months';
}

export interface SummaryData {
  finalTotal: number;
  totalInvested: number;
  totalInterest: number;
}