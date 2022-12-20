/* global postsList */

import domReady from '@wordpress/dom-ready';
import './index.scss';

/**
 * WordPress dependencies
 */
import {render} from '@wordpress/element';

const BLOCK_CLASS = 'wp-block-react-wordpress-theme-posts-list';

import metadata from '../block.json';

/**
 * Internal dependencies
 */

import View from "../components/view";

// Finds the block containers, and render the React component in them.



domReady( function () {
    document
        .querySelectorAll( `.${ BLOCK_CLASS }` )
        ?.forEach( ( blockContainer ) => {
            const instanceId = blockContainer.getAttribute( 'data-block-instance' );
            // @ts-ignore this is a global variable.
            const props = postsList[ instanceId ];

            if ( ! props ) {
                return;
            }

            render( <View { ...props } />, blockContainer );
        } );
} );
