const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")

// router.get('/', (req, res)=>{
//     res.render('index', {
//         authors: authors, 
//         searchOptions: req.query
//     })
// })

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
    // const url = `https://api.yelp.com/v3/businesses/search?` + new URLSearchParams({
    //     "location": "NYC",
    //     "term": "Starbucks"
    // });
    // const options = {
    //     "method": "GET",
    //      "headers": {
    //         "credentials": 'include',
    //         "Authorization" : `Bearer ${"u16zYV1pT8IOaYgOkRsoJAn4-pzjkbEpNS3H4oYM91WwljCmDUVSYmMFFF1ii_iCX2Z_BZ5sPV-fcnKS6Go8_Wj99gCtiMIcWn450PGdMzU21vXJgDMWltudtRmxYnYx"}`,
    //         "Content-Type": "application/json"
    //      },
    // };

    // const response = await fetch(url, options)
    // .then(res => res.json())
    // .catch(e => {
    //     console.error({
    //         "message": "oh no",
    //         error: e,
    //     });
    // });
    // console.log("RESPONSE: ", response);
    // res.json(response)
    // res.render('index', {
    //              authors: authors, 
    //              searchOptions: req.query
    //          })
});
  
//Create Authors route
router.post('/', async (req, res)=>{
    try {
        //res.redirect(`authors/${newAuthor.id}`)
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

// router.get("/", async (req,res)=>{
//     console.log("/fetch_image endpoint called");
//     try {
//         if (req.query.term != null && req.query.location !== null){
//             await searchLocAndTerm(req, res);
//         }
//         res.render('index', {
//                  term: req.query.term, 
//                  location: req.query.location
//              })
//     } catch {
//         res.redirect('/')
//     }
// });


module.exports = router