const { Router } = require('express')
const { randomBlock } = require('../middlewares/randomBlock.middleware')

const factRouter = Router()

const facts = [
    "A 'tittle' is the official name for the dot over the lowercase 'i' and 'j'.",
    "In Switzerland, it is illegal to own just one guinea pig. They are considered social animals, and owning only one is seen as a form of abuse, so you must own at least two.",
    "An axolotl (a type of salamander) can regenerate lost limbs, its spinal cord, its jaw, and even parts of its brain.",
    "A day on Venus is longer than a year on Venus.",
    "Before 'goodbye' became the standard, the full phrase was 'God be with ye,' which over centuries contracted into 'Goodbye.'",
    "Astronauts returning from space missions have reported that space has a distinct smell, often describing it as 'seared steak,' 'hot metal', or 'welding fumes.'",
    "By unit count, the LEGO Group is the world's largest tire manufacturer, producing over 700 million tiny tires annually for its toy sets."
]

factRouter.get('/random-fact', randomBlock, (req, res) => {
    const randomIndex = Math.floor(Math.random() * facts.length)
    res.json({
        success: true,
        fact: facts[randomIndex]
    })
})

module.exports = factRouter
