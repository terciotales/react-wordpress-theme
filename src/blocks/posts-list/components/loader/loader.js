/**
 * Block dependencies
 */
import './index.scss';

const Loader = ( props ) => {

    return (
        <div className="loader-wrapper">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
