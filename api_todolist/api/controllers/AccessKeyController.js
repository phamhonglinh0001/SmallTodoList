'use strict'

const db = require('./../db')

module.exports = {
    check: (key, data, callback, res) => {
        let sql = 'SELECT id_user FROM access_key where acc_key = ?'
        db.query(sql, [key], (err, response) => {
            if (err) throw err
            if(response.length > 0){
                const id_user = response[0]["id_user"]
                callback(id_user, data)
            }else{
                res.json({ error : "access_key không chính xác!"})
            }
        })
    },
}
