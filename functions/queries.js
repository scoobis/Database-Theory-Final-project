
function getAllBikes(con) {
    let t = con.query(`SELECT brand FROM bikes`, (err, bikes) => {
        if(err) throw err
        callback(null, bikes[0].brand)
    })
}

exports.getAllBikes = getAllBikes