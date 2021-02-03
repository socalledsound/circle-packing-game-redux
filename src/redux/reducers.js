import { checkNeighbors, getRandomColor, makeCircle } from '../utils';
// import CircleObject from '../CircleObject';
import GlobalSettings from '../GlobalSettings';

// const checkedCircles = [];


//     for(let i = 0; i < 100; i++ ){
//         const circle = makeCircle(i);
//         if(!checkNeighbors(circle, checkedCircles)){
//             checkedCircles.push(circle);
//         }
//     }


const INITIAL_STATE = {
    mousePos: {x: null, y: null},
    svgWidth: GlobalSettings.initWidth,
    svgHeight: GlobalSettings.initHeight,
    timeTick: 0,
    circles : [],
    circlesWithChildren : [],
    currentIDX : 0,
    currentChildIDX: 0,
    circleSize : GlobalSettings.circleStartSize,
    testColor: GlobalSettings.testColor,
    warningColor: GlobalSettings.warningColor,
    setColor: GlobalSettings.setColor,
    testOpacity: 0.3,
    setOpacity: 1.0,

}


export const ParticleReducer = (state = INITIAL_STATE, action) => {
    //console.log(state);
    const { currentIDX, circleSize, circles, circlesWithChildren } = state;
    
    
    switch(action.type){

        case 'RESIZE_SCREEN' : 
            return {
                ...state,
                svgWidth: action.payload.width,
                svgHeight: action.payload.height,
            }

        case 'TICKER_STARTED' :
            return {
                    ...state,
                    tickerStarted : true,
                }

        case 'TIME_TICK' :
            const newCount = state.timeTick + 1;
            return {
                    ...state,
                    timeTick : newCount,
                }

        case 'TICKER_STOPPED' :
            return {
                    ...state,
                    tickerStarted : false,
                }

        case 'UPDATE_MOUSE_POS' : 
            return {
                ...state,
                mousePos: {x: action.payload.x, y: action.payload.y},
            }

        case 'INCREMENT_IDX' : 
        const curr = state.currentIDX + 1
        console.log(curr);
        return {
            ...state,
            currentIDX: curr,
        }  
        
        case 'INCREMENT_CIRCLE_SIZE' : 
        const newCircleSize = state.circleSize + 2;
        const circleToResize = circles.filter(circle => circle.id === currentIDX);
        const alreadySizedCircles = circles.filter(circle => circle.id !== currentIDX);
        circleToResize[0].r = newCircleSize;
        return {
            ...state,
            circleSize: newCircleSize,
            circles: alreadySizedCircles.concat(circleToResize)
        }

        case 'RESET_CIRCLE_SIZE' : 
        
        return {
            ...state,
            circleSize: GlobalSettings.circleStartSize,
        }       
        
        
        case 'REMOVE_CIRCLE' : 

        return {
            ...state,
            circles: circles.filter(circle => circle.id !== currentIDX),
        }

        case 'ADD_CIRCLE' : 

        const newCircles = [];
        //console.log(action.payload.idx, currentIDX);
        const newCircle = {
                    id:  currentIDX,
                    x: action.payload.x,
                    y: action.payload.y,
                    r: action.payload.r || circleSize, 
                    stroke: getRandomColor(),
                    fill: GlobalSettings.testingColor,
                    opacity: GlobalSettings.testingOpacity,
                    overlap: false,
                };
                newCircles.push(newCircle);
                console.log('adding circle', newCircle);
        return {
            ...state,
            circles: circles.concat(newCircles),
        } 

        case 'ADD_CIRCLE_OBJECT' : 
             
            return {
                ...state,
                circles: circles.concat([action.payload.circle])
            }


        case 'CHECK_NEIGHBORS' : 
            
//         var circle1 = {radius: 20, x: 5, y: 5};
// var circle2 = {radius: 12, x: 10, y: 5};

// var dx = circle1.x - circle2.x;
// var dy = circle1.y - circle2.y;
// var distance = Math.sqrt(dx * dx + dy * dy);

// if (distance < circle1.radius + circle2.radius) {
//     // collision detected!
// }    
            console.log(currentIDX, 'in neighbors reducer');
        
            const circleToCheck = circles.filter(circle => circle.id === currentIDX);
            const thisCircle = circleToCheck[0];
            const otherCircles = circles.filter(circle => circle.id !== currentIDX);
            otherCircles.forEach(otherCircle => {
                    const dx = otherCircle.x - thisCircle.x;
                    const dy = otherCircle.y - thisCircle.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if(dist < otherCircle.r + thisCircle.r + 10){
                        thisCircle.fill = GlobalSettings.warningColor;
                        thisCircle.overlap = true;
                    }
            })  
            return {
                ...state,
                circles: otherCircles.concat(circleToCheck),
            }

        case 'ADD_PACKED_CIRCLE' : 
            const packedCircles = circles;
            const circleToAdd = makeCircle(currentIDX);
            if(!checkNeighbors(circleToAdd, packedCircles)){
                packedCircles.push(circleToAdd)
            }
            return {
                ...state,
                circles: circles.concat([circleToAdd]),
                currentIDX: currentIDX + 1,
            }    

        case 'FIX_CIRCLE' : 
            const circleToFix = circles.filter(circle => circle.id === currentIDX);
            const fixedCircles = circles.filter(circle => circle.id !== currentIDX);
            circleToFix[0].opacity = GlobalSettings.settledOpacity;
            circleToFix[0].fill = GlobalSettings.settledColor;
            return {
                ...state,
                circles: fixedCircles.concat(circleToFix),
            }
        
        case 'ADD_CIRCLE_WITH_CHILDREN' : 
        const newCircleChildrenArray = [];
        const newCircleChildrenArrayHolder = [];
        //console.log(action.payload.idx, currentIDX);
        const newCircleParent = {
                    id:  currentIDX,
                    x: action.payload.x,
                    y: action.payload.y,
                    r: circleSize, 
                    stroke: getRandomColor(),
                };
                newCircleChildrenArray.push(newCircleParent);
                newCircleChildrenArrayHolder.push(newCircleChildrenArray);
                console.log('adding circle', newCircleParent);
        return {
            ...state,
            circlesWithChildren: circlesWithChildren.concat(newCircleChildrenArrayHolder),
        }         
        
            default:
            return state
    }
}
