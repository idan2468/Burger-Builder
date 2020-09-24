import React, {Fragment} from 'react';
import styles from './NavigationItems.scss'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    let containerStyle = styles.container;
    if (props.side){
        containerStyle = styles.sideContainer
    }
    return (
        <Fragment>
            <div className={containerStyle}>
                <NavigationItem link={'/'}>Main</NavigationItem>
                <NavigationItem link={'/orders'}>Orders</NavigationItem>
            </div>
        </Fragment>
    )
}

export default navigationItems;