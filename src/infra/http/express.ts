import express from "express";
const app = express();

app.get("/orders/:code", async (request, response) => {
  response.json();
});

app.listen(3000, () => console.log("Server is running"));
