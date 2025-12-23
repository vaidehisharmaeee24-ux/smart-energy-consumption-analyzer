# Smart Energy Consumption Analyzer

A frontend web application that analyzes appliance-level daily energy consumption and cost.  
The project provides real-time insights to help users understand energy usage patterns.

## Features

- Add appliances with power rating and daily usage hours
- Automatic calculation of daily energy consumption (kWh)
- Automatic calculation of daily electricity cost
- Edit and delete appliance entries
- Identifies the highest energy-consuming appliance
- Real-time updates without manual recalculation
- Persistent storage using browser localStorage
- Bar chart visualization of energy consumption using Chart.js

## How It Works

Energy consumption is calculated using:

Energy (kWh) = (Power × Usage Hours) / 1000

All values update dynamically when appliances are added, edited, or removed.

## Tech Stack

- HTML
- CSS
- JavaScript
- Chart.js
- localStorage

## Design Decisions

The application focuses on daily energy estimates to avoid inaccurate assumptions about monthly billing, which depends on variable tariffs and usage patterns.
