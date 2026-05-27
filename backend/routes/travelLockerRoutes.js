const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  getDocuments,
  addDocument,
  deleteDocument,
} = require("../controllers/travelLockerController");

// All locker routes require authentication
router.use(verifyToken);

router.get("/", getDocuments);
router.post("/", addDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
