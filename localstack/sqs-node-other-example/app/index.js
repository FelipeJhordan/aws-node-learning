const express = require("express");
 
const app = express();
app.use(express.json());
 
const routes = require("./routes");
app.use("/", routes.appRoutes);
 
const port = process.env.PORT || 6001;
app.listen(port, () => {
  console.log(`Service endpoint = http://localhost:${port}`);
});