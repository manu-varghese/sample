var db=require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        var statuss=null
        return new Promise(async(resolve,reject)=>{
            let emailId=await db.get().collection(collection.COLLECTION_NAME).findOne({email:userData.email})
            if(!emailId){
            userData.password =await bcrypt.hash(userData.password,10)
            db.get().collection(collection.COLLECTION_NAME).insertOne(userData).then((data)=>{
               resolve({statuss:true}) 
            })
             }else{
                resolve({statuss:false})
             }
        })
    },
    doLogin:(userData)=>{
        return new Promise (async (resolve,reject)=>{
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.COLLECTION_NAME).findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user = user
                        response.status = true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("no user");
                resolve({status:false})
            }
        })
    }
}