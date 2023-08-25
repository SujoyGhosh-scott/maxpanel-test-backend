const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const userRouter = require("./routes/userRouter");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((e) => {
    console.log("DB connection error: ", e);
  });

app.get("/", (req, res) => {
  res.send("maxpanel test server");
});
app.use("/api/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));
