import express from "express";
import matchController from "../controllers/match.controller.js";

const matchRoutes = express.Router();

// Create
matchRoutes.post("/create", matchController.createMatch);

// Get All
matchRoutes.get("/", matchController.getAllMatches);

// Get Single
matchRoutes.get("/:id", matchController.getSingleMatch);

// Update
matchRoutes.put("/:id", matchController.updateMatch);

// Delete
matchRoutes.delete("/:id", matchController.deleteMatch);

export default matchRoutes;