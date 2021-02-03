import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
    resizeScreen,
    updateMousePos,
    tickerStarted,
    tickerStopped,
    tickTime,
    incrementIDX,
    incrementCircleSize,
    addCircle,
    addChildCircle,
} from './redux/actions';

import MainView from './components/MainView';

class App extends Component {
    state = { 

     }


     componentDidMount(){
        this.onResize();    
        window.addEventListener("resize", this.onResize);
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
        const { startTicker, tickTime, incrementIDX, addCircle, incrementCircleSize, addChildCircle, state } = this.props;
        const { tickerStarted, mousePos, currentIDX } = state;
        console.log(tickerStarted, 'in start ticker');

        incrementIDX();
        addCircle(mousePos.x, mousePos.y, currentIDX);

        const ticker = () => {
            console.log(tickerStarted, 'in start ticker')

                tickTime();
                incrementCircleSize();
                addChildCircle(currentIDX);

                this.requestAnimation = window.requestAnimationFrame(ticker);
            
        }
        
        if(!tickerStarted){
            console.log('starting ticker');
            startTicker();
            ticker();
        }

        
     }

    stopTicker = () => {
        const { stopTicker, state } = this.props;
        const { tickerStarted } = state;
        console.log(tickerStarted, 'in stop ticker')
        if(tickerStarted){
            window.cancelAnimationFrame(this.requestAnimation);
            stopTicker();
        }
        
    }


    render() { 
        const { state } = this.props;
        console.log(state)
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
    state: state
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
    addChildCircle : (idx) => dispatch(addChildCircle(idx)) 
})


export default connect(mapStateToProps, mapDispatchToProps)(App);