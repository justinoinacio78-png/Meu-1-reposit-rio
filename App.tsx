import React, { useState, useEffect } from 'react';
import CalculatorForm from './components/CalculatorForm';
import SummaryCards from './components/SummaryCards';
import EvolutionChart from './components/EvolutionChart';
import EvolutionTable from './components/EvolutionTable';
import InfoSection from './components/InfoSection';
import { SimulationData, CalculationResult } from './types';
import { calculateCompoundInterest } from './utils/calculations';

const App: React.FC = () => {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Perform initial calculation on load for a better UX (demo data)
  useEffect(() => {
    handleCalculate({
      initialValue: 10000,
      monthlyValue: 2000,
      interestRate: 8,
      rateType: 'annual',
      period: 3,
      periodType: 'years'
    });
  }, []);

  const handleCalculate = (data: SimulationData) => {
    const calculatedResults = calculateCompoundInterest(data);
    setResults(calculatedResults);
    setHasCalculated(true);
  };

  const lastResult = results.length > 0 ? results[results.length - 1] : null;
  const summaryData = lastResult ? {
    finalTotal: lastResult.totalAccumulated,
    totalInvested: lastResult.totalInvested,
    totalInterest: lastResult.totalInterest
  } : { finalTotal: 0, totalInvested: 0, totalInterest: 0 };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-2">
            Calculadora Financeira
          </h1>
          <p className="text-lg text-gray-600">
            Simule o poder dos juros compostos nos seus investimentos
          </p>
        </header>

        {/* Calculator Form */}
        <CalculatorForm onCalculate={handleCalculate} />

        {/* Results Section */}
        {hasCalculated && (
          <div className="animate-fade-in">
            <SummaryCards data={summaryData} />
            
            <EvolutionChart results={results} />
            
            <EvolutionTable results={results} />
          </div>
        )}

        {/* Educational Content */}
        <InfoSection />

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-12 pb-6">
          <p>&copy; {new Date().getFullYear()} Simulador Financeiro. Todos os direitos reservados.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;