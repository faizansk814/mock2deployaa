const express=require('express')
const EmployeeModel = require('../models/employee.model')
const jwt=require('jsonwebtoken')
const employeerouter=express.Router()

employeerouter.get("/employees",async (req,res)=>{
    try {
        const allemployees=await EmployeeModel.find()
        return res.status(200).send(allemployees)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})
employeerouter.post("/employees",async (req,res)=>{
    try {
        const newEmployee=new EmployeeModel(req.body)
        await newEmployee.save()
        return res.status(200).send({msg:"Employee added",newEmployee})
    } catch (error) {
        res.status(401).send({msg:error.message})
    }
})

employeerouter.delete("/employeesdelete/:id",async (req,res)=>{
    try {
        let {id}=req.params
        const deleteemployee=await EmployeeModel.findByIdAndDelete({_id:id})
        return res.status(200).send({msg:"Deleted Employee"})
    } catch (error) {
        res.status(401).send({msg:error.message})
    }
})

employeerouter.get("/employees", async (req, res) => {
    const { department } = req.query
    try {
        const filterdata = await EmployeeModel.find({ department })
        res.status(200).send(filterdata)
    } catch (error) {
        return res.status(400).send({ msg: error.message })
    }
})

module.exports=employeerouter