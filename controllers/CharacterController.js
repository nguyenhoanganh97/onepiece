const CharacterModel = require('../models/Character')

class CharacterController {
    getAll = (req, res, next) => {
        const page = req.query.page
        const character = new CharacterModel()
        if (page) {
            const perPage = 20
            const position = (page - 1) * perPage
            character.getByPage(position, perPage)
                .then(response => {
                    return res.status(200).json(response.results)
                })
                .catch(err => {
                    return res.status(404).json(err)
                })
        } else {
            character.getAll()
                .then(response => {
                    return res.status(200).json(response.results)
                })
                .catch(err => {
                    return res.status(404).json(err)
                })
        }
    }
}

module.exports = new CharacterController()