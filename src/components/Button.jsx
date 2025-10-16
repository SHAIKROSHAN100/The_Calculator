import '../css/button.css';


export default function Button({onNumber, onOperator, onClear, onEqual, onAllClear}){


    return(
        
        <>
        
            <div className="button-container">

                <div className="digit-container">

                    <div className="clearButton">

                        <button className="operator" onClick={ (e) => { onAllClear()}}>AC</button>
                        <button className="operator right" onClick={onClear}>C</button>

                    </div>

                    <div >

                        <button onClick={() => onNumber("1")}>1</button>
                        <button onClick={() => onNumber("2")} >2</button>
                        <button onClick={() => onNumber("3")}>3</button>

                        <button className="operator" onClick={() => onOperator("+")}>+</button>

                    </div>

                    <div>

                        <button onClick={() => onNumber("4")}>4</button>
                        <button onClick={() => onNumber("5")}>5</button>
                        <button onClick={() => onNumber("6")}>6</button>

                        <button className="operator" onClick={() => onOperator("-")}>-</button>
                        
                    </div>

                    <div>

                        <button onClick ={ () => onNumber("7")} >7</button>
                        <button onClick ={ () => onNumber("8")}>8</button>
                        <button onClick ={ () => onNumber("9")}>9</button>

                        <button className="operator" onClick={() => onOperator("x")}>x</button>

                    </div>
                    <div>
                        <button onClick = {() => onNumber("0")}>0</button>
                        <button onClick = {() => onNumber(".")}>.</button>
                        
                        <button className="equalto" onClick={onEqual}>=</button>
                        
                        <button className="operator" onClick={() => onOperator("/")}>/</button>
                    </div>

                </div>

               

            </div>
            

        </>
    );

}