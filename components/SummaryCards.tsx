import React from 'react';
import { SummaryData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-red-900 mb-4">Resultado</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Result Card */}
        <div className="bg-red-900 text-white rounded-lg p-6 shadow-md text-center flex flex-col justify-center items-center">
          <p className="text-sm font-medium opacity-90 mb-1">Valor total final</p>
          <p className="text-3xl font-bold">{formatCurrency(data.finalTotal)}</p>
        </div>

        {/* Total Invested */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-gray-600 mb-1">Valor total investido</p>
          <p className="text-xl font-bold text-gray-800">{formatCurrency(data.totalInvested)}</p>
        </div>

        {/* Total Interest */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 text-center flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-gray-600 mb-1">Total em juros</p>
          <p className="text-xl font-bold text-green-700">{formatCurrency(data.totalInterest)}</p>
        </div>

      </div>
    </div>
  );
};

export default SummaryCards;