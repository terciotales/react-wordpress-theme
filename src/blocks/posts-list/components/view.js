/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
const BLOCK_CLASS = 'wp-block-react-wordpress-theme-posts-list';

/**
 * @typedef {Object} ViewProps The Edit component props.
 * @property {string} className The class name.
 * @property {string} option1 The first option.
 * @property {string} option2 The second option.
 * @property {string} question The survey question.
 */

/**
 * The Edit component for the block.
 *
 * @param {Object} props The component props.
 * @param {string} props.perPage The class name.
 */
const View = ( { perPage } ) => {
    return (
        <div>
            <h1>Posts per page: {perPage}</h1>
        </div>
    );
};

export default View;
