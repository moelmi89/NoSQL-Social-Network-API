const router = require("express").Router();
const apiRoutes = require("./thoughtRoutes");
const apiRoutes = require("./userRoutes");

router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;