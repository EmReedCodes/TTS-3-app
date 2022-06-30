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
    //templating variable wordBank : tasks
    res.render("index.ejs", { wordBank: tasks })
  })
})

app.get("/api/foo", (req, res) => {
  let word = WordBank.find({ type: String }, (error, found) => {
    if (error) {
      console.warn(error)
    } else {
      res.send(found)
    }
  })
})

//passing a header from client to server 
//input.type.date
// then filter data by date that was passed

app.get("/api/july17", (req, res) => {
  let found = WordBank.find({}, (err, found) => {
    if (err) {
      console.warn(err)
    } else {
      let July17 = new Date(Date.parse("06-27-2022"))
      let items = found.filter(item => {
        let date = new Date(Date.parse(item.date))
        return date > July17
      })
      res.send(items)
    }
  })

})


app.post("/", async (req, res) => {
  //yo save that input to muh bank
  const wordBank = new WordBank({
    //yo gimme dat input
    content: req.body.content
  })
  try {
    await wordBank.save()
    res.redirect("/")
  } catch (err) {
    res.redirect("/")
  }
})

app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id
    //going to my models
    WordBank.find({}, (err, tasks) => {
      //id Task is id in ejs ? so its finding that in the db
      //the wordBank is how Ill grab it in ejs
      res.render("editbank.ejs", { wordBank: tasks, idTask: id })
    })
  })
  .post((req, res) => {
    const id = req.params.id

    WordBank.findByIdAndUpdate(id, { content: req.body.content }, err => {
      if (err) return res.send(500, err)
      res.redirect("/")
    })
  })

//DELETE

app.route("/remove/:id").get((req, res) => {
  const id = req.params.id
  WordBank.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err)
    res.redirect("/")
  })
})
