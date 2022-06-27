const net = require("net");
const fs = require("fs");

const arquivos = "./";

const splitando = (splitLine) => {
    var split = splitLine.toString().split(" ");
    let splitandoHeader = {
        method: split[0],
        path: split[1],
    };

    return splitandoHeader;
};

const server = net.createServer((socket) => {
    console.log(
        `=> (${socket.remoteAddress} : ${socket.remotePort}) conectado!`
    );

    socket.on("data", (data) => {
        var dado = data.toString();
        var splitandoHeader = splitando(dado);
        

        console.log(dado.split[1]);

        if (!fs.existsSync(arquivos + dado.split(" ")[1])) {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
            socket.end();
        } else {
            console.log(dado.split(" ")[1]);
            fs.readFile(arquivos + splitandoHeader.path, (err, data) => {
                if (splitandoHeader.path == "/") {
                    socket.write("HTTP/1.1 200 OK\r\n\r\n");
                    socket.write("OK");
                } else if (err) {
                    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
                    console.log(err);
                } else {
                    socket.write("HTTP/1.1 200 OK\r\n\r\n");
                    socket.write(data);
                }
                socket.end();
            });
        }
    });

    socket.on("end", () => {
        console.log(
            `=> (${socket.remoteAddress} : ${socket.remotePort}) Encerrou a conexão`
        );
    });
});

const port = 8080;
const host = "127.0.0.1";

server.listen(port, host, () => {
    console.log(`Servidor iniciado em localhost:${port}`);
});