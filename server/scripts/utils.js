const fs = require('fs');

module.exports = {

    // adiciona um dado ao arquivo
    append: function(filename, x, sep) {
        if (sep == undefined) sep = '|'; // dependendo da versão do node.js, não aceita default params em function()
        fs.appendFile(filename, x+sep, function(err) {  
        // throws an error, you could also catch it here
        if (err) return false;
        });
        return true;
    },
    // obtem de request o ip do cliente, o ip do proxy (se houver), o tipo do navegador
    decodeRequest: function(request) {
        var clientIPaddr = null,
            clientProxy = null,
            agent = null;
    
        // is client going through a proxy?
        if (request.headers['via']) { // yes
            clientIPaddr = request.headers['x-forwarded-for'];
            clientProxy = request.headers['via'];
        } else { // no
            clientIPaddr = request.connection.remoteAddress;
            clientProxy = "none";
        }
        return [clientIPaddr, clientProxy, request.headers['user-agent']];
    }
};