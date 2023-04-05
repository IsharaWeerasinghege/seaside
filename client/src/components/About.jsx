import React from 'react';

const About = () => {
    return (
        <div id={'about'} className={'py-12 px-8 shadow-lg mb-8 rounded flex items-center bg-white'}>
            <div className={'w-1/2 rounded overflow-hidden shadow-lg'}>
                <img
                    className={'w-full object-cover'}
                    src="https://images.unsplash.com/photo-1570526844376-1048aee3e423?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=938&q=80"
                    alt=""/>
            </div>
            <div className={'text-center w-1/2'}>
                <h1 className={'text-3xl font-bold mb-6'}>About Us</h1>
                <p className={'px-14 text-neutral-600 text-justify'}>
                    "Seaside Yacht" is a well-known yacht rental company that was established in 2001. They offer luxury
                    yachts for unforgettable experiences on the water. Seaside Yacht typically offers a wide variety of
                    yachts, ranging from small sailboats to luxury motor yachts. This allows customers to find the
                    perfect
                    yacht for their events, such as weddings, anniversaries, team buildings, and conferences. The
                    company
                    has three branches located in Trincomalee, Galle, and Chilaw, with the head office located in
                    Negombo.
                </p>
            </div>

        </div>
    )
}

export default About;