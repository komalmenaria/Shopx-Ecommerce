const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

module.exports.generateHash = (password) =>{

    return new Promise((resolve, reject) => {
        try {
            bcrypt.genSalt(10, function(err, salt) {
                if(err) reject(err)
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err) reject(err)
                    else resolve(hash)
                    // Store hash in your password DB.
                });
            });
         

        } catch (error) {
           reject(error) 
        }
    })
}


module.exports.generateToken = (data) =>{
    return new Promise((resolve, reject) => {
        jwt.sign(data, config.get("jwtsecret"), { expiresIn: '1h' }, function(err, token) {
            if(err) reject(err);
            resolve(token);
          });
    })
    
}


module.exports.compareHash = (password , hashPassword) =>{
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, function(err, result) {
            // result == false
            if (err) reject(err);
            resolve(result)
        });  
    })
    
}