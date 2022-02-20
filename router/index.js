const express = require("express");
const router = express.Router();
const CrudController = require("../controllers/CrudController");

router.get("/", CrudController.index);

router.get("/users/:id", CrudController.show);

router.post("/users/store", CrudController.store);

router.put("/users/:id", CrudController.update);

router.delete("/users/:id", CrudController.delete);

module.exports = router;
