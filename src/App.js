import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./App.css"
import List from "./components/List"

export class App extends Component {
  constructor(){
    super();
    this.state = {
      list : JSON.parse(localStorage.getItem("local")) == null? [] : JSON.parse(localStorage.getItem("local")),
      newItem : "",
    }
  }

  // tracking change in the input field
  inputChangeTracker = (value) =>{
    this.setState({
      newItem : value,
    })
  }


  //Adding new item to the list
  addItem = () => {
    if(this.state.newItem !== ""){
    let today = new Date()
    const listItem = {
      id : uuidv4(),
      singleValue : this.state.newItem,
      date :  today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear() 
    }

    let array = JSON.parse(localStorage.getItem("local"))
    if(array === null){
      array = [];
      array.push(listItem)
      localStorage.setItem("local",JSON.stringify(array))
    }
    else{
      array.push(listItem)
      localStorage.setItem("local",JSON.stringify(array))
    }
    
    this.setState({
      list : array,
      newItem : "",
    })
    }
   }


  //deleting all the elements from the list
  clearAll = () =>{
    if(JSON.parse(localStorage.getItem("local")).length === 0){
      alert("The list is empty")
    }
    else if(window.confirm("Do you really want to clear the list?")) {
      localStorage.setItem("local",JSON.stringify([]))
      this.setState({ list : []})
    }
  }
  
  //deleting single the elements from the list
  deleteItem = (id) =>{
    let array = JSON.parse(localStorage.getItem("local"))
    const update = array.filter(item => item.id !== id)
    localStorage.setItem("local",JSON.stringify(update))
    this.setState({
      list : update,
    })
   }
    
   addIcon = (e) => {
     
   }
   
  //  this.state.list

  render() {
    return (
      <div className="App">
        <div className="App__background">
          <h1>Todo List</h1>
        </div>
        <div className="App__input">
          <input  placeholder="Enter the new item..." onChange={ e => this.inputChangeTracker(e.target.value)} value={this.state.newItem} type="text" required></input>
          <button className="App__input__add" onMouseOver={this.addIcon}  onClick={this.addItem} >A D D</button>
          <button className="App__input__clear"  onClick={this.clearAll}>C L E A R</button>
        </div>
        <div className="App__list">
        <table>
          <tbody> 
            {
            this.state.list.map((item,index) => {
                return(
                <List key = {item.id} id={item.id} deleteItem={this.deleteItem} serial = {index+1} value = {item.singleValue} date = {item.date}></List>
                )
              })
            }
          </tbody> 
        </table>
        </div> 
       </div>
    )
  }
}

 
export default App
