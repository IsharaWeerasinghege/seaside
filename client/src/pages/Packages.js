import React, {useEffect, useState} from 'react';
import axios from "axios";

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {

        async function fetchPackages() {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/package/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setPackages(res.data);
            }).catch(err => {
                console.log(err);
            })
        }

        fetchPackages();

    }, [])

    async function deletePackage(id) {
        if (window.confirm('Are you sure you want to delete this package?')) {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/package/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then(res => {
                    console.log(res);
                    window.location.reload();
                }
            ).catch(err => {
                    console.log(err);
                }
            )
        }
    }

    return (

            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center'}>
                {packages.map((pack, index) => (
                    <div
                        key={index}
                        className={'bg-white shadow-lg rounded-lg py-8 px-4'}
                    >
                        <h1 className={'font-semibold text-xl mb-4'} title={pack.description}>{pack.name}</h1>
                        <p className={'text-gray-800 font-semibold text-xl '}>$ {pack.price}</p>
                        <p className={'text-gray-500'}>Duration {pack.duration} day.</p>
                       <div
                            className={'mt-4 mb-2'}
                       >
                           {pack.features && pack.features.map((feature, index) => (
                               <p key={index} className={'text-gray-500'}>• {feature} •</p>
                           ))}
                       </div>
                        <button
                            className={'bg-red-700 text-white px-6 py-1.5 rounded-lg mt-4'}
                            onClick={() => deletePackage(pack._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
    )
}

export default Packages;