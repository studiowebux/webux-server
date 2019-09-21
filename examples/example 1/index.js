let instance = require("./instance");
const cluster = require("cluster");

async function loadApp() {
  instance.app.use("*", (req, res, next) => {
    console.log("New request on worker #" + cluster.worker.id);
    console.log("Request resource : " + req.baseUrl);
    console.log("---")
    next();
  });

  instance.app.use("/hello", (req, res) => {
    res.status(200).send(instance.myFn());
  });

  instance.app.use("/", (req, res) => {
    res.status(200).json(instance.config);
  });

  await instance.startServer;

  console.log("Load something else too, like a socket server ...");

  instance.myFn = require("./myFn");
}

try {
  loadApp();
} catch (e) {
  console.error(e);
  process.exit(1);
}
