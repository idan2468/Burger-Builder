import React, {Fragment} from 'react';
import styles from './LoadingSpinner.scss';

const loadingSpinner = (props) => {
    return (
        <Fragment>
            <div style={{width: '20rem'}}>
                <div className={styles.loader}>
                    {/*<span>Loading...</span>*/}
                </div>
            </div>
        </Fragment>
    )
}

export default loadingSpinner;
