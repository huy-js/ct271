function dijkstra(){
    //OpenSet la nhung nut da duyet
    if(openSet.length > 0){
        var winner = 0;
        for(var i = 0; i<openSet.length; i++){
            if(openSet[i].f < openSet[winner].f ){
                winner = i;
            }
        }

        current = openSet[winner];
        
        if(current === end){
            // current = end;
            createPath();
            console.log(path);
            var temp = "Path Length = " + path.length;
            document.getElementById("path-length").innerHTML = temp;
            var temp = "Weight = " + path[0].f;
            document.getElementById("weight").innerHTML = temp;
            var temp = "OpenSet = " + openSet.length;
            document.getElementById("openSet").innerHTML = temp;
            var temp = "CloseSet = " + closedSet.length;
            document.getElementById("closedSet").innerHTML = temp;
            console.log('DONE');
            cancelAnimationFrame(dijkstra);
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
                console.log(openSet);
            }

            if(newPath){
                neighbor.h = 0; //với thuật toán dijkstra hàm h luôn bằng 0 
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previous = current;
            }
          }
        }
  
   
    }else{  
        console.log("NO SOLUTION!!");
        var temp = "OpenSet = " + openSet.length;
        document.getElementById("openSet").innerHTML = temp;
        var temp = "CloseSet = " + closedSet.length;
        document.getElementById("closedSet").innerHTML = temp;
        cancelAnimationFrame(dijkstra);
        alert("NO SOLUTION");
        return;
    }
    colorMap();
    requestAnimationFrame(dijkstra);
}