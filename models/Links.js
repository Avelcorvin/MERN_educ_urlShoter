/**
 * тот код что здесь написан касаетсья только драфвера монгусе
 * который позволяет общаться с базой данных монго DM
 * если захочу разобраться по подробнее определенно придеться покопаться в документации mongoDB
 */




const { Schema, model, Types } = require('mongoose')
const schema = new Schema({
  name: { type: String, unique: true, required: true },
  longLink: { type: String, unique: true, required: true },
  code: { type: String, unique: true, required: true },
  shortLink: { type: String, unique: true, required: true },
  owner: { type: String, unique: false, required: true },
  clicks: { type: Number, unique: false, required: true }
})

module.exports = model('Links', schema)