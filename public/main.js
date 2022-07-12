


//TTS //https://www.assemblyai.com/blog/javascript-text-to-speech-easy-way/

// const { raw } = require("express")

// TODO; look into browserify so I can import npm modules to client side ?
// let wordData = []
// let randomWord
//  let getContent

// fetch('http://localhost:8010/api/foo')
// .then((res) => res.json())
// .then(data => {
//     data.forEach(item => {
//          //console.log(item.content)
//         //wordData.push(item.content)
//         //item = item.content
//     })
//  getContent = data.map(item => item.content)
//   console.log(getContent)

// })
// console.log(getContent)

// fetch('http://localhost:8010/api/july17')
// .then((res) => res.json())
// .then(data => {
//     data.forEach(item => {
//         //console.log(item)
//         console.log(item.date)
//     })
// })

// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate


const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis
// let ourText = ""

const checkBrowserCompatibility = () => {
  "speechSynthesis" in window
    ? console.log("Web Speech API supported!")
    : console.log("Web Speech API not supported :-(")
}
//check if browser is compatiable with above
checkBrowserCompatibility()

window.onload = function(){
  let placeWord = document.querySelector('.word')
  
    placeWord.textContent = localStorage.getItem('word')
  
}

// let content

//if next button clicked go to runRequest
document.querySelector(".wordNew").addEventListener("click", runRequest)

//storing data from api/foo server fetch
let bankData

async function runRequest(event) {
  //preventing event from running during edit/cancel
  // event.preventDefault()
  try {
    const response = await fetch("/api/foo")
    const data = await response.json()
    // console.log(data)
    bankData = data

    // get random word from the list.
    const index = Math.floor(Math.random() * bankData.length)
    //now store the word with the random index's content
    let speakWord = bankData[index].content
    //change the dispalyed word to our random word
    document.querySelector(".word").innerText = speakWord
    console.log(speakWord)
    localStorage.setItem('word', speakWord)
    //now assign speech function to this word
    utterThis.text = speakWord
    //speak that word
    synth.speak(utterThis)
    //reset
    speakWord.value = ""
  } catch (error) {
    console.warn(error)
  }
}
//go refetch the data
//callback to get data
//do an undefined check
//runRequest().then(() => {
//  console.log(bankData)
//})


function updateSpeachRate(event) {
  //
  console.log(event.target.value)
  //if I use slider change that value to my speech function
  utterThis.rate = rate.value
}
//my slide button
const rate = document.querySelector("#SpeachRateSlider")
//go on slider click
rate.addEventListener("change", updateSpeachRate)

document.querySelector(".wordRate").addEventListener("click", runRepeat)

function runRepeat() {
  if (utterThis.text == null || utterThis.text == undefined) {
    console.warn("No Word Selected!")
    return
  }
  if (synth.speaking) {
    synth.cancel()
  }

  utterThis.addEventListener("error", () => {
    console.error("SpeechSynthesisUtterance error")
  })
  utterThis.rate = rate.value
  synth.speak(utterThis)
}


//from onclick
//
function edit(id, event) {
  let parentElm = event.target.closest("li")
  let contentElm = parentElm.querySelector(".content")

  contentElm.setAttribute("contenteditable", true)
  parentElm.classList.add("editing")
}

// let foo
//only show delete after click
async function save(id, event) {
  
  //whichever li is clicked on (parentElm) (bankList)
  //newPar.closest('li') didnt work
  let parentElm = event.target.closest("li")
  console.log(parentElm)
  //the element within that parentElm's
  let contentElm = parentElm.querySelector(".content")
  console.log(contentElm)
  //where is content stored?
  let content = contentElm.innerText

  //go to db to store it
  //declaring async to wait for fetch
  let rawResponse = await fetch("/save", {


    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    //stringify: send as a string and transport data from client to server
    body: JSON.stringify({ id: id, content: content })
  })

  // everything is good
  if (rawResponse.status == 200) {
    parentElm.classList.remove('editing')
    // extra credit: extract these strings into a string object
    // sendToast({type: 0, "word saved"})
    // sendToast({type: 0, strings.wordSaved})
  
  } else { // everything is not good
    console.log(rawResponse)
  
    // replace this alert with a toast message: 
    // https://codepen.io/octoshrimpy/pen/JYPQbo
    //user wont be able to click 
    //once clicked flag can go away
    alert("something went wrong in the server")
    // sendToast({type: 2, "something went wrong"})
  }

  // display response appropriately to user
}
//if response code 200 
//then everything is good go ahead remove the class that we added to the parent element 

async function remove(id, event) {
  let parentElm = event.target.closest("li")
  let rawResponse = await fetch("/remove", {


    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id, content: content })
  })

  // everything is good
  if (rawResponse.status == 200) {
    parentElm.remove()
    console.log('it worked')
  
  
  } else { // everything is not good
    console.log(rawResponse)
    alert("something went wrong in the server")
  }
  
}

//toast

//option to send word through fetch instead of form

//put new word to db

// async function newWord(word){

// word = document.getElementById('content').value
// console.log(word)
// let rawResponse = await fetch("/newWord", {


//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({ content: word })
// })

// if (rawResponse.status == 200) {
//   const content = await rawResponse.json()
//   console.log(content)
  
 

// } else { // everything is not good
//   console.log(rawResponse)
//   alert("something went wrong in the server")
//   // sendToast({type: 2, "something went wrong"})
// }
// word = ''
// }
