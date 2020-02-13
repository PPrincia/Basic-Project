import model from "../models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { Users } = model;

class UserController {

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     */
    static async signup(req, res){
        try {
            const{

                fullname,
                email,
                password
    
            }= req.body;
    
            const user = {
                fullname,
                email,
                password
            };
    
            const createUser = await Users.create(user);
            if(createUser){
                res.status(201).json({
                    user:{
                        id: createUser.dataValues.id,
                        email: createUser.dataValues.email
                    }
                   
                });
            }
            
        }

        catch(error){
            res.status(500).json({
                error
            });
        }
    }

    static async login(req, res){
        try{
            const {
                email,
                password
            }=req.body

            const findUser = await Users.findOne({ where: { email }});

            if(findUser){
                if(bcryptjs.compareSync(password, findUser.dataValues.password)){
                    const payload = {
                        id: findUser.dataValues.id,
                        email: findUser.dataValues.email
                    };
                    
                    const token = jwt.sign(payload, process.env.SECRET);

                    return res.status(200).json({
                        token,
                        message: 'Logged successfully'
                    });
                }
                return res.status(400).json({
                    error: "Password does not match"
                });
            }
           return res.status(404).json({
                error: 'email not found'
            });


        } catch (error){
            res.status(500).json({
                message: "System error: "+error
            });
        }
    }



    static async  findUser(req, res) {
        try {
           

            const findUs = await Users.findByPk(req.body.id);

            if(findUs){

                return res.status(200).json({
                    us: findUs.dataValues
                })
            } 
            else{
                return res.status(404).json({
                    message: 'User not found'
                })
            }

        } 
        catch (error) {
            res.status(500).json({
                message: "System error: "+error
            });
        }
    }


    static async findAllUsers(req,res){

        return Users
        .findAll()
        .then( us => {
            res.status(200).send( us )
        })
    }

    static async deleteUser(req,res){
        try {
            return Users
            .findByPk(req.body.id)
            .then(usr => {
                if(!usr){
                    return res.status(400).send({
                        message: "User not found"
                    })
                }
                return usr
                .destroy()
                .then(() => {
                    return res.status(200).send({
                        message: "User deleted successfully"
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


}

export default UserController;