
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("apiRoute - Start");
    
  res.json({
    "method": req.method,
    "path": req.originalUrl + req.path});
});

export default router;