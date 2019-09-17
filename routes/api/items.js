const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

router.get("/", async (req, res) => {
    await Item.find()
        .select("-__v")
        .sort({ date: 1 })
        .then(items => res.json(items));
});

router.get("/:id", async (req, res) => {
    await Item.findOne({ _id: req.params.id })
        .select("-__v")
        .then(item => {
            res.send(item);
        })
        .catch(err => res.status(404).json({ success: false }));
});

router.post(
    "/",
    async (req, res) => {
        const newItem = new Item({
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription
        });

        newItem.save().then(item =>
            res.json({
                _id: item._id,
                itemName: item.itemName,
                itemDescription: item.itemDescription,
                date: res.date
            })
        );
    },
    (error, req, res, next) => {
        res.status(400).send({
            error: error.message
        });
    }
);

router.patch(
    "/:id",
    async (req, res) => {
        let updates = {
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription
        };

        await Item.findByIdAndUpdate(req.params.id, updates)
            .then(item => res.send({ success: true }))
            .catch(err => res.status(404).json({ success: false }));
    },
    (error, req, res, next) => {
        res.status(400).send({
            error: error.message
        });
    }
);

router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
