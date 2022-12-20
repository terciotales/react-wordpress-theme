import Inspector from "./inspector";
import './editor.scss';
import metadata from './block.json';

import {useEffect} from '@wordpress/element';

import {
    useBlockProps
} from '@wordpress/block-editor';

const PostsList = (props) => {
    const {attributes, setAttributes} = props

    const inlineStyle = {};

    useEffect(() => {
        setAttributes({inlineStyle: inlineStyle});
    }, []);


    const blockProps = useBlockProps();

    return (
        <>
            <Inspector
                attributes={attributes}
                setAttributes={setAttributes}
            />

            <div {...blockProps}>
                <div className="posts-list"></div>
            </div>
        </>
    );
}
export default PostsList;
