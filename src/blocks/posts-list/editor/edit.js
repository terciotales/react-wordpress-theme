import Inspector from "./inspector";
import './editor.scss';
import metadata from '../block.json';

import {useEffect} from '@wordpress/element';

import {
    useBlockProps
} from '@wordpress/block-editor';

import PostsList from "../components/posts-list";

const Block = (props) => {
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
                <PostsList perPage={attributes.perPage}/>
            </div>
        </>
    );
}
export default Block;
