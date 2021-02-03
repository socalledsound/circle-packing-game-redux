export const RESIZE_SCREEN = "RESIZE_SCREEN";
export const TIME_TICK = "TIME_TICK";
export const TICKER_STARTED = "TICKER_STARTED";
export const TICKER_STOPPED = "TICKER_STOPPED";
export const UPDATE_MOUSE_POS = "UPDATE_MOUSE_POS";
export const INCREMENT_IDX = "INCREMENT_ID";
export const ADD_CIRCLE = "ADD_CIRCLE";
export const ADD_CHILD_CIRCLE = "ADD_CHILD_CIRCLE";
export const INCREMENT_CIRCLE_SIZE = "INCREMENT_CIRCLE_SIZE";
export const CHECK_NEIGHBORS = "CHECK_NEIGHBORS";

// export function tickTime() {
//     return {
//         type: TIME_TICK
//     };
// }

export function tickerStarted() {
    console.log('ticker started action')
    return {
        type: TICKER_STARTED
    };
}

export function tickerStopped() {
    console.log('ticker stopped action')
    return {
        type: TICKER_STOPPED
    };
}

export function tickTime() {
    console.log('time ticking')
    return {
        type: TIME_TICK
    };
}

export function updateMousePos(x, y) {
    // console.log('updating mouse pos', x, y);
    return {
        type: UPDATE_MOUSE_POS,
        payload: {
            x,
            y
        }

    }
}

export function incrementIDX(){
    return {
        type: INCREMENT_IDX,
    }
}

export function incrementCircleSize(){
    return {
        type: INCREMENT_CIRCLE_SIZE,
    }
}

export function addCircle(x, y, idx){
    return {
        type: ADD_CIRCLE,
        payload : {
            x,
            y,
            idx
        }
    }
}

export function addChildCircle(idx){
    return {
        type: ADD_CHILD_CIRCLE,
        payload: {
            idx
        }
    }
}

export function checkNeighbors(){
    return {
        type: CHECK_NEIGHBORS,
    }
}



export function resizeScreen(width, height) {
    return {
        type: RESIZE_SCREEN,
        payload: {
            width: width,
            height: height
        }
    };
}