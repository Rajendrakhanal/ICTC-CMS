import React,{useContext} from 'react'
import { useEffect } from 'react';
import postContext from '../context/post/postContext';
import ReservationTable from './ReservationTable';
import Spinner from "./Spinner";

const Reservation = () => {
    const context = useContext(postContext);
    const{reservations,getReservations,loading}=context;
      useEffect(()=>{
          getReservations()
          // eslint-disable-next-line
      },[])
      const ReverseArray=[];
      const length=reservations.length;
      for (let index = length-1; index >=0; index--) {
        ReverseArray.push(reservations[index]);   
      }
  return (
    <>
    <div className='bg-white container rounded'>
      <div className='container'>
      <div className="mt-3 d-flex justify-content-between bg-white align-items-center">
      <span style={{backgroundColor:"#00028d",borderRadius:"5px",fontSize:"2rem", color:"white",paddingRight:"1rem", paddingLeft:"1rem", paddingTop:"0.5rem", paddingBottom:"0.5rem"}} className="mx-2 my-2">Recent Reservations </span>
          </div>
          </div>
          <hr></hr>
          <div className="container">
          {loading && <Spinner />}
          {!loading && ReverseArray.map((reservation)=>{
            return <ReservationTable key={reservation._id} reservation={reservation}/>
          })
        }
        <hr></hr>
          </div>
          </div>
          </>
  )
}

export default Reservation
