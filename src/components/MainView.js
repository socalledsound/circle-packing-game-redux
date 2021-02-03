import React, { Component } from 'react'
import CircleSystem from "./CircleSystem";

class MainView extends Component {
    constructor(props){
        super(props)
        this.svgRef = React.createRef();
    }
    
    componentDidMount() {

        this.svgRef.current.addEventListener("mousedown", (e) => {
            this.props.updateMousePos(e.clientX, e.clientY);
           // this.props.startDrawing();
        });

        this.svgRef.current.addEventListener("mouseup", () => {
           // this.props.stopDrawing();
        });
    }


    render() {
        //console.log(this.props);
        return (
            <div
                onMouseDown={() => this.props.startTicker()}
                onMouseUp={() => this.props.stopTicker()}
                style={{ overflow: "hidden" }}
            >
                
                <svg
                    style={{
                        width: this.props.svgWidth,
                        height: this.props.svgHeight,
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        background: "rgba(124, 224, 249, .3)"
                    }}
                    ref={this.svgRef}
                >
                    <CircleSystem circles={this.props.circles} />
                </svg>
               
            </div>
        );
    }

}
 
export default MainView;