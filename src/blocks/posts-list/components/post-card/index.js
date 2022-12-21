/**
 * Block dependencies
 */
import metadata from '../../block.json';
import classnames from 'classnames';

const Index = (props ) => {
    return (
        <a className={classnames(`component-post-card-${metadata.name.replace('/', '-')}`)} href={props.post.link}>
            <h5>{props.post.title.raw}</h5>
        </a>
    );
};

export default Index;
