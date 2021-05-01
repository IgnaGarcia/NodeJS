const workshops = require('../../workshops.json')
const uuid = require('uuid').v4

let getAllWorkshopts = (req, res) => {
    res.json(workshops)
}

let getWorkshop = (req, res) => {
    const id = req.params.id
    const workshop = workshops.find(w => id == w.id)
    
    workshop ? res.satatus(200).json(workshop) : res.status(404).end()
}

let editWorkshop = (req, res) => {
    const body = red.body
    const id = req.params.id
    const workshop = workshops.find(w => id == w.id)
    if(!workshop) return res.status(404).end()

    workshops[workshop].name = body.name
    workshops[workshop].speaker = body.speaker
    workshops[workshop].tech = body.tech

    res.status(200).json(workshops[workshop])
}

let deleteWorkshop = (req, res) => {
    const id = req.params.id
    const workshop = workshops.findIndex(w => id == w.id)
    const deleted = workshops.splice(workshops, 1)

    res.status(200).json(deleted)
}

let addWorkshop = (req, res) => {
    const body = req.body
    const newWorkshop = {
        id: uuid(),
        name: body.name,
        speaker: body.speaker,
        tech: body.tech
    }
    workshops.push(newWorkshop)
    res.status(201).json(newWorkshop)
}

module.exports = {
    getAllWorkshopts,
    getWorkshop,
    editWorkshop,
    deleteWorkshop,
    addWorkshop
}