import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: 'body',
  components: { App }
})

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow(){

  //create the browser window
  mainWindow = new BrowserWindow({width: 800, height:600})

  // render index.html wich will contain our root Vue component
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // dereference the mainWindow object when the window is closed
  mainWindow.on('closed',function(){
    mainWindow = null
  })

}


// cal the createWindow() method when Electron has finished initializing
app.on('ready',createWindow)

// when all windows are closed, quite the application on Windows/Linux
app.on('window-all-closed', function(){

  // only quit the application on OS x if the user hits cmd + q
  if(process.platform !== 'darwin'){
    app.quit();
  }
})

app.on('activate',function(){
  // re-create the mainWindow if the dock icon is clicked in OS X and no other
  // windows were open
  if(mainWindow === null){
    createWindow();
  }
})
