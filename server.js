const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db/connect");
const data = require("./data");
const bodyParser = require("body-parser");

const port = process.env.PORT;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));

// app.get("/api/product/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.find((x) => x._id === productId);
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).json({ msg: "Product Not Found" });
//   }
// });

// app.get("/api/products", (req, res) => {
//   res.send(data);
// });

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
    await connectDB();
  } catch (err) {
    console.log(err);
  }
};

start();
