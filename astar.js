function astar(){
    var x = parseInt(document.getElementById("astar1").value);
    if(x === 0){
        alert("Xin vui long chon giai thuat Heuristic");
    }else{
        if(openSet.length > 0){
            console.log(openSet);
            var dem = 0;
            for(var i = 0; i<openSet.length; i++){
                if(openSet[i].f < openSet[dem].f){
                    dem = i;
                }
            }
    
            current = openSet[dem];
    
            if(current === end){
                createPath();
                console.log('DONE');
                var temp = "Path Length = " + path.length;
                document.getElementById("path-length").innerHTML = temp;
                var temp = "Weight = " + path[0].f;
                document.getElementById("weight").innerHTML = temp;
                var temp = "OpenSet = " + openSet.length;
                document.getElementById("openSet").innerHTML = temp;
                var temp = "CloseSet = " + closedSet.length;
                document.getElementById("closedSet").innerHTML = temp;
                cancelAnimationFrame(astar);  
                
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
                    switch(x){
                        case 1: neighbor.h = manhattan(neighbor, end); break;
                        case 2: neighbor.h = euclide(neighbor, end); break;
                        case 3: neighbor.h = diagonal(neighbor, end); break;
                    }
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
                }
            }
        }else{
            console.log("NO SOLUTION!!");
            alert("Không có đường đi"); 
            cancelAnimationFrame(astar);
            return;
        }
        colorMap();
        requestAnimationFrame(astar);
    } 
}

function manhattan(a, b){ //Mahattan Distant
    var d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
    return d;
}

function euclide(a, b){ //Euclidean Distance
    var d = Math.sqrt(Math.abs(a.i - b.i)*Math.abs(a.i - b.i) + Math.abs(a.j - b.j)*Math.abs(a.j - b.j));
    return d;
}

function diagonal(a, b){ // Diagonal Distance
    var d = Math.max(Math.abs(a.i - b.i) , Math.abs(a.j - b.j));
    return d;
}