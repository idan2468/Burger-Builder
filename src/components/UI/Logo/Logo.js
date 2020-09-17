import React, {Fragment} from 'react';
import styles from './Logo.scss'

const logo = (props) => {
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.logoStyle}/>
            </div>
        </Fragment>
    )
}

export default logo;