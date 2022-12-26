/**
 * Internal dependencies
 */
import "./index.scss";

const SkeletonItem = () => {
    return (
        <div className="component-skeleton-item post">
            <div className="component-skeleton-item__image"/>
            <div className="component-skeleton-item__content">
                <div className="component-skeleton-item__title"/>
                <div className="component-skeleton-item__excerpt"/>
            </div>
        </div>
    )
}

const Skeleton = (props) => {

    const {
        number
    } = props;

    const items = [];

    for (let i = 0; i < number; i++) {
        items.push('item');
    }

    return (
        items.map((item, index) => {
            return (
                <SkeletonItem/>
            )
        })
    )
}

export default Skeleton;
