const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const res = require("express/lib/response");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDoc = require("./swagger.json");

const app = express();
dotenv.config();

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Cloud Mongodb successfully connected!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req,res)=>{
  console.log("API server is running");
  res.send("API server is running");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
// app.use(
//     '/api-docs',
//     swaggerUi.serve, 
//     swaggerUi.setup(swaggerDoc)
// );

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running for listening requests for APIs");
});
