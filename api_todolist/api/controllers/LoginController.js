'use strict'

const db = require('../db')
const md5 = require('md5')
const uuid = require('uuid');

// const checkUser = require('./AccessKeyController')

module.exports = {
    check: (req, res) => {
        let username = req.body.data.username
        let password = md5(req.body.data.password||"")
        // res.json({code: 200, username, password})
        // console.log(req.body)
        let sql = 'SELECT id FROM users where username = ? and password = ?'
        db.query(sql, [username, password], (err, response) => {
            if (err) throw err
            if (response.length > 0) {
                const id = response[0]["id"]
                const acc_key = uuid.v4()
                db.query('INSERT INTO access_key values ( ?, ?, NOW())', [acc_key, id])
                res.json({ code: 200, access_key: acc_key })
            }else{
                res.json({error: "username hoặc password không chính xác!"})
            }
        })
    },
}
