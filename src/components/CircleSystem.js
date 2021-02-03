import React from 'react';
import Circle from './Circle';
// import CircleChildren from './CircleChildren';

const ParticleSystem = ({ circles }) => {
    if(circles){
        return (
            <g>
                {circles.map(circle => <Circle {...circle} key={circle.id} />)}
                {/* {
                circlesWithChildren.map(
                    circleWithChildren => 
                        <CircleChildren {...circleWithChildren} key={circleWithChildren.id} 
                        />)
                } */}
            </g>
        )
    } else {
        return (
            <div>loading....</div>
        )
    }

}
   



export default ParticleSystem;
