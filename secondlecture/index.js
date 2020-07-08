var rect = require("./rectangle.js");

function solve(l ,b){

    rect(l, b, (err, rectangle)=>{
        if(err){
            console.log("Error: "+err.message );
        }
        else{
            console.log("The perimeter is : "+rectangle.perimeter);
            console.log("The area is : "+rectangle.area);
        }
    });

}

solve(3, 2);
solve(5, 2);
solve(0, 2);