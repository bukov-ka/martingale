import { SIMULATION_CONFIG } from './constants';
import { Roulette } from './roulette';

export interface GameResult {
  success: boolean;
  maxBet: number;
  totalRounds: number;
  finalBalance: number;
  totalWagered: number;
}

/**
 * Martingale betting strategy implementation
 */
export class MartingaleStrategy {
  private roulette: Roulette;
  private initialBet: number;
  private maxBankroll: number;

  constructor(roulette: Roulette) {
    this.roulette = roulette;
    this.initialBet = SIMULATION_CONFIG.INITIAL_BET;
    this.maxBankroll = SIMULATION_CONFIG.MAX_BANKROLL;
  }

  /**
   * Plays a single game session trying to reach the target winning amount
   * @param targetWin The amount we want to win
   * @returns GameResult with statistics about the session
   */
  playSession(targetWin: number): GameResult {
    let balance = 0;
    let currentBet = this.initialBet;
    let maxBet = this.initialBet;
    let rounds = 0;
    let totalWagered = 0;
    let consecutiveLosses = 0;

    while (balance < targetWin) {
      rounds++;
      totalWagered += currentBet;

      // Check if we can afford this bet
      if (totalWagered > this.maxBankroll) {
        return {
          success: false,
          maxBet,
          totalRounds: rounds - 1,
          finalBalance: balance,
          totalWagered: totalWagered - currentBet
        };
      }

      // Track maximum bet
      if (currentBet > maxBet) {
        maxBet = currentBet;
      }

      // Spin the roulette
      const won = this.roulette.spin();

      if (won) {
        // Win: gain the current bet amount
        balance += currentBet;
        // Reset to initial bet for next sequence
        currentBet = this.initialBet;
        consecutiveLosses = 0;
      } else {
        // Loss: lose the bet amount, double the bet for next round
        balance -= currentBet;
        currentBet *= 2;
        consecutiveLosses++;
      }

      // Safety check to prevent infinite losses
      if (consecutiveLosses > 30) { // 2^30 would be over a billion
        return {
          success: false,
          maxBet,
          totalRounds: rounds,
          finalBalance: balance,
          totalWagered
        };
      }
    }

    return {
      success: true,
      maxBet,
      totalRounds: rounds,
      finalBalance: balance,
      totalWagered
    };
  }

  /**
   * Calculates the time in days for the given number of rounds
   */
  static roundsToDays(rounds: number): number {
    const minutes = rounds * SIMULATION_CONFIG.MINUTES_PER_ROUND;
    const hours = minutes / 60;
    return hours / 24;
  }
} 