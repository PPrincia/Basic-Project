import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import userRouter from "./server/routes/users";
import businessRouter from "./server/routes/business";
import BusinessController from './server/Controllers/business';
import productRouter from "./server/routes/products";
import productController from './server/Controllers/products';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

 app.use(logger('dev'));

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false}));
 app.use(userRouter);
 app.use(businessRouter);
 app.use(productRouter);
 //app.put("/app", productController.modifyProducts);
 app.post("/apps", (req, res) =>  res.status(200).send({
    message: 'hello',
 }));

 app.get("*", (rep, res) => res.status(200).send({
    message: 'Welcome to the default API route',
 }))

 app.listen(port, () => {
     console.log(`Server running at http://${hostname}:${port}/`)
 });