//TTS //https://www.assemblyai.com/blog/javascript-text-to-speech-easy-way/


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

// const textField = document.querySelector(".word")
const form = document.querySelector("#form")
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate
const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis
let ourText = ""

const checkBrowserCompatibility = () => {
  "speechSynthesis" in window
    ? console.log("Web Speech API supported!")
    : console.log("Web Speech API not supported :-(")
}

checkBrowserCompatibility()

// let content
 document.querySelector('.wordNew').addEventListener('click', runRequest)
 let bankData

async function runRequest(){
    try {
        const response = await fetch('/api/foo')
        const data = await response.json()
        console.log(data)
        bankData = data

        // get random word from the list.
        const index = Math.floor(Math.random() * bankData.length)
        content = data[index].content
        document.querySelector('.word').innerText = content
        console.log(content)
        // ourText = textField.value
        utterThis.text = content
        synth.speak(utterThis)
        content.value = ""

    } catch(error) {
        console.warn(error)
    }
}
//go refetch the data
//callback to get data
//do an undefined check 
runRequest().then(() => {
    console.log(bankData)
})

function repeatValue(){
    synth.speak(utterThis)
}
document.querySelector('.wordRepeat').addEventListener('click', repeatValue)

function updateSpeachRate(event) {
    //
    console.log(event.target.value);
    utterThis.rate = rate.value;
}
//my slide button
const rate = document.querySelector('#SpeachRateSlider')
//go on slider click
rate.addEventListener('change', updateSpeachRate);

document.querySelector('.wordRate').addEventListener('click', runRepeat)

function runRepeat(){
    if (utterThis.text == null || utterThis.text == undefined){
        console.warn("No Word Selected!");
        return
    }
    if (synth.speaking) {
        synth.cancel();
      }
     
      utterThis.addEventListener('error', () => {
        console.error('SpeechSynthesisUtterance error');
      });
      utterThis.rate = rate.value;
      synth.speak(utterThis);
}
