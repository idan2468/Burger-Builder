import React, {Component, Fragment} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import styles from './Layout.scss'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class LayOut extends Component {
    state = {
        showSideDrawer: null
    }

    closeSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: false}
        })
    }
    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: true}
        })
    }

    render() {
        return (
            <Fragment>
                <SideDrawer show={this.state.showSideDrawer} onClick={this.closeSideDrawerHandler}/>
                <Toolbar toggleClick={this.openSideDrawerHandler}/>
                <main className={styles.mainContent}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default LayOut;
