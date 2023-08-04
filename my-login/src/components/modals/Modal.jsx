import './Modales.css';

const Modalcontent = ({children}) =>{
return(
<article className='modal is-open'>
    <div className="modal-container">
    <button className='modal-close'>X</button>
    {children}
    </div>
</article>

);

};
export default Modalcontent;

