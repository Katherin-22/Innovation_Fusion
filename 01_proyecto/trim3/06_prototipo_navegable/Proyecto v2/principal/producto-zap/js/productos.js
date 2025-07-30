//botones para la cantidad

//declaracion de variables
const inputQuantity = document.querySelector(".input-quantity");
const btnIncrement = document.querySelector("#increment");
const btnDecrement = document.querySelector("#decrement");

let valueByDefault = parseInt(inputQuantity.value) //convierte el valor de inputquantity 1 a un valor entero


//funciones click
btnIncrement.addEventListener("click", () => {
    //1 = 1+1 cuando se clickee el boton, sumara 1
    //2= 2+1
    valueByDefault +=1
    inputQuantity.value = valueByDefault
})
btnDecrement.addEventListener("click", () => {
    if(valueByDefault === 1){
        return
    }

    valueByDefault -=1
    inputQuantity.value = valueByDefault
})

//Toggle para ocultar y mostrar informacion
//constante Toggle Titles
const toggleDescription = document.querySelector(".title-description");
const toggleAdditionalInformation = document.querySelector(".title-additional-information");
const toggleReviews = document.querySelector(".title-reviews");

//Constante Contenido Texto
const contentDescription = document.querySelector(".text-description");
const contentAdditionalInformation = document.querySelector(".text-additional-information");
const contentReviews = document.querySelector(".text-reviews");

//funciones Toggle
toggleDescription.addEventListener("click", () => {
    contentDescription.classList.toggle("hidden"); //si contentDescription tiene la clase hidden, quitala, si no, ponla
})

toggleAdditionalInformation.addEventListener("click", () => {
    contentAdditionalInformation.classList.toggle("hidden"); 
})

toggleReviews.addEventListener("click", () => {
    contentReviews.classList.toggle("hidden"); 
})