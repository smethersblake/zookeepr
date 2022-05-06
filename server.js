const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();
const {animals} = require('./data/animals.json');
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = []
    // Note that we save the animalsArray as filteredResults here:
    let filterResults = animalsArray
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        }
        else {
            personalityTraitsArray = query.personalityTraits
        }
        // Loop through each trait in the personalityTraits arry
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filterResults array.
            // Rember, it is initially a copy of the animalsArray,
            // but here we'er updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filterResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finished.
            filterResults = filterResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }
    if(query.diet){
        filterResults = filterResults.filter(animal => animal.diet === query.diet)
    }
    if (query.species){
        filterResults = filterResults.filter(animal => animal.species === query.species)
    }
    if (query.name){
        filterResults = filterResults.filter(animal => animal.name === query.name)
    }
    return filterResults
}
app.get('/api/animals', (req, res) => {
    let results = animals
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    console.log(req.query);
    res.json(results)
})
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})
