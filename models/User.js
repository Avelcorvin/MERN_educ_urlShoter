/**
 * тот код что здесь написан касаетсья только драфвера монгусе
 * который позволяет общаться с базой данных монго DM
 * если захочу разобраться по подробнее определенно придеться покопаться в документации mongoDB
 */




const {Schema,model,Types}=require('mongoose')
const schema = new Schema({
    email:{type:String,required:true,unique:true},
    pasword:{type:String,required:true},
    links:[{type:Types.ObjectId,ref:'Link'}]
})

module.exports=model('User',schema)