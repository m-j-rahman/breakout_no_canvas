// a function that delays another function running for 3 seconds

  function delay(callback, ms) {
    let timer = 0
    let called = false
    return function() {
      if (called) {
        clearTimeout(timer)
        called = false
        callback()
      } else {
        clearTimeout(timer)
       timer = setTimeout(() => {
         called = true
         callback()
       }, ms)
     }
    }
  }

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)) 
sleep(3000).then(() => console.log('You can use the delay function'))
// }
// }
