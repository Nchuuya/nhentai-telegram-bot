const express = require("express");
const expressApp = express();
const api = require('./api.js');
const cors = require('cors');


function startListen(bot, PORT) {
  const port = PORT || 3000;
  let current_url
  if(process.env.REPL_URL2){
    setInterval(()=>{
      current_url = current_url==process.env.REPL_URL ? process.env.REPL_URL2 : process.env.REPL_URL
      console.log("url changed ---" + current_url)
      bot.telegram.setWebhook(current_url + "/secret-path");
    }, 100000)

  }else{
    bot.telegram.setWebhook(process.env.REPL_URL + "/secret-path").then((x)=>{console.log('webhook set - ' + process.env.REPL_URL + " " + x)})
  }
  
  expressApp.use(cors())
  expressApp.use(bot.webhookCallback("/secret-path"));
  expressApp.get("/", (req, res) => {
    res.send("Hello, love <3");
  });
  expressApp.get("/api/countManga", async (req, res) => {
    let answer = await api.countManga();
    res.send(answer);
  });
  expressApp.get("/api/countUsers", async (req, res) => {
    let answer = await api.countUsers();
    res.send(answer);
  });
  expressApp.get("/api/countMessages", async (req, res) => {
    let answer = await api.countMessages();
    res.send(answer);
  });
  expressApp.get("/api/messagesToday", async (req, res) => {
    let answer = await api.messagesToday();
    res.send(answer);
  });
  expressApp.get("/api/mangaToday", async (req, res) => {
    let answer = await api.mangaToday();
    res.send(answer);
  });
  expressApp.get("/api/usersToday", async (req, res) => {
    let answer = await api.usersToday();
    res.send(answer);
  });
  expressApp.get("/api/lastManga", async (req, res) => {
    let answer = await api.lastManga();
    res.send(answer);
  });
  expressApp.get("/api", async (req, res) => {
    let answer = await api.allinfo();
    res.send(answer);
  });


  expressApp.listen(port, () => {
    console.log(`Our app is running on port ${port}`);
  });
}

module.exports = {
  startListen,
};
