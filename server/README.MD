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

## Troubleshooting

When you are trying to install the npm packages, you may encouter an error "npm ERR! Error: CERT_UNTRUSTED".
This happened to me when I was using it in a Ubuntu v.14.
It occurs because the npm package is outdated, thus you have to install a newer version, using the following commands:

```
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs -y
```

After that, just reissue the `npm install` commands.


# Running

To run, just go to the correct directory and call the server.js using nodejs, as follows:

```bash
cd server.js/server
nodejs server.js
```
