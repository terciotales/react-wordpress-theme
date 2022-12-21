/* global RTW_posts_list */

/**
 * WordPress dependencies
 */
import domReady from "@wordpress/dom-ready";
import {render} from '@wordpress/element';

/**
 * Block dependencies
 */
import PostsList from "../components/posts-list/index.js";
import metadata from '../block.json';
import './index.scss';

const blockClass = `.wp-block-${metadata.name.replace('/', '-')}`;

domReady(function () {
    const blocks = document.querySelectorAll(blockClass)

    blocks?.forEach((block) => {
        const instanceId = block.getAttribute('data-block-instance');
        const props = RTW_posts_list[instanceId];

        if (!props) return;

        render(<PostsList {...props} />, block);
    });
});
