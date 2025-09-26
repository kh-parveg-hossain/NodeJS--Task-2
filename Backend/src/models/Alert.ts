import mongoose, { Schema, Document } from "mongoose";

export interface IAlert extends Document {
  coin: string;
  condition: "above" | "below";
  targetPrice: number;
  email: string;
}

const AlertSchema = new Schema<IAlert>({
  coin: { type: String, required: true },
  condition: { type: String, enum: ["above", "below"], required: true },
  targetPrice: { type: Number, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<IAlert>("Alert", AlertSchema);
