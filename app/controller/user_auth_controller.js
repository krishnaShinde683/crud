const user_auth_services = require("../services/user_auth_services")
const apiResponse= require("../helper/apiResponse");
const { user_Model } = require("./../model")


exports.users_sign_up = async (req, res) => {
    try {
        let { email, password, Name } = req.body
        if (!Name) return apiResponse.badRequest(res, "Name is Required")
        if (!email) return apiResponse.badRequest(res, "Email is Required")
        if (!password) return apiResponse.badRequest(res, "password is Required")
        let result = await user_auth_services.signup_users_serv(req.body, user_Model)
        if (result && 'mess' in result) {
            return apiResponse.badRequest(res, result?.mess)
        }
        if (!result) { return apiResponse.notFoundResponse(res, "Something went Wrong") }
        return apiResponse.successResponseWithData(res, 'User Created Successfully', result)
    } catch (error) {
        return apiResponse.errorResponse(res, error.message)
    }
}

exports.users_sign_in = async (req, res) => {
    try {
        let { email, password, social_type, social_key } = req.body
        if (!email?.trim()) return apiResponse.badRequest(res, "Email is Required")
        if (!social_type || !social_key?.trim()) {//normal login
            if (!password?.trim()) return apiResponse.badRequest(res, "Password is Required") 
        }

        let result = await user_auth_services.signIn_users_serv(req.body, user_Model)
        if (!result) { return apiResponse.notFoundResponse(res, "Something Went Wrong") }
    
        if (result?.mess) return apiResponse.successResponse(res, result.mess)
        return apiResponse.successResponseWithData(res, "User Login Successfully", result)
    } catch (error) {
        console.log(error)
        return apiResponse.badRequest(res, error.message)
    }
}


exports.user_detail = async (req, res) => {
    try {
        let result = await user_auth_services.user_detail_serv(req.myId, user_Model)
        if (!result) { return apiResponse.notFoundResponse(res, "Something Went Wrong") }
        return apiResponse.successResponseWithData(res, "User Detail Fetched",result)
    } catch (error) {
        return apiResponse.errorResponse(res, error.message)
    }
}