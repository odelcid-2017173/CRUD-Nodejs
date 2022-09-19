'use strict'

const jwt = require("jwt-simple");
const moment = require("moment");
const secretKey = '123456';

exports.createToken = async(user) =>{
    try{
        const payload={
            sub: user._id,
            username: user.name,
            password: user.password,
            iat: moment().unix(),
            exp: moment().add(2, 'hour').unix()
        }
        return jwt.encode(payload, secretKey);
    }catch(err){
        console.log(err);
        return err;
    }
}