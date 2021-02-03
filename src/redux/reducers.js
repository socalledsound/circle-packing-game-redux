
const INITIAL_STATE = {
    mousePos: {x: null, y: null},
    svgWidth: 800,
    svgHeight: 600,
    timeTick: 0,
    currentIDX : 0,
    circles : [],
    circleSize : 50,

}


export const ParticleReducer = (state = INITIAL_STATE, action) => {
    console.log(state);
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
        const curr = state.currentIDX
        return {
            ...state,
            currentIDX: curr + 1,
        }  
        
        case 'INCREMENT_CIRCLE_SIZE' : 
        const size = state.circleSize
        return {
            ...state,
            circleSize: size + 2,
        }  

        case 'ADD_CIRCLE' : 
        const { circleSize , circles, currentIDX } = state;
        const newCircles = [];
        console.log(action.payload.idx, currentIDX);
        const newCircle = {
                    id:  currentIDX,
                    x: action.payload.x,
                    y: action.payload.y,
                    r: circleSize, 
                };
                newCircles.push(newCircle);
                console.log('adding circle', newCircle);
        return {
            ...state,
            circles: circles.concat(newCircles),
        }  
        
            default:
            return state
    }
}
