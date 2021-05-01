const router = require('express').Router()
const {getAllWorkshopts, getWorkshop, editWorkshop, deleteWorkshop, addWorkshop} = require('../resources/workshop.resource')

router.get('/', getAllWorkshopts)
router.get('/:id', getWorkshop)
router.put('/:id', editWorkshop)
router.delete('/:id', deleteWorkshop)
router.post('/', addWorkshop)

module.exports = router