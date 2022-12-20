/**
 * WordPress dependencies
 */
import {useSelect} from "@wordpress/data";

/**
 * Block dependencies
 */
import metadata from '../block.json';
const blockClass = `.wp-block-${metadata.name.replace('/', '-')}`;

const PostCard = ( props ) => {
    return (
        <a href={props.post.link}>
            <h5>{props.post.title.raw}</h5>
        </a>
    );
};

export default PostCard;
