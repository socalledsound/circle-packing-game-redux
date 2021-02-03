import { createStore } from 'redux';
import { ParticleReducer } from './reducers'


export const store = createStore(ParticleReducer);