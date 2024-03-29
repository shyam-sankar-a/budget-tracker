const express = require("express");
const errors = require("./middlewares/errors");
const userRouter = require("./routes/users.routes");
const budgiRouter = require("./routes/budgi.routes");

const app = express();
const PORT = process.env.PORT || 4201;

app.use(express.json());

//Routes
app.use("/user", userRouter);
app.use("/income", budgiRouter);
app.use("/expense", budgiRouter);
app.use("/transaction", budgiRouter);
app.use("/category", budgiRouter);
app.use("/reports", budgiRouter);

app.use("/", (req, res) => {

  res.send({
    app_name: "Budget Tracker",
    author: "Shyam Sankar",
    description: "An app that can be used for tracking your budget daily, weekly, monthly and yearly",
    verion: "1.0.0"
  });
});

//Error handler
app.use(errors.errorHandler);

app.listen(PORT, () => {
  console.log(`Your app is listening through port ${PORT}. Access application by http://localhost:${PORT}`);
});
