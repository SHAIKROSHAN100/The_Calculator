import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone} from '@fortawesome/free-solid-svg-icons';
import Display from './components/Display';
import Button from './components/Button';
import Sidebar from './components/Sidebar';
import './App.css';



function App(){

  let [value, setValue] = useState('');
  let [firstNumber, setFirstNumber] = useState('');
  let [secondNumber, setSecondNumber] = useState('');
  let [secondNumberArr] = useState([]);
  let [result, setResult] = useState(0);
  let [oparr] = useState([]);
  let [isOperator, setIsOperator] = useState(false);
  let [temp, setTemp] = useState(0);
  let [symbol, setSymbol] = useState('');
  let [isFinish, setIsFinish] = useState(false);
  let [res, setRes] = useState(0);
  let [dataStorage, setDataStorage] = useState({input:'', result:''});
  



// .........................................  Speech Recognition .....................................
  const commands = [
            {
              command: /[\+\-\*\/]/,
              callback: () => {
                
                handleClickOperator(opr);
                resetTranscript();
              
              }
            }
            ,
            {
              command: /(plus)/gi,
              callback : () => {
                    handleClickOperator("+");
                    console.log("hello plus");
                    resetTranscript();
              }
            },
            {
              command: /(minus)/gi,
              callback : () => {
                    handleClickOperator("-");
                    resetTranscript();
              }
            },
            {
              command: /(into)/gi,
              callback : () => {
                    handleClickOperator("x");
                   resetTranscript();
              }
            },
              {
              command: /(divide)/gi,
              callback : () => {

                  
                      
                      handleClickOperator("/");
                      resetTranscript();
              }
            },
            {
              command: /[\d]/,
              callback: () => {

                
                handleClick(val);
                
                resetTranscript();
              }
            },
            {
              command : /(point)/gi,
              callback: () => {
                handleClick(".");
                resetTranscript();
              }
            },
            {
              command : /(remove)/gi,
              callback : () =>{
                handleClear();
                resetTranscript();
              }
            },
            {
              command : /(remove all)/gi,
              callback : ()=> {
                handleAllClear();
                resetTranscript();
              }
            },
            {
              command: /(result)/gi,
              callback : () => {
                handleEqualto();
                resetTranscript();
              }
            },
            {
              command : /[a - z]/gi,
              callback : () => {
                resetTranscript();
              }
            }

  ];




  let {transcript, listening, resetTranscript, browserSupportsSpeechRecognition}= useSpeechRecognition({commands});

  let val = transcript.replace(/\D/g, '');
  let opr = transcript.replace(/[^\+\-\*\/]/g,'');



  
  //.................................................. HANDLE CLICK EVENT HANDLER ........................................


  function handleClick(number){
    
     
        if(symbol != ''){

              if(!(symbol == '/' && number == '0' && isOperator)){
                  secondNumber = secondNumber + number;
                  value = value + number;

                  setSecondNumber(secondNumber);
                  
                  setValue(value);

                      let first = Number(firstNumber);
                      let second = Number(secondNumber);

                    

                      if(symbol == '+'){

                        result = first + second;

                      }
                      else if(symbol == '-'){
                        result = first - second;
                      }
                      else if(symbol == 'x'){
                          result = first * second;
                      }
                      else if(symbol == '/'){
                          
                          result = first / second;
                          
                      }

                      setResult(result);

                      if(isFinish){

                              temp = temp + 1;
                              setTemp(temp);

                              secondNumberArr[temp] = secondNumber;

                              setIsFinish(false);

                      }
                      else {

                              secondNumberArr[temp] = secondNumber;
                      }
                    
                    
                      setIsOperator(false);
                }

        }
        else{

            firstNumber = firstNumber + number;
            value = value + number;
        
            setFirstNumber(firstNumber);
            setValue(value);
        }
        
        
            
  }


  // .............................................  HANDLE OPERATOR ................................................


  function handleClickOperator(operator){

  

      if(firstNumber == ''){
          return;
      } 

      if (isOperator) {

        setValue(value);

      }
      else if (secondNumber != '') {
        
          let first = Number(firstNumber);
          
          let second = Number(secondNumber);

          

          if(symbol == '+'){

            result = first + second;

          }
          else if(symbol == '-'){
            result = first - second;
          }
          else if(symbol == 'x'){
              result = first * second;
          }
          else if(symbol == '/'){
            
              result = first / second;
            
          }


        
        setFirstNumber(result);

        setIsFinish(true);

        oparr.push(operator);

        symbol = operator;
        setSymbol(symbol);

        

        setSecondNumber('');


        value = value + symbol;

        setValue(value);
        setIsOperator(true);

        
      }
      else{

        setIsOperator(true);

        oparr.push(operator);

        symbol = operator;

        setSymbol(symbol);
    
        value = value + operator;

        setValue(value);

      }
  }



//  ............................................... CLEAR HANDLE EVENT .....................................
  function handleClear(){

    
    if(isOperator){

            setIsOperator(false);
            oparr.pop();
            
            if(oparr.length == 0){

                    symbol = '';
                    setSymbol(symbol);
                    setResult(' ');

            }
            else{

                    symbol = oparr[oparr.length-1];
                    setSymbol(symbol);

                    if(secondNumberArr.length != 0){

                            secondNumber = secondNumberArr[temp];
                            setSecondNumber(secondNumber);
                            setIsFinish(false);

                            if(oparr[oparr.length-1] == "+"){
                                firstNumber = result - Number(secondNumber);
                            }
                            else if(oparr[oparr.length-1] == "-"){
                                firstNumber = result + Number(secondNumber);
                            }
                            else if(oparr[oparr.length - 1] == 'x'){
                                firstNumber = result / Number(secondNumber);
                            
                            }
                            else if(oparr[oparr.length -1] == '/'){
                                firstNumber = result * Number(secondNumber);
                                
                            }
                            
                            setFirstNumber(firstNumber);
                          

                      }

            }
    }
    else if(secondNumberArr.length != 0) {

                  let num = secondNumberArr[temp];
                  let prevValue = 0;
                  res = result;
                  setRes(res);
                  


                 if(oparr.length != 0){

                              if(oparr[oparr.length-1] == "+"){

                                          prevValue = res - Number(num);
                                          secondNumberArr[temp] = num.slice(0, num.length-1);
                                          result = prevValue + Number(secondNumberArr[temp]);
                                          secondNumber = secondNumberArr[temp];
                                          setSecondNumber(secondNumber);


                                          setResult(result);
                                        
                                
                              }
                              else if(oparr[oparr.length-1] == '-'){

                                        prevValue = res + Number(num);
                                        secondNumberArr[temp] = num.slice(0,num.length-1);
                                        result = prevValue - Number(secondNumberArr[temp]);
                                        secondNumber = secondNumberArr[temp];
                                        setSecondNumber(secondNumber);

                                        setResult(result);

                              }
                              else if(oparr[oparr.length - 1] == '/'){

                                        prevValue = res * Number(num);
                                        secondNumberArr[temp] = num.slice(0, num.length-1);

                                        if(secondNumberArr[temp] == ''){

                                          result = prevValue / 1;

                                        }else{
                                          

                                          result = prevValue / Number(secondNumberArr[temp]);
                                          

                                        }

                                        secondNumber = secondNumberArr[temp];
                                        setSecondNumber(secondNumber);

                                        setResult(result);

                              }
                              else if(oparr[oparr.length - 1] == 'x'){

                                        prevValue = res / Number(num);
                                        secondNumberArr[temp] = num.slice(0, num.length-1);
                                        if(secondNumberArr[temp] == ''){
                                          result = prevValue * 1;
                                        }else{
                                        result = prevValue * Number(secondNumberArr[temp]);
                                        }
                                        secondNumber = secondNumberArr[temp];
                                        setSecondNumber(secondNumber);

                                        setResult(result);

                              }

                          

                              
                              if(secondNumberArr[temp] == ''){
              
                                        secondNumberArr.pop();

                                        if(oparr.length != secondNumberArr.length){

                                              setIsOperator(true);
                                              symbol = oparr[oparr.length-1];
                                              setSymbol(symbol);

                                              if(secondNumberArr.length != 0){

                                                      temp = temp - 1;
                                                      setTemp(temp);
                                                      setIsFinish(true);

                                              }else{

                                                      temp = 0;
                                                      secondNumber = '';
                                                      

                                                      
                                                      setTemp(temp);
                                                      setSecondNumber(secondNumber);
                                                      setIsFinish(false);
                                                      setFirstNumber(prevValue);

                                                    
                                              }

                                         
                                        }else {

                                                  secondNumber = secondNumberArr[temp];
                                                  setIsFinish(false);
                                                  setSecondNumber(secondNumber);
                                        }

 
                                          if(secondNumberArr[temp] != ''){

                                            setFirstNumber(prevValue);

                                          }else{

                                            setFirstNumber(result);

                                          }
            

                              }

                  }

            
    }
                      
      value = value.slice(0, value.length-1);
      setValue(value);
      
      if(value == ''){
        firstNumber = '';
        setFirstNumber(firstNumber);
      }

      if(oparr.length == 0){
        setFirstNumber(value);
      }

  }


  // ................................... handleAllClear() .......................................

  function handleAllClear(){

      firstNumber = '';
      secondNumber = '';
      result = 0;
      isOperator = false;
      isFinish = false;
      value = '';
      temp = 0;
      symbol = '';




      secondNumberArr.length = 0;
      oparr.length = 0;
      setTemp(temp);
      setSymbol(symbol);
      setValue(value);
      setIsOperator(isOperator);
      setIsFinish(isFinish);
      setFirstNumber(firstNumber);
      setSecondNumber(secondNumber);
      setResult(result);
      
    
      
  }





  // ............................... handleEqualTo......................................

  function handleEqualto(){

      if(value == ''){
        return;
      }

      if(value != '' && (result === 0 || result == " ")){

        result = Number(firstNumber);
        setResult(result);

      }
      
      let res = result.toString();

      dataStorage = {input: value, result: res};

      setDataStorage({
        dataStorage
      });

  
  
      async function sendData(){
        let datasend = await axios.post("http://localhost/calc/calcapi.php", dataStorage)
      }
      
      sendData();
     

  }



    

  // ............................................ HANDLE DISPLAY FUNCTION ......................................
  
  function handleDisplay(){

    let sidebar = document.querySelector('.sidebar');
    
    if(sidebar.classList.contains('close')){

      sidebar.classList.remove('close');

    }

    sidebar.classList.add('open');
  
  }


  // ..................................................... HANDLE CLOSE FUNCTION .....................................

  function handleClose(){

    let sidebar = document.querySelector('.sidebar');

    sidebar.classList.remove('open');

    sidebar.classList.add('close');
    
  }



  // ...................................... HANDLE HISTORY FUNCTION .......................................

  function handleHistory(num){

    handleClick(num);

  }


  // ........................................... HANDLE SPEECH FUNCTION ..................................................


  function handleSpeech(e){

    let micro = document.querySelector('.micro');
  

    if(listening == false){

      SpeechRecognition.startListening({continuous:true});
      micro.style.color = "green";

    }
    else{

      SpeechRecognition.stopListening();
      micro.style.color = "black";

    }

  }


  // ...................................... HANDLE KEY FUNCTION ................................................

function handleKey(event){
      let numberRegex = /[0-9]/;
      let operatorRegex = ["+", "-", "x", "/"];

          if(numberRegex.test(event.key)){
              handleClick(event.key);
           }

         if(operatorRegex.includes(event.key)){

            handleClickOperator(event.key);
         }

         if(event.key == 'Backspace'){
            handleClear();
         }

         if(event.key == '='){
          handleEqualto();
         }

         if(event.key == '.'){
          handleClick(event.key);
         }
}






// ................................................ RETURN ..........................................................

  return(

    <>
        <div className ="icon-container">
            {
              browserSupportsSpeechRecognition ? <div title="calculate with your voice" className="micro" onClick={handleSpeech}><FontAwesomeIcon icon={faMicrophone} /></div> : <></>
            }
            <div title="history" className = "history" onClick={handleDisplay}>H</div>
        </div>
    
        <div className="calc-container">
            

            <Display value={value}  result={result ? result : ''} onKeyboard ={handleKey}/>
            
            <Button onNumber={handleClick} onOperator={handleClickOperator} onClear={handleClear} onEqual={handleEqualto} onAllClear = {handleAllClear}/>

        </div>

        <Sidebar onClick={handleClose} onSelect={handleHistory} onEqual={handleEqualto}/>
    
        
    </>
  );
}



export default App;