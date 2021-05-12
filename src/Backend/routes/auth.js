const router = require('express').Router()
const Joi = require('@hapi/joi')
var db = require('../Database')
const bcrypt = require('bcryptjs')

// Validation
const schema = {
    regname: Joi.string().min(4).required(),
    regemail: Joi.string().min(4).required().email(),
    regpassword: Joi.string().min(4).required(),
}

router.post('/register', async (req, res) => {
  
  // Hashing
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.regpassword, salt)

  // Validate
  const {error} = Joi.validate(req.body, schema)

  var data = {
      regname: req.body.regname,
      regemail: req.body.regemail,
      regpassword : hashedPassword
  }
  var sql ='INSERT INTO Users (regname, regemail, regpassword) VALUES (?,?,?)'
  var params =[data.regname, data.regemail, data.regpassword]
  db.run(sql, params, function (err, result) {
      if (error){
          res.status(400).send(error.details[0].message);
          return;
      }
      res.json({
          "answer": "Success",
      })
      res.status(200)
  });
})

router.get("/users", (req, res, next) => {
    var sql = "select * from Users"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });
  
  router.get("/users/:id", (req, res, next) => {
    var sql = "select * from Users where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "answer":"success",
            "data":row
        })
      });
  });

  router.post('/login', (req, res) => {
    const  regname  =  req.body.regname;
    const  regpassword  =  req.body.regpassword;
    const  findUserByEmail  = (regname, cb) => {
      return  db.get(`SELECT * FROM Users WHERE regname = ?`,[regname], (err, row) => {
              cb(err, row)
      });
  }
    findUserByEmail(regname, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(regpassword, user.regpassword);
        if(!result) return  res.status(401).send('Password not valid!');

        res.status(200)
        res.json({
          "answer":"Success",
        })

    });
});


module.exports = router;