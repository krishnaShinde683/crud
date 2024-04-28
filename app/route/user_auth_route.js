const route = require('express').Router()

const Controller = require('../controller/user_auth_controller')
const authJwt = require('../middleware/authjwt')

route.post('/sign-up', Controller.users_sign_up)

// {
//     "Name":"k",
//     "email":"k1@gmail.com",
//     "password":"123456"
// }

route.post('/sign-In', Controller.users_sign_in)

// there is two paylod for login
// 1==> normal login
// {
//     "email":"k1gmail.com",
//     "password":"123456",
// }


// 2==>social login
// {
//     "Name":"",
//     "email":"k1@gmail.com",
//     "social_key":"asdfghjkl",
//     "social_type":1
// }

// 1 google
// 2 facebook
// 3 apple

route.get('/detail', authJwt.verifyToken, Controller.user_detail)

module.exports = route;