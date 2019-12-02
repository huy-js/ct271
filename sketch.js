var cols = 0; //tong so cot
var ctx; 
var rows = 0; //tong so hang
var grid = new Array(cols); //
var openSet = []; //tập mở 
var closedSet = []; //tập đóng 
var start; //bắt đầu
var end; //kết thúc
var w, h; //số lượng ô của mỗi hàng và mỗi cột 
var path = []; //đường đi từ đầu đến đích 

function Spot(i ,j){
    this.i = i;
    this.j = j;
    this.f = 0; //tổng của chiều dài từ điểm xuất phát đến đích qua nút đang xét
    this.g = 0; //chiều dài đường đi từ điểm bắt đầu đến nút đang xét
    this.h = 0; //chiều dài ước lượng từ điểm được duyệt hiện tại tới đích
    this.x = i;
    this.y = j;
    this.neighbors = []; //mảng chứa các neighbors 
    this.previous = undefined; //nút cha
    this.wall = false; //có phải là wall hay không 

    if(Math.random() < selected()){  //selected trong checkForm()
        this.wall = true;
    }

    this.addNeighbors = function(grid){
        var i = this.i;
        var j = this.j;

        if( i < cols - 1){
            this.neighbors.push(grid[i + 1][j]);
        }if(i > 0){
            this.neighbors.push(grid[i-1][j]);
        }if(j < rows - 1){
            this.neighbors.push(grid[i][j+1]);
        }if(j > 0){
            this.neighbors.push(grid[i][j-1]);
        }
        if(i > 0 && j > 0){
            this.neighbors.push(grid[i - 1][j - 1]);
        }if(i < cols - 1 && j > 0){
            this.neighbors.push(grid[i + 1][j - 1]);
        }if(i > 0 && j < rows - 1){
            this.neighbors.push(grid[i - 1][j + 1]);
        }if(i < cols - 1 && j < rows - 1){
            this.neighbors.push(grid[i + 1][j + 1]);
        }
    }
}

function createMap(){
    
    cols = document.getElementById("number1").value;
    rows = document.getElementById("number2").value;
    var i ,j;
    for(i=0;i< cols; i++){
        grid[i] = new Array(rows);
    }

    for(i=0;i< cols; i++){
        for(j=0;j< rows; j++){
            grid[i][j] = new Spot(i ,j);
        }
    }

    for(i=0;i< cols; i++){
        for(j=0;j< rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }
}

function createPath() {
    path = [];
    var temp = end;

    while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
    }

    for( var i=0;i<path.length ;i++ ){
        a = path[i];
        if(a!== start && a!== end){
            ctx.fillStyle = "#F7FF61";
            ctx.fillRect(a.x*w, a.y*h, w-1, h-1);
        } 
    }

}

function getStart(){
    var canvas1 = document.getElementById("canvas");

    this.myFunction = function(evt){
        var mousePos = getMousePos(canvas1, evt);
        var temp1 = Math.round(mousePos.x/w-0.5)
        var temp2 = Math.round(mousePos.y/h-0.5);
        if(grid[temp1][temp2].wall === true){
            alert("Khong chon vao wall");

        }else{
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(temp1*w, temp2*h, w-1, h-1);
            start = grid[temp1][temp2];
            let tempo = "Start Location: "+ temp1 + ":" + temp2;
            document.getElementById("start-location").style.display = "";
            document.getElementById("start-location").innerHTML = tempo;
            document.getElementById("reGetStart").style.display = "block";
            document.getElementById("getStart").style.display = "none";
            canvas1.removeEventListener("click",myFunction,false);
        }
    }
    canvas1.addEventListener("click", myFunction,false);

    function getMousePos(canvas1, evt) {
        var rect = canvas1.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
   
}

function reGetStart(){
    var canvas1 = document.getElementById("canvas");
    ctx.fillStyle = "#FFF";
    ctx.fillRect(start.i*w, start.j*h, w-1, h-1);
    this.myFunction = function(evt){
        var mousePos = getMousePos(canvas1, evt);
        var temp1 = Math.round(mousePos.x/w-0.5)
        var temp2 = Math.round(mousePos.y/h-0.5);
        
        if(grid[temp1][temp2].wall === true){
            alert("Khong chon vao wall");
        }else{
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(temp1*w, temp2*h, w-1, h-1);
            start = grid[temp1][temp2];
            let tempo = "Start Location: "+ temp1 + ":" + temp2;
            document.getElementById("start-location").innerHTML = tempo;
            canvas1.removeEventListener("click",myFunction,false);
        }
    }
    canvas1.addEventListener("click", myFunction,false);

    function getMousePos(canvas1, evt) {
        var rect = canvas1.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}

function getEnd(){
    var canvas1 = document.getElementById("canvas");
    function myFunction1 (evt) {
        var mousePos = getMousePos(canvas1, evt);
        var temp1 = Math.round(mousePos.x/w-0.5)
        var temp2 = Math.round(mousePos.y/h-0.5);
        if(grid[temp1][temp2].wall === true){
            alert("Khong chon vao wall");
        }else{
            ctx.fillStyle = "#800000";
            ctx.fillRect(temp1*w, temp2*h, w-1, h-1);
            end = grid[temp1][temp2];
            document.getElementById("end-location").style.display = "";
            let tempo = "End Location: "+ temp1 + ":" + temp2;
            document.getElementById("end-location").innerHTML = tempo;
            document.getElementById("reGetEnd").style.display = "block";
            document.getElementById("getEnd").style.display = "none";
            canvas1.removeEventListener("click",myFunction1,false);
        }
    }

    canvas1.addEventListener("click", myFunction1,false);

    function getMousePos(canvas1, evt) {
        var rect = canvas1.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}

function reGetEnd(){
    var canvas1 = document.getElementById("canvas");
    ctx.fillStyle = "#FFF";
    ctx.fillRect(end.i*w, end.j*h, w-1, h-1);
    function myFunction1 (evt) {
        var mousePos = getMousePos(canvas1, evt);
        var temp1 = Math.round(mousePos.x/w-0.5)
        var temp2 = Math.round(mousePos.y/h-0.5);
        if(grid[temp1][temp2].wall === true){
            alert("Khong chon vao wall");
        }else{
            ctx.fillStyle = "#800000";
            ctx.fillRect(temp1*w, temp2*h, w-1, h-1);
            end = grid[temp1][temp2];
            let tempo = "Start Location: "+ temp1 + ":" + temp2;
            document.getElementById("start-location").innerHTML = tempo;
            canvas1.removeEventListener("click",myFunction1,false);
        }
    }

    canvas1.addEventListener("click", myFunction1,false);

    function getMousePos(canvas1, evt) {
        var rect = canvas1.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}

function drawMap(){
    w = width / cols; //do lon cua o
    h = height / rows; //do lon cua o
    ctx.fillStyle = "#AAD5FA";
    ctx.fillRect( 0, 0, width, height );

    for(var i=0;i< cols; i++){
        for(var j=0;j< rows; j++){
            switch( grid[i][j].wall ) {
                case false: ctx.fillStyle = "#FFF"; break;
                case true: ctx.fillStyle = "#013348"; break;
            }
            ctx.fillRect(i*w,j*h, w-1, h-1 );
        }
    }
}

function reDrawMap(){
    w = width / cols; //do lon cua o
    h = height / rows; //do lon cua o
    ctx.fillStyle = "#AAD5FA";
    ctx.fillRect( 0, 0, width, height );
    for(var i=0;i< cols; i++){
        for(var j=0;j< rows; j++){
            grid[i][j].f = 0;
            grid[i][j].g = 0;
            grid[i][j].h = 0;
        }
    }

    for(var i=0;i< cols; i++){
        for(var j=0;j< rows; j++){
            switch( grid[i][j].wall ) {
                case false: ctx.fillStyle = "#FFF"; break;
                case true: ctx.fillStyle = "#013348"; break;
            }
            ctx.fillRect(i*w,j*h, w-1, h-1 );
        }
    }
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(start.i*w, start.j*h, w-1, h-1);
    ctx.fillStyle = "#800000";
    ctx.fillRect(end.i*w, end.j*h, w-1, h-1);
}

function colorMap(){

    for( var i = 0; i < openSet.length; i++ ) {
        a = openSet[i];
        if(a!== start && a!== end){
            ctx.fillStyle = "#D740FF";
            ctx.fillRect(a.x*w, a.y*h, w-1, h-1);
        }  
    }

    for( var i = 0; i < closedSet.length; i++ ) {
        a = closedSet[i];
        if(a!== start && a!== end){ 
            ctx.fillStyle = "#40CFE6";
            ctx.fillRect(a.x*w, a.y*h, w-1, h-1);
        }
    }

}

function removeFromArray(array, element){
    for(var i = array.length - 1; i >= 0; i--){
        if(array[i] == element){
            array.splice(i,1);
        }
    }
}

function init(){
    if(checkForm() == true){
        width = 400;
        height = 400;
        document.getElementById("myCanvas").innerHTML = '<canvas id="canvas" width="0" height="0" ></canvas>';
        document.getElementById("canvas").setAttribute("width",width);
        document.getElementById("canvas").setAttribute("height",height);

        ctx = canvas.getContext("2d");
        ctx.strokeStyle = "#FF0000";

        createMap();

        drawMap();
        
        document.getElementById("modify1").style.display = "";
        document.getElementById("bt1").style.display = "none";
        document.getElementById("level").disabled = true;
        document.getElementById("number1").disabled = true;
        document.getElementById("number2").disabled = true;
        document.getElementById("getStart").style.display = "";
        document.getElementById("getEnd").style.display = "";
        document.getElementById("start").style.display = "";
        document.getElementById("reset").style.display = "";
        document.getElementById("text-render").style.display = "none";
    }else{
        alert("Vui long dien day du thong tin");
    }
}
 
function letGo(){
    openSet = [];
    closedSet = [];
    path=[];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
    switch(parseInt(algorithm())) {
        case 1:
            astar();
            break;
        case 2:
            dijkstra();
            break;
        case 3:
            bfs();
            break;
        case 4:
            dfs();
            break;
    }
    document.getElementById("reGetStart").style.display = "none";
    document.getElementById("reGetEnd").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("algorithm").disabled = true;
    document.getElementById("astar1").disabled = true;
}

function reset(){
    document.getElementById("level").disabled = false;
    document.getElementById("number1").disabled = false;
    document.getElementById("number2").disabled = false;
    document.getElementById("number1").value = null;
    document.getElementById("number2").value = null;
    document.getElementById("algorithm").selectedIndex = "0";
    document.getElementById("level").selectedIndex = "0";
    document.getElementById("content").innerHTML = "";
    document.getElementById("bt1").style.display = "";
    document.getElementById("modify1").style.display = "none";
    document.getElementById("getStart").style.display = "none";
    document.getElementById("text-render").style.display = "";
    document.getElementById("getEnd").style.display = "none";
    document.getElementById("start-location").style.display = "none";
    document.getElementById("end-location").style.display = "none";
    document.getElementById("openSet").style.display = "none";
    document.getElementById("closedSet").style.display = "none";
    document.getElementById("path-length").style.display = "none";
    document.getElementById("weight").style.display = "none";
    document.getElementById("algorithm").disabled = false;
    document.getElementById("astar1").disabled = false;
    document.getElementById("astar").style.display = "none";
    var canvas = document.getElementById("canvas");
    canvas.style.display = "none";
    ctx = canvas.getContext("2d");
    ctx.clearRect( 0, 0, width, height );

    cols = document.getElementById("number1").value;
    rows = document.getElementById("number2").value;

    for(var i=0;i< cols; i++){
        for(var j=0;j< rows; j++){
            ctx.clearRect(i*w,j*h, w-1, h-1 );
        }
    }
    $("#canvas").empty();
    grid = new Array(cols);
    var i ,j;
    for(i=0;i< cols; i++){
        grid[i] = new Array(rows);
    }

    for(i=0;i< cols; i++){
        for(j=0;j< rows; j++){
            grid[i][j] = 0;
        }
    }
    openSet = [];
    closedSet = [];
    path=[];
}

function modify(){
    document.getElementById("algorithm").selectedIndex = "0";
    document.getElementById("getStart").style.display = "";
    document.getElementById("getEnd").style.display = "none";
    document.getElementById("start1").style.display = "";
    document.getElementById("start2").style.display = "none";
    document.getElementById("algorithm").disabled = false;
    document.getElementById("astar1").disabled = false;
    
    $("#canvas").empty();
    
    width = 400;
    height = 400;
    document.getElementById("myCanvas").innerHTML = '<canvas id="canvas" width="0" height="0" ></canvas>';

    document.getElementById("canvas").setAttribute("width",width);
    document.getElementById("canvas").setAttribute("height",height);

    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FF0000";

    reDrawMap();

    openSet = [];
    closedSet = [];
    path=[];
}

function temp(){
    for(var i=0;i< cols; i++){
        for(var j=0;j< rows; j++){
            grid[i][j].f = 0;
            grid[i][j].g = 0;
            grid[i][j].h = 0;
        }
    }
}

