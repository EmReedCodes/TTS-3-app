// TODO; look into browserify so I can import npm modules to client side ?
// let wordData = []
// let randomWord
// let getContent

// fetch('http://localhost:8010/api/foo')
// .then((res) => res.json())
// .then(data => {
//     // data.forEach(item => {
//     //      //console.log(item.content)
//     //     wordData.push(item.content)
//     //     //item = item.content
//     // })
//     // randomWord = getContent[Math.floor(Math.random() * getContent.length)]
//     //getContent = data.map(item => item.content)
//   //console.log(getContent)
  

// })


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
const utterThis = new SpeechSynthesisUtterance()
const synth = window.speechSynthesis
let ourText = ""

const checkBrowserCompatibility = () => {
  "speechSynthesis" in window
    ? console.log("Web Speech API supported!")
    : console.log("Web Speech API not supported :-(")
}

checkBrowserCompatibility()

let content
document.querySelector('.wordRepeat').addEventListener('click', runRequest)


async function runRequest(){
    try {
        const response = await fetch('/api/foo')
        const data = await response.json()
        console.log(data)
        const index = Math.floor(Math.random() * data.length)
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






// document.querySelector('.wordRepeat').addEventListener('click', run)

// function run (){
//     ourText = textField.value
//       utterThis.text = ourText
//         synth.speak(utterThis)
//         textField.value = ""
// }

