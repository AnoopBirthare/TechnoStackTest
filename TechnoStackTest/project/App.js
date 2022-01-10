/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Keyboard,
  Alert,
  FlatList,
  TouchableHighlight
} from 'react-native';


const App = () => {
  const [view1Visible, setview1Visible] = useState(true)
  const [numberOfButtonInput, setNumberOfButtonInput] = useState()
  const [buttonArray, setButtonsArray] = useState([])
  const [threeRandomButtons,setThreeRandomButtons]=useState([])
  const [localRandomNumber,setLocalRandomNumber]=useState("")
  const [firstTimeFlag,setfirstTimeFlag]=useState(true)
  const [allowRandomAgain,setAllowRandomAgain]=useState(true)

  
  const generateRandom=()=>{
    //filter out blue ones and red ones
   let whiteColorButtons=buttonArray.filter(e=>e.color=="white")
   console.log("white color button-->",whiteColorButtons)
    if(whiteColorButtons.length>=3 && threeRandomButtons.length<=2 && allowRandomAgain){
    
    //lets generate three random no.s now
      let  min = Math.ceil(1);
     let max = Math.floor(buttonArray.length);
    let random= Math.floor(Math.random() * (max - min + 1)) + min;
      if(random==localRandomNumber){
        generateRandom()
      }else
            setLocalRandomNumber(random) 
    }
    else if(whiteColorButtons.length>=1 && whiteColorButtons.length<=2){
      setMainRandomNumbers(whiteColorButtons)
    }
    else return
  }


  const setMainRandomNumbers=(whiteButtons=3)=>{
    if(localRandomNumber!="" && threeRandomButtons.length<=2 && buttonArray.length>=3 && whiteButtons==3){
    let otherColorButtons=[]
    otherColorButtons=buttonArray.filter(e=>e.color!="white")
    if( otherColorButtons.length==0 && threeRandomButtons.length==0){
        setThreeRandomButtons(e=>[...e,localRandomNumber])
      }
      else if(threeRandomButtons.find(e=>e==localRandomNumber)===undefined && otherColorButtons.find(e=>e.index==localRandomNumber)===undefined)
        { 
        setThreeRandomButtons(e=>[...e,localRandomNumber]) 
      }
      else if(threeRandomButtons.find(e=>e==localRandomNumber)===undefined && otherColorButtons.length==0){
        
        setThreeRandomButtons(e=>[...e,localRandomNumber])
      }
      else if(threeRandomButtons.length==0 && otherColorButtons.find(e=>e.index==localRandomNumber)===undefined ){
   
        setThreeRandomButtons(e=>[...e,localRandomNumber])
      }
      
    
    else generateRandom()
    }
    
    else if(buttonArray.length<=2 && buttonArray.length>=1 && threeRandomButtons.length==0){
        setThreeRandomButtons([1,2])
    }
    else if(whiteButtons.length>=1 && whiteButtons.length<=2){
      console.log("white received -->",whiteButtons)
      let a=[]
      for(let i=0;i<whiteButtons.length;i++){
        a.push(whiteButtons[i].index)
      }
      console.log("a-->",a)
      setThreeRandomButtons(a)
    }
    else return
  }
  


  const   setNumber = () => {
    let number = parseInt(numberOfButtonInput)
    if (isNaN(number) || number == "" || number < 1) {
      Alert.alert("Error", "Invalid Input", [{ text: "okay!", style: "cancel" }]);
      return
    }
    else {
      let temp = []
      for (let i = 1; i <= number; i++) {
        temp.push({ index:i,color: "white", clickAble: false })
      }
    setButtonsArray(temp)
      Keyboard.dismiss();
      setview1Visible(false)
    }   
  }
 




  useEffect(()=>{
    console.log("button array-->",buttonArray)
    if(firstTimeFlag && threeRandomButtons!=3 && buttonArray.length>=3 )
    generateRandom()
    else if(buttonArray.length<=2 && buttonArray.length>=1){
      setMainRandomNumbers()
    }
    else return
  },[buttonArray]);

  useEffect(()=>{
    setMainRandomNumbers()
  },[localRandomNumber]);

  useEffect(()=>{
    console.log("three random use effect-->",threeRandomButtons)
    let whiteColorButtons=buttonArray.filter(e=>e.color=="white")
    if(threeRandomButtons.length<=2 && allowRandomAgain && whiteColorButtons.length>=3){
    generateRandom()
    
    }
    else if(threeRandomButtons.length==3 && allowRandomAgain){
      setfirstTimeFlag(false)
      setAllowRandomAgain(false)
      let updatedList=buttonArray
      for(let i=1;i<=3;i++){
         updatedList=updatedList.map(item=>{
          if(item.index==threeRandomButtons[i-1]){
            return {...item,color:"blue",clickAble:true}
          }
          return item
        });
           
       }
       setButtonsArray(updatedList)
    }
    else if(threeRandomButtons.length==0 && !allowRandomAgain){
      setAllowRandomAgain(true)
    }
    else if(buttonArray.length<=2 && threeRandomButtons.length==2){
      setfirstTimeFlag(false)
      setAllowRandomAgain(false)
      let updatedList=buttonArray
      for(let i=1;i<=2;i++){
         updatedList=updatedList.map(item=>{
          if(item.index==threeRandomButtons[i-1]){
            return {...item,color:"blue",clickAble:true}
          }
          return item
        });
           
       }
       setButtonsArray(updatedList)
    }else if(buttonArray.length>=3 && whiteColorButtons.length<=2 && whiteColorButtons.length>=1){
      setfirstTimeFlag(false)
      setAllowRandomAgain(false)
      let updatedList=buttonArray
      for(let i=1;i<=whiteColorButtons.length;i++){
         updatedList=updatedList.map(item=>{
          if(item.index==threeRandomButtons[i-1]){
            return {...item,color:"blue",clickAble:true}
          }
          return item
        });
           
       }
       setButtonsArray(updatedList)
    }
  },[threeRandomButtons])
 
 useEffect(()=>{
  if(allowRandomAgain){
    generateRandom()
  }
 },[allowRandomAgain])
 
 
  function removeDot(e) {
    setNumberOfButtonInput(e.replace(/[^0-9]/g, ""));
  }
 
  let view1
  if (view1Visible) {

    view1 = (
      <View style={styles.view1}>
        <Text style={styles.entryText}> Please Enter Number! </Text>
        <TextInput keyboardType="numeric" style={styles.inputBox} value={numberOfButtonInput} onChangeText={removeDot} />
        <View style={styles.buttonContinueView}>
          <Button title="continue" onPress={setNumber}></Button>
        </View>
      </View>
    )

  }

  const buttonPresed=(ele)=>{
    console.log("clicked button",ele)
    
    let updatedList=buttonArray

         updatedList=updatedList.map(item=>{
          if(item.index==ele.index){
            return {...item,color:"red",clickAble:false}
          }
          return item
        });
           
    setButtonsArray(updatedList)
    if(buttonArray.length>=3)
    setThreeRandomButtons(threeRandomButtons.filter(e=>e!=ele.index))
    
}
  let view2
  if (!view1Visible && buttonArray.length >= 1) {

    view2 = (
      <View style={styles.view2}>
        <FlatList data={buttonArray} numColumns={3}  renderItem={({item,index})=>(<TouchableHighlight disabled={item.color=="white"||item.color=="red"} onPress={()=>buttonPresed(item,index)} ><View style={{...styles.buttonViews,backgroundColor: item.color}}/></TouchableHighlight>)}/>
      </View>
    )
  }


  return (

    <View style={styles.main}>
      {view1}
      {view2}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white"
  },
  view1: {
    flex: 1,
    alignItems: "center"
  },
  entryText: {
    color: "black",
    marginTop: 10
  },
  view2: {
    flex: 1,
    marginTop:20,
    alignItems:"center",
    justifyContent:"center"
  },
  inputBox: {
    marginTop: 20,
    width: "50%",
    borderBottomColor: "black",
    borderWidth: 1,
    color: "black",

  },
  buttonContinueView: {
    width: "50%",
    marginTop: 20

  },
  buttonViews: {
    width: 110,
    height:50,
    margin: 10,
    borderWidth:1,
  }

});

export default App;
