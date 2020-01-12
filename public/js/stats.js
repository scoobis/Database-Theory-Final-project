
document.querySelectorAll('.times').forEach(node => {
    calcT(node)
  })

  function calcT(node) {
    let min = Math.floor(node.innerText / 60)
    let sec = node.innerText % 60
  
    if(sec <= 9) sec = '0' + sec
  
    node.innerText = min +':'+ sec
  }