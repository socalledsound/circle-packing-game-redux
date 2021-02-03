import React from 'react';
import Circle from './Circle';

const ParticleSystem = ({ circles }) => {
    if(circles){
        return (
            <g>
            {circles.map(circle => <Circle {...circle} key={circle.id} />)}
        </g>
        )
    } else {
        return (
            <div>loading....</div>
        )
    }

}
   



export default ParticleSystem;
