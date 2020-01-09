
  // open window for adding new bike
  document.querySelector('#newBike').addEventListener('click', () => {

    document.getElementById("newBikeWindows").style.visibility = "visible";
  })

  //close windows for new bike
  document.querySelector('#close').addEventListener('click', () => {

  document.getElementById("newBikeWindows").style.visibility = "hidden";
})

// open window for changing run info
document.querySelector('#runBtn').addEventListener('click', () => {

  document.getElementById("changeRunInfoWIndow").style.visibility = "visible";

  document.getElementById("trainingShoe").value = document.getElementById("trainingShoeP").innerText
  document.getElementById("racingShoe").value = document.getElementById("racingShoeP").innerText
})


// close window for chaging run info
document.querySelector('#closeRun').addEventListener('click', () => {

  document.getElementById("changeRunInfoWIndow").style.visibility = "hidden";
})

// open window for chaging swim info
document.querySelector('#swimBtn').addEventListener('click', () => {

  document.getElementById("changeSwimInfo").style.visibility = "visible";

  document.getElementById("wetsuit").value = document.getElementById("wetsuitP").innerText

})

// close window for chaging swim info
document.querySelector('#closeSwim').addEventListener('click', () => {

  document.getElementById("changeSwimInfo").style.visibility = "hidden";
})

// open window for edit profile
document.querySelector('#editHW').addEventListener('click', () => {

  document.getElementById("editHWContainer").style.visibility = "visible";

  document.getElementById("weight").value = document.getElementById("weightValue").innerText
  document.getElementById("height").value = document.getElementById("heightValue").innerText

})

document.querySelector('#closeEditProfile').addEventListener('click', () => {

  document.getElementById("editHWContainer").style.visibility = "hidden";
})

// coverting all swim times to hr, mins, and sec
document.querySelectorAll('.eventSwimTime').forEach(node => {
  calcTimes(node)
})

// coverting all T1 times to mins and sec
document.querySelectorAll('.eventT1Time').forEach(node => {
  calcT(node)
})

document.querySelectorAll('.eventBikeTime').forEach(node => {
  calcTimes(node)
})

document.querySelectorAll('.eventT2Time').forEach(node => {
  calcT(node)
})

document.querySelectorAll('.eventRunTime').forEach(node => {
  calcTimes(node)
})

function calcTimes(node) {
  let hour = Math.floor(node.innerText / 3600)
  let min = Math.floor(node.innerText % 3600 / 60)
  let sec = Math.floor(node.innerText % 3600 % 60)

  if(min <= 9) min = '0' + min
  if(sec <= 9) sec = '0' + sec

  node.innerText = hour +':'+ min +':'+ sec
}

function calcT(node) {
  let min = Math.floor(node.innerText / 60)
  let sec = node.innerText % 60

  if(min <= 9) min = '0' + min
  if(sec <= 9) sec = '0' + sec

  node.innerText = min +':'+ sec
}
