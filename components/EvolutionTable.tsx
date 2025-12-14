import React from 'react';
import { CalculationResult } from '../types';
import { formatCurrency } from '../utils/calculations';

interface EvolutionTableProps {
  results: CalculationResult[];
}

const EvolutionTable: React.FC<EvolutionTableProps> = ({ results }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-center text-red-900">Tabela de Evolução Mensal</h3>
        </div>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Mês
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Juros (Mês)
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Total Investido
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Total Juros (Acum.)
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Total Acumulado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((row) => (
              <tr key={row.month} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  {row.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {formatCurrency(row.monthlyInterest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {formatCurrency(row.totalInvested)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium text-center">
                  {formatCurrency(row.totalInterest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold text-center">
                  {formatCurrency(row.totalAccumulated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvolutionTable;