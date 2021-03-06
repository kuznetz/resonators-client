import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions as followersActions} from '../actions/followersActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import SideMenu from './SideMenu';
import Hamburger from 'material-ui/svg-icons/navigation/menu';
import ModalDisplayer from './ModalDisplayer';
import navigationSelector from '../selectors/navigationSelector';
import {actions as menuActions} from '../actions/menuActions';
import {withRouter} from 'react-router';
import HeaderLogo from './HeaderLogo';
import renderBreadcrumbs from './routes/breadcrumbs';
import isMobile from './isMobile';
import classNames from 'classnames';
import './app.scss';

class Layout extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='mainContainer'>
                    <AppBar
                      style={{position: 'fixed'}}
                      showMenuIconButton={this.props.navigationInfo.showHamburger}
                      iconElementLeft={
                          <IconButton onTouchTap={this.props.toggleMenu}>
                              <Hamburger />
                          </IconButton>
                      }
                      iconElementRight={<HeaderLogo/>}
                      iconStyleRight={{ margin: 'auto', display: isMobile() ? 'none' : 'block' }}
                      title={this.props.breadcrumbs}
                  />
                    <SideMenu />
                    <div className={classNames('screenWrapper', {
                        menuClosed: !this.props.navigationInfo.menuOpen
                    })}>
                        {this.props.children}
                        <ModalDisplayer modal={this.props.navigationInfo.modal} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(connect(state => ({
    navigationInfo: navigationSelector(state),
    breadcrumbs: renderBreadcrumbs(state)
}), dispatch => bindActionCreators({
    toggleMenu: menuActions.toggleMenu,
    fetchFollowerResonators: followersActions.fetchFollowerResonators
}, dispatch))(Layout));
