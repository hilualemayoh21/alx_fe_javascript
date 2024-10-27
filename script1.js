    'use strict';
function showRandomQuote(){


       let myquote=createAddQuoteForm();
       console.log(myquote);
       myquote.forEach((quote)=>{
      let text=  document.createElement('p').textContent=quote.text;
      let catagorie=document.querySelector('span').textContent=quote.text;
        container.appendChild(text);
        container.appendChild(catagorie);
       });
}
   document.querySelector('#newQueto').addEventListener(()=>{
      showRandomQuote();
   });
let container=document.querySelector('.quoteDisplay');
function createAddQuoteForm(){
let quote=[];
let quoteText=document.querySelector('#newQuoteText');
let catagories=document.querySelector('#newQuoteCategory');
let textob =quoteText.value;
let catagorieob=catagories.value;
//i will push the object into the array
//create an object
const quoteObject={
    text:textob ,
    catagorie:catagorieob
};
    quote.push(quoteObject);
    return quote;
}