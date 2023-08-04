
import React,{ useState, useContext, useEffect } from 'react';
import './Modales.css';

export const  ModalLara = ({children}) =>{
    


    function Closemodal () {
        document.getElementById('modal_vistapdf').removeAttribute('style'); 
        }



 return<>
    <div className="modal fade show" id="modal_vistapdf" data-backdrop="static">
       <div className="modal-dialog modal-xl">
           <div className="modal-content">
               <div className="modal-body">
                   <div className="card">
   
                       <div className="card-body ">
                           <div className="row">
                               <div className="col-12">
                               {children}
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <div className="modal-footer">
                   <button type="button" className="btn btn-outline-danger" data-dismiss="modal" onClick={Closemodal()}>Cerrar</button>
               </div>
           </div>
       </div>
   </div>
 </>
}