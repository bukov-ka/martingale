# 🎰 Martingale Betting System Simulation

A comprehensive TypeScript simulation of the [Martingale betting strategy](https://en.wikipedia.org/wiki/Martingale_(betting_system)) on roulette, designed to analyze capital requirements, success rates, and time investments across different target winnings.

## 📊 What This Simulation Does

This Monte Carlo simulation runs **100,000 trials** for each target winning amount to statistically analyze:

- **Total Capital Requirements** - How much money you need to put at risk
- **Success Rates** - Percentage of successful attempts to reach targets
- **Time Analysis** - How long it takes to reach your goals
- **90% Confidence Intervals** - Realistic planning ranges for capital and time
- **Risk Assessment** - Understanding the hidden dangers of the Martingale system

## 🚀 Quick Start

### Prerequisites
- **Node.js v20+** (you have v20.13.1 ✅)
- **TypeScript** and **ts-node** (included in dependencies)

### Installation & Run
```bash
# Install dependencies
npm install

# Run the simulation
npm start
```

The simulation takes ~10 seconds and generates:
- `simulation_results.html` - Beautiful interactive report (opens automatically)
- `simulation.log` - Detailed execution log

## 🎯 Target Scenarios

The simulation tests three scenarios:
- **Win $10** (small target)
- **Win $100** (medium target) 
- **Win $1000** (large target)

## 📈 Key Results Summary

| Target | Success Rate | Average Capital Required | 90% Confidence Interval |
|--------|--------------|-------------------------|-------------------------|
| $10    | ~99.99%     | ~$241                   | Tight range            |
| $100   | ~99.97%     | ~$2,273                 | $2,208 - $2,338       |
| $1000  | ~99.7%      | ~$22,652               | Wide range             |

> **Critical Insight**: To win $100, you need to put ~$2,273 at risk (23x your target!)

## ⚙️ Configuration

Modify `src/constants.ts` to customize:

```typescript
export const SIMULATION_CONFIG = {
  TOTAL_RUNS: 100_000,        // Number of Monte Carlo trials
  INITIAL_BET: 1,             // Starting bet amount ($)
  TARGET_WINNINGS: [10, 100, 1000], // Target amounts to test
  MINUTES_PER_ROUND: 1,       // Time per roulette spin
  CONFIDENCE_LEVEL: 0.90,     // Statistical confidence level
  MAX_BANKROLL: 1_000_000,    // Safety limit to prevent infinite losses
};

export const ROULETTE_CONFIG = {
  HAS_DOUBLE_ZERO: false,     // true = American (38 slots), false = European (37 slots)
  RED_BLACK_SLOTS: 18,        // Number of red/black slots
};
```

## 🎲 How Martingale Works

1. **Start**: Bet $1 on red/black
2. **Win**: Take profit, reset to $1
3. **Lose**: Double the bet ($1 → $2 → $4 → $8 → $16...)
4. **Continue**: Until you win (recovering all losses + $1 profit) or hit bankroll limit

## 📊 Understanding the Metrics

### 💰 **Average Total Capital Required**
The total amount of money you need to put at risk during your entire session. This is your **true exposure**.

**Example**: To win $100, you'll wager ~$2,273 total across all bets.

### 📈 **90% Confidence Intervals**
Range where we're 90% confident the true average falls. Use this for **realistic planning**.

### 📊 **Median vs Average**
- **Median**: What 50% of players experience (creates false confidence)
- **Average**: Accounts for rare disasters (what you should plan for)

The huge gap reveals Martingale's hidden danger!

## 🏗️ Project Structure

```
src/
├── constants.ts      # Configuration parameters
├── roulette.ts       # Roulette game logic
├── martingale.ts     # Betting strategy implementation  
├── statistics.ts     # Statistical analysis & confidence intervals
├── htmlReporter.ts   # Beautiful report generation
├── logger.ts         # Progress tracking & logging
├── simulator.ts      # Main simulation orchestrator
└── index.ts          # Entry point
```

## 📁 Output Files

### `simulation_results.html`
- **Interactive web report** with charts and statistics
- **Responsive design** - works on desktop and mobile
- **90% confidence intervals** for all metrics
- **Risk warnings** and methodology explanations

### `simulation.log`
- **Detailed execution log** with timestamps
- **Progress tracking** during long simulations
- **Summary statistics** for each target

## ⚠️ Critical Warnings

### 🚨 **Why Martingale Fails**
1. **Exponential Growth**: Bet sizes grow extremely fast (1→2→4→8→16→32→64→128...)
2. **Capital Requirements**: Need 20-25x your target in total capital
3. **Rare Catastrophes**: Even 0.3% failure rate means financial ruin
4. **House Edge**: Casino always has mathematical advantage

### 💡 **Key Insight**
The simulation reveals why Martingale *feels* safe but isn't:
- **Most sessions** succeed with modest capital (median experience)
- **Rare sessions** require enormous capital (average experience) 
- **Failed sessions** lose everything (catastrophic losses)

## 🔬 Statistical Methodology

- **Monte Carlo Simulation**: 100,000 independent trials per target
- **European Roulette**: 37 slots (48.65% win probability on red/black)
- **T-Distribution**: Robust confidence interval calculations
- **Safety Limits**: $1M bankroll cap prevents infinite simulations

## 📚 References

- [Martingale (betting system) - Wikipedia](https://en.wikipedia.org/wiki/Martingale_(betting_system))
- Based on mathematical analysis from the original 18th-century French strategy

## 🛠️ Development

### Scripts
```bash
npm start    # Run simulation
npm run dev  # Run with file watching
npm run build # Compile TypeScript
```

### Requirements
- TypeScript 5.0+
- Node.js 20.0+
- 100MB+ RAM for large simulations

## ⚖️ License

MIT License - See LICENSE file for details.

---

**Disclaimer**: This simulation is for educational purposes only. Gambling involves financial risk. The Martingale system has fundamental mathematical flaws that make it unsuitable for real-world betting.