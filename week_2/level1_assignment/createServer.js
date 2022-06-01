const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello, Server Part</h1>');
    res.end('<p>Server Love</p');
    // 여기에 서버에서 response 메시지를 통해서 보내줄 내용 작성 
}).listen(8080, () => { // 8080 번으로 포트 열기
    console.log('8080번 포트에서 서버 대기 중입니다!');
}); 

