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
        const attributes = RTW_posts_list[instanceId];

        if (!attributes) return;

        const args = {
            categories: attributes.categories,
            taxonomies: attributes.taxonomies,
            postIn: attributes.postIn,
            postNotIn: attributes.postNotIn,
            postType: attributes.postType,
            perPage: attributes.perPage,
            offset: attributes.offset,
            order: attributes.order,
            orderBy: attributes.orderBy,
            metaQuery: attributes.metaQuery,
            search: attributes.search,
            status: attributes.status,
            blogId: attributes.blogId,
        };

        render(<PostsList args={args} />, block);
    });
});
