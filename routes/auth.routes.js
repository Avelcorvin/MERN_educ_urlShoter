const { Router } = require('express')
const User = require('../models/User') //module.exports=model({name:'User',schema})
const bcrypt = require('bcryptjs')//для хэширования паролей
const jwt = require('jsonwebtoken')//для создания токена
const jvtsecret = require('config').get('seckretkey')//это я вытаскиваю ключ из конфига
const { check, validationResult } = require('express-validator')//функция и метод валидатора встроенная в экспресс

const router = Router()

// /api/auth/registr
router.post(
    '/registr',
    [
        check('email', ' Ucorecctly email').isEmail(),                  //мидлваре для валидации емайла и пароля
        check('pasword', 'Uncorrectly pasword').isLength({ min: 6 })
    ],

    async (req, res) => {
       
        try {
            //console.log("Body фром клиент:", req.body)
            
        const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регисрации" 
                })
            }
           
            const { email, pasword } = req.body     //console.log('eamil & pasword:',email,pasword)
            const candidate = await User.findOne({ email }) //console.log('candidate:',candidate)

            if (candidate) {
                return res.status(400).json({ message: "user is registred" })
            }
            const hashpasword = await bcrypt.hash(pasword, 12) // console.log('hashpasword:',hashpasword)
            
            const user = new User({ email, pasword: hashpasword }) //console.log(user)
            await user.save()
            res.status(201).json({ message: "Пользователь зарегистрирован" })

        } catch (e) {
            res.status(500).json({ message: 'Ошибка при регистрации попробуйте снова' })

        }
    })

////////////////////////*************************************************//////*********** */ */

//  /api/auth/login
router.post( '/login',
    [
        check('email', 'Plise Email').normalizeEmail().isEmail(),
        check('pasword', 'Write paword').exists()
    ],
    async (req, res) => {

        try {
            console.log("Body фром клиент:", req.body)

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регисрации" 
                })
            }


            const { email, pasword } = req.body;

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(500).json({ message: "Пользователь не обноружен" })
            }

            const isMatch = await bcrypt.compare(pasword, user.pasword)

            if (!isMatch) {
                return res.status(400).json({ message: 'неверный пароль попробуте снова' })
            }
            const token = jwt.sign(
                { userID: user.id },
                    jvtsecret,
                { expiresIn: '1h' }
            )
            res.json({ token, userID: user.id })


        } catch (e) {
            res.status(500).json({ message: 'Error, pls try angain' })
        }

    })


module.exports = router