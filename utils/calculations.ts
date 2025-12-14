import { CalculationResult, SimulationData } from '../types';

export const calculateCompoundInterest = (data: SimulationData): CalculationResult[] => {
  const { initialValue, monthlyValue, interestRate, rateType, period, periodType } = data;

  // Convert period to months
  const totalMonths = periodType === 'years' ? period * 12 : period;

  // Convert rate to monthly decimal
  // If annual, we assume effective annual rate: (1 + i_monthly)^12 = 1 + i_annual
  // So i_monthly = (1 + i_annual)^(1/12) - 1
  let monthlyRate = 0;
  if (rateType === 'annual') {
    monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
  } else {
    monthlyRate = interestRate / 100;
  }

  const results: CalculationResult[] = [];

  // Variáveis para rastrear a acumulação
  // Inicializamos com o valor inicial para considerar o rendimento desde o primeiro mês,
  // mas a exibição do mês 0 será 0 conforme solicitado.
  let currentTotal = initialValue;
  let currentInvested = initialValue;
  
  // Initial state (Month 0) - Zerado para o gráfico partir da origem
  results.push({
    month: 0,
    totalInvested: 0,
    totalInterest: 0,
    totalAccumulated: 0,
    monthlyInterest: 0,
  });

  for (let i = 1; i <= totalMonths; i++) {
    const interestEarned = currentTotal * monthlyRate;
    
    currentTotal += interestEarned + monthlyValue;
    currentInvested += monthlyValue;

    results.push({
      month: i,
      totalInvested: currentInvested,
      totalInterest: currentTotal - currentInvested,
      totalAccumulated: currentTotal,
      monthlyInterest: interestEarned,
    });
  }

  return results;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value).replace('AOA', 'KZ');
};