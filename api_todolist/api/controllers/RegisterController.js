'use strict'

const db = require('../db')
const md5 = require('md5')
const uuid = require('uuid');

// const checkUser = require('./AccessKeyController')

module.exports = {
    register: (req, res) => {
        let username = req.body.data.username
        let password = md5(req.body.data.password)

        let sql = 'SELECT id FROM users where username = ?'
        db.query(sql, [username], (err, response) => {
            if (err) throw err
            if (response.length == 0) {
                const id_new = uuid.v4()
                db.query('INSERT INTO users values ( ?, ?, ?)', [id_new, username, password])
                res.json({ code: 200 })
            }else{
                res.json({ error: "Username đã tồn tại!" })
            }
        })
    },
}
