// src/components/Quiz.tsx
'use client';

import { useQuiz } from '../hooks/useQuiz';
import { QuizQuestion } from '../types/quiz';

interface QuizProps {
  userId: string;
  onComplete: (score: number, total: number) => void;
}

// This acts like your "database" of quiz questions
const QUESTION_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does APR stand for in finance?',
    options: ['Annual Percentage Rate', 'Adjusted Price Ratio', 'Actual Payment Return', 'Applied Profit Ratio'],
    correctIndex: 0,
  },
  {
    id: 'q2',
    question: 'StellarPay allows early wage access. Which term best describes this?',
    options: ['Microlending', 'Pay Advance', 'Direct Deposit', 'Payroll Deferral'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    question: 'Which blockchain protocol does StellarPay leverage for remittances?',
    options: ['Ethereum', 'Solana', 'Stellar', 'Polkadot'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    question: 'If you deposit $1,000 at 5% annual interest, how much is the interest after one year?',
    options: ['$50', '$5', '$150', '$500'],
    correctIndex: 0,
  },
  {
    id: 'q5',
    question: 'Which of these is a stablecoin commonly used in crypto payments?',
    options: ['Bitcoin', 'Tether (USDT)', 'Dogecoin', 'Ethereum'],
    correctIndex: 1,
  },
  {
    id: 'q6',
    question: 'What is a lending protocol in DeFi?',
    options: ['A centralized savings bank', 'A way to borrow/lend crypto assets via smart contracts', 'A social media protocol', 'A hardware wallet'],
    correctIndex: 1,
  },
  {
    id: 'q7',
    question: 'Which protocol is commonly used for decentralized lending?',
    options: ['Aave', 'Uniswap', 'SushiSwap', 'OpenSea'],
    correctIndex: 0,
  },
  {
    id: 'q8',
    question: 'What does TVL stand for in DeFi?',
    options: ['Total Vested Liquidity', 'Token Volatility Level', 'Total Value Locked', 'Total Verified Loans'],
    correctIndex: 2,
  },
  {
    id: 'q9',
    question: 'What is the advantage of Early Wage Access (EWA)?',
    options: ['Borrow money from friends', 'Access earned wages before payday', 'Buy stocks earlier', 'Avoid paying taxes'],
    correctIndex: 1,
  },
  {
    id: 'q10',
    question: 'Which Stellar feature helps with fast and low-fee payments?',
    options: ['NFT minting', 'Liquidity mining', 'Anchors and path payments', 'Staking'],
    correctIndex: 2,
  },
  {
    id: 'q11',
    question: 'In Aave, what is a “flash loan”?',
    options: ['A loan with fixed interest', 'A loan that must be repaid within seconds and in one transaction', 'A loan secured with NFTs', 'A multi-year crypto loan'],
    correctIndex: 1,
  },
  {
    id: 'q12',
    question: 'What happens if a borrower’s collateral falls below the liquidation threshold in Compound?',
    options: ['Collateral is increased automatically', 'The protocol locks the account', 'The collateral may be partially liquidated', 'Borrower receives a fine'],
    correctIndex: 2,
  },
  {
    id: 'q13',
    question: 'Which asset type is typically used as collateral in DeFi lending?',
    options: ['Stablecoins', 'Equity shares', 'Real estate', 'Gold'],
    correctIndex: 0,
  },
  {
    id: 'q14',
    question: 'Which Stellar consensus mechanism ensures fast transaction finality?',
    options: ['Proof of Stake', 'Proof of Work', 'Stellar Consensus Protocol (SCP)', 'Delegated Proof of Stake'],
    correctIndex: 2,
  },
  {
    id: 'q15',
    question: 'Which of the following is NOT a benefit of Early Wage Access?',
    options: ['Reduced need for payday loans', 'Improved financial flexibility', 'Lower income tax', 'Better budgeting'],
    correctIndex: 2,
  },
  {
    id: 'q16',
    question: 'How does a DeFi lending protocol like Aave maintain liquidity?',
    options: ['By printing new tokens', 'Via liquidity pools provided by depositors', 'Through mining operations', 'By using traditional banks'],
    correctIndex: 1,
  },
  {
    id: 'q17',
    question: 'In Stellar, what are “anchors”?',
    options: ['Validators of smart contracts', 'Entities that issue fiat tokens on-chain', 'Oracles for price feeds', 'Nodes that mine XLM'],
    correctIndex: 1,
  },
  {
    id: 'q18',
    question: 'What makes stablecoins suitable for DeFi lending?',
    options: ['High volatility', 'Centralized nature', 'Price stability', 'High interest rates'],
    correctIndex: 2,
  },
  {
    id: 'q19',
    question: 'Which organization maintains the Stellar network?',
    options: ['Ripple Foundation', 'Ethereum Foundation', 'Stellar Development Foundation', 'Binance Labs'],
    correctIndex: 2,
  },
  {
    id: 'q20',
    question: 'In an EWA system, who typically provides the early access to funds?',
    options: ['The government', 'The employee’s peers', 'A fintech provider integrated with payroll', 'The stock market'],
    correctIndex: 2,
  },
  {
    id: 'q21',
    question: 'Which DeFi lending protocol introduced “credit delegation”?',
    options: ['Uniswap', 'Aave', 'MakerDAO', 'Curve'],
    correctIndex: 1,
  },
  {
    id: 'q22',
    question: 'What is the native token of the Stellar network?',
    options: ['XLM', 'XRP', 'SOL', 'ETH'],
    correctIndex: 0,
  },
  {
    id: 'q23',
    question: 'What is the role of a liquidity provider in DeFi?',
    options: ['Mining new tokens', 'Providing customer support', 'Supplying assets to pools for interest', 'Verifying transactions'],
    correctIndex: 2,
  },
  {
    id: 'q24',
    question: 'Which DeFi concept allows users to earn interest on idle assets?',
    options: ['Staking', 'Mining', 'Lending pools', 'Yield farming'],
    correctIndex: 3,
  },
  {
    id: 'q25',
    question: 'Which of these describes a “collateralized loan”?',
    options: ['Loan without any guarantee', 'Loan backed by assets', 'Government grant', 'Flash loan'],
    correctIndex: 1,
  },
  {
    id: 'q26',
    question: 'What’s a key risk in DeFi lending?',
    options: ['Overregulation', 'Smart contract vulnerability', 'High transaction speed', 'Stable interest rates'],
    correctIndex: 1,
  },
  {
    id: 'q27',
    question: 'What does APY stand for in DeFi?',
    options: ['Annual Price Yield', 'Annual Percentage Yield', 'Asset Protection Yearly', 'All-Purpose Yield'],
    correctIndex: 1,
  },
  {
    id: 'q28',
    question: 'Which DeFi protocol specializes in stablecoin lending?',
    options: ['SushiSwap', 'Curve Finance', 'Chainlink', 'Decentraland'],
    correctIndex: 1,
  },
  {
    id: 'q29',
    question: 'What is a “path payment” in Stellar?',
    options: ['Routing an asset through multiple intermediaries', 'Paying miners in path tokens', 'Paying fees to anchors', 'Minting new tokens'],
    correctIndex: 0,
  },
  {
    id: 'q30',
    question: 'What is a common fee advantage of Stellar over Ethereum?',
    options: ['No network access needed', 'Proof of Work mining rewards', 'Much lower transaction fees', 'Zero KYC'],
    correctIndex: 2,
  },
  {
    id: 'q31',
    question: 'Why are EWA services gaining popularity?',
    options: ['They are regulated by SEC', 'They use NFTs', 'They help reduce reliance on high-interest loans', 'They provide free health insurance'],
    correctIndex: 2,
  },
  {
    id: 'q32',
    question: 'Which is a common use case for DeFi lending platforms?',
    options: ['Borrow to buy NFTs', 'Speculate on interest rate swaps', 'Leverage trading or earn interest', 'Stake real estate'],
    correctIndex: 2,
  },
  {
    id: 'q33',
    question: 'What happens in case of undercollateralization in DeFi?',
    options: ['The user gets banned', 'Tokens are airdropped', 'Liquidation occurs', 'Borrower wins rewards'],
    correctIndex: 2,
  },
  {
    id: 'q34',
    question: 'What does the term "multi-collateral" mean in DeFi?',
    options: ['You need multiple wallets', 'You can only use ETH as collateral', 'Multiple assets can be used to secure a loan', 'You need multiple co-signers'],
    correctIndex: 2,
  },
  {
    id: 'q35',
    question: 'Which is a core feature of Stellar for remittance?',
    options: ['Proof of Work', 'Fixed supply', 'Pathfinding and instant settlement', 'Token burning'],
    correctIndex: 2,
  },
  {
    id: 'q36',
    question: 'In DeFi, who sets the interest rates?',
    options: ['Government bodies', 'Smart contracts via supply/demand algorithms', 'Binance', 'The World Bank'],
    correctIndex: 1,
  },
  {
    id: 'q37',
    question: 'What is “overcollateralization”?',
    options: ['Using too little collateral', 'Using a smaller asset as collateral', 'Providing more collateral than borrowed amount', 'Lending to friends'],
    correctIndex: 2,
  },
  {
    id: 'q38',
    question: 'What is a downside of flash loans?',
    options: ['They are very slow', 'They require credit history', 'They are vulnerable to exploitation if unchecked', 'They cost high gas fees'],
    correctIndex: 2,
  },
  {
    id: 'q39',
    question: 'Which Stellar tool allows developers to interact with accounts and transactions?',
    options: ['Remix', 'MetaMask', 'Horizon API', 'Infura'],
    correctIndex: 2,
  },
  {
    id: 'q40',
    question: 'Which protocol supports “delegated credit lines” in DeFi?',
    options: ['Synthetix', 'Aave', 'Balancer', 'PancakeSwap'],
    correctIndex: 1,
  },
  {
    id: 'q41',
    question: 'What makes DeFi transparent compared to TradFi?',
    options: ['Regulated audits', 'Open smart contracts and public data', 'Only stablecoin use', 'Lack of insurance'],
    correctIndex: 1,
  },
  {
    id: 'q42',
    question: 'What’s a bridge in DeFi?',
    options: ['A marketing platform', 'Cross-chain asset transfer mechanism', 'Staking platform', 'AI tool for bots'],
    correctIndex: 1,
  },
  {
    id: 'q43',
    question: 'Which token is used to pay fees on Stellar?',
    options: ['ETH', 'SOL', 'XLM', 'DAI'],
    correctIndex: 2,
  },
  {
    id: 'q44',
    question: 'What does "on-chain" mean?',
    options: ['Happens on a centralized server', 'Occurs off the blockchain', 'Logged directly onto a blockchain', 'Stored in a hardware wallet'],
    correctIndex: 2,
  },
  {
    id: 'q45',
    question: 'Which protocol allows earning interest by supplying assets?',
    options: ['Aave', 'OpenSea', 'Polygon', 'Uniswap'],
    correctIndex: 0,
  },
  {
    id: 'q46',
    question: 'What is the key benefit of smart contracts in DeFi lending?',
    options: ['Human oversight', 'Automatic execution and trustlessness', 'Custodianship', 'Credit score usage'],
    correctIndex: 1,
  },
  {
    id: 'q47',
    question: 'Which asset is NOT a typical collateral in DeFi?',
    options: ['DAI', 'ETH', 'USDC', 'Airline Miles'],
    correctIndex: 3,
  },
  {
    id: 'q48',
    question: 'What enables Stellar to support currency exchange in transactions?',
    options: ['Bridges', 'Path Payments', 'Airdrops', 'Inflation model'],
    correctIndex: 1,
  },
  {
    id: 'q49',
    question: 'Which is a key compliance feature in some Stellar anchors?',
    options: ['KYC & AML checks', 'GPU mining', 'Token wrapping', 'NFT minting'],
    correctIndex: 0,
  },
  {
    id: 'q50',
    question: 'What does "permissionless" mean in DeFi?',
    options: ['Regulated access', 'Requires admin approval', 'Anyone can participate without gatekeepers', 'Needs email verification'],
    correctIndex: 2,
  },
];


export default function Quiz({  onComplete }: QuizProps) {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOption,
    isSubmitting,
    handleOptionClick,
    handleNext,
  } = useQuiz(QUESTION_BANK, 5);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="max-w-2xl w-full space-y-6">
        <h2 className="text-3xl font-semibold underline decoration-gradient-to-r from-pink-500 to-purple-500">
          Question {currentIndex + 1} / {totalQuestions}
        </h2>

        <p className="text-xl">{currentQuestion.question}</p>

        <div className="flex flex-col space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                className={`border rounded-md px-4 py-3 text-left hover:border-pink-500 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-500/20'
                    : 'border-gray-700'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => handleNext(onComplete)}
            disabled={selectedOption === null || isSubmitting}
            className={`mt-4 px-6 py-3 rounded-md text-white ${
              selectedOption === null || isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90'
            }`}
          >
            {currentIndex + 1 < totalQuestions ? 'Next →' : isSubmitting ? 'Saving…' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}
