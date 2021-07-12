const express = require('express')

const Loginctrl = require('../controllers/login-ctrl')

const router = express.Router()
router.get('/search-account/:search', Loginctrl.searchAccount)
router.post('/login', Loginctrl.CreateLogin)
router.get('/get-profile/:userId', Loginctrl.getProfile)
router.post('/register', Loginctrl.Register)
router.post('/forgot', Loginctrl.ForgotPassword)
router.delete('/delete-account/:id', Loginctrl.deleteAccount)
router.get('/get-account', Loginctrl.getAccount)
router.put('/edit-account', Loginctrl.editAccount)
router.put('/update-account', Loginctrl.updateAccount)

module.exports = router
