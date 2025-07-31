let express = require('express') // express server framework starting point

let router = express.Router({}) // create a new router object //options - strict, readonly, caseSensitive:true etc

//very first endpoint using express
router.get('/student', (req, res) => {
  res.send('Hello World Student')
})

module.exports = router // export the router object to be used in server.js