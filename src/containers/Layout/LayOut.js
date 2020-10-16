import React, {Fragment, useState} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import styles from './Layout.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const LayOut = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(null);

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false)
    }
    const openSideDrawerHandler = () => {
        setShowSideDrawer(true)
    }

    return (
        <Fragment>
            <SideDrawer show={showSideDrawer} onClick={closeSideDrawerHandler}/>
            <Toolbar toggleClick={openSideDrawerHandler}/>
            <main className={styles.mainContent}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default LayOut;
