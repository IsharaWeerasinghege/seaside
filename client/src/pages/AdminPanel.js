import React, {useEffect} from 'react';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import {GiSailboat} from "react-icons/gi";
import {sidebarLinks} from "../data/data";
import Reservation from "./Reservation";
import Dashboard from "./Dashboard";
import Party from "./Party";
import Fleet from "./Fleet";
import Crew from "./Crew";
import Suppliers from "./Suppliers";
import Feedback from "./Feedback";
import Packages from "./Packages";
import CreatePack from "./CreatePack";
import Inventory from "./Inventory";
import UpdateInventory from "./UpdateInventory";

const AdminPanel = () => {
    const [links, setLinks] = React.useState([]);

    useEffect(() => {
        const role = localStorage.getItem('role')
        const filteredLinks = sidebarLinks.filter(link => link.role.includes(role));
        setLinks(filteredLinks)
    }, [])

    return (
        <div className={'w-full h-screen bg-teal-50'}>

            <aside id="cta-button-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-white">
                    <Link to={'/'}
                          className={"flex flex-row items-center justify-center gap-2 text-2xl font-semibold mb-2 text-slate-900 border-b text-center w-full"}>
                        <GiSailboat/>
                        <h1>Seaside Yachts</h1>
                    </Link>
                    <ul className="space-y-2">
                        {links.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={`/admin${link.url}`}
                                    style={({isActive}) => ({background: isActive ? '#eee' : 'white'})}
                                    className={'block px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100'}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}

                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-4 ">
                    <Routes>
                        <Route path={'/'} element={<Dashboard/>}/>
                        <Route path={'reservation'} element={<Reservation/>}/>
                        <Route path={'party'} element={<Party/>}/>
                        <Route path={'fleet/*'} element={<Fleet/>}/>
                        <Route path={'feedback/*'} element={<Feedback/>}/>
                        <Route path={'crew/*'} element={<Crew/>}/>
                        <Route path={'suppliers/*'} element={<Suppliers/>}/>
                        <Route path={'packages'} element={<Packages />}/>
                        <Route path={'package/create'} element={<CreatePack />}/>
                        <Route path={'inventory'} element={<Inventory />}/>
                        <Route path={'inventory/:id'} element={<UpdateInventory />}/>
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default AdminPanel;