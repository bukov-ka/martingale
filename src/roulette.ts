import { ROULETTE_CONFIG, WIN_PROBABILITY } from './constants';

/**
 * Roulette game implementation
 */
export class Roulette {
  private readonly winProbability: number;

  constructor() {
    this.winProbability = WIN_PROBABILITY;
  }

  /**
   * Simulates a single roulette spin
   * @returns true if the bet wins (red/black), false if it loses
   */
  spin(): boolean {
    return Math.random() < this.winProbability;
  }

  /**
   * Gets the win probability for red/black bets
   */
  getWinProbability(): number {
    return this.winProbability;
  }

  /**
   * Gets the house edge
   */
  getHouseEdge(): number {
    return 1 - (2 * this.winProbability);
  }

  /**
   * Gets roulette configuration info
   */
  getInfo(): string {
    const rouletteType = ROULETTE_CONFIG.HAS_DOUBLE_ZERO ? 'American' : 'European';
    const slots = ROULETTE_CONFIG.HAS_DOUBLE_ZERO ? 38 : 37;
    return `${rouletteType} Roulette (${slots} slots, ${(this.winProbability * 100).toFixed(2)}% win probability)`;
  }
} 