const cluster = require("node:cluster");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`🧠 Primary ${process.pid} is running`);
  console.log(`🔢 Number of CPUs: ${numCPUs}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  require("./server");
}
