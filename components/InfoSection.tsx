import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-gray-700 leading-relaxed space-y-8">
      
      <section>
        <h2 className="text-2xl font-bold text-red-900 mb-4">Como utilizar o Simulador</h2>
        <p className="mb-4">
          Entender o impacto do tempo e dos aportes no seu patrimônio é essencial. Esta ferramenta foi desenvolvida para ser intuitiva e transparente. Siga o guia abaixo:
        </p>
        <ul className="space-y-3">
            <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-bold text-xs mr-3 mt-1">1</span>
                <span><strong>Defina o Capital Inicial:</strong> Insira o valor que você já possui guardado para começar o investimento no campo "Valor inicial".</span>
            </li>
            <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-bold text-xs mr-3 mt-1">2</span>
                <span><strong>Planeje os Aportes:</strong> No campo "Valor mensal", informe quanto você pretende poupar e adicionar ao investimento todos os meses.</span>
            </li>
            <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-bold text-xs mr-3 mt-1">3</span>
                <span><strong>Taxa de Rentabilidade:</strong> Informe a taxa de juros esperada. Você pode selecionar se essa taxa é mensal ou anual.</span>
            </li>
            <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-bold text-xs mr-3 mt-1">4</span>
                <span><strong>Tempo de Aplicação:</strong> Por quanto tempo esse dinheiro ficará rendendo? Defina o prazo em anos ou meses.</span>
            </li>
            <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 font-bold text-xs mr-3 mt-1">5</span>
                <span><strong>Simule:</strong> Clique em "Calcular" para gerar o relatório completo com gráfico e tabela detalhada.</span>
            </li>
        </ul>
      </section>

      <section className="bg-gray-50 p-6 rounded-md border-l-4 border-red-800">
        <h3 className="text-xl font-bold text-gray-900 mb-2">A Matemática dos Juros Compostos</h3>
        <p className="mb-4">
          A fórmula fundamental para juros compostos (sem aportes mensais) é expressa como:
        </p>
        <div className="text-center text-xl font-mono bg-white p-3 rounded border border-gray-200 mb-4 text-red-900 font-bold">
          M = C (1 + i)^t
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><strong>M</strong>: Montante final acumulado.</li>
          <li><strong>C</strong>: Capital inicial investido.</li>
          <li><strong>i</strong>: Taxa de juros (em formato decimal).</li>
          <li><strong>t</strong>: Tempo de aplicação.</li>
        </ul>
        <p className="mt-4 text-sm">
            <em>Nota: Quando há aportes mensais, o cálculo torna-se uma soma progressiva onde os juros de cada mês incidem sobre o saldo acumulado anterior.</em>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3">O Poder do Longo Prazo</h3>
        <p className="mb-4">
            A principal diferença entre juros simples e compostos é o efeito "bola de neve". Nos juros simples, a rentabilidade incide apenas sobre o valor que você tirou do bolso inicialmente. Nos juros compostos, a rentabilidade incide sobre o total acumulado (capital + lucros passados).
        </p>
        <p>
            Essa característica faz com que, no longo prazo, a curva de crescimento do seu patrimônio se torne exponencial, acelerando a acumulação de riqueza quanto mais o tempo passa.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
            <h4 className="font-bold text-lg mb-2">Aplicações Comuns</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Investimentos de Renda Fixa (CDB, Tesouro).</li>
                <li>Fundos Imobiliários (com reinvestimento).</li>
                <li>Ações (com reinvestimento de dividendos).</li>
                <li>Financiamentos Imobiliários e de Veículos (custo para o cliente).</li>
            </ul>
        </div>
        <div>
            <h4 className="font-bold text-lg mb-2">Dica Importante</h4>
            <p className="text-gray-600">
                Sempre verifique se a taxa informada é mensal ou anual. Uma taxa de 1% ao mês é tecnicamente superior a 12% ao ano devido ao efeito composto (aproximadamente 12,68% a.a.).
            </p>
        </div>
      </div>

    </div>
  );
};

export default InfoSection;