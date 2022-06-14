require("dotenv").config();
const express = require("express");
const app = express();
// const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
const PORT = process.env.PORT || 8080;

/* app.get("/test", () => {
    console.log("Test successful");
}); */

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("Connected to the database."));
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();