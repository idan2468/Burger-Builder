import React, {Fragment, useState} from 'react';
import styles from './LoadingSpinner.scss';

const loadingSpinner = (props) => {
    const [content, setContent] = useState(null);
    setTimeout(() => {
        setContent(
            <div className={styles.container}>
                <div className={styles.loader}>
                    {/*<span>Loading...</span>*/}
                </div>
            </div>
        )
    }, 500);
    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default loadingSpinner;
