// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git). 
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle. 
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. 
// BONUS: 
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle 
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste 

// dichiaro il bottone play
let button_play = document.getElementById("Play");

// dichiaro il bottone reset
let button_reset = document.getElementById("Reset");

// dichiaro la costante per il div con ID griglia
const elementi_griglia = document.getElementById('griglia');

// eventi premento il bottone play
button_play.addEventListener('click',

    function() {

        // funzione per creare un elemento della griglia
        function crea_elemento_griglia() {

            var valore_selezionato = document.getElementById('Difficoltà').value;
            document.getElementById("griglia").style.border = "solid 1px #fff";
            const node = document.createElement('div');           
        
            if (valore_selezionato == 'Facile') {
                node.classList.add('box-facile');
        
            }else if(valore_selezionato == 'Medio'){
                node.classList.add('box-medio');
                
            }else if(valore_selezionato == 'Difficile'){
                node.classList.add('box-difficile');
            }else{
                node.classList.add('d-none');
                document.getElementById("griglia").style.border = "none";
            }
            
            return node;
        }

        // creo una costante per uare la fuznione get_numero_box()
        const numero_box = get_numero_box();

        // costante per numero massimo delle bombe 
        const numero_bombe = 16;

        // costante per tenere traccia dei tentativi
        const tentativi = [];
        
        // creo la costante bombe ed uso la fuznione genera_bombe
        const bombe = genera_bombe(numero_bombe, numero_box);
        console.log(bombe);

        // reset della griglia
        elementi_griglia.innerHTML='';
        
        // ciclo for per generare tutti i box della griglia in base alla difficoltà scelta
        for (let i = 1; i<=numero_box; i++) {
           
            const node = crea_elemento_griglia();
            node.innerHTML = i;
        
            node.addEventListener('click', gestire_click );
        
            elementi_griglia.appendChild(node);
            
        }
    
        // funzione per gestire i click nella griglia
        function gestire_click() {
    
            this.classList.add('clicked');
        
            this.removeEventListener('click', gestire_click)
        
            const cella = parseInt(this.innerHTML);
            
            console.log ('Hai cliccato sulla cella '  + cella);
            
            if (bombe.includes(cella)) {
                termina_gioco();
            }else{
                tentativi.push(cella);
            }
            console.log('numero tentativi = ' + tentativi);
        }
        
        // funzione per terminare il gioco
        function termina_gioco() {
            // scorro gli elementi del dom
            const box_facile = document.getElementsByClassName('box-facile');
            const box_medio = document.getElementsByClassName('box-medio');
            const box_difficile = document.getElementsByClassName('box-difficile');

           for ( let i = 0; i < box_facile.length; i++) {
               if (bombe.includes(parseInt(box_facile[i].innerHTML)))
               box_facile[i].classList.add('bombe_rosse');  
            }
            for ( let i = 0; i < box_medio.length; i++) {
                if (bombe.includes(parseInt(box_medio[i].innerHTML)))
                box_medio[i].classList.add('bombe_rosse');  
            }
            for ( let i = 0; i < box_difficile.length; i++) {
                if (bombe.includes(parseInt(box_difficile[i].innerHTML)))
                box_difficile[i].classList.add('bombe_rosse');  
            }
           
        }
    }
          
);

// funzione per generare i numeri delle box in base alla difficoltà
function get_numero_box() {
    var valore_selezionato = document.getElementById('Difficoltà').value;
    let numero_box;
    if (valore_selezionato == 'Facile') {
        numero_box=100;
    }else if(valore_selezionato == 'Medio'){
        numero_box=81; 
    }else{
        numero_box=49;
    }
    return numero_box;
}

// funzione per generare le bombe usando numeri random senza doppioni
function genera_bombe(numero_bombe, Pnumero_box) {
    const bombe_generate = [];
    
    while (bombe_generate.length < numero_bombe) {
        const bomba = numero_random(1, Pnumero_box);
        
        // se bombe_generate non --> ! include const bombe
        if (!bombe_generate.includes(bomba)) {
            bombe_generate.push(bomba);
        }
    }
        return bombe_generate;
}

// funzione per generare numeri random
function numero_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// bottone per il reset
button_reset.addEventListener('click',
    function(){    
        button_reset = window.location.reload();
    }
);


