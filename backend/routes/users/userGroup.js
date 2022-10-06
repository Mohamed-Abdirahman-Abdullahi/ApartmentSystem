const express = require('express')
const router = express.Router()

const {
    getGroup,
    getGroups,
    deleteGroup,
    createGroup,
    updateGroup
} = require('../../controllers/users/userGroupController')

router.get('/', getGroups)

router.get('/:id', getGroup)

router.post('/', createGroup)

router.delete('/:id', deleteGroup)

router.patch('/:id', updateGroup)

module.exports = router