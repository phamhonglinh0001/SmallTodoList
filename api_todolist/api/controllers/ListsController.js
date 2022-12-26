'use strict'

const db = require('../db')
const uuid = require('uuid');

const checkUser = require('./AccessKeyController')

module.exports = {
    add: (req, res) => {
        const key = req.body.data.access_key
        const content = req.body.data.content

        const callback = (id_user, content) => {
            let sql = 'INSERT INTO lists(id, time, content, id_user, type) VALUES(?, NOW(), ?, ?, "incomplete")'
            const id = uuid.v4()
            db.query(sql, [ id, content, id_user], (err, response) => {
                if (err) throw err
                res.json({code: 200})
            })
        }
        if(key) checkUser.check(key, content, callback, res)
        else res.json({ error : "access_key rỗng"})
    },
    complete: (req, res) => {
        const key = req.body.data.access_key
        const id = req.body.data.id

        const callback = (id_user, id) => {
            let sql = 'UPDATE lists SET type = "complete" WHERE id = ?'
            db.query(sql, [id], (err, response) => {
                if (err) throw err
                res.json({code: 200})
            })
        }
        if(key) checkUser.check(key, id, callback, res)
        else res.json({ error : "access_key rỗng"})
    },
    getAll: (req, res) => {
        const key = req.body.data.access_key
        const data = '';
        const callback = (id_user, data) => {
            let sql = 'SELECT * FROM lists WHERE id_user = ? ORDER BY time desc'
            db.query(sql, [id_user], (err, response) => {
                if (err) throw err
                const result = response.map(item => item)
                res.json({ code: 200, data: result })
            })
        }
        if(key) checkUser.check(key, data , callback, res)
        else res.json({ error : "access_key rỗng"})
    },
    delete: (req, res) => {
        const key = req.body.data.access_key
        const id = req.body.data.id;
        const callback = (id_user, data) => {
            let sql = 'DELETE FROM lists WHERE id= ?'
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                res.json({code:200})
            })
        }
        if(key) checkUser.check(key, id , callback, res)
        else res.json({ error : "access_key rỗng"})
    },
    
}
