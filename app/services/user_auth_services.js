const { create_hash, pass_compare, mongooseGetSortingKey } = require("../helper/utility");
const authJwt = require('../middleware/authjwt');

exports.signup_users_serv = async (dataParam, collection_name) => {
  try {
    let data = dataParam//req.body
    let check = await collection_name.findOne({ email: data.email })
    if (check) {
        if (check?.isDeleted) return { mess:"Your Account Is Deleted" }
        if (!check?.isActive) return { mess:"Your Account Is Not Active" }
        return { mess: "Email Already Exist" }
    }
    let sortingKey = await mongooseGetSortingKey(collection_name)
    data.sortingKey = sortingKey
    data.createdAt = new Date()
    data.updatedAt = new Date()
    data.password = await create_hash(data.password)
    
    let result = await collection_name.create(data)
    let token = await authJwt.create_token({ id: result._id, email: result.email })
    let updateResult=await collection_name.findOneAndUpdate({_id:result._id},{$set:{token}},{new:true})
    return updateResult
  } catch (error) {
   console.log(error) 
  }
}


exports.signIn_users_serv = async (dataParam, collection_name) => {
    try {
        let data = dataParam
        if (data.social_type && data.social_key) {//sso login 
            let updateObj = {updatedAt:new Date()}

            switch (data?.social_type){
                case 1:
                    updateObj.social_key = data.social_key;
                    updateObj.social_login = "google";
                    break;
                case 2:
                    updateObj.social_key = data.social_key;
                    updateObj.social_login = "facebook";
                    break;
                case 3:
                    updateObj.social_key = data.social_key;
                    updateObj.social_login = "apple";
                    break;
                default:
                    return {mess:"Invalid social_type"}
            }

            let query={}
            if(data?.email?.trim()){
                query.email = data.email
            }else{//sometime email is not recieved from providers in apple or facebook case
                query.social_logs= {$elemMatch: {key:data.social_key}}
            }
            let check = await collection_name.findOne(query)
            if (check) {//user alredy exist
                if (check?.isDeleted) return { mess: "Your Account Is Deleted" }
                if (!check?.isActive) return { mess: "Your Account Is Deactive" }
                updateObj.token = await authJwt.create_token({ id: check._id, email: check?.email })
                let keyExists  =check?.social_logs?.some(ele=>ele?.key==data?.social_key)
                if(!keyExists ){
                    let newlog={type:updateObj.social_login,key:data.social_key}
                    updateObj.social_logs=[...check.social_logs,newlog]
                }
                let result = await collection_name.findOneAndUpdate({_id:check?._id }, { $set: updateObj }, { new: true }).select({ password: 0 })
                return result
            } else {//user not exist
                if(!data?.Name?.trim()){
                    const email = data?.email;
                    const parts = email.split("@")[0]
                    data.Name=parts
                }
                data.sortingKey = await mongooseGetSortingKey(collection_name)
                data.createdAt = new Date()
                data.updatedAt = new Date()
                data.social_key = data.social_key
                data.social_login = updateObj.social_login
                data.social_logs=[{type:data.social_login,key:data.social_key}]
           
                let result = await collection_name.create(data)
                if (!result) return result
                let token = await authJwt.create_token({ id: result._id, email: result?.email })
                result=await collection_name.findOneAndUpdate({_id:result._id},{$set:{token}},{new:true})
                return result
            }
        } else {//normal login
            let result = await collection_name.findOne({  email: data.email })
            if (!result) return { mess: "Invalid Credential" }
            if (result?.isDeleted) return { mess: "Your Account Is Deleted" }
            if (!result?.isActive) return { mess: "Your Account Is Not Active" }
            let pass = await pass_compare(data.password, result.password)
                let updateData={updatedAt:new Date()}
            if (pass) {
                updateData.token = await authJwt.create_token({ id: result._id, email: result.email })
            } else {
                return { mess: "Invalid Credential" }
            }
            result = await collection_name.findOneAndUpdate({_id:result._id},{$set:updateData},{new:true})
            return result
        }
    } catch (error) {
        console.log(error)
        return error.message
    }
}

exports.user_detail_serv = async (id, collection_name) => {
    try {
        let query = {_id:id }
        let result = await collection_name.findOne(query).select({password:0})
        return result
    } catch (error) {
        console.log(error);
        throw error.message
    }
}