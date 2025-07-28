import { Roulette } from './roulette';
import { MartingaleStrategy, GameResult } from './martingale';
import { StatisticsCalculator, SimulationStats } from './statistics';
import { HtmlReporter } from './htmlReporter';
import { Logger } from './logger';
import { SIMULATION_CONFIG, OUTPUT_CONFIG } from './constants';
import { writeFileSync } from 'fs';

/**
 * Main simulation runner for the Martingale betting system
 */
export class Simulator {
  private roulette: Roulette;
  private strategy: MartingaleStrategy;

  constructor() {
    this.roulette = new Roulette();
    this.strategy = new MartingaleStrategy(this.roulette);
  }

  /**
   * Runs the complete simulation for all target winning amounts
   */
  async runFullSimulation(): Promise<void> {
    Logger.initLogFile();
    Logger.startPhase('Martingale Betting System Simulation');
    
    Logger.info(`Configuration:`);
    Logger.info(`- ${this.roulette.getInfo()}`);
    Logger.info(`- Initial bet: $${SIMULATION_CONFIG.INITIAL_BET}`);
    Logger.info(`- Total runs per target: ${SIMULATION_CONFIG.TOTAL_RUNS.toLocaleString()}`);
    Logger.info(`- Targets: $${SIMULATION_CONFIG.TARGET_WINNINGS.join(', $')}`);
    Logger.info(`- Max bankroll limit: $${SIMULATION_CONFIG.MAX_BANKROLL.toLocaleString()}`);
    Logger.info('');

    const allStats: SimulationStats[] = [];

    // Run simulation for each target winning amount
    for (const targetWin of SIMULATION_CONFIG.TARGET_WINNINGS) {
      Logger.startPhase(`Simulating ${SIMULATION_CONFIG.TOTAL_RUNS.toLocaleString()} runs for $${targetWin} target`);
      
      const stats = await this.runSimulationForTarget(targetWin);
      allStats.push(stats);
      
      Logger.results(
        stats.targetWin,
        stats.successfulRuns,
        stats.totalRuns,
        stats.avgMaxBet,
        stats.avgTime
      );
      
      Logger.endPhase(`$${targetWin} target simulation`);
    }

    // Generate and save HTML report
    Logger.startPhase('Generating HTML Report');
    const htmlContent = HtmlReporter.generateReport(allStats, this.roulette.getInfo());
    writeFileSync(OUTPUT_CONFIG.HTML_OUTPUT_FILE, htmlContent);
    Logger.success(`HTML report saved to: ${OUTPUT_CONFIG.HTML_OUTPUT_FILE}`);
    Logger.endPhase('HTML Report Generation');

    Logger.endPhase('Martingale Betting System Simulation');
    Logger.info(`📊 Simulation completed! Check ${OUTPUT_CONFIG.HTML_OUTPUT_FILE} for detailed results.`);
  }

  /**
   * Runs simulation for a specific target winning amount
   */
  private async runSimulationForTarget(targetWin: number): Promise<SimulationStats> {
    const maxBets: number[] = [];
    const totalRounds: number[] = [];
    const totalWagered: number[] = [];
    
    let successfulRuns = 0;
    let lastLogTime = Date.now();

    for (let run = 1; run <= SIMULATION_CONFIG.TOTAL_RUNS; run++) {
      const result = this.strategy.playSession(targetWin);
      
      if (result.success) {
        successfulRuns++;
        maxBets.push(result.maxBet);
        totalRounds.push(result.totalRounds);
        totalWagered.push(result.totalWagered);
      }

      // Log progress at intervals
      if (run % SIMULATION_CONFIG.LOG_INTERVAL === 0 || run === SIMULATION_CONFIG.TOTAL_RUNS) {
        const currentTime = Date.now();
        if (currentTime - lastLogTime >= 2000) { // Log every 2 seconds minimum
          Logger.progress(run, SIMULATION_CONFIG.TOTAL_RUNS, targetWin);
          lastLogTime = currentTime;
        }
      }

      // Yield control periodically to prevent blocking
      if (run % 1000 === 0) {
        await this.sleep(1);
      }
    }

    return StatisticsCalculator.calculateStats(
      targetWin,
      maxBets,
      totalRounds,
      totalWagered,
      SIMULATION_CONFIG.TOTAL_RUNS
    );
  }

  /**
   * Simple sleep function for yielding control
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Gets simulation configuration info
   */
  getSimulationInfo(): string {
    return `Martingale Simulation: ${SIMULATION_CONFIG.TOTAL_RUNS.toLocaleString()} runs per target, ${this.roulette.getInfo()}`;
  }
} 