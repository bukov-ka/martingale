#!/usr/bin/env node

/**
 * Martingale Betting System Simulation
 * 
 * This script simulates the Martingale betting strategy on roulette
 * with configurable parameters and generates comprehensive statistics.
 */

import { Simulator } from './simulator';
import { Logger } from './logger';

async function main(): Promise<void> {
  console.log('🎰 Martingale Betting System Simulation');
  console.log('=========================================');
  console.log('');
  
  try {
    const simulator = new Simulator();
    
    console.log('Starting comprehensive simulation...');
    console.log('This may take several minutes depending on your system.');
    console.log('');
    
    const startTime = Date.now();
    
    await simulator.runFullSimulation();
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log('');
    console.log('🎉 Simulation completed successfully!');
    console.log(`⏱️  Total execution time: ${duration.toFixed(1)} seconds`);
    console.log('');
    console.log('📋 Files generated:');
    console.log('  - simulation_results.html (Open in your browser)');
    console.log('  - simulation.log (Detailed log file)');
    console.log('');
    
  } catch (error) {
    Logger.error(`Simulation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('❌ An error occurred during simulation:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Run the simulation
if (require.main === module) {
  main().catch((error) => {
    console.error('Failed to start simulation:', error);
    process.exit(1);
  });
} 