import React from 'react';
import {brancehs, contactInfo, footerLinks, social} from "../data/data";
import {
    FaArrowRight,
    FaEnvelope,
    FaFacebookSquare,
    FaInstagramSquare,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaPinterestSquare,
    FaTwitterSquare,
    FaYoutubeSquare
} from "react-icons/fa";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={'w-full border-t py-2 bg-white'}>
            <div className="container mx-auto py-6 px-8 flex justify-between">
                <div className="w-1/5">
                    <h3 className={'text-xl font-bold mb-2'}>Branches</h3>
                    <ul>
                        {brancehs.map((item, index) => (
                            <li key={item.location + index} className={'text-neutral-700 text-sm mb-1'}>
                                <FaMapMarkerAlt className={'inline-block mr-2'}/>
                                {item.location}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/5">
                    <h3 className={'text-xl font-bold mb-2'}>Quick Links</h3>
                    <ul>
                        {footerLinks.map((item, index) => (
                            <li key={item.name + index} className={'text-neutral-700 mb-1'}>
                                <Link to={item.url} className={'text-neutral-700 text-sm'}>
                                    <FaArrowRight className={'inline-block mr-2'}/>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/5">
                    <h3 className={'text-xl font-bold mb-2'}>Contact Info</h3>
                    <ul>
                        {contactInfo.map((item, index) => (
                            <li key={item.name + index}
                                className={'text-neutral-700 flex gap-1 items-center text-sm mb-2'}>
                                {item.icon === 'phone' ? <FaPhoneAlt/> : item.icon === 'email' ?
                                    <FaEnvelope className={'inline-block mr-2'}/> : item.icon === 'address' ?
                                        <FaMapMarkerAlt className={'inline-block mr-2'}/> : null}
                                {item.value}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/5">
                    <h3 className={'text-xl font-bold mb-2'}>Follow Us</h3>
                    <ul>
                        {social.map((item, index) => (
                            <li key={item.name + index} className={'text-neutral-700 mb-1'}>
                                <Link to={item.url}
                                      className={'text-neutral-700 text-sm capitalize flex items-center gap-1'}>
                                    {
                                        item.name === 'facebook' ? <FaFacebookSquare/>
                                            : item.name === 'twitter' ? <FaTwitterSquare/> : item.name === 'instagram' ?
                                                <FaInstagramSquare/> : item.name === 'youtube' ?
                                                    <FaYoutubeSquare/> : item.name === 'linkedin' ? <FaLinkedin/> :
                                                        <FaPinterestSquare/>
                                    }
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;