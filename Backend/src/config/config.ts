import dotenv from 'dotenv';
dotenv.config();

interface Config{
   port:number
   redis_url:string
   mongo_uri:string
   smtp_host:string
   smtp_port:number
   smtp_user:string
   smtp_pass:string
   smtp_from:string
}

const config:Config ={
   port: Number(process.env.PORT) || 3000,
   redis_url: process.env.REDIS_URL || "",
   mongo_uri: process.env.MONGO_URL || "",
   smtp_host: process.env.SMTP_HOST || "",
   smtp_port: Number(process.env.SMTP_PORT) || 587,
   smtp_user: process.env.SMTP_USER || "",
   smtp_pass: process.env.SMTP_PASS || "",
   smtp_from: process.env.SMTP_FROM || ""
}


export default config;
