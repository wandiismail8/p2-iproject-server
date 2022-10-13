const { compareHashWithPassword, signPayloadToToken } = require("../helpers/helpers")
const mailer = require("../helpers/mailer")
const {User} = require("../models")



class userController {
    static async registerUser(req, res, next){
        const { username, email, password } = req.body
        try {
            let user = await User.create({ username, email, password })
            mailer(email)


            res.status(201).json({
                username : user.username,
                email : user.email
            })

        } catch (err) {
            next(err)
            
           
            
        }
    }

    static async loginUser(req, res, next){
        const {email, password} = req.body
        try {
            let user = await User.findOne({where : {email}})
            if(!user) throw { name : "Invalid Email/Password"}
            let isValid = compareHashWithPassword(password, user.password)
            // console.log(isValid);
            if(!isValid) throw { name : "Invalid Email/Password"}
            const access_token = signPayloadToToken({id : user.id})

            res.status(200).json({access_token})

            
        } catch (err) {
            next(err)
            
            
        }
    }



}



module.exports = userController

