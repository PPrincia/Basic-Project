import model from "../models";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const { Businesses } = model;

class BusinessController{

    static async regBusiness(req, res){
        //console.log("jjjjjjjjdtdueg");
        try {
            const{
                name,
                userId
    
            }=req.body;
    
            const business = {
                name,
               userId
            };
    
    
            const createBusiness = await Businesses.create(business);
            if(createBusiness){
                res.status(201).json({
                    business:{
                        name: createBusiness.dataValues.name,
                        userId: createBusiness.dataValues.userId
                        
                    }
                });
                res.status(200).json({
                    message: 'Registered successfully'
                });
            }
    
        } catch (error) {
            res.status(500).json({
                message: "System error:" + error
            });
        }
    }


    static async  findBusiness(req, res) {
        try {
           

            const findBus = await Businesses.findByPk(req.body.userId);

            if(findBus){

                return res.status(200).json({
                    bus: findBus.dataValues
                })
            } 
            else{
                return res.status(404).json({
                    message: 'Business not found'
                })
            }

        } 
        catch (error) {
            res.status(500).json({
                message: "System error: "+error
            });
        }
    }

    static async findAllBusiness(req,res){

        return Businesses
        .findAll()
        .then( bus => {
            res.status(200).send( bus )
        })
    }

    static async modifyBusiness(req,res){
        try{

            const { name } = req.body;
            return Businesses
            .findByPk(req.body.userId)
            .then(busi => {
                busi.update({
                    name: name || busi.name
                })
                .then((updateBusiness)=>{
                    res.status(200).send({
                        message: "Business updated successfully",
                        date: {
                            name: name || updateBusiness.name
                        }
                    })
                })
                
            })
        }
        catch(error){
            res.status(500).send({
                message: "error" + error
            })
        };
    }

    static async deleteBus(req,res){
        try {
            return Businesses
            .findByPk(req.body.userId)
            .then(busi => {
                if(!busi){
                    return res.status(400).send({
                        message: "Business not found"
                    })
                }
                return busi
                .destroy()
                .then(() => {
                    return res.status(200).send({
                        message: "Business deleted successfully"
                    })
                })
                //.catch(error => res.status(400).send(error))
            })
            //.catch(error => res.status(400).send(error))
        }
        catch(eror){
            message: "System error" +error
        }
    }

    static async registerBusiness(req,res){
        try{
            const token = req.headers['x-access-token'];
            if(!token) return res.status(404).send({message: "no token found"})
            const verifyT = jwt.verify(token, process.env.SECRET);
            const userId = verifyT.id;


            const { name } = req.body;
            const busi = {
                name,
                userId
            }
            const ceateBus = await Businesses.create(busi);
            if(createBus){
                res.status(201).json({
                    message: "Business created successfully",
                    business: createBus.dataValues
                });
            }
            else{
                return res.status(404).send(error)
        }
    }

        catch(error){
            res.status(500).send({
                message: "error: "+error
            })
        }
    }
}  


export default BusinessController;