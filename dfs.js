function dfs(){
    // #OpenSet la nhung nut da duyet
    if(openSet.length > 0){

        console.log(openSet);

        current = openSet[openSet.length-1];

        if(current === end){
            // path.push(end);
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
                neighbor.h = 0;
                // console.log("Heuristic", neighbor.g, neighbor.h, "\n");
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
            }
        }
    }else{
        console.log("NO SOLUTION!!");
        cancelAnimationFrame(dfs)
        return;
    }
    colorMap();
    requestAnimationFrame(dfs);
}