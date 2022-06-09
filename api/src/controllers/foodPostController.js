const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

const postNewFood = async (req, res) => {
    try {
        const nFood = req.body;
        
        let [ newFood, ch ] = await Recipe.findOrCreate({
            where: {
                name: nFood.name,
                dishsummary: nFood.dishsummary,
                punctuation: nFood.punctuation,
                stepbystep: nFood.stepbystep,
                healthyfoodlevel: nFood.healthyfoodlevel,
                image: 'https://spoonacular.com/recipeImages/640117-312x231.jpg'
            }
        })
        const allDiets = await getFoodDiets(nFood.diet)
        /* console.log(allDiets) */
        newFood.setDiets(allDiets)

        /* for (const x in arr1) {
            var vegan = await Diet.findOne({where: {name: x.name}})
            await newFood.setDiets([vegan]) 
        } */
        return res.send(newFood)
    } catch (error) {
        console.log(error)
    }
} 

const getFoodDiets = async (diets) => {
    console.log('DIETAS', diets)
    const response = await Promise.all(diets.map(async (diet) => {
        return await Diet.findOne({
            where: {
                name: diet
            }
        })
    }))

    return response;
}

module.exports = {
    postNewFood
}