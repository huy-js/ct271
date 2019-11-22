function astar(){
    colorMap();

    var x = parseInt(document.getElementById("astar1").value);
    console.log(x);
    if(x === 0){
        alert("Xin vui long chon giai thuat Heuristic");
    }else{
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
                    switch(x){
                        case 1: neighbor.h = heuristic(neighbor, end); break;
                        case 2: neighbor.h = heuristic1(neighbor, end); break;
                        case 3: neighbor.h = heuristic2(neighbor, end); break;
                    }
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
        requestAnimationFrame(astar);
    }
}