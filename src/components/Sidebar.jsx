import {useState, useEffect} from "react";
import '../css/sidebar.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTrash} from '@fortawesome/free-solid-svg-icons'



function Sidebar({onClick, onSelect, onEqual}){

    let [history, setHistory] = useState([]);
    

    useEffect(() => {

        getData();

    },[history]);


    let getData = async() => {

        let data = await axios.get("http://localhost/calc/calcapi.php");

        setHistory(data.data);
        

    }

    
    async function handleDelete(){
        let message = await axios.delete("http://localhost/calc/calcapi.php");
    }

    return(

        <div className = "sidebar" >


            <div className="header">
                    

                    <div className="closeMark" onClick={onClick}> <FontAwesomeIcon icon={faXmark} /> </div>
                    <div className="historyText">HISTORY</div>
                    <div className="trash" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></div>

            </div>

            <div className="container">
                
                   {
                     history.error ? <></> : history.map(value => (

                                                    <div key={value.id} className="historyContainer"  onClick={() => onSelect(value.result)}>
                                                            <p>{value.inputValue}</p>
                                                            <p style={{fontWeight: 'bold'}}>{value.result}</p>
                                                    </div>
                                                        
                                            ))
                   } 
                
                    
            </div>

        </div>
        
    );
}


export default Sidebar;