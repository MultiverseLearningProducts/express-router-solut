const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator")
const { User } = require("../models/index");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/", async (req, res) => {
    const data = await User.findAll();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
})

router.post("/", async (req, res) => {
    
})

router.post("/", [
    check("name").not().isEmpty().trim(),
    check("age").not().isEmpty().trim(),
    check("name").isLength({min: 5, max: 15})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const user = await User.create(req.body);
        res.json(user);
    }
    
})

router.put("/:id",  [
    check("name").not().isEmpty().trim(),
    check("age").not().isEmpty().trim(),
    check("name").isLength({min: 5, max: 15})
], async (req, res) => {
    const updatedUser = await User.update(req.body, {
        where:{
            id: req.params.id
        }
    });
    res.json(updatedUser);
})

router.delete("/:id", async (req, res) => {
    const deletedUser = await User.destroy({
        where:{
            id: req.params.id
        }
    })
    res.json(deletedUser);
})

module.exports = router;