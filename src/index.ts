import mongoose from "mongoose";
import { UserModel } from "./user.js";
import { OrderModel } from "./order.js";

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Conectado a MongoDB");

  // --- Crear un usuario ---
  const user = await UserModel.create({ name: "Bill", email: "bill@initech.com" });
  console.log("Usuario creado:", user);

  // --- Crear pedidos ---
  await OrderModel.create({ userId: user._id, product: "Teclado", qty: 2, price: 30 });
  await OrderModel.create({ userId: user._id, product: "Ratón", qty: 1, price: 15 });

  // --- Leer un usuario ---
  const userFound = await UserModel.findById(user._id);
  console.log("Usuario encontrado:", userFound);

  // --- Actualizar usuario ---
  const updated = await UserModel.findByIdAndUpdate(user._id, { name: "Bill Lumbergh" }, { new: true });
  console.log("Usuario actualizado:", updated);

  // --- Listar usuarios ---
  const users = await UserModel.find();
  console.log("Lista de usuarios:", users);

  // --- Agregación: unir usuario con pedidos ---
  const result = await UserModel.aggregate([
    { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } },
  ]);
  console.log("Usuario con pedidos:", JSON.stringify(result, null, 2));

  // --- Borrar usuario ---
  await UserModel.findByIdAndDelete(user._id);
  console.log("Usuario borrado");

  await mongoose.disconnect();
}

main().catch(console.error);
