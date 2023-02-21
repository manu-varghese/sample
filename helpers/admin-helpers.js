var db=require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
module.exports = {
    addUser:(user)=>{
        return new Promise(async(resolve,reject)=>{
            user.password =await bcrypt.hash(user.password,10)
            db.get().collection(collection.COLLECTION_NAME).insertOne(user).then((data)=>{
               resolve(data)
            })
        })
    },
    getAllUsers:()=>{
        return new Promise(async (resolve,reject)=>{
            let users=await db.get().collection(collection.COLLECTION_NAME).find().toArray()
            resolve(users)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COLLECTION_NAME).deleteOne({_id:objectId(userId)}).then((response)=>{
                resolve(response)
            })

        })
    },
    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COLLECTION_NAME).findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user)
            })
        })
    },
    updateProduct:(userId,userDetails)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection(collection.COLLECTION_NAME)
           .updateOne({_id:objectId(userId)},{
            $set:{
                name:userDetails.name
            }}).then((response)=>{
                resolve()
            })
        })
    }
}