const express = require('express')
const router = express.Router()
const fetch = require("node-fetch")
let resList = [];
let filteredList = [];

router.get('/', async (req, res)=>{
    res.send('restaurant list')
})

router.post('/', async (req, res)=>{
    console.log("restaurants post route called");
    console.log(req.body.reqType);
    if(req.body.reqType === "mainReq"){
        resList = await searchLocAndTerm(req, res, req.body.term, req.body.location)
        filteredList = resList;
    }
    if(resList.length !== 0 && req.body.price !== '' && req.body.reqType === "priceFilter"){
        console.log("Entered price statement")
        filteredList = filteredList.filter(rest => rest.hasOwnProperty('price') && rest.price.length === +req.body.price)
    }
    if(resList.length !== 0 && req.body.ratingLow !== '' && req.body.ratingHigh !== '' && req.body.reqType === "ratingFilter"){
        console.log("Entered rating statement")
        console.log(filteredList[0].rating)
        filteredList = filteredList.filter(rest => rest.hasOwnProperty('rating') && rest.rating >= req.body.ratingLow && rest.rating <= req.body.ratingHigh)
    }
    try {
         res.render('restaurants/list', {
             resList: filteredList
            })
        
    } catch {
        console.log("error redirecting")
        res.redirect(`/`)
    }
    //const resList = searchLocAndTerm(req, res, req.body.term, req.body.location)
    //console.log(req.body)
    //res.send(req.body.term)
})

async function searchLocAndTerm(req, res, term, loc){
    const url = `https://api.yelp.com/v3/businesses/search?` + new URLSearchParams({
        "term": `${term}`,
        "location": `${loc}`
    });
    const options = {
        "method": "GET",
         "headers": {
            "credentials": 'include',
            "Authorization" : `Bearer ${"u16zYV1pT8IOaYgOkRsoJAn4-pzjkbEpNS3H4oYM91WwljCmDUVSYmMFFF1ii_iCX2Z_BZ5sPV-fcnKS6Go8_Wj99gCtiMIcWn450PGdMzU21vXJgDMWltudtRmxYnYx"}`,
            "Content-Type": "application/json"
         },
    };

    const response = await fetch(url, options)
    .then(res => res.json())
    .catch(e => {
        console.error({
            "message": "oh no",
            error: e,
        });
    });
    //console.log("RESPONSE: ", response);
    console.log("RESPONSE: ", response.businesses[0]);
    //res.send(response.businesses.map(bus=>bus.name));
    return response.businesses;
}

module.exports = router