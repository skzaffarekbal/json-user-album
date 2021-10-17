import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

const Album = () => {
    const { id } = useParams();

    const [userAlbum, setUserAlbum] = useState([]);
    const [search, setSearch] = useState("");
    const [filterAlbum, setFilterAlbum] = useState([]);

    const getUserAlbum = async () => {
      try {
          const url = `https://jsonplaceholder.typicode.com/users/${id}/albums`
          const res = await fetch(url);
          const data = await res.json();
          //console.log(data);
          setUserAlbum(data);
      } catch (error) {
          console.log(`Error : ${error}`);
      }
    }

    useEffect(() => {
        getUserAlbum();
    }, [])

    useEffect(() => {
        setFilterAlbum(
            userAlbum.filter( album => {
                return album.title.includes(search.toLowerCase());
            })
        )
    }, [search, userAlbum])

    console.log(userAlbum);

    const deleteAlbum = (id) => {
        const updatedAlbum = userAlbum.filter( album => {
            return album.id !== id;
        })
        setUserAlbum(updatedAlbum);
    }

    return (
        <>
            <div className="container">
            <input className="form-control me-2 m-3" type="search" placeholder="Search (Title of Album) 🔍" aria-label="Search" onChange={event => setSearch(event.target.value)}/>
                <div className="row">
                    {filterAlbum.map((album, index)=>{
                        return (
                            <div className="col-lg-4 col-md-6 col-12" key={index} >
                                <div className="card m-4 p-3"  >
                                    <div className="position-absolute top-0 start-3 text-black-50">{index+1}</div>
                                    <div className="text-center bg-dark rounded-pill text-white m-2">Album Id : {album.id}</div>
                                    <img src='http://cdn.onlinewebfonts.com/svg/img_297460.png' className="card-img-top " alt="..." style={{backgroundSize: "cover", height: '300px'}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{album.title}</h5>
                                        <Link to={`/user/album/${album.id}`} className="btn btn-info"> See Photos </Link>
                                        <button className="btn btn-danger m-1" onClick = {() => deleteAlbum(album.id)}> Delete </button>
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

export default Album
