const express = require('express')
const router = express.Router()
const { spawn } = require('child_process')

// 
// router.get('/', async (req, res) => {
//   debugger;
//   // res.send(`hello nearest neighbors!! say ${req.query.say} to ${req.query.to}` + '<p><a href=abc.txt>download</a></p>')
//   res.send(data)
// })
// 

router.get('/', (req, res) => {
  let dataToSend
  let largeDataSet = []
  // spawn new child process to call the python script
  const python = spawn('python', [
    "d:\\OneDrive\\OneDrive - Wistron Corporation\\DataRobot\\hubble2\\Hubble2 by gensim2.py", 
    "d:\\OneDrive\\OneDrive - Wistron Corporation\\DataRobot\\hubble2\\small.xlsx",
    '1698994', 
    '1699105'
  ])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...')
    //dataToSend =  data;
    largeDataSet.push(data)
  })
  
  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)
    // send data to browser
    res.send('Results<br><textarea>' + largeDataSet.join('') + '</textarea>')
  })
})

module.exports = router