/**
 * Block dependencies
 */
import metadata from '../../block.json';
import classnames from 'classnames';

const Index = (props) => {

    const {post, elements} = props;

    const {title, excerpt, featuredImage, author, date, categories, tags, comments} = post;

    return (
        <a className={classnames(`component-post-card-${metadata.name.replace('/', '-')}`)} href={props.post.link}>
            <h5>{title.rendered}</h5>
        </a>
    );
};

export default Index;
