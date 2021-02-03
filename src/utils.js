import GlobalSettings from './GlobalSettings';
import CircleObject from './CircleObject';

export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
   
export const makeCircle = (i) => {
    const r = 10 + Math.random() * 1;
    const x = r + Math.random() * (1000 - r);
    const y = r + Math.random() * (500 -r); 
    
    return new CircleObject(i, x, y, r, getRandomColor(), GlobalSettings.testingColor, GlobalSettings.testingOpacity, false);

}

export const makeCircleCircle = (i) => {
    const theta = Math.random() * 6.28;
    const metaRadius = 300;
    const center = 400;
    const r = 5 + Math.random() * 30;
    const x = 200 + center + Math.sin(theta) * Math.random() * metaRadius;
    const y = 100 + center + Math.cos(theta) * Math.random() * metaRadius; 
    
    return new CircleObject(i, x, y, r, getRandomColor(), GlobalSettings.testingColor, GlobalSettings.testingOpacity, false);

}



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
