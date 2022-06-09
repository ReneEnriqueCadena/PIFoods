const { Diet } = require('../db');
const axios = require('axios');

const getAllDiets = async (req, res) => {
    
    try {
        const api = await axios.get(`https://api.rawg.io/api/genres?key=25cb7f5fc9f2411dbcfcffae93b30a96`)
        const arr = [
            {
              id: 4,
              name: 'ketogenic',
            },
            {
              id: 51,
              name: 'gluten free',
            },
            {
              id: 3,
              name: 'vegetarian',
            },
            {
              id: 5,
              name: 'lacto-vegetarian',
            },
            {
              id: 10,
              name: 'ovo-vegetarian',
            },
            {
              id: 2,
              name: 'vegan',
            },
            {
              id: 40,
              name: 'pescetarian',
            },
            {
              id: 14,
              name: 'paleo',
            },
            {
              id: 7,
              name: 'primal',
            },
            {
              id: 11,
              name: 'low fodmap',
            },
            {
              id: 83,
              name: 'whole30',
            },
            
        ]
        
        for (let i = 0; i < arr.length; i++) {
            Diet.findOrCreate({
                where: {
                    name: arr[i].name,
                    id: arr[i].id
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllDiets,
}