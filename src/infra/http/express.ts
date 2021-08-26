import express from "express";
const app = express();

app.get("/orders/:code", (request, response) => {
  response.json({
    code: "202100000001",
  });
});

app.listen(3000, () => console.log("Server is running"));
