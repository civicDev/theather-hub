import React from "react";
import {connect} from "react-redux";
import Logo from "./Logo";
import {headerMenuToggle} from "../../actions/header";
import {Link} from "react-router";

function selected(link, actualLink){
  return link === actualLink ? "selected" : "";
}

const Header = ({dispatch, menuVisisble, currentLink}) => {
    return (
    <header>
        <Logo/>
        <div className="toggleMenu" onClick={()=> dispatch(headerMenuToggle)}/>
        <nav className={menuVisisble ? "visible-block" : ""}>
            <ul>
                <li className={selected(currentLink, "/")}>
                  <Link to="/">Prima pagină</Link>
                </li>
                <li className={selected(currentLink, "/shows")}>
                  <Link to="/shows">Spectacole</Link>
                </li>
                <li className={selected(currentLink, "/bands")}>
                  <Link to="/bands">Trupe</Link>
                </li>
                <li className={selected(currentLink, "/book-a-show")}>
                  <Link to="/book-a-show">Book a show</Link>
                </li>
                <li className={selected(currentLink, "/help-the-bands")}>
                  <Link to="/help-the-bands">Susținere trupe</Link>
                </li>
                <li className={selected(currentLink, "/my-band")}>
                  <Link to="/my-band">MyBAND</Link>
                </li>
            </ul>
        </nav>
        <div className="header-separator">&nbsp;</div>
    </header>
  );
};


function currentLink(state){
  return state.routing.locationBeforeTransitions.pathname;
}

function mapStateToProps(state){
  return {
    ...state.header,
    currentLink : currentLink(state),
  };
}

export default connect(mapStateToProps)(Header);
