# GmailNotification
Desktop notification for emails using Github Electron API.

###Quick Start

1. Start a server by running **http-server -p 8080 -c-1**
2. Run the app using **npm start**

You should be able to see *ballon notification*

###Architecture
1. The **index.html** file polls the **GMAIL API** and **sends async messages** to the main process using **ipc calls**,
2. The **index.js** is the **main process** which upon receiving messages from **index.html**, shows them using **ballon notification**.

Please suggest any better architecture 
