var cols = 0;
var ctx;
var rows = 0;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function selected() {
    var selector = document.getElementById('level');
    var value = selector[selector.selectedIndex].value;
    return value;
}

function algorithm() {
    var selector = document.getElementById('algorithm');
    var value = selector[selector.selectedIndex].value;
    if(value === "Algorithm"){
        alert("Xin nhap");
        return false;
    }
    return value;
}

function Spot(i ,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.x = i;
    this.y = j;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    if(Math.random() < selected()){
        this.wall = true;
    }

    this.show = function(col){
        fill(col);
        if(this.wall){
            fill(0);
        }
        noStroke();
        rect(this.i * w , this.j * h  , w - 1 , h - 1);
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
        }if(i > 0 && j > 0){
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
    var temp = end;
    while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
    }
    // console.log(path);

    for( var i = path.length-1 ; i >= 0; i-- ){
        a = path[i];
        if(a!== start && a!== end){
            // console.log(a);
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
        // alert(Math.round(mousePos.x/w-0.5) + ',' + Math.round(mousePos.y/h-0.5));
        if(grid[temp1][temp2].wall === true){
            alert("Khong chon vao wall");

        }else{
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(temp1*w, temp2*h, w-1, h-1);
            start = grid[temp1][temp2];
            console.log(start);
            document.getElementById("reGetStart").style.display = "block";
            document.getElementById("getStart").style.display = "none";
            canvas1.removeEventListener("click",myFunction,false);
        }
    }
    canvas1.addEventListener("click", myFunction, false);

    //Get Mouse Position
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
        // alert(Math.round(mousePos.x/w-0.5) + ',' + Math.round(mousePos.y/h-0.5));
        if(grid[temp1][temp2].wall === true){
            alert("Khong chon vao wall");
        }else{
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(temp1*w, temp2*h, w-1, h-1);
            start = grid[temp1][temp2];
            console.log(start);
            canvas1.removeEventListener("click",myFunction,false);
        }
    }
    canvas1.addEventListener("click", myFunction, false);

    //Get Mouse Position
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
            document.getElementById("reGetEnd").style.display = "block";
            document.getElementById("getEnd").style.display = "none";
            console.log(end)
            canvas1.removeEventListener("click",myFunction1, false);
        }
    }

    canvas1.addEventListener("click", myFunction1 , false);

    //Get Mouse Position
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
            console.log(end)
            canvas1.removeEventListener("click",myFunction1, false);
        }
    }

    canvas1.addEventListener("click", myFunction1 , false);

    //Get Mouse Position
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

    console.log(grid);

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

    // console.log(grid);

    for(var i=0;i< cols; i++){
        for(var j=0;j< rows; j++){
            ctx.fillStyle = "#FFF"; 
            ctx.fillRect(i*w,j*h, w-1, h-1 );
        }
    }
}


function drawMap1(){
    // console.log(openSet);

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

    createPath();
}

function removeFromArray(arr, elt){
    for(var i = arr.length - 1; i >= 0; i--){
        if(arr[i] == elt){
            arr.splice(i,1);
        }
    }
}

function heuristic(a, b){
    var d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
    return d;
}

function heuristic1(a, b){
    var d = Math.sqrt(Math.abs(a.i - b.i)*Math.abs(a.i - b.i) + Math.abs(a.j - b.j)*Math.abs(a.j - b.j));
    return d;
}

function heuristic2(a, b){
    var d = Math.max(Math.abs(a.i - b.i) , Math.abs(a.j - b.j));
    return d;
}


function solveMap1(){

    drawMap1();

    if(openSet.length > 0){
        var winner = 0;
        for(var i = 0; i<openSet.length; i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }

        var current = openSet[winner];

        if(current === end){
            path.push(end);
            console.log('DONE');
            return;
        }

        removeFromArray(openSet, current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for(var i = 0; i < neighbors.length; i++){
            var neighbor = neighbors[i];
            if(!closedSet.includes(neighbor) && !neighbor.wall){
                var tentative_gScore = current.g + 1;
                newPath = false;
                if(openSet.includes(neighbor)){
                    if(tentative_gScore < neighbor.g){
                        neighbor.g = tentative_gScore;
                        newPath = true;
                    }
                }else{
                neighbor.g = tentative_gScore;
                newPath = true;
                openSet.push(neighbor);
            }

            if(newPath){
                neighbor.h = heuristic(neighbor, end);
                // console.log("Heuristic", neighbor.g, neighbor.h, "\n");
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }

            }
        }


    }else{
        console.log("NO SOLUTION!!");
        return;
    }
    requestAnimationFrame(solveMap1);
}

function init(){
    width = 450;
    height = 450;
    document.getElementById("myCanvas").innerHTML = '<canvas id="canvas" width="0" height="0" ></canvas>';

    document.getElementById("canvas").setAttribute("width",width);
    document.getElementById("canvas").setAttribute("height",height);

    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FF0000";

    createMap();

    drawMap();

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
            solveMap1();
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
}

function hide() {
    var el1 = document.getElementById("number1");
    var el2 = document.getElementById("number2");
    var el3 = document.getElementById("bt");
    var el4 = document.getElementById("level")

        el1.style.display = 'none';
        el2.style.display = 'none';
        el3.style.display = 'none';
        el4.style.display = 'none';
}

function reset(){
    document.getElementById("number1").value = null;
    document.getElementById("number2").value = null;
    document.getElementById("algorithm").selectedIndex = "0";
    document.getElementById("level").selectedIndex = "0";
    var canvas = document.getElementById("canvas");
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