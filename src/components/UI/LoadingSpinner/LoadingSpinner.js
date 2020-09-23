import React, {Fragment, useEffect, useState} from 'react';
import styles from './LoadingSpinner.scss';

const loadingSpinner = (props) => {
    const [content, setContent] = useState(null);
    useEffect(() => {
        let timeout = setTimeout(() => {
            setContent(
                <div className={styles.container}>
                    <div className={styles.loader}>
                        {/*<span>Loading...</span>*/}
                    </div>
                </div>
            )
        }, 500)
        return () => clearTimeout(timeout);
    }, [content]);

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default loadingSpinner;
