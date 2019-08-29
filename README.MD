# Servidor Node.js para receber os dados do cliente de vídeo

## Instalação

Se você não tiver instalado o node.js, você deverá fazê-lo antes de rodar o programa.
A instalação no Ubuntu é simples, chame

```
sudo apt-get -y install nodejs npm
```

Clone this repository in your computer. Go to the `server.js` folder, created by the git clone command, and follow the instructions in [the server README](https://github.com/h3dema/server.js/blob/master/server/README.MD) to install the dependencies.


### Testando o servidor

Se você quiser testar se o servidor está funcionado, rode o netstat como mostrado abaixo.
A saída esperada é a linha com 8080. Se houver conexões de clientes, poderão aparecer mais linhas.

```
$ netstat -atn | grep 8080
tcp6       0      0 :::8080                 :::*                    LISTEN
```

Abra no navegador o arquivo "test_connection.html". Clique o botão que aparece e verifique se uma nova linha foi gravada no arquivo "save.db".

## Arquivo de dados

O servidor irá gravar um arquivo de dados "save.db" no seu próprio diretório contendo as métricas de vídeo.
Os campos são
* timestamp no formato 2018:09:06:17:17:10
* cliente (ip, proxy, tipo do agente)
* bufferLevel
* reportedBitrate
* calculatedBitrate
* droppedFPS
* index
* maxIndex
* latency
* download


