// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git). L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle. La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. 
// BONUS: 
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle 
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste 

let button_play = document.getElementById("Play");

let button_reset = document.getElementById("Reset");

const elementi_griglia = document.getElementById('griglia');

let numero_box = 100;

button_play.addEventListener('click',

    function() {

        elementi_griglia.innerHTML='';
        
        for (let i = 1; i<=numero_box; i++) {
           
            const node = crea_griglia();
            node.innerHTML = i;
        
            node.addEventListener('click', function() {
                console.log(this);
                this.classList.add('clicked');
            });
        
            elementi_griglia.appendChild(node);
            
        }
    
        function crea_griglia() {

            var valore_selezionato = document.getElementById('Difficoltà').value;
            document.getElementById("griglia").style.border = "solid 1px #fff";
            const node = document.createElement('div');
        
            if (valore_selezionato == 'Facile') {
                numero_box = 100;
                node.classList.add('box-facile');
        
            }else if(valore_selezionato == 'Medio'){
                numero_box = 81;
                node.classList.add('box-medio');
                
            }else if(valore_selezionato == 'Difficile'){
                numero_box = 49;
                node.classList.add('box-difficile');
            }else{
                node.classList.add('d-none');
                document.getElementById("griglia").style.border = "none";
            }
            
            return node;
        }
    }
          
);

button_reset.addEventListener('click',
    function(){    
        button_reset = window.location.reload();
    }
);


