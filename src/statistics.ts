import { SIMULATION_CONFIG } from './constants';

export interface SimulationStats {
  targetWin: number;
  totalRuns: number;
  successfulRuns: number;
  successRate: number;
  
  // Time statistics
  times: number[];
  avgTime: number;
  medianTime: number;
  timeConfidenceInterval: [number, number];
  
  // Additional statistics
  totalRounds: number[];
  avgRounds: number;
  
  // Financial statistics - Total Capital Required
  totalWagered: number[];
  avgTotalWagered: number;
  medianTotalWagered: number;
  totalWageredConfidenceInterval: [number, number];
}

/**
 * Statistics calculator for simulation results
 */
export class StatisticsCalculator {
  /**
   * Calculates comprehensive statistics for a set of successful game results
   */
  static calculateStats(
    targetWin: number,
    totalRounds: number[],
    totalWagered: number[],
    totalRuns: number
  ): SimulationStats {
    const successfulRuns = totalWagered.length;
    const successRate = successfulRuns / totalRuns;
    
    // Convert rounds to time in days
    const times = totalRounds.map(rounds => 
      (rounds * SIMULATION_CONFIG.MINUTES_PER_ROUND) / (60 * 24)
    );
    
    return {
      targetWin,
      totalRuns,
      successfulRuns,
      successRate,
      
      // Time statistics
      times: [...times],
      avgTime: this.mean(times),
      medianTime: this.median(times),
      timeConfidenceInterval: this.confidenceInterval(times),
      
      // Additional statistics
      totalRounds: [...totalRounds],
      avgRounds: this.mean(totalRounds),
      
      // Financial statistics - Total Capital Required
      totalWagered: [...totalWagered],
      avgTotalWagered: this.mean(totalWagered),
      medianTotalWagered: this.median(totalWagered),
      totalWageredConfidenceInterval: this.confidenceInterval(totalWagered),
    };
  }

  /**
   * Calculates the mean of an array
   */
  private static mean(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  /**
   * Calculates the median of an array
   */
  private static median(values: number[]): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  }

  /**
   * Calculates the standard deviation of an array
   */
  private static standardDeviation(values: number[]): number {
    if (values.length <= 1) return 0;
    const avg = this.mean(values);
    const squaredDiffs = values.map(val => Math.pow(val - avg, 2));
    return Math.sqrt(this.mean(squaredDiffs));
  }

  /**
   * Calculates confidence interval using t-distribution approximation
   */
  private static confidenceInterval(values: number[]): [number, number] {
    if (values.length === 0) return [0, 0];
    
    const mean = this.mean(values);
    const std = this.standardDeviation(values);
    const n = values.length;
    
    // For 90% confidence interval, use t-value approximation
    // For large samples (n > 30), t ≈ 1.645 for 90% CI
    const tValue = n > 30 ? 1.645 : this.getTValue(n, SIMULATION_CONFIG.CONFIDENCE_LEVEL);
    const marginOfError = tValue * (std / Math.sqrt(n));
    
    return [mean - marginOfError, mean + marginOfError];
  }

  /**
   * Simple t-value approximation for smaller samples
   */
  private static getTValue(n: number, confidence: number): number {
    // Simplified t-values for 90% confidence
    const tTable: { [key: number]: number } = {
      1: 6.314, 2: 2.920, 3: 2.353, 4: 2.132, 5: 2.015,
      10: 1.812, 15: 1.753, 20: 1.725, 25: 1.708, 30: 1.697
    };
    
    // Find closest value or use approximation
    const keys = Object.keys(tTable).map(Number).sort((a, b) => a - b);
    for (const key of keys) {
      if (n <= key) {
        return tTable[key];
      }
    }
    
    return 1.645; // For large samples
  }

  /**
   * Formats a number with appropriate precision
   */
  static formatNumber(value: number, decimals: number = 2): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  /**
   * Formats time in days to a readable string
   */
  static formatTime(days: number): string {
    if (days < 1) {
      const hours = days * 24;
      if (hours < 1) {
        const minutes = hours * 60;
        return `${this.formatNumber(minutes, 0)} minutes`;
      }
      return `${this.formatNumber(hours, 1)} hours`;
    }
    return `${this.formatNumber(days, 2)} days`;
  }
} 