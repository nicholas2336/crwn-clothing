import React from "react";

import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { HeaderContainer, LogoContainer, OptionContainer, OptionLink } from "./header.styles";

const Header = ({currentUser, hidden}) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo"/>
    </LogoContainer>
    <OptionContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink to="/shop">
        CONTACT
        </OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionContainer> 
      {
        hidden ? null : <CartDropdown />
      }
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
}); 

export default connect(mapStateToProps)(Header);