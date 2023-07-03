const {
  getServices,
  createService,
  deleteService,
  updateService,
} = require("../controllers/service");

const express = require("express");

const router = express.Router();
const { serviceValidator } = require("../validators/validators");

router.get("/services", getServices);
router.post("/services/new", serviceValidator, createService);
router.delete("/services/delete/:id", deleteService);
router.put("/services/update/:id", updateService);

module.exports = router;
