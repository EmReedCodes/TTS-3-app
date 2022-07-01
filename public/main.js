

fetch('http://localhost:8010/api/foo')
.then((res) => res.json())
.then(data => {
    data.forEach(item => {
       // console.log(item.content)
    })
})

fetch('http://localhost:8010/api/july17')
.then((res) => res.json())
.then(data => {
    data.forEach(item => {
        //console.log(item)
        console.log(item.date)
    })
})

const textInputField = document.querySelector("#text-input")
const form = document.querySelector("#form")
const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis
let ourText = ""

const checkBrowserCompatibility = () => {
  "speechSynthesis" in window
    ? console.log("Web Speech API supported!")
    : console.log("Web Speech API not supported :-(")
}

checkBrowserCompatibility()


document.getElementById('form').addEventListener('click', run)

function run (){
    ourText = textInputField.value
      utterThis.text = ourText
        synth.speak(utterThis)
        textInputField.value = ""
}

//now that I've brought back my word bank content I need to math.random and display them in ejs or here? 

