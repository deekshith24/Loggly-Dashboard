const { Router } = require("express");
const router = Router();
const getPerformanceMatrix = require("../controller/getPerformanceMatrix");

router.get("/getPerformanceMatrix", getPerformanceMatrix);
module.exports = router;
