const express = require('express')
const {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser


} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
//require Auth
router.use(requireAuth)

//get all
router.get('/', getAllUsers)
//get one
router.get('/:id', getUser)
//post
router.post('/', createUser)
//delete
router.delete('/:id', deleteUser)
//patch
router.patch('/:id', updateUser)

module.exports = router