const express = require('express');
const cors = require("cors")
const {connection} = require('./config/db');
const { authentication } = require('./middileware/authentication');
const { EMImodel } = require('./models/Emi.model');
const { Usermodel } = require('./models/User.model');
const PORT = process.env.PORT;
const { userController } = require('./routes/user.routes');
require("dotenv").config();
const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req,res) => {
    res.send('Hello')
})

app.use("/user", userController);

app.use(authentication);

app.get("/getProfile", authentication, async(req,res) => {
    const {userId} = req.body;
    const user = await Usermodel.findOne({_id: userId})
    const {name, email} = user;
    res.send({name,email})
})

app.post("/calcualteEMI", authentication, async(req,res) =>{
    const {Principal_amount, rate,months, userId} = req.body;
    const P = Number(Principal_amount);
    const n = Number(months)
    const r = Number((P*(rate*0.01))/months);
    const EMI = Number(P*r*(1+r)*n/((1+r)*n-1)).toFixed(2);
    const new_emi = new EMImodel({
        EMI,
        Principal_amount,
        rate,
        months,
        userId
    })
    await new_emi.save()
    res.send({EMI})
    
})

app.get("/getCalculation", authentication,async (req,res) => {
    const {userId} = req.body;
    const all_emi = await EMImodel.find({userId: userId})
    res.send({history: all_emi})
})

app.listen(8000, async() => {
    try{
        await connection
        console.log("Connection to DB successfully")
    }
    catch(err){
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`Listening on ${PORT}`)
})
