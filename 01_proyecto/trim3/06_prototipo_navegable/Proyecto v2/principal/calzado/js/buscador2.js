//buscador de contenido

//ejecutando funciones
document.getElementById("icon-search-lupa").addEventListener("click", mostrar_buscador);
document.getElementById("cover-ctn-search").addEventListener("click", ocultar_buscador);

//declaracion de variables
bars_search =      document.getElementById("ctn-bars-search");
cover_ctn_search = document.getElementById("cover-ctn-search");
inputSearch =      document.getElementById("inputSearch");
box_search =       document.getElementById("box-search");

//funcion para mostrar el buscador
function mostrar_buscador(){

    bars_search.style.top= "80px";
    cover_ctn_search.style.display= "block";
    inputSearch.focus ();

    if(inputSearch.value === ""){ //para que oculte el cuadro si no se a escrito nada
        box_search.style.display ="none";
    }

}

//funcion para ocultar el buscador

function ocultar_buscador(){

    bars_search.style.top= "-10px";
    cover_ctn_search.style.display= "none";
    inputSearch.value= "";
    box_search.style.display= "none";

}



//creando filtrado de busqueda

//ejecutando funciones

document.getElementById("inputSearch").addEventListener("keyup", buscador_interno);

function buscador_interno(){

    filter= inputSearch.value.toUpperCase();
    li= box_search.getElementsByTagName("li");

    //recorriendo elementos a filtrar mediante los "li"
    for(i = 0; i < li.length; i++){   //la longitud es el texto de li
        
        a= li[i].getElementsByTagName("a")[0]; //dentro de la etiqueta li esta la etiqueta a, se va a recorre las etiquetas a y comenzara desde 0 
        textValue= a.textContent || a.innerText; // en texteValue, se almacenara la variable a, lo que es el textContent (que es Todo el texto del nodo, incluso el oculto) y de ese contenido el inertext (Solo el texto visible para el usuario)
        
        if(textValue.toUpperCase().indexOf(filter) > -1){ //para que vuelva todo en mayuscula y pueda buscar sin problema
        
            li[i].style.display="";
            box_search.style.display= "block"; //cuando escribimos, el recuadro tiene que aparecer
        
            if(inputSearch.value === ""){ //para que oculte el cuadro si no se a escrito nada
                box_search.style.display ="none";
            }

        }else{
            li[i].style.display = "none"; //los que  no coincidan con la busqueda, se ocultara
        }
    }

}