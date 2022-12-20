import Inspector from "./inspector";
import './editor.scss';
import metadata from '../block.json';

import {useEffect} from '@wordpress/element';

import {
    useBlockProps
} from '@wordpress/block-editor';

import PostsList from "../components/posts-list";

const Edit = (props) => {
    const {attributes, setAttributes} = props

    const inlineStyle = {};

    useEffect(() => {
        setAttributes({inlineStyle: inlineStyle});
    }, []);

    const blockProps = useBlockProps();

    const args = {
        categories: attributes.categories,
        taxonomies: attributes.taxonomies,
        postIn: attributes.postIn,
        postNotIn: attributes.postNotIn,
        postTypes: attributes.postTypes,
        perPage: attributes.perPage,
        offset: attributes.offset,
        order: attributes.order,
        orderBy: attributes.orderBy,
        metaQuery: attributes.metaQuery,
        search: attributes.search,
        status: attributes.status,
        blogId: attributes.blogId,
    };

    return (
        <>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />

            <div {...blockProps}>
                <PostsList args={args}/>
            </div>
        </>
    );
}
export default Edit;
