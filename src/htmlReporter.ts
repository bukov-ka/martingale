import { SimulationStats, StatisticsCalculator } from './statistics';
import { SIMULATION_CONFIG, ROULETTE_CONFIG } from './constants';

/**
 * HTML report generator for simulation results
 */
export class HtmlReporter {
  /**
   * Generates a comprehensive HTML report
   */
  static generateReport(allStats: SimulationStats[], rouletteInfo: string): string {
    const timestamp = new Date().toLocaleString();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Martingale Betting System Simulation Results</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0 0 10px 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        
        .header p {
            margin: 5px 0;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px;
        }
        
        .config-section {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            border-left: 5px solid #007bff;
        }
        
        .config-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .config-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .config-item strong {
            color: #2c3e50;
        }
        
        .results-section {
            margin-bottom: 40px;
        }
        
        .target-section {
            background: #fff;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border: 1px solid #e9ecef;
        }
        
        .target-header {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 15px 20px;
            margin: -25px -25px 20px -25px;
            border-radius: 10px 10px 0 0;
            font-size: 1.3em;
            font-weight: 500;
        }
        
        .target-header.failed {
            background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .stat-card {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            border: 1px solid #dee2e6;
        }
        
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #2c3e50;
            margin: 10px 0;
        }
        
        .stat-label {
            color: #6c757d;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .confidence-interval {
            background: #e3f2fd;
            border-radius: 6px;
            padding: 10px;
            margin: 10px 0;
            font-size: 0.9em;
            border-left: 4px solid #2196f3;
        }
        
        .success-rate {
            background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
            color: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        
        .success-rate.low {
            background: linear-gradient(135deg, #f44336 0%, #ff9800 100%);
        }
        
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
        }
        
        .footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 20px;
            margin-top: 30px;
            font-size: 0.9em;
        }
        
        .methodology {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 30px 0;
            border-left: 5px solid #6f42c1;
        }
        
        .methodology h3 {
            color: #6f42c1;
            margin-top: 0;
        }
        
        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }
            
            .config-grid {
                grid-template-columns: 1fr;
            }
            
            body {
                padding: 10px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎰 Martingale Betting System</h1>
            <h2>Simulation Results</h2>
            <p>Generated on ${timestamp}</p>
            <p>${rouletteInfo}</p>
        </div>
        
        <div class="content">
            <div class="config-section">
                <h3>📊 Simulation Configuration</h3>
                <div class="config-grid">
                    <div class="config-item">
                        <strong>Total Simulation Runs:</strong><br>
                        ${StatisticsCalculator.formatNumber(SIMULATION_CONFIG.TOTAL_RUNS, 0)}
                    </div>
                    <div class="config-item">
                        <strong>Initial Bet:</strong><br>
                        $${SIMULATION_CONFIG.INITIAL_BET}
                    </div>
                    <div class="config-item">
                        <strong>Time per Round:</strong><br>
                        ${SIMULATION_CONFIG.MINUTES_PER_ROUND} minute${SIMULATION_CONFIG.MINUTES_PER_ROUND > 1 ? 's' : ''}
                    </div>
                    <div class="config-item">
                        <strong>Confidence Level:</strong><br>
                        ${(SIMULATION_CONFIG.CONFIDENCE_LEVEL * 100)}%
                    </div>
                    <div class="config-item">
                        <strong>Max Bankroll Limit:</strong><br>
                        $${StatisticsCalculator.formatNumber(SIMULATION_CONFIG.MAX_BANKROLL, 0)}
                    </div>
                    <div class="config-item">
                        <strong>Roulette Type:</strong><br>
                        ${ROULETTE_CONFIG.HAS_DOUBLE_ZERO ? 'American (38 slots)' : 'European (37 slots)'}
                    </div>
                </div>
            </div>
            
            ${this.generateResultsSections(allStats)}
            
            <div class="methodology">
                <h3>📈 Methodology & Key Insights</h3>
                <p><strong>Martingale Strategy:</strong> Double the bet after each loss until you win, then reset to the initial bet. The strategy aims to recover all previous losses plus win a profit equal to the original stake.</p>
                
                <p><strong>Total Capital Required:</strong> This represents the total amount of money you need to put at risk during your entire session to reach your target. This is different from individual bet sizes - it's your total exposure.</p>
                
                <p><strong>90% Confidence Intervals:</strong> We can be 90% confident that the true average total capital requirement falls within this range. These intervals help you plan for realistic scenarios, not just best-case outcomes.</p>
                
                <p><strong>Average vs. Median:</strong> The median shows what 50% of players experience, while the average accounts for rare but extreme scenarios. The difference reveals the hidden risks of the Martingale system.</p>
                
                <div class="warning">
                    <strong>💡 Key Insight:</strong> Even with 99%+ success rates, the total capital you need to put at risk is often much higher than your target winnings. The few failed attempts (hitting the $${StatisticsCalculator.formatNumber(SIMULATION_CONFIG.MAX_BANKROLL, 0)} limit) would result in catastrophic losses that far exceed all previous gains.
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Simulation based on the Martingale betting system as described in <a href="https://en.wikipedia.org/wiki/Martingale_(betting_system)" target="_blank" style="color: #74b9ff;">Wikipedia: Martingale (betting system)</a></p>
            <p>Generated with ${StatisticsCalculator.formatNumber(SIMULATION_CONFIG.TOTAL_RUNS, 0)} Monte Carlo simulations</p>
        </div>
    </div>
</body>
</html>`;
  }

  /**
   * Generates the results sections for each target winning amount
   */
  private static generateResultsSections(allStats: SimulationStats[]): string {
    return allStats.map(stats => {
      const successRate = stats.successRate * 100;
      const isLowSuccess = successRate < 50;
      
      return `
            <div class="results-section">
                <div class="target-section">
                    <div class="target-header ${isLowSuccess ? 'failed' : ''}">
                        🎯 Target: Win $${stats.targetWin}
                    </div>
                    
                    <div class="success-rate ${isLowSuccess ? 'low' : ''}">
                        <h3 style="margin: 0;">Success Rate: ${StatisticsCalculator.formatNumber(successRate, 1)}%</h3>
                        <p style="margin: 5px 0 0 0;">${StatisticsCalculator.formatNumber(stats.successfulRuns, 0)} successful runs out of ${StatisticsCalculator.formatNumber(stats.totalRuns, 0)} total runs</p>
                    </div>
                    
                                         ${stats.successfulRuns > 0 ? `
                     <div class="stats-grid">
                         <div class="stat-card">
                             <div class="stat-label">💰 Average Total Capital Required</div>
                             <div class="stat-value">$${StatisticsCalculator.formatNumber(stats.avgTotalWagered)}</div>
                             <div class="confidence-interval">
                                 <strong>90% Confidence Interval:</strong><br>
                                 $${StatisticsCalculator.formatNumber(stats.totalWageredConfidenceInterval[0])} - $${StatisticsCalculator.formatNumber(stats.totalWageredConfidenceInterval[1])}
                             </div>
                             <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #6c757d;">
                                 Total amount you need to put at risk
                             </p>
                         </div>
                         
                         <div class="stat-card">
                             <div class="stat-label">📊 Median Total Capital Required</div>
                             <div class="stat-value">$${StatisticsCalculator.formatNumber(stats.medianTotalWagered)}</div>
                             <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #6c757d;">
                                 50% of successful runs required less capital than this
                             </p>
                         </div>
                         
                         <div class="stat-card">
                             <div class="stat-label">⏱️ Average Time Required</div>
                             <div class="stat-value">${StatisticsCalculator.formatTime(stats.avgTime)}</div>
                             <div class="confidence-interval">
                                 <strong>90% Confidence Interval:</strong><br>
                                 ${StatisticsCalculator.formatTime(stats.timeConfidenceInterval[0])} - ${StatisticsCalculator.formatTime(stats.timeConfidenceInterval[1])}
                             </div>
                         </div>
                         
                         <div class="stat-card">
                             <div class="stat-label">📈 Median Time Required</div>
                             <div class="stat-value">${StatisticsCalculator.formatTime(stats.medianTime)}</div>
                             <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #6c757d;">
                                 50% of successful runs completed faster than this
                             </p>
                         </div>
                     </div>
                     ` : `
                    <div class="warning">
                        <strong>No Successful Runs:</strong> All ${StatisticsCalculator.formatNumber(stats.totalRuns, 0)} simulation runs failed to reach the target of $${stats.targetWin} before hitting the bankroll limit of $${StatisticsCalculator.formatNumber(SIMULATION_CONFIG.MAX_BANKROLL, 0)}.
                    </div>
                    `}
                </div>
            </div>
      `;
    }).join('');
  }
} 