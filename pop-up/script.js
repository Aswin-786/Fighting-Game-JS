// Get the modal
var modal = document.getElementById('id01');

// get the inputs
let pl1 = document.getElementById("pl1")
let pl2 = document.getElementById("pl2")
// get the enter button
let enterBtn = document.getElementById("submit")

let nameStore = []
// when enter button clicks
enterBtn.onclick = () => {
  // push input values to namestore array
  nameStore.push(pl1.value)
  nameStore.push(pl2.value)
  // updated to localstorage 
  localStorage.setItem("names",JSON.stringify(nameStore))
  console.log({nameStore});
}
console.log({nameStore});

// show the modal container when screen loads
window.onload = () => {
  modal.style.display='block'
  pl1.value = ''
  pl2.value = ''
}


// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

