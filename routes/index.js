const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")

router.get("/", async (req,res)=>{
    console.log("index route called");
    try {
        if (req.query.term != null && req.query.location !== null){
            await searchLocAndTerm(req, res);
        }
        
        res.render('index', {
            term: req.query.term, 
            location: req.query.location
        })
    } catch {
        res.redirect('/')
    }
});
  
//Create Authors route
router.post('/', async (req, res)=>{
    try {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    } catch {
        res.render('authors/new', {
                 author: author,
                 errorMessage: 'Error creating Author'
             })
    }
})



module.exports = router