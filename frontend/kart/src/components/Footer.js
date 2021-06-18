import '../css/Footer.css'
import facebook from '../images/facebook.svg'
import twitter from '../images/twitter.svg'
import instagram from '../images/instagram.svg'
import youtube from '../images/youtube.svg'
import { NavLink } from "react-router-dom"
import React from "react";
function Footer(){
    return(
        <div className="footerContainer">
            <footer className="footer">
                <div className="content has-text-centered">
                <div> 
                <div className="links">
                    <NavLink target="_blank" to='/privacy'>Privacy Policy</NavLink > <br />
                    <NavLink target="_blank" to='/terms'>Terms of Service</NavLink > <br />
                    <NavLink target="_blank" to='/about'>About us</NavLink> <br />
                </div>

                <div className="contactUs"> 
                    <address  >
                     <br />
                     <pre className="address">
                                Street Name: <br />
                                Rohtak-124001, Haryana, India <br /> 
                                For Registration Related Queries: XXXXXXXXXX <br />
                                For Delivery Related Queries: XXXXXXXXXX <br />
                        </pre>
                    </address>
                </div>

                </div>
                <div className="socials">
                    <NavLink target="_blank" className="socialImg" to="/twitter" >
                        <img src={twitter} alt="twitter" height="20px" width="20px" />
                    </NavLink>
                    <NavLink target="_blank" className="socialImg" to="/facebook" >
                        <img src={facebook} alt="facebook" height="20px" width="20px"/>
                    </NavLink>
                    <NavLink target="_blank" className="socialImg" to="/youtube" >
                        <img src={youtube} alt="youtube" height="20px" width="20px"/>
                    </NavLink>
                    <NavLink target="_blank" className="socialImg" to="/instagram" >
                        <img src={instagram} alt="instagram" height="20px" width="20px"/>
                    </NavLink>
                </div>
                </div>
            </footer>
        </div>
        
    )
}

export default Footer