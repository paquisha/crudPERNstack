const { encrypt, compare } = require("../helpers/handleBcrypt")
const pool = require("../db");


const loginCtrl = async (req, res, next) =>{
  try{
    const { email, password } = req.body
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if(!user){
      res.status(404)
      res.send({ error: 'user not found' })
    }
    const checkPassword = await compare(password, user.password)
    const tokenSession = await tokenSign(user)

    if(checkPassword){
      res.send({
        data: user,
        token: tokenSession
      })
      return
    }

    if(!checkPassword){
      res.status(409)
      res.send({
        error: 'Invalid password'
      })
      return
    }
  }catch(error){
    next(error);
  }
}

module.exports = {
  loginCtrl
};