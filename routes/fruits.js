const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator")
const { Fruit } = require("../models/index");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get("/", async (req, res) => {
    const data = await Fruit.findAll();
    res.json(data);
})

router.get("/:id", async (req, res) => {
    const fruit = await Fruit.findByPk(req.params.id);
    res.json(fruit);
})

router.post("/", [check("color").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const fruit = await Fruit.create(req.body);
        res.json(fruit);
    }
})

router.put("/:id", async (req, res) => {
    const updatedFruit = await Fruit.update(req.body, {
        where:{
            id: req.params.id
        }
    });
    res.json(updatedFruit);
})

router.delete("/:id", async (req, res) => {
    const deletedFruit = await Fruit.destroy({
        where:{
            id: req.params.id
        }
    })
    res.json(deletedFruit);
})

module.exports = router;