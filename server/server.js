const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const notesRouter = require("./routes/notes");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/api/notes", notesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Notes API listening on http://localhost:${PORT}`);
});
