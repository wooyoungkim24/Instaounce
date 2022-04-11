import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    return (
        <div className='page-not-found-body'>
            <div className='page-not-found-header'>
                Sorry, this page isn't available.
            </div>
            <div className='page-not-found-body-text'>
                The link you followed may be broken,
                or the page may have been removed.
                <Link to='/' className='page-not-found-link-text'> Go back to Instaounce.</Link>
            </div>
        </div>
    );
};

export default PageNotFound;