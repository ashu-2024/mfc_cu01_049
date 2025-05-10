const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");
const dataCheck = require("../middlewares/dataCheckMiddleware");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", dataCheck, controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/resolve", controller.resolve);

module.exports = router;
