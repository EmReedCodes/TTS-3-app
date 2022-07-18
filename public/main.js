//TTS https://www.assemblyai.com/blog/javascript-text-to-speech-easy-way/


// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate

//declaring to use speech synth where I place it
const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis


const checkBrowserCompatibility = () => {
  "speechSynthesis" in window
    ? console.log("Web Speech API supported!")
    : console.log("Web Speech API not supported :-(")
}
//check if browser is compatiable with above
checkBrowserCompatibility()

//adding the word into local storage so when list is updated you dont lose it
window.onload = function(){
  let placeWord = document.querySelector('.word')
    placeWord.textContent = localStorage.getItem('word')
  
}


//if next button clicked go to runRequest
document.querySelector(".wordNew").addEventListener("click", runRequest)

//cant use global event depracated so use as argument
async function runRequest(event) {

  try {
    const response = await fetch("/api/foo")
    const data = await response.json()
    // console.log(data)
    // get random word from the list.
    const index = Math.floor(Math.random() * data.length)
    //now store the word with the random index's content
    let speakWord = data[index].content
    //change the dispalyed word to our random word
    document.querySelector(".word").innerText = speakWord
    //set the item in local storage that is currently being displayed
    localStorage.setItem('word', speakWord)
    //now assign speech function to this word
    utterThis.text = speakWord
    //speak that word
    synth.speak(utterThis)
    //reset which I guess I dont need 
    // speakWord.value = ""
  } catch (error) {
    console.warn(error)
  }
}

//struggled not being able to declare a global variable. Here I learned I need to create a callback to use that data elsewhere

//go refetch the data
//callback to get data
//do an undefined check
//runRequest().then(() => {
//  console.log(data)
//})

//my slide button
const rate = document.querySelector("#SpeachRateSlider")
//go on slider click
rate.addEventListener("change", updateSpeachRate)

function updateSpeachRate(event) {
  //
  console.log(event.target.value)
  //if I use slider change that value to my speech function
  utterThis.rate = rate.value
  //Ill need to create something so users know what speed they are at. Considered assigning it here to a element but need to work out kinks
  // document.querySelector('.speed').innerText = event.target.value
}


document.querySelector(".wordRate").addEventListener("click", runRepeat)

function runRepeat() {
  //in case there is no word 
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
function edit(id, event) {
  let parentElm = event.target.closest("li")
  let contentElm = parentElm.querySelector(".content")
  //this is the magic that allows the super clean edit on page
  contentElm.setAttribute("contenteditable", true)
  parentElm.classList.add("editing")
}


//only show delete after click
async function save(id, event) {
  
  //whichever li is clicked on (parentElm) (bankList)
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

//TODO toast for notifications 

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
