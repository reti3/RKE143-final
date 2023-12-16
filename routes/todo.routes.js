const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const data = await db.query('SELECT * FROM todo;');
    res.status(200).json(data.rows);
}); 

router.post('/', async (req, res) => {
    const {task} = req.body;
    const data = await db.query("SELECT * FROM todo WHERE task = $1;", [task]);

    if(data.rows.length !== 0) {
        res.json({message: "Task already exists."});
    } else {
        
        try {
            const result = await db.query("INSERT INTO todo (task) VALUES ($1);", [task]);
            res.status(200).json({message: `${result.rowCount} task was inserted.`});
        }
        catch(error) {
            console.log(error);
        }
    }      
});

router.delete('/', async (req, res) => {
    const {id} = req.body;
    const data = await db.query("SELECT * FROM todo WHERE id = $1;", [id]);

    if(data.rows.length === 0) {
        res.json({message: "there no such task"});
    } else {
        
        try {
            const result = await db.query("DELETE FROM todo WHERE id = $1;", [id]);
            res.status(200).json({message: `${result.rowCount} task was deleted.`});
        }
        catch(error) {
            console.log(error);
        }
    }      
});


module.exports = router; 
