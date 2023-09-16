let express=require("express");
let cors = require("cors");
let app = express();
app.use(cors());
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
});

const port = process.env.PORT || 2410;
app.listen(port,()=>console.log(`Listening on port ${port}`));
let customers=[
    {id: "DFI61", name:"Vishal", city:"Delhi", age:27, gender:"Male", payment:"Credit Card"},
    {id: "JUW88", name:"Amit", city:"Noida", age:49, gender:"Male", payment:"Debit Card"},
    {id: "KPW09", name:"Pradeep", city:"Gurgaon", age:21, gender:"Male", payment:"Wallet"},
    {id: "ABR12", name:"Rohit", city:"Jaipur", age:34, gender:"Male", payment:"Debit Card"},
    {id: "BR451", name:"Preeti", city:"Delhi", age:29, gender:"Female", payment:"Credit Card"},
    {id: "MKR52", name:"Neha", city:"Noida", age:42, gender:"Female", payment:"Debit Card"},
    {id: "BTT66", name:"Swati", city:"Gurgaon", age:24, gender:"Female", payment:"Wallet"},
    {id: "CDP09", name:"Meghna", city:"Jaipur", age:38, gender:"Female", payment:"Debit Card"},
    {id: "KK562", name:"Irfan", city:"Delhi", age:25, gender:"Male", payment:"Credit Card"},
    {id: "LPR34", name:"Gagan", city:"Noida", age:51, gender:"Female", payment:"Debit Card"},
    {id: "MQC11", name:"John", city:"Gurgaon", age:24, gender:"Male", payment:"Wallet"},
    {id: "AXY22", name:"Gurmeet", city:"Jaipur", age:31, gender:"Male", payment:"Debit Card"}
   ];



app.get("/customers",function(req,res){
    let city = req.query.city;
    let gender = req.query.gender;
    let payment = req.query.payment;
    console.log(req.query);
    let arr1 = customers;
    arr1 = city? arr1.filter((ct)=>ct.city===city) : arr1;
    arr1 = gender? arr1.filter((gn)=>gn.gender===gender) : arr1;
    arr1 = payment? arr1.filter((pt)=>pt.payment===payment) : arr1;
    res.send(arr1);
})

app.post("/customers",function(req,res){
    let body = req.body;
    let maxId = customers.reduce((ele,curr)=>curr.id >= ele ? curr.id : ele , 0);
    let newId = maxId + 1;
    let newCustomer = {id:newId, ...body};
    customers.push(newCustomer);
    res.send(newCustomer);

})
app.get("/customers/:id", function (req, res) {
    let id = req.params.id;
    let obj = customers.find((obj1) => obj1.id === id);
    if (obj) res.send(obj);
    res.send("not found");
  });

app.put("/customers/:id",function(req,res){
    let id = req.params.id;
    let body = req.body;
    let updateCustomer = {id:id, ...body};
    let index = customers.findIndex((ct)=>ct.id===id);
    if(index>=0){
    customers[index] = updateCustomer;
    res.send(updateCustomer);
    }else{
        res.status(404).send("No customer found");
    }
})

app.delete("/customers/:id",function(req,res){
    let id = +req.params.id;
    let index = customers.findIndex((ct)=>ct.id===id);
    let deletedCustomer = customers.splice(index,1);
    res.send(deletedCustomer);
})