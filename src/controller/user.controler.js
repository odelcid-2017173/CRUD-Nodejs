const db = require('../db.json');
const fs = require('fs');
const json_string_users = fs.readFileSync('src/db.json', 'utf-8');
const user = JSON.parse(json_string_users);
const { encrypt, checkPass, searchUsername} = require('../utils/validate');
const  {createToken}  = require('../services/jwt');
const uuid  = require('uuid'); 

 
exports.test = (req, res)=>{ 
    return res.send({message: 'test running'});
}


exports.register = async (req, res)=>{
    try{

        const {username, password} = req.body;
        if (!username|| !password) {
            return res.send({message: 'Please added all params'});
        }
        let newUser = {
            id: uuid.v4(),
            username,
            password,
        };
        let userExist = db.find(user => user.username === newUser.username);
        if(!userExist){
            newUser.password = await encrypt(newUser.password);
            user.push(newUser);
            fs.writeFileSync('src/db.json', JSON.stringify(user), 'utf-8');
            if(user) {
                return res.send({message: 'user created..', newUser});
            }else {
                return res.send({message: 'user not registered'});
            }
        }else{
            return res.send({message: 'user already exist'});
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor'});
    }
}

exports.login = async (req, res)=>{
    try{
        const {username, password} = req.body;
        if ( !username || !password  ) {
            return res.send({message: 'Please added all params'});
        }
        const data ={
            username,
            password
        };
        let userLogin =  db.find(user => user.username === data.username);
        if(userLogin && await checkPass(data.password, userLogin.password)){
            const token = await createToken(userLogin);
            return res.status(200).send({token, userLogin, message: 'User logg in successfully'});
        }else{
            return res.status(404).send({message: 'Username and password incorrect'});
        }
    }catch (err){
        console.log(err);
        return res.status(500).send({message:'Error en el servidor (login)'});
    }
}