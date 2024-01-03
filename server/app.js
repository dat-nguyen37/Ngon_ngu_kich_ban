const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const userRouter=require('./routers/user.router')
const authRouter=require('./routers/auth.router')
const categoryRouter=require('./routers/category.router')
const productRouter=require('./routers/product.router')
const roleRouter=require('./routers/role.router')
const supplierRouter=require('./routers/supplier.router')
const warehouseRouter=require('./routers/warehouse.router')
const invoiceDetailRouter=require('./routers/invoiceDetail.router')
const invoiceRouter=require('./routers/invoice.router')
const logRouter=require('./routers/log.router')
const likeRouter=require('./routers/like.router')
const commentRouter=require('./routers/comment')


const amqp = require('amqplib');



const createLog=require('./log')
const checkLogin= require('./verifyToken');


const app = express();

app.use(express.static('public'));
dotenv.config();

app.use(express.json())
app.use(cors({
   origin: 'http://localhost:3000', 
   credentials: true,
 }));
app.use(cookieParser());


app.use('/user',userRouter);
app.use('/',authRouter);
app.use('/product',checkLogin,productRouter)
app.use('/category',categoryRouter)
app.use('/role',roleRouter)
app.use('/supplier',supplierRouter)
app.use('/warehouse',warehouseRouter)
app.use('/invoiceDetail',invoiceDetailRouter)
app.use('/invoice',invoiceRouter)
app.use('/like',likeRouter)
app.use('/comment',commentRouter)


app.use('/log',checkLogin,logRouter)


 
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
   console.log(`Listening is running on ${PORT}`);
})
