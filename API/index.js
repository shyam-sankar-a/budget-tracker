import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes/users.js';

const app = express();
let port = process.env.PORT || 4201;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`App is now listening on port http://localhost:${port}`);
});

/* app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`App is now listening on port http://localhost:${port}`);
}); */