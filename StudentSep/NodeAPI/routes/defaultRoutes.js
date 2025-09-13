let express = require('express') // express server framework starting point

let router = express.Router({}) // create a new router object //options - strict, readonly, caseSensitive:true etc


//very first endpoint using express
router.get('/', (req, res) => {
  res.send('Hello World')
})

router.get('/first', (req, res) => {

  console.log(req) // query parameters
  res.json({
        message: 'This is the first api'
    })
})

//http://localhost:9000/query?name=Ryan&age=20
router.get('/query', (req, res) => {
  console.log(req.query) // query parameters

  res.json(req.query) // sends json object of query param {"name":"Ryan","age":"20"}
})

//http://localhost:9000/route/id/info
router.get('/route/:id', (req, res) => {
  console.log(req.params["id"]) // route parameters

  res.json(req.params["id"]) // sends the id from the route parameter
})

router.get('/second', (req, res) => {
  res.send("<h1> This is the second api </h1>")
})

//sending a static file
router.get('/index', (req, res) => {
  res.sendFile(globalThis.__dirname + '/index.html') // sends the index.html file from the current directory
})

//creating a route to serve static files
// app.get('/public/loadUserInfo.js', (req, res) => {
//   res.sendFile(__dirname + '/public/loadUserInfo.js') // sends the index.html file from the current directory
// })

//express.router - works to create route table

//create wild card route
router.get('/{*any}', (req, res) => { res.status(404).send('Page not found') })


module.exports = router // export the router object to be used in server.js