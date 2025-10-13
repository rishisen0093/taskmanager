const cluster = require("node:cluster");
const os = require("os");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const { Worker } = require("worker_threads");
const notesRouter = require("./routes/notes");
const { errorHandler } = require("./middlewares/errorHandler");

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 4000;

if (cluster.isPrimary) {
  console.log(`🧠 Primary process PID: ${process.pid}`);
  console.log(`⚙️  Starting ${numCPUs} worker processes...\n`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));
  app.use(compression());

  app.use("/api/notes", notesRouter);

  app.get("/api/heavy", (req, res) => {
    console.log(`🧵 Heavy computation started by worker ${process.pid}`);

    const worker = new Worker("./worker.js");

    worker.on("message", (result) => {
      console.log(`✅ Worker ${process.pid} finished with result: ${result}`);
      res.json({ message: "Computation complete", result });
    });

    worker.on("error", (err) => {
      console.error(`❌ Worker ${process.pid} error:`, err);
      res.status(500).json({ error: "Worker thread failed", details: err.message });
    });

    worker.on("exit", (code) => {
      if (code !== 0)
        console.error(`⚠️ Worker stopped with exit code ${code}`);
    });
  });

  app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} listening on http://localhost:${PORT}`);
  });
}
