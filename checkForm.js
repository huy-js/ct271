var flag;
function checkForm(){
    flag = true;
    var selector = document.getElementById('level');
    var value = selector[selector.selectedIndex].value;
    console.log(value);
    var selector1 = document.getElementById('algorithm');
    var value1 = selector1[selector1.selectedIndex].value;
    console.log(value1);
    var selector2 = document.getElementById('number1').value.length;
    console.log(selector2);
    var selector3 = document.getElementById('number2').value.length;
    console.log(selector3);
    if(value === "0" || value1 === "0" || selector2 === 0 || selector3 === 0){
        flag = false;
    }
    return flag;
}

function checkAstar(){
    var x = document.getElementById("algorithm").value;
    if(parseInt(x) === 1){
        document.getElementById("astar").style.display = "";
    }else{
        document.getElementById("astar").style.display = "none";
    }
}

function contentFooter(){
    var x = parseInt(document.getElementById("algorithm").value);
    switch(x){
        case 1: document.getElementById("content").innerHTML = "Guarantees the shortest path"; break;
        case 2: document.getElementById("content").innerHTML = "Guarantees the shortest path"; break;
        case 3: document.getElementById("content").innerHTML = "Guarantees the shortest path"; break;
        case 4: document.getElementById("content").innerHTML = "Doesn't guarantees the shortest path"; break;
    }
}

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