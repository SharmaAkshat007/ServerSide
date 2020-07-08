var Rectangle = require("./rectangle.js");

function solveRectangle(l, b){

    console.log("The length is "+l+" and breadth is "+b);

    if(l<=0 || b<=0){
        console.log("Either length or breadth is less than zero")
    }
    else{
        console.log("The perimeter of rectangle is "+Rectangle.perimeter(l, b));
        console.log("The area of the rectangle is "+ Rectangle.area(l, b));
    }


}

solveRectangle(2, 3);;
solveRectangle(0, 10);