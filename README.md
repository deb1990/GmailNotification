# Gmail Notification
Desktop notification for new emails using Github's Electron API.

###Quick Start

1. Run the app using **npm start**

You should be able to see *ballon notification*

###Architecture
1. The **index.html** file polls the **GMAIL API** and **sends async messages** to the main process using **ipc calls**,
2. The **index.js** is the **main process** which upon receiving messages from **index.html**, shows them using **ballon notification**.

####Please feel free to suggest any better architecture
