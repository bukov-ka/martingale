# Martingale Betting System Simulation

I want to run a simulation to test the Martingale betting system: https://en.wikipedia.org/wiki/Martingale_(betting_system)

I am on Windows 11 with NodeJS v20.13.1 installed. I want to have a script in TypeScript to run with ts-node.

I want to run simulations of roulette runs with martingale betting with the initial bet of $1. I need to win $10, $100 and $1000 in the end. The script should simulate the runs and output how much total capital is required and how much time (one round is 1 minute, converted to days).

The results should be in a nice HTML. The roulette should have European roulette (37 slots, configurable for American).

There should be 100,000 runs to get the statistics. I need to have 90% confidence intervals for total capital required and for time period needed to win the prize.

The script should be modular with the constants extracted. There should be logs to see what the script is doing right now.

## ✅ Results

**Key Findings:**
- To win $100, you need ~$2,273 in total capital (23x your target!)
- Success rates: 99.99% ($10), 99.97% ($100), 99.7% ($1000)
- 90% confidence intervals show realistic planning ranges
- Median vs average reveals hidden risks of the Martingale system

**Generated Files:**
- `simulation_results.html` - Interactive web report
- `simulation.log` - Detailed execution log
- `README.md` - Complete documentation
- Modular TypeScript codebase in `src/`

**Usage:** `npm install && npm start` (~10 seconds)