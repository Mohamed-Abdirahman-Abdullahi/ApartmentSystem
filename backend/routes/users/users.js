const express = require('express')
const router = express.Router()
const {
    getUser,
    getUsers,
    deleteUser,
    signupUser,
    updateUser,
    loginUser
} = require('../../controllers/users/userController');

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', signupUser)
router.post("/login", loginUser);

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router