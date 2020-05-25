var expess = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = expess();
//첫번째 미들웨어 시작, extened : true -> 중첩된 객체표현 허용결정
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.post("/image", function(req, res) {

  var name = req.body.name;
  var img = req.body.image;

  console.log(name);
  var realFile = Buffer.from(img, "base64");

      // we need rotate Function having a rotation as 90




  fs.writeFileSync('data/' + name, realFile, function (err) {
    if (err)
      console.log(err);
  });

    console.log("2nd");

    //여기에 딥러닝 실행하기
    const execSync = require('child_process').execSync;
    console.log(4444444);
    var result = execSync('darknet_no_gpu detector test obj.data data/yolov3customtest.cfg data/yolov3custom_3500.weights ' + 'data/' + name).toString();
    console.log(55555555);
    //console.log(result);
    var arr_result=result.split('\n');
    var ret='';
    /*
    json 형태로 가공
    for (i=8;i<arr_result.length -1;i++) {
      console.log(arr_result[i]);
      let tmp=arr_result[i].split(':',1);
      ret+='"'+tmp+'": ,';
    }
    ret+='"'+arr_result[i].split(':',1)+'": ';
    */
    var len=arr_result.length;
  for (i=8;i<len-2 ;i++) {
    console.log(arr_result[i]);
    let tmp=arr_result[i].split(':',1);
    ret+=tmp+',';
  }
  ret+=arr_result[i].split(':',1);
  console.log(ret);

  res.send(ret);
});

app.listen(3000);
/*const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('good testing \n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function run_cmd(cmd, args, cb, end) {
  var spawn = require('child_process').spawn,
      child = spawn(cmd, args),
      me = this;
  child.stdout.on('data', function (buffer) { cb(me, buffer) });
  child.stdout.on('end', end);
}

// Run C:\Windows\System32\netstat.exe -an
var foo = new run_cmd(
    'darknet_no_gpu', ['detector test'],
    function (me, buffer) { me.stdout += buffer.toString() },
    function () { console.log(foo.stdout) }
);

/*
var exec = require('child_process').exec;
exec('./darknet_no_gpu', function callback(err, stdout, stderr){
  if (err){
    console.error(err);
  }
  //stdout 응답 : { success : true/false, data : .. }
  var result = JSON.parse(stdout);
  if(result.success){

  }
});
*/

/*
var express = require('express');
var http = require('http');
var bodyParser= require('body-parser');
var app = express();



app.set('port',process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//module.exports = app;

//첫 번째 미들웨어
app.use(function(req, res, next) {

  console.log('첫 번째 미들웨어 호출 됨');
  var approve ={'approve_id':'NO','approve_pw':'NO'};


  var paramId = req.body.id;
  var paramPassword = req.body.password;
  console.log('id : '+paramId+'  pw : '+paramPassword);

  //아이디 일치여부 flag json 데이터입니다.
  if(paramId == 'test01') approve.approve_id = 'OK';
  if(paramPassword == '123') approve.approve_pw = 'OK';

  res.send(approve);

});

var server = http.createServer(app).listen(app.get('port'),function(){
  console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port'));
});

//module.exports = app;
*/
