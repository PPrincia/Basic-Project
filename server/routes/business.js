import express from "express";
import BusinessController from "../Controllers/business";

const router  = express.Router();


//router.post("/registerBusiness/userId", BusinessController.registerBusiness);
router.delete("/deleteBus", BusinessController.deleteBus);
router.get("/findAllBusiness", BusinessController.findAllBusiness);
router.put("/modifyBusiness", BusinessController.modifyBusiness);
router.get("/findBusiness", BusinessController.findBusiness);

router.post("/bbusiness", BusinessController.regBusiness);

export default router;