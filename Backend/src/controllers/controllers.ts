import { Request, Response } from 'express';
import { catchAsync } from '../middlewares/catchAsync';
import {  latestPrices } from "../binanceSocket";



export const getUser = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
        message: "User fetched successfully",
        data: {
            id: 1,
            name: "John Doe"
        }
    });
});

export const getPrice = catchAsync(async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Price fetched successfully",
        data: latestPrices
    });
});

export const getSymbol = catchAsync(async (req: Request, res: Response) => {
   
      const { symbol } = req.params;

     if (!symbol) {
         return res.status(400).json({ error: "Symbol is required" });
      }
      const symboll = symbol.toLowerCase();

    res.status(200).json({
        message: "Symbol fetched successfully",
        data: latestPrices[symboll] ?? null
    });
});


