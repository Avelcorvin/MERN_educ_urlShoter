const { Router } = require('express')
const Links = require('../models/Links')
const server_url = require('config').get("server_url")
const auth = require('../midlware/auth.midlware')
const shortId = require('shortid')
const shortid = require('shortid')


const router = Router()

router.post('/createlink', auth,  async (req, res) => {//создаем ссылку
    try {
        const { name, longLink } = req.body //достаем ссылки из передачи на клиент 
        const  id  = req.user
        const isName = await Links.findOne({ name })
        if (isName) {
            return res.status(200).json({ message: 'Введите другое имя' })
        }

        const isHaveLonglink = await Links.findOne({ longLink })
        if(isHaveLonglink){
            return res.status(200).json({link:isHaveLonglink})
        }

        const code = shortid.generate()
        const shortLink = server_url + '/t/' + code

        const link = new Links({
            name, longLink, shortLink, owner:id, clicks:0,code
        })
        await link.save()

        res.status(201).json({
            message: 'Успешно сохранена',
            link
        })
    }

    catch (error) {
        res.status(500).json({
            message: 'Проблемы на сервере'
        })
    }})
router.post('/deletelink', async (req, res) => { //удалить ссылку
    try {
        const { name } = req.body
        await Links.deleteOne({ name })
        res.status(200).json({ message: 'Ссылка удалена' })

    }
    catch (error) {
        res.status(500).json({ message: 'Проблемы на сервере' })
    }})
router.post('/findlink',auth, async (req, res) => { //подбор ссылок
    try {
        const  id  = req.user
        const links = await Links.find({owner:id})
        res.status(200).json({ message: 'Ссылки найдены', data: links })
    }
    catch (error) {
        res.status(500).json({ message: 'Проблемы на сервере при поиске ссылок' })
    }})
router.post('/id',auth, async (req, res) => { //подбор ссылок
    try {
        
        const  id  = req.user
        const id_link= req.body._id;
        const links = await Links.find({
            _id:id_link
        })
        res.status(200).json(links[0])
    }
    catch (error) {
        res.status(500).json({ message: 'Проблемы на сервере при поиске ссылок' })
    }})



module.exports = router