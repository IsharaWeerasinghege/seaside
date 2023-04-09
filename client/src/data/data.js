export const brancehs = [
    {location: 'Galle', address: 'Seaside, No. 1, Galle Road, Galle', phone: '091 222 3333'},
    {location: 'Chilaw', address: 'Seaside, No. 1, Chilaw Road, Chilaw', phone: '091 222 3333'},
    {location: 'Trincomalee', address: 'Seaside, No. 1, Trincomalee Road, Trincomalee', phone: '091 222 3333'},
];

export const social = [
    {name: 'facebook', url: 'https://www.facebook.com', icon: '<FaFacebookSquare />'},
    {name: 'twitter', url: 'https://www.twitter.com', icon: '<FaTwitterSquare />'},
    {name: 'instagram', url: 'https://www.instagram.com', icon: '<FaInstagramSquare />'},
    {name: 'linkedin', url: 'https://www.linkedin.com', icon: '<FaLinkedin />'},
    {name: 'youtube', url: 'https://www.youtube.com', icon: '<FaYoutubeSquare />'},
    {name: 'pinterest', url: 'https://www.pinterest.com', icon: '<FaPinterestSquare />'},
];

export const footerLinks = [
    {name: 'Home', url: '/'},
    {name: 'About', url: '/about'},
    {name: 'Yacht', url: '/yacht'},
    {name: 'Services', url: '/services'},
];

export const contactInfo = [
    {name: 'Phone', value: '+94 11 222 3333', icon: 'phone'},
    {name: 'Phone', value: '+94 11 222 4444', icon: 'phone'},
    {name: 'Email', value: 'Seaside@gamil.com', icon: 'email'},
    {name: 'Address', value: 'No. 1, Galle Road, Galle', icon: 'address'},

]


export const sidebarLinks = [
    {
        name: 'Dashboard',
        url: '/',
        role: ['admin_rhm', 'admin_fleet', 'admin_party', 'admin_shm', 'admin_feed', 'admin_crew']
    },
    {name: 'Boat Reservation', url: '/reservation', role: ['admin_rhm', 'owner']},
    {name: 'Onboard Party', url: '/party', role: ['admin_party', 'owner']},
    {name: 'Party Packages', url: '/packages', role: ['admin_party', 'owner']},
    {name: 'Create Package', url: '/package/create', role: ['admin_party', 'owner']},
    {name: 'Fleet Management', url: '/fleet', role: ['admin_fleet', 'owner']},
    {name: 'Add Fleet', url: '/fleet/add', role: ['admin_fleet', 'owner']},
    {name: 'Crew Management', url: '/crew', role: ['admin_crew', 'owner']},
    {name: 'Add Member', url: '/crew/add', role: ['admin_crew', 'owner']},
    {name: 'Suppliers', url: '/suppliers', role: ['admin_shm', 'owner']},
    {name: 'Add Suppliers', url: '/suppliers/add', role: ['admin_shm', 'owner']},
    {name: 'User Feedback', url: '/feedback', role: ['admin_feed', 'owner']},
    {name: 'Inventory', url: '/inventory', role: ['admin_invent', 'owner']},
]