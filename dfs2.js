function dfs(){
    // console.log(start);
    // console.log(end);
    colorMap();
    console.log(start);
    // #OpenSet la nhung nut da duyet
    if(openSet.length > 0){
        if(openSet.includes(end)){
            path.push(end);
            console.log('DONE');
            return;
        }else{
            var current = openSet[openSet.length-1];
            console.log(current);
    
            // if(current === end){
            //     console.log("CHECK");
            //     path.push(end);
            //     console.log('DONE');
            //     return;
            // }
    
            removeFromArray(openSet,current);
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
                    neighbor.h = 1;
                    // console.log("Heuristic", neighbor.g, neighbor.h, "\n");
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
              }
          }
        }
    }else{
        console.log("NO SOLUTION!!");
        return;
    }
    requestAnimationFrame(dfs);
}