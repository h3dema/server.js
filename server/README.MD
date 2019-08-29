# Prerequisites

You need to install some packages in your Ubuntu to run this server. (Tested in Ubuntu LTS v. 16 and 18).

```bash
sudo apt-get install nodejs npm git
```

# Installation

The server.js need some node.js packages to run.
To install them proceed as follows:

```bash
git clone https://github.com/h3dema/server.js
cd server.js/server
npm install fs
npm install os
npm install express
```

# Running

```bash
cd server.js/server
nodejs server.js
```
