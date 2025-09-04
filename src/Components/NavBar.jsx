import React from 'react';
import '../Styles/NavBar.css'; 

function NavBar() {
  return (
    <div className="Header_container__C_tPB">
      <a className="Header_logo_container__FoHca" aria-label="Paradigm home" href="/">
        {/* Simplified SVG Logo */}
        <svg width="191" height="24" viewBox="0 0 191 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h191v24H0z" fill="none" />
          <text x="0" y="20" fill="white" fontSize="16">LOGO</text>
        </svg>
      </a>

      <nav aria-label="Main" className="Header_nav__f2MAs" data-orientation="horizontal" dir="ltr">
        <ul className="Header_nav_list__nSicT" data-orientation="horizontal" dir="ltr">
          <li>
            <button className="Header_nav_item__NfT0M Header_resource__XKsnO Header_nav_trigger__dXeYH">
              Solutions
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="icon">
                <path d="M7 3L4 6L1 3" stroke="currentColor" strokeLinecap="square" />
              </svg>
            </button>
          </li>
          <li>
            <button className="Header_nav_item__NfT0M Header_resource__XKsnO Header_nav_trigger__dXeYH">
              Product
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="icon">
                <path d="M7 3L4 6L1 3" stroke="currentColor" strokeLinecap="square" />
              </svg>
            </button>
          </li>
          <li><a className="Header_nav_item__NfT0M" href="/templates">Templates</a></li>
          <li><a className="Header_nav_item__NfT0M" href="/careers">Careers</a></li>
          <li><a className="Header_nav_item__NfT0M" href="/blog">Blog</a></li>
          <li><a className="Header_nav_item__NfT0M" href="/pricing">Pricing</a></li>
        </ul>
      </nav>

      <div className="Header_actions__fWU2C">
        <a href="https://app.paradigmai.com/login" className="Header_cta__lMuDZ Header_login___vSOc">Log in</a>
        <a href="https://app.paradigmai.com/login" className="Header_cta__lMuDZ">
          <button className="Button_button__8B4nB body Header_sign_up__HFlh4 dark outline">
            <span>Sign up</span>
          </button>
        </a>
        <button className="Header_menu_mobile_button__hr4Dk">
          <div className="Header_bar__vO_JW top_bar"></div>
          <div className="Header_bar__vO_JW bottom_bar"></div>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
