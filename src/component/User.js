import React from 'react'
import { Link } from "react-router-dom";

const User = (props) => {

    const { filterUser, setSearch, deleteUser} = props;

    return (
        <>
            <div className="container">
                <div className="row">
                <input className="form-control me-2 m-3" type="search" placeholder="Search 🔍" aria-label="Search" onChange={event => setSearch(event.target.value)}/>
                    {filterUser.map((user, index)=>{
                        return (
                            <div className="col-lg-4 col-md-6 col-12" key={index} >
                                <div className="card m-4 p-3"  >
                                    <div className="position-absolute top-0 start-3 text-black-50">{user.id}</div>
                                    <div className="text-center bg-info rounded-pill text-white m-2">✉️{user.email}</div>
                                    <img src='https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png' className="card-img-top " alt="..." style={{backgroundSize: "cover", height: '300px'}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text">👤{user.username}</p>
                                        <p className="card-text">📞{user.phone}</p>
                                        <p className="card-text">🌐{user.website}</p>
                                        <Link to={`/user/${user.id}`} className="btn btn-info m-1"> Explore Album </Link>
                                        <button className="btn btn-danger m-1" onClick = {() => deleteUser(user.id)}> Delete </button>
                                    </div>
                                </div> 
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default User
