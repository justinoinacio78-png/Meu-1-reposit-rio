import React, { useState } from 'react';
import { SimulationData } from '../types';

interface CalculatorFormProps {
  onCalculate: (data: SimulationData) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  // Use strings for state to handle formatting (e.g., "10.000,00")
  const [initialValue, setInitialValue] = useState<string>('10.000,00');
  const [monthlyValue, setMonthlyValue] = useState<string>('2.000,00');
  const [interestRate, setInterestRate] = useState<string>('8');
  const [rateType, setRateType] = useState<'annual' | 'monthly'>('annual');
  const [period, setPeriod] = useState<string>('3');
  const [periodType, setPeriodType] = useState<'years' | 'months'>('years');

  // Format string with thousand separators (dots) and decimal separator (comma)
  const formatCurrencyInput = (value: string) => {
    // 1. Remove invalid characters (keep digits and comma)
    let cleanValue = value.replace(/[^\d,]/g, '');

    // 2. Handle multiple commas: keep only the first one
    const parts = cleanValue.split(',');
    if (parts.length > 2) {
      cleanValue = parts[0] + ',' + parts.slice(1).join('');
    }

    // 3. Split integer and decimal parts
    const [integerPart, decimalPart] = cleanValue.split(',');

    // 4. Format integer part with dots
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // 5. Reassemble
    if (decimalPart !== undefined) {
      // Limit decimal places to 2? Usually good for currency but user might be typing.
      // Let's not strictly limit while typing to allow correction, 
      // but standard is 2. Let's allow typing freely.
      return `${formattedInteger},${decimalPart}`;
    }
    
    return formattedInteger;
  };

  // Parse formatted string back to number
  const parseCurrencyInput = (value: string) => {
    if (!value) return 0;
    // Remove dots
    const withoutDots = value.replace(/\./g, '');
    // Replace comma with dot
    const withDot = withoutDots.replace(',', '.');
    return Number(withDot);
  };

  const handleInitialValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValue(formatCurrencyInput(e.target.value));
  };

  const handleMonthlyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyValue(formatCurrencyInput(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      initialValue: parseCurrencyInput(initialValue),
      monthlyValue: parseCurrencyInput(monthlyValue),
      interestRate: Number(interestRate),
      rateType,
      period: Number(period),
      periodType,
    });
  };

  const handleClear = () => {
    setInitialValue('');
    setMonthlyValue('');
    setInterestRate('');
    setPeriod('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-2xl font-bold text-red-900 mb-6">Simulador de Juros Compostos</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Initial Value */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Valor inicial</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
              KZ
            </span>
            <input
              type="text"
              required
              value={initialValue}
              onChange={handleInitialValueChange}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-900 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="0,00"
            />
          </div>
        </div>

        {/* Monthly Value */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Valor mensal</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
              KZ
            </span>
            <input
              type="text"
              required
              value={monthlyValue}
              onChange={handleMonthlyValueChange}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-900 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="0,00"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Taxa de juros</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
              %
            </span>
            <input
              type="number"
              required
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="min-w-0 block w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="0"
            />
            <select
              value={rateType}
              onChange={(e) => setRateType(e.target.value as 'annual' | 'monthly')}
              className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-700 sm:text-sm focus:ring-red-500 focus:border-red-500 px-2"
            >
              <option value="annual">anual</option>
              <option value="monthly">mensal</option>
            </select>
          </div>
        </div>

        {/* Period */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Período</label>
          <div className="flex">
            <input
              type="number"
              required
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-white text-gray-900 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="1"
            />
            <select
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as 'years' | 'months')}
              className="rounded-r-md border border-gray-300 bg-gray-50 text-gray-700 sm:text-sm focus:ring-red-500 focus:border-red-500 px-2"
            >
              <option value="years">ano(s)</option>
              <option value="months">mês(es)</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex items-center justify-between mt-4">
          <button
            type="submit"
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-3 px-8 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Calcular
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 focus:outline-none underline"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;