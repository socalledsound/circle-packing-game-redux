export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
   

export const checkNeighbors = (thisCircle, otherCircles) => {
   // console.log('checking');
    //console.log(thisCircle, otherCircles);
    const circlesToCheck = otherCircles.filter(circle => circle.id !== thisCircle.id);
    const checks = circlesToCheck.map(otherCircle => {
            
                const dx = otherCircle.x - thisCircle.x;
                const dy = otherCircle.y - thisCircle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if(dist < otherCircle.r + thisCircle.r){
                  //  console.log('happening');
                    return true
                } else {
                    return false
                }
            
           

        })    
    
       // console.log(checks);
        const truthy = checks.filter(item => item === true);
        if(truthy.length > 0){
            return true
        } else {
            return false
        }
      


}

//         var circle1 = {radius: 20, x: 5, y: 5};
// var circle2 = {radius: 12, x: 10, y: 5};

// var dx = circle1.x - circle2.x;
// var dy = circle1.y - circle2.y;
// var distance = Math.sqrt(dx * dx + dy * dy);

// if (distance < circle1.radius + circle2.radius) {
//     // collision detected!
// }
