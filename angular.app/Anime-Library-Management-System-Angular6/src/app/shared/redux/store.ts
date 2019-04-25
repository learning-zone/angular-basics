import { Action } from 'redux';
import { Anime } from '../interfaces/anime';
import { LIKE_ANIME, DISLIKE_ANIME, DISLIKE_ALL_ANIME } from './actions';

export interface AnimeAppState {
    animes: Array<Anime>;
    lastUpdate: Date;
}

export const INITIAL_STATE: AnimeAppState = {
    animes: [],
    lastUpdate: new Date()
}

export function rootReducer(state: AnimeAppState, action): AnimeAppState {
    switch(action.type) {
        case LIKE_ANIME:
            action.anime.id = state.animes.length + 1;
            return Object.assign({}, state, {
                animes: state.animes.concat(Object.assign({}, action.anime)),
                lastUpdate: new Date()
            });
        case DISLIKE_ANIME:
            return Object.assign({}, state, {
                animes: state.animes.filter(anime => anime.id !== action.id),
                lastUpdate: new Date()
            });    
    }
    return state;
} 