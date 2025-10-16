import '../css/Display.css';


export default function Display({value, result, onKeyboard}){


    return(
        
        <div className="display-container">

                <div className="display-input">

                    <input type ="text" value={value} onKeyDown={(e) => onKeyboard(e)} />

                </div>

                <div className="display-output"> 
                    <p className={(result==''|| result==0) ? " " : 'para' }>{result}</p>
                </div>

        </div>
    );
}