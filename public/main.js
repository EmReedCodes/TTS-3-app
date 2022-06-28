//feelin cute might make a new branch to use this

// //want to link speak synth to the inputted word from my form 
// //window doesnt appear to be valid with ejs 
// 'speechSynthesis' in window ? console.log("Web Speech API supported!") : console.log("Web Speech API not supported :-(")

// const textInputField = document.querySelector("#text-input")
// const form = document.querySelector("#form")
// const utterThis = new SpeechSynthesisUtterance()
// const synth = window.speechSynthesis
// let ourText = ""
// //since its using the window... ejs renders before its sent client side meaning I can't use this with ejs
// const checkBrowserCompatibility = () => {
//   "speechSynthesis" in window
//     ? console.log("Web Speech API supported!")
//     : console.log("Web Speech API not supported :-(")
// }

// checkBrowserCompatibility()

// form.onsubmit = (event) => {
//   event.preventDefault()
//   ourText = textInputField.value
//   utterThis.text = ourText
//   synth.speak(utterThis)
//   textInputField.value = ""
// }