import React from 'react';

const CircleChildren = ({CircleChildren}) => {
   // console.log(x,y,r, stroke);
   
    
    // const circles = Array.from({ length: numCircles }, (_, i) => i);

    if(x){
        return ( 

            <g>
                <circle cx={x} cy={y} r={r} stroke={stroke} fill={fill} opacity={opacity}/>
                {/* <circle cx={x} cy={y} r={size} fill={getRandomColor()}/> 
                <circle cx={x} cy={y} r={size * 0.9} fill={getRandomColor()}/> 
                <circle cx={x} cy={y} r={size * 0.7} fill={getRandomColor()}/> 
                <circle cx={x} cy={y} r={size * 0.4} fill={getRandomColor()}/> 
                <circle cx={x} cy={y} r={size * 0.2} fill={getRandomColor()}/> 
                 */}
                 {/* {circles.map( (circle, i) => <circle cx={x} cy={y} r={r} stroke={getRandomColor()}/> )} */}
            </g>
             );
    } else {
        return (
            <div>not defined yet</div>
        )
    }

}
 
export default CircleChildren;