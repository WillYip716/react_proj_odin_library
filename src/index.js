import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Book(props){

    const items = props.book[0] +" by " + props.book[1] + ", " + props.book[2] + " pages, " + props.book[3];


    return (
        <div id={"book"+props.in}>
            {items}
            <button onClick={()=>props.deleteFunc(props.in)}>Delete</button>
            <button onClick={()=>props.toggleFunc(props.in)}>Read/Not Read</button>
        </div>
    )
}

class Library extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            books: [["test","wilia", "1","not read"],["test","wilia", "2","not read"],["test","wilia", "3","not read"]],
            displayAdd: false
        };
        this.addBook = this.addBook.bind(this);
        this.removeBook = this.removeBook.bind(this);
        this.toggleRead = this.toggleRead.bind(this);
    }



    addBook(title, author, pages, read){
        const list = this.state.books;
        const displayed = this.state.displayAdd;
        
        if(displayed){
            let titleIn = document.getElementById("Title").value;
            document.getElementById("Title").value = "";
            let authorIn = document.getElementById("Author").value;
            document.getElementById("Author").value = "";
            let pagesIn = document.getElementById("Pages").value;
            document.getElementById("Pages").value = "";
            let readIn = document.getElementById("Read_Not Read").value;
            document.getElementById("Read_Not Read").value = "";

            list.push([titleIn, authorIn, pagesIn, readIn]);
            this.setState((state) => ({
                books: list
            }));   
        }
        else{
            this.setState((state) => ({
                displayAdd: !displayed
            }));   
        }
        
    }

    removeBook(i){
        const list = this.state.books;
        list.splice(i, 1);
        this.setState((state) => ({
            books: list
        }));
    }

    toggleRead(i){
        const list = this.state.books;
        (list[i][3] === "read") ? list[i][3]="not read": list[i][3]="read";
        this.setState((state) => ({
            books: list
        }));
    }

    render() {
        const books = this.state.books;
        let addDivs = [];
        if(this.state.displayAdd){
            let ar = ["Title", "Author", "Pages", "Read/Not Read"];
            ar.map((value,index)=>{
                addDivs.push(<label key={value+"2"}>{value}</label>)
                addDivs.push(<input key={value+"1"}id={value}></input>)
                return ""
            })
        }
        return (

            <div>
                <div id="addbookform">
                {addDivs}
                <button onClick={this.addBook}>Add Book</button>
                </div>
                {books.map((value, index) => {
                  console.log(value);
                  console.log(index);
                return <Book key={"book"+index} book={value} deleteFunc={this.removeBook} toggleFunc={this.toggleRead} in={index}></Book>
              })}
            </div>
          )
    }
    


}



ReactDOM.render(
    <Library />,
    document.getElementById('root')
  );
  