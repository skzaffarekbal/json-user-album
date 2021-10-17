import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Photo = () => {

    const { id } = useParams();

    const [userPhoto, setUserPhoto] = useState([]);
    const [search, setSearch] = useState("");
    const [filterPhoto, setFilterPhoto] = useState([])

    const getUserPhoto = async () => {
      try {
          const url = `https://jsonplaceholder.typicode.com/albums/${id}/photos`
          const res = await fetch(url);
          const data = await res.json();
          //console.log(data);
          setUserPhoto(data);
      } catch (error) {
          console.log(`Error : ${error}`);
      }
    }

    useEffect(() => {
        getUserPhoto();
    }, [])

    useEffect(() => {
        setFilterPhoto(
            userPhoto.filter( photo => {
                return photo.title.includes(search.toLowerCase())
            })
        )
    }, [search, userPhoto])

    const deletePhoto = (id) => {
        const updatedPhoto = userPhoto.filter( photo => {
            return photo.id !== id;
        })
        setUserPhoto(updatedPhoto);
    }


    // console.log(filteredPhoto);
    // console.log(userPhoto);
    // console.log(search);

    return (
        <>
            <div className="container">
            <input className="form-control me-2 m-3" type="search" placeholder="Search (Title of Photo) 🔍" aria-label="Search" onChange={ event => setSearch(event.target.value)} />
                <div className="row">
                    {filterPhoto.map((photo, index)=>{
                        return (
                            <div className="col-lg-4 col-md-6 col-12" key={index} >
                                <div className="card m-4 p-3"  >
                                    <div className="position-absolute top-0 start-3 text-black-50">{index+1}</div>
                                    <div className="text-center bg-info rounded-pill text-white m-2">PhotoId : {photo.id}</div>
                                    <img src= {photo.url} className="card-img-top " alt="..." style={{backgroundSize: "cover", height: '300px'}}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{photo.title}</h5>
                                        <button className="btn btn-danger m-1" onClick = {() => deletePhoto(photo.id)}> Delete </button>
                                    </div>
                                </div> 
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Photo
