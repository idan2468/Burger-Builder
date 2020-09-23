import React, {Fragment} from 'react';
import styles from './NavigationItems.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    return (
        <Fragment>
            <div className={styles.container}>
                <NavigationItem link={'/'}>Main</NavigationItem>
                <NavigationItem link={'/checkout'}>Checkout</NavigationItem>
                {/*<NavigationItem link={'/'}>Orders</NavigationItem>*/}
                {/*<NavigationItem link={'/'}>Login</NavigationItem>*/}
            </div>
        </Fragment>
    )
}

export default navigationItems;