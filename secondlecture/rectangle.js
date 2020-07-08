module.exports = (l, b, callback)=>{
    console.log("The length is "+l+" and breadth is "+b);
    if(l<=0 || b<=0){
        setTimeout(()=> callback( new Error("Either l or b is 0"), null)
               
        ,1000);
    }
    else{

        setTimeout(()=>callback(null,
            {
                perimeter: (2*(l+b)),
                area: (l*b)
            }
        ), 1000);
    }
}