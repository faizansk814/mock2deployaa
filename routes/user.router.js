const express = require('express')
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userrouter = express.Router()


userrouter.post("/signup", async (req, res) => {
    const { email, password, confirmpassword } = req.body
    try {
        const isUSerPresent = await UserModel.findOne({ email })
        if (isUSerPresent) {
            return res.status(209).send({ msg: "user already present" })
        }
        if (password != confirmpassword) {
            return res.status(401).send({ msg: "Mismatch password and confirmpassword" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            const newUser = new UserModel({ email, password: hash, confirmpassword: hash })
            await newUser.save()
        })
        return res.status(200).send({ msg: "Registration Succesful" })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const isUSerPresent = await UserModel.findOne({ email })
        if (!isUSerPresent) {
            return res.status(209).send({ msg: "No user present" })
        }
        bcrypt.compare(password, isUSerPresent.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ userid: isUSerPresent._id }, "marvel", { expiresIn: "1h" })
                return res.status(200).send({ msg: "Login Succesful", token, isUSerPresent })
            } else {
                return res.status(401).send({ msg: "Wrong Credintials" })
            }
        })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})

module.exports=userrouter