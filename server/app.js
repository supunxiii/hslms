require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const PORT = 6010;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.use("/files", express.static("./public/files"));

app.use(router);

// Add a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Leave Management System API");
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server started at port no ${PORT}`);
});
