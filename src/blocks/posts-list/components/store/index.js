/**
 * WordPress dependencies
 */
import { register, createReduxStore } from '@wordpress/data';

import apiFetch from '@wordpress/api-fetch';

const DEFAULT_STATE = {
    posts: {},
};

const STORE_NAME = 'rtw/posts-list';

const actions = {
    setPosts( posts ) {
        return {
            type: 'SET_POSTS',
            posts,
        };
    },
    getPosts( path ) {
        return {
            type: 'GET_POSTS',
            path,
        };
    },
};

const reducer = ( state = DEFAULT_STATE, action ) => {
    switch ( action.type ) {
        case 'SET_POSTS': {
            return {
                ...state,
                posts: action.posts,
            };
        }
        default: {
            return state;
        }
    }
};

const selectors = {
    getPosts( state ) {
        const { posts } = state;
        return posts;
    },
};

const controls = {
    GET_POSTS( action ) {
        return apiFetch( { path: action.path } );
    },
};

const resolvers = {
    *getPosts() {
        const posts = yield actions.getPosts( '/pmpm/my-unique-url/' );
        return actions.setPosts( posts );
    },
};

const storeConfig = {
    reducer,
    controls,
    selectors,
    resolvers,
    actions,
};

register( STORE_NAME, storeConfig );

export { STORE_NAME };
