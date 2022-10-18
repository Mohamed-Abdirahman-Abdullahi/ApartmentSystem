const express = require('express')
const router = express.Router()
const {
    getUser,
    getUsers,
    deleteUser,
    signupUser,
    updateUser,
    loginUser,
    sendEmail,
    updatePassword
} = require('../../controllers/users/userController');

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', signupUser)
router.post("/login", loginUser);
router.post("/resetRequest", sendEmail);

router.delete('/:id', deleteUser);

router.put('/:email', updatePassword)
router.patch('/:id', updateUser);

module.exports = router