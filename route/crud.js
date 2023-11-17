const express = require("express")
const routedata = express.Router();
const fs = require('fs');

const path = './data/hospitaldetails.json';


const details = (data) => {
    const change = JSON.stringify(data)
    fs.writeFileSync(path, change)
}

const dataget = () => {
    const jsonData = fs.readFileSync(path)
    return JSON.parse(jsonData)    
}


// read the data
routedata.get('/crud', (req, res) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

// post function
  routedata.post('/crud/dataaddition', (req, res) => {
   
    var existAccounts = dataget()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log('/n'+existAccounts);

    details(existAccounts);
    res.send({success: true, msg: ' data added successfully'})
})

// Read - get all data from the json file
routedata.get('/crud/details', (req, res) => {
  const accounts = dataget()
  res.send(accounts)
})

// Update - using Put method
routedata.put('/crud/:id', (req, res) => {
   var existAccounts = dataget()
   fs.readFile(path, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    details(existAccounts);
    res.send(`details with id ${accountId} are updated`)
  }, true);
});

//delete - using delete method
routedata.delete('/crud/delete/:id', (req, res) => {
   fs.readFile(path, 'utf8', (err, data) => {
    var existAccounts = dataget()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    details(existAccounts);
    res.send(`details with id ${userId} were deleted`)
  }, true);
})
module.exports = routedata;