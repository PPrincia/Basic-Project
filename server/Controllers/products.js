import model from "../models";
import bcryptjs from "bcryptjs";

const { Products } = model;

class productController{

   static async regProduct(req,res){
       try {
           const {
               name,
               price,
               category,
               businessId

           }=req.body;

       const product = {
               name,
               price,
               category,
               businessId
           };

           const createProduct = await Products.create(product);
           if(createProduct){
               return res.status(201).json({
                   product:{
                       name: createProduct.dataValues.name,
                       price: createProduct.dataValues.price,
                       category: createProduct.dataValues.category,
                       businessId: createProduct.dataValues.businessId
                   }
               });
           }
       } catch (error) {
            
           return res.status(500).json({
               message: "System error:" + error
           });
       }
   }

   static async  findProduct(req, res) {
    try {
       

        const findProd = await Products.findByPk(req.body.businessId);

        if(findProd){

            return res.status(200).json({
                prod: findProd.dataValues
            })
        } 
        else{
            return res.status(404).json({
                message: 'Product not found'
            })
        }

    } 
    catch (error) {
        res.status(500).json({
            message: "System error: "+error
        });
    }
}

static async findAllProducts(req,res){

    return Products
    .findAll()
    .then( prod => {
        res.status(200).send( prod )
    })
}

static async modifyProducts(req,res){
    try{

        const { name } = req.body;
        return Products
        .findByPk(req.body.businessId)
        .then(prd => {
            prd.update({
                name: name || prd.name
            })
            .then((updateProduct)=>{
                res.status(200).send({
                    message: "Product updated successfully",
                    date: {
                        name: name || updateProduct.name
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

static async deleteProduct(req,res){
    try {
        return Products
        .findByPk(req.body.businessId)
        .then(prd => {
            if(!prd){
                return res.status(400).send({
                    message: "Product not found"
                })
            }
            return prd
            .destroy()
            .then(() => {
                return res.status(200).send({
                    message: "Product deleted successfully"
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

export default productController;