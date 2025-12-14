import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { CalculationResult } from '../types';

interface EvolutionChartProps {
  results: CalculationResult[];
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ results }) => {
  
  // Calcula os ticks do eixo Y para garantir intervalos de 10.000 e incluir o valor máximo
  const yTicks = useMemo(() => {
    if (results.length === 0) return [0];
    
    const maxVal = Math.max(...results.map((r) => r.totalAccumulated));
    if (maxVal === 0) return [0];

    // Arredonda para cima para o próximo múltiplo de 10.000
    const topTick = Math.ceil(maxVal / 10000) * 10000;
    
    const ticks = [];
    // Gera um array com passos de 10.000
    for (let i = 0; i <= topTick; i += 10000) {
      ticks.push(i);
    }
    return ticks;
  }, [results]);

  // Calcula os ticks do eixo X contendo TODOS os meses.
  const xTicks = useMemo(() => {
    if (results.length === 0) return [0];
    const maxMonth = results[results.length - 1].month;
    const ticks = [];
    // Gera um array com passos de 1 mês (0, 1, 2, 3...)
    for (let i = 0; i <= maxMonth; i += 1) {
      ticks.push(i);
    }
    return ticks;
  }, [results]);

  const maxY = yTicks.length > 0 ? yTicks[yTicks.length - 1] : 'auto';

  // Formatador para o eixo Y
  const formatYAxis = (value: number) => {
    if (value === 0) return ''; // Remove o zero duplicado na interseção
    if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace('.0', '')}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}mil`;
    return value.toString();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h3 className="text-lg font-bold text-center text-red-900 mb-4">Gráfico de Evolução</h3>
      <div className="h-[450px] w-full"> 
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={results}
            margin={{
              top: 40,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              type="number" 
              domain={[0, 'dataMax']}
              ticks={xTicks}
              interval={0} // Força a exibição de todos os ticks
              label={{ value: 'Meses', position: 'insideBottomRight', offset: -5 }} 
              tickMargin={10}
              tick={{ fontSize: 11 }} // Ligeiro ajuste na fonte para caber melhor
            />
            <YAxis 
              ticks={yTicks}
              domain={[0, maxY]}
              tickFormatter={formatYAxis}
              width={60}
            />
            <Tooltip 
              formatter={(value: number) => new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value).replace('AOA', 'KZ')}
              labelFormatter={(label) => `Mês ${label}`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="totalAccumulated"
              name="Total com Juros"
              stroke="#991b1b" 
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="totalInvested"
              name="Valor Investido"
              stroke="#000000"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
              isAnimationActive={true}
            />
            <Brush 
              dataKey="month" 
              height={20} 
              stroke="#991b1b" 
              fill="#f3f4f6"
              travellerWidth={10}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EvolutionChart;