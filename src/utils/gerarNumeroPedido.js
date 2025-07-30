import mongoose from "mongoose";
import { Pedido } from "../models/Pedido.js";

export const generateOrderNumber = async () => {
    const count = await Pedido.countDocuments();
    return `PED-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
};