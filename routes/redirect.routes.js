const { Router } = require('express')
const Links = require('../models/Links')


const router = Router()

router.get('/t/:id', async (req, res) => {
    try {
        const params = req.params.id
        const data = await Links.findOne({code: params})
        const link = data.longLink
        const cliks = data.clicks
        data.clicks++;
        await data.save()
        res.redirect(301,link)
    } catch (error) {
}})


module.exports = router