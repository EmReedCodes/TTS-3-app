const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

//models
const WordBank = require("./models/WordBank")
const { TopologyDescription } = require("mongodb")

dotenv.config()

//static files



app.use("/static", express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors())

//connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to db!")
  //replaced app.listen here so our server will only run after the connection is made to our DB
  app.listen(process.env.PORT || PORT, () => console.log("server is up and running"))
})

//'WordBank', wordBankSchema
//setting views
app.set("view engine", "ejs")

//need to see our data
app.get("/", async (req, res) => {
  WordBank.find({}, (err, tasks) => {
   // templating variable wordBank : tasks
    res.render("index.ejs", { wordBank: tasks })
  })
})

//bringing back my data to send to client side
app.get("/api/foo", (req, res) => {
  //changed from type : String 
  let word = WordBank.find({}, (error, found) => {
    if (error) {
      console.warn(error)
    } else {
      // res.send(found)
      res.send(found)
    }
  })
})

//passing a header from client to server 
//input.type.date
// then filter data by date that was passed


//in postman bringing back header usually a body containing json 

// TODO figure out how to pass a header ? 

// app.get("/api/:findDate",  (req, res) => {
//   let date = req.params.findDate
//   let find = WordBank.find({}, (err, found) => {
//     if(err){
//       console.warn(err)
//     }else{
//       let parseDate = Date.parse(date) //changing inputted date over so it can match
//       res.send(found)
      
//     }
//   })
//   // console.log(date)
// })

//testing for finding dates to send to client
// app.get("/api/july17", (req, res) => {
//   let found = WordBank.find({}, (err, found) => {
//     if (err) {
//       console.warn(err)
//     } else {
//       let July17 = new Date(Date.parse("06-27-2022"))
//       let items = found.filter(item => {
//         let date = new Date(Date.parse(item.date))
//         return date > July17
//       })
//       res.send(items)
//     }
//   })

// })

//saving new input 
app
.route("/")
.post( async (req, res) => {

    const wordBank = new WordBank({
        content: req.body.content
    });
    try{
        await wordBank.save();
        res.redirect('/');
    } catch(err){
        res.redirect('/');
    }
});



  app
  .route("/save")
  .post((req, res) => {

    const id      = req.body.id
    const content = req.body.content

    WordBank.findByIdAndUpdate(id, { content: content}, err => {
      if (err) {
        console.log(err)
        res.status(400).send(err)
      } else {
        res.status(200).send({msg: "a-ok!"})
      }
    })
  })
//express deprecated res.send(status, body): Use res.status(status).send(body)


  //ill need to update this 
  //make a post does this exist?
  //if exists and it equals what im trying to delete 
  //then go back to client if response 200 remove 
//DELETE
// app.route("/remove/:id").get((req, res) => {
//   const id = req.params.id
//   WordBank.findByIdAndRemove(id, err => {
//     if (err) return res.send(500, err)
//     res.redirect("/")
//   })
// })
//use get in mongoose
// I would say that a best practice would be that you should use params when doing a get, but use body for post, put and patch.
app
.route("/remove")
.delete((req, res) => {

    const id      = req.body.id
    const content = req.body.content

    WordBank.findByIdAndDelete(id, { content: content}, err => {
      if (err) {
        console.log(err)
        res.status(400).send(err)
      } else {
        res.status(200).send({msg: "bye word"})
      }
    })
  })


  // use with fetch instead of form

//   app
// .route("/newWord")
// .post( (req, res) => {
//   //yo save that input to muh bank
//   const wordBank = new WordBank({
//     //yo gimme dat input
//     content: req.body.content
//   })
//   try {
   
//      wordBank.save()
//     //  res.status(400).send(err)
//   } catch(err) {
//     res.status(400).send({msg: "sorry :("})
//   }
// })