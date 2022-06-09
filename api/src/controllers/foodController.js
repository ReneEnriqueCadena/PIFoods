const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const fixedRecipe = require('../fixedBugs/obj')

//https://api.spoonacular.com/recipes/complexSearch?query=pasta&addRecipeInformation=true&apiKey=848ac0d4b80b467a850fe8c9c9c81224

const getAllFoods = async (req, res) => {
    if (req.query.name) { //http://localhost:3001/recipes?name=pasta
        const { name } = req.query;
        /* console.log(name) */
        try {
            const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`)
            const arr = api.data.results;
            let response = []
            if (api) {
                for (let i = 0; i < arr.length; i++) {
                    response.push({
                        id: arr[i].id,
                        name: arr[i].title,
                        image: arr[i].image,
                        diets: arr[i].diets,
                        punctuation: arr[i].aggregateLikes
                    })
                }
                if (response) {
                    return res.send(response)
                }
                const db = await Recipe.findAll({ include: Diet })
                if (db) {
                    const responseDb = db.findOne({
                        where: {
                            name: name
                        }
                    })
                    return res.send(responseDb)

                }
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&number=90&addRecipeInformation=true`)
            const arr = api.data.results;
            const db = await Recipe.findAll({ include: Diet })
            let response = []
            if (api) {
                for (let i = 0; i < arr.length; i++) {
                    response.push({
                        id: arr[i].id,
                        name: arr[i].title,
                        image: arr[i].image,
                        diets: arr[i].diets,
                        punctuation: arr[i].aggregateLikes,
                    })
                }
                if (db) {
                    for (let i = 0; i < db.length; i++) {
                        var diedb = []
                        db[i].dataValues.diets.map(e => { diedb.push(e.dataValues.name) })
                        response.push({
                            name: db[i].dataValues.name,
                            id: db[i].dataValues.id,
                            dishsummary: db[i].dataValues.dishsummary,
                            punctuation: db[i].dataValues.punctuation,
                            healthyfoodlevel: db[i].dataValues.healthyfoodlevel,
                            stepbystep: [{ step: db[i].dataValues.stepbystep }],
                            image: db[i].dataValues.image,
                            diets: diedb,
                            

                        })

                    }
                    
                    /* console.log(response) */
                    return res.send(response)
                }
                if (response) {
                    return res.send(response)
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const getFoodById = async (req, res) => {
    try {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        const { id } = req.params;
        if (regexExp.test(id)) {
            const db = await Recipe.findOne({
                where: { id: id }, include: Diet
            })
            if (db) {
                let response1 = []
                
                var diedb = []
                db.dataValues.diets.map(e => { diedb.push(e.dataValues.name) })
            
                response1.push({
                    name: db.dataValues.name,
                    id: db.dataValues.id,
                    dishsummary: db.dataValues.dishsummary,
                    punctuation: db.dataValues.punctuation,
                    healthyfoodlevel: db.dataValues.healthyfoodlevel,
                    stepbystep: [{ step: db.dataValues.stepbystep }],
                    image: db.dataValues.image,
                    diets: diedb,
                    dishTypes: ['own plate'],

                })


                console.log(response1)
                return res.send(response1)
            }
        }
        let response = []
        const api = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        let arrStep = []
        let apiStep = api.data.analyzedInstructions.length ? api.data.analyzedInstructions[0].steps : []
        if (api) {
            for (let i = 0; i < apiStep.length; i++) {
                arrStep.push(apiStep[i].number)
                arrStep.push(apiStep[i].step)
            }
        }
        if (api) {
            response.push({
                id: api.data?.id,
                name: api.data?.title,
                image: api.data?.image,
                diets: api.data?.diets,
                stepbystep: apiStep,
                dishsummary: api.data?.summary,
                punctuation: api.data?.aggregateLikes,
                healthyfoodlevel: api.data?.healthScore,
                dishTypes: api.data?.dishTypes,
            })
        }
        if (response) {
            return res.send(response)
        }

    } catch (error) {
        return res.status(404).send(error)
    }
}

module.exports = {
    getAllFoods,
    getFoodById
}