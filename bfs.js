function bfs(){
    // #OpenSet la nhung nut da duyet
    if(openSet.length > 0){

        current = openSet[0];
        
        if(current === end){
            createPath();
            console.log('DONE');
            var temp = "OpenSet = " + openSet.length;
            document.getElementById("openSet").innerHTML = temp;
            var temp = "CloseSet = " + closedSet.length;
            document.getElementById("closedSet").innerHTML = temp;
            cancelAnimationFrame(bfs);
            return;
        }

        openSet.shift();
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
    }else{
        console.log("NO SOLUTION!!");
        cancelAnimationFrame(bfs);
        return;
    }
    colorMap();
    requestAnimationFrame(bfs);
}