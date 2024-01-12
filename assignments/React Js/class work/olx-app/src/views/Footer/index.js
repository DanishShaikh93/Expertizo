import footerBanner from '../../images/banner2.png';
import socialIcons from '../../images/social-icons.png';
import appIcons from '../../images/app-icons.png';

function Footer() {
    
    return (
        <>
        <div className="container-fluid preFooter">
            <div className='container'>
            <img src={footerBanner}/>
            </div>
            </div>
    <div className="footer-sec">
        <div className='container'>
                    <div className='fcol'>
                        <h3> POPULAR CATEGORIES</h3>
                        <ul>
                            <li>Cars</li>
                            <li> Flats for rent</li>
                            <li> Mobile Phones</li>
                            <li>Jobs</li>
                        </ul>
                    </div>

                    <div className='fcol'>
                        <h3> TRENDING SEARCHES</h3>
                        <ul>
                            <li>Bikes</li>
                            <li> Watches</li>
                            <li> Books</li>
                            <li>Dogs</li>
                        </ul>
                    </div>


                    <div className='fcol'>
                        <h3>ABOUT US</h3>
                        <ul>
                            <li>About Dubizzle Group</li>
                            <li> OLX Blog</li>
                            <li> Contact Us</li>
                            <li>OLX for Businesses</li>
                        </ul>
                    </div>


                    <div className='fcol'>
                        <h3> OLX</h3>
                        <ul>
                            <li>Help</li>
                            <li> Sitemap</li>
                            <li> Terms of use</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>


                    <div className='fcol'>
                        <h3> FOLLOW US</h3>
                        <img src={socialIcons} alt='social-icons'/>
                        <img src={appIcons} alt='apps'/>
                    </div>
        </div>
    </div>
    <div className='copyRight'>
        <div className='container'>
            <p>OLX website clone created by: <strong>Danish Shaikh Qadri</strong></p>
        </div>
    </div>
    </>
    )
}

export default Footer;