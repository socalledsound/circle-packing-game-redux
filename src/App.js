import React, { Component } from 'react'
import { connect } from 'react-redux';
import { makeCircle, makeCircleCircle } from './utils';

import {
    resizeScreen,
    updateMousePos,
    tickerStarted,
    tickerStopped,
    tickTime,
    incrementIDX,
    incrementCircleSize,
    resetCircleSize,
    addCircle,
    fixCircle,
    addChildCircle,
    checkNeighbors,
    removeCircle,
    addPackedCircle,
    addCircleObject,
} from './redux/actions';

import MainView from './components/MainView';
// import { makeCircle } from './utils';

class App extends Component {
    state = { 

     }


     componentDidMount(){
        
        this.onResize();    
        window.addEventListener("resize", this.onResize);

        this.initCircles()

     }

     initCircles = () => {
        const { addCircleObject, checkNeighbors, circles, currentIDX } = this.props;
        console.log(currentIDX);
        addCircleObject(makeCircleCircle(currentIDX));
        checkNeighbors();
        setTimeout(this.checkCircle, 50);   
        
        if(circles.length < 1000){
            setTimeout(this.initCircles, 100);
        }
     }

     checkCircle = () => {
        const { fixCircle, incrementIDX, removeCircle, circles, currentIDX } = this.props;
        console.log(circles);
        const thisCircle = circles.filter(circle => circle.id === currentIDX)[0];
        
        if(!thisCircle.overlap){
            console.log(thisCircle.overlap);
            fixCircle();
            incrementIDX();    
        } else {
            removeCircle(currentIDX);
        }
     }

     onResize = () => {
        const { resizeScreen } = this.props;
            resizeScreen(window.innerWidth, window.innerHeight);
     }

     updateMousePosition = (x, y) => {
         const { updateMousePos } = this.props;
         updateMousePos(x, y);
     }

     startTicker = () => {
        const { startTicker, tickTime, addCircle, incrementCircleSize, checkNeighbors, addChildCircle, tickerStarted, mousePos, currentIDX } = this.props;
        // const { tickerStarted, mousePos, currentIDX } = state;
        //console.log(tickerStarted, 'in start ticker');

        
        addCircle(mousePos.x, mousePos.y, currentIDX);

        const ticker = () => {
           // console.log(tickerStarted, 'in start ticker')

                tickTime();
                incrementCircleSize();
                checkNeighbors();
               // addChildCircle(currentIDX);

                this.requestAnimation = window.requestAnimationFrame(ticker);
            
        }
        
        if(!tickerStarted){
           // console.log('starting ticker');
            startTicker();
            ticker();
        }

        
     }

    stopTicker = () => {
        const { stopTicker, resetCircleSize, incrementIDX, fixCircle, removeCircle, tickerStarted, circles, currentIDX } = this.props;
        // const { tickerStarted, circles, currentIDX } = state;
        resetCircleSize();
        
        const thisCircle = circles.filter(circle => circle.id === currentIDX)[0];
        if(!thisCircle.overlap){
            fixCircle();
            incrementIDX();    
        } else {
            removeCircle(currentIDX);
        }
          
        
        //console.log(tickerStarted, 'in stop ticker')
        if(tickerStarted){
            window.cancelAnimationFrame(this.requestAnimation);
            stopTicker();
        }
        
    }


    render() { 
        const { state } = this.props;
       // console.log(state)
        return (

                <MainView 
                    {...state}
                    updateMousePos={this.updateMousePosition}
                    startTicker={this.startTicker}
                    stopTicker={this.stopTicker}
                />
        )
        
        ;
    }
}
 
const mapStateToProps = state => ({
    state: state,
    circles: state.circles,
    tickerStarted: state.tickerStarted, 
    currentIDX : state.currentIDX,
    mousePos : state.mousePos,
})

const mapDispatchToProps = dispatch => ({
    resizeScreen: (width, height) => dispatch(resizeScreen(width, height)),
    updateMousePos : (x, y) => dispatch(updateMousePos(x,y)),
    startTicker : () => dispatch(tickerStarted()),
    stopTicker : () => dispatch(tickerStopped()),
    tickTime : () => dispatch(tickTime()),
    incrementIDX : () => dispatch(incrementIDX()),
    incrementCircleSize : () => dispatch(incrementCircleSize()),
    addCircle : (x, y, currentIDX) => dispatch(addCircle(x, y, currentIDX)),
    fixCircle : () => dispatch(fixCircle()),
    addChildCircle : (idx) => dispatch(addChildCircle(idx)), 
    resetCircleSize : () => dispatch(resetCircleSize()),
    checkNeighbors : () => dispatch(checkNeighbors()),
    removeCircle : (idx) => dispatch(removeCircle(idx)),
    addPackedCircle : () => dispatch(addPackedCircle()),
    addCircleObject : (circle) => dispatch(addCircleObject(circle)),
})


export default connect(mapStateToProps, mapDispatchToProps)(App);