import http from 'http'

let server = http.createServer(function (req, res){
    res.end(req.url);
});

server.listen(8080);
