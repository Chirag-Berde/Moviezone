import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import logo from "../../assets/movieZone-logo.png"
import ContentWrapper from "../contentWrapper/ContentWrapper";
import './footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <div className="myName"><img src={logo} alt="" /></div>
                <div className="infoText">
                With Movie CluB Channels, find shows and movies from your favorite channels all in one place. Enjoy with an add-on subscription to Channels of your choice.Early Access to new movies & TV shows, before digital subscription.
                </div>
                <div className="socialIcons">
                    <a href="https://www.facebook.com/chirag.berde" target="_blank" className="icon">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/chiragggg__/" target="_blank" className="icon">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com/BerdeChirag" target="_blank" className="icon">
                        <FaTwitter />
                    </a>
                    <a href="https://www.linkedin.com/in/chirag-berde-060450253/" target="_blank" className="icon">
                        <FaLinkedin />
                    </a>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
