/**
 * Configuration constants for the Martingale betting simulation
 */

export const SIMULATION_CONFIG = {
  // Number of simulation runs
  TOTAL_RUNS: 100_000,
  
  // Initial bet amount in dollars
  INITIAL_BET: 1,
  
  // Target winnings to achieve
  TARGET_WINNINGS: [10, 100, 1000],
  
  // Time per round in minutes
  MINUTES_PER_ROUND: 1,
  
  // Confidence interval for statistics (90%)
  CONFIDENCE_LEVEL: 0.90,
  
  // Maximum bankroll to prevent infinite losses (safety limit)
  MAX_BANKROLL: 1_000_000,
  
  // Progress logging interval
  LOG_INTERVAL: 10_000,
} as const;

export const ROULETTE_CONFIG = {
  // European roulette: 0, 1-36 (37 total slots)
  // Set to true for American roulette (0, 00, 1-36 = 38 slots)
  HAS_DOUBLE_ZERO: false,
  
  // Number of red/black slots (18 each in both variants)
  RED_BLACK_SLOTS: 18,
} as const;

export const OUTPUT_CONFIG = {
  // Output file paths
  HTML_OUTPUT_FILE: './simulation_results.html',
  LOG_FILE: './simulation.log',
} as const;

// Calculated values
export const ROULETTE_SLOTS = ROULETTE_CONFIG.HAS_DOUBLE_ZERO ? 38 : 37;
export const WIN_PROBABILITY = ROULETTE_CONFIG.RED_BLACK_SLOTS / ROULETTE_SLOTS;
export const LOSE_PROBABILITY = 1 - WIN_PROBABILITY; 