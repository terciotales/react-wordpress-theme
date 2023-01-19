/**
 * Block dependencies
 */
import metadata from '../../block.json';
import classnames from 'classnames';

const Index = (props) => {

    const {post, elements, setPost} = props;

    const {title, excerpt, featuredImage, author, date, categories, tags, comments} = post;

    return (
        <a className="post-card" onClick={() => {
            setPost(props.post);
        }}>
            <h5>{title.rendered}</h5>
        </a>
    );
};
export default Index;
