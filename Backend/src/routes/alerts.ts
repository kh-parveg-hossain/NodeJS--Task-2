
import Alert from "../models/Alert";
import express from "express";


// Create Alert
const createAlert = async (req: express.Request, res: express.Response) => {
  try {
    const { coin, condition, targetPrice, email } = req.body;
    const alert = new Alert({ coin, condition, targetPrice, email });
    await alert.save();
    res.json({ success: true, alert });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

// List Alerts
const listAlerts = async (req: express.Request, res: express.Response) => {
  try {
    const alerts = await Alert.find();
    res.json({ success: true, data: alerts });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
export  { createAlert, listAlerts };
