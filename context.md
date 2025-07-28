I want to run a simulation to test the Martingale betting system: https://en.wikipedia.org/wiki/Martingale_(betting_system)


I am on Windows 11 with NodeJS v20.13.1 installed. I want to have a script in TypeScript to run with ts-node. Currently we have an empty project without any code.

I want to run sumulations of roulette runs with martingale betting with the initial bet of $1. I need to win $10, $100 and $1000 in the end. The script should simulate the runs and output how much money it took (maximum bet) and how much time (one round is 1 minute).
The results should be in a nice HTML. The roulette should have only one zero sector (configurable).

There should be 100000 runs to get the statistics. I need to have 90% trust intervals for maximum money amount and for time period needed to win the prize. The time period should be in days (24 hours).

The script should be modular with the constants extracted. There should be logs to see what the script is doing right now.

Please create the script and run the simulation.