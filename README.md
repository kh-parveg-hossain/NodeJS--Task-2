
# 🚀 Real-Time Cryptocurrency Price Monitoring & Alerting System

A real-time cryptocurrency price monitoring and alerting system built with **Node.js**, **TypeScript**, **WebSocket**, **Redis**, and **Nodemailer**.  
It provides live crypto price updates, lets users set alerts, and uses caching for optimized performance.  

---
## redis daatbase

![App Screenshot](https://raw.githubusercontent.com/kh-parveg-hossain/NodeJS--Task-2/refs/heads/main/Screenshot%202025-09-27%20000420.png)
## Frontend
![App Screenshot](https://raw.githubusercontent.com/kh-parveg-hossain/NodeJS--Task-2/refs/heads/main/Screenshot%202025-09-27%20000451.png)

## 📌 Features

- 🔄 **Real-time Monitoring** – Continuously fetch and update cryptocurrency prices.
- 🚨 **Alerting System** – Users can set alert criteria and receive email notifications.
- ⚡ **Caching Mechanism** – Uses **Redis** to store recent price updates and reduce API overhead.
- 📧 **Email Notifications** – Alert users instantly when their conditions are met.
- 🛠 **Clean Architecture** – Organized with controllers, routes, middlewares, and utils.

---

## 📂 Project Structure



## Usage/Examples

```bash
my-app/
 ├── src/
 │   ├── server.ts             # Server Entry Point
 │   ├── binanceSocket.ts      # websoket     
 │   │
 │   ├── config/              # Configuration Files
 │   │   └── config.ts
 │   │
 │   ├── models/              # Database Models
 │   │   └── Alert.ts
 │   │
 │   ├── routes/              # API Routes
 │   │   ├── routes.ts        # Route handler
 │   │   └── alerts.ts
 │   │
 │   ├── controllers/         # Business Logic
 │   │   └── controller.ts
 │   │
 │   ├── middlewares/         # Middlewares
 │   │   └── catchAsync.ts    # Async error handling
 │   │
 │   ├── utils/               # Helpers
 │   │   ├── db.ts            # MongoDB connection
 │   │   ├── redis.ts         # Redis connection
 │   │   ├── email.ts         # Email sending (Nodemailer)
 │   │   └── AppError.ts      # Custom error class
 │
 ├── dist/                    # Compiled JS (auto generated)
 ├── .env                     # Environment variables
 ├── .env-local               # Local environment variables
 ├── tsconfig.json            # TypeScript configuration
 ├── package.json             # Dependencies & scripts
 └── .gitignore               # Ignored files


```
## Tech Stack

**Client:** React, TailwindCSS,axios

**Server:** Node.js + TypeScript,Express.js,
WebSocket ,MongoDB,Redis,Nodemailer




