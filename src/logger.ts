import { writeFileSync, appendFileSync } from 'fs';
import { OUTPUT_CONFIG } from './constants';

/**
 * Logger for simulation progress and results
 */
export class Logger {
  private static logFile = OUTPUT_CONFIG.LOG_FILE;
  private static isLogFileInitialized = false;

  /**
   * Initializes the log file
   */
  static initLogFile(): void {
    if (!this.isLogFileInitialized) {
      const timestamp = new Date().toISOString();
      writeFileSync(this.logFile, `Martingale Simulation Log\nStarted: ${timestamp}\n\n`);
      this.isLogFileInitialized = true;
    }
  }

  /**
   * Logs a message to both console and file
   */
  static log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    
    console.log(logEntry);
    
    if (this.isLogFileInitialized) {
      appendFileSync(this.logFile, logEntry + '\n');
    }
  }

  /**
   * Logs an info message with blue color
   */
  static info(message: string): void {
    this.log(`ℹ️  ${message}`);
  }

  /**
   * Logs a success message with green color
   */
  static success(message: string): void {
    this.log(`✅ ${message}`);
  }

  /**
   * Logs a warning message with yellow color
   */
  static warn(message: string): void {
    this.log(`⚠️  ${message}`);
  }

  /**
   * Logs an error message with red color
   */
  static error(message: string): void {
    this.log(`❌ ${message}`);
  }

  /**
   * Logs simulation progress
   */
  static progress(currentRun: number, totalRuns: number, targetWin: number): void {
    const percentage = ((currentRun / totalRuns) * 100).toFixed(1);
    const message = `Progress: ${currentRun.toLocaleString()}/${totalRuns.toLocaleString()} (${percentage}%) - Target: $${targetWin}`;
    this.log(`📊 ${message}`);
  }

  /**
   * Logs simulation results summary
   */
  static results(targetWin: number, successfulRuns: number, totalRuns: number, avgMaxBet: number, avgTime: number): void {
    const successRate = ((successfulRuns / totalRuns) * 100).toFixed(1);
    const timeStr = this.formatTime(avgTime);
    
    this.log(`🎯 Results for $${targetWin} target:`);
    this.log(`   Success Rate: ${successRate}% (${successfulRuns}/${totalRuns})`);
    if (successfulRuns > 0) {
      this.log(`   Average Max Bet: $${avgMaxBet.toLocaleString()}`);
      this.log(`   Average Time: ${timeStr}`);
    }
    this.log('');
  }

  /**
   * Formats time for display
   */
  private static formatTime(days: number): string {
    if (days < 1) {
      const hours = days * 24;
      if (hours < 1) {
        const minutes = hours * 60;
        return `${minutes.toFixed(0)} minutes`;
      }
      return `${hours.toFixed(1)} hours`;
    }
    return `${days.toFixed(2)} days`;
  }

  /**
   * Creates a separator line in the log
   */
  static separator(): void {
    this.log('═'.repeat(60));
  }

  /**
   * Logs the start of a new simulation phase
   */
  static startPhase(phase: string): void {
    this.separator();
    this.info(`Starting: ${phase}`);
    this.separator();
  }

  /**
   * Logs the completion of a simulation phase
   */
  static endPhase(phase: string): void {
    this.separator();
    this.success(`Completed: ${phase}`);
    this.separator();
  }
} 