my-app/
 ├── src/
 │   ├── server.ts            # Server Entry Point
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

npm run dev   # for development (ts-node)
npm run build # compile TypeScript
npm start     # run compiled JS from dist/

📡 API Endpoints
Method	Endpoint	Description
GET	/	Test route / get user
GET	/prices	Get all cached crypto prices
POST	/prices/:symbol	Get price for a specific symbol
POST	/alerts	Create a new price alert
GET	/alerts/list	List all active alerts
📧 Alert System

Users set price conditions.

When condition matches → system triggers Nodemailer to send an email alert.

Alerts stored in DB for persistence.

🛠 Tech Stack

Backend: Node.js, TypeScript, Express.js

Database: MongoDB (Mongoose / Prisma / Sequelize)

Cache: Redis

Email: Nodemailer

Error Handling: Custom middlewares & async wrappers

🔮 Future Enhancements

Add authentication & user management.

Frontend dashboard (React.js).

Support multiple crypto APIs & WebSocket providers.

Dockerize for easy deployment.

✍️ Author: Kh Parveg Hossain
