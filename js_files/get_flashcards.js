/* Logic for getting all flashcards currently saved in database
   Uses ajax*/

import setupDelete from "./delete.js";
import setupEdit from "./edit.js";

// Global array that holds cards currently on page
let flashcards = [];

function populateInputs() {
  const mainDiv = document.getElementById("edit-main-content");
}

function handleEmpty() {

  const message = document.querySelector(".message-div");
  const mainCard = document.querySelector('.main-card');
  const prevNextBtns = document.querySelector('.prev-next-btns');

  // Hide the main card, and next/prev buttons
  mainCard.classList.add('hidden');
  prevNextBtns.classList.add('hidden');
  message.classList.remove('hidden');

}

function displayCards() {


  const flashcardContainer = document.querySelector('.flashcard-container');

  //Check if there are no flashcards
  if (flashcards.length === 0) {
    handleEmpty();
    return;
  }

  let i = 1;

  //Loop through flash cards
  for (let card of flashcards) {
    
    flashcardContainer.insertAdjacentHTML('beforeend', `
      <div class="flashcard">
        <div class="card-top">
          ${i}
          <div class="card-actions">
            <div>
              <span class="material-symbols-outlined edit-card-icon">edit</span>
            </div>
            <div>
              <span class="material-symbols-outlined delete-card-icon">delete</span>
            </div>
          </div>
          <div class="delete-context">
            Delete Card?<br>
            <button class="delete-card-btn">Delete</button>
            <button class="cancel-delete-btn">Cancel</button>
          </div>
        </div>
        <div class="card-bottom">
          <div class="term">${card.term}</div>
          <div class="definition">${card.definition}</div>
        </div>
      </div>`);

      i++;
  }

}

function setUpMainFlashCard() {

//Sets up the page's main flash card

  if (flashcards.length === 0) return;

  /* flashcards.curCard property keeps track of current card
     if it doesn't exist, create it */
  if (!flashcards.curCard) flashcards.curCard = 0;

  const cardNum = document.getElementById("card-num");
  const mainCard = document.querySelector(".main-card");

  cardNum.textContent = flashcards.curCard + 1;
  mainCard.innerHTML = flashcards[flashcards.curCard].term;

  //user defined property, true when card's term is visible
  mainCard.front = true;

  //!Make it so animation is changed when flipped to the other side

  //When card is clicked, show other side
  mainCard.onclick = () => {  

    mainCard.classList.add("card-animation");
    
    setTimeout(() => {
      mainCard.classList.remove("card-animation");

    }, 300);
    
    setTimeout(() =>{
      
      //If the front side of the card is showing, show the back
      if (mainCard.front === true) {
        mainCard.innerHTML = flashcards[flashcards.curCard].definition;
        mainCard.front = false;
      }
  
      else {
        mainCard.innerHTML = flashcards[flashcards.curCard].term;
        mainCard.front = true;
      }
    }, 150);
  }

}

function setUpPrevNext() {

//Setup buttons to get previous and next flashcard

  const prevCard = document.getElementById("prev-card");
  const nextCard = document.getElementById("next-card");
  const mainCard = document.querySelector(".main-card");
  const cardNum = document.getElementById("card-num");

  prevCard.onclick = () => {

    //check if we are on the first card
    if(flashcards.curCard === 0) flashcards.curCard = flashcards.length - 1;
    else flashcards.curCard--;

    cardNum.textContent = flashcards.curCard + 1;
    //When we go to a new card, we go to the front of it
    mainCard.front = true;
    mainCard.innerHTML = flashcards[flashcards.curCard].term;
  }
  
  nextCard.onclick = () => {

    //Check if we are on the last card
    if(flashcards.curCard === (flashcards.length - 1)) flashcards.curCard = 0;
    else flashcards.curCard++;
    
    cardNum.textContent = flashcards.curCard + 1;
    mainCard.front = true;
    mainCard.innerHTML = flashcards[flashcards.curCard].term;
  }
}

function getCards() {

  // Retrieve the name of the set we clicked on
  const params = new URLSearchParams(window.location.search);
  const setName = params.get("set_name");

  const page = document.body.dataset.page;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `../server_logic/get_flashcards.php?set_name=${setName}`);
  
  xhr.onload = () => {

    if (xhr.status === 200) {

      //Receive all rows from table as JSON and convert them into JS object
      flashcards = JSON.parse(xhr.responseText);
      
      if (page === "edit") { 
        populateInputs();
        return;
      }
      
      //The functions below only run when we are on the home page
      displayCards();
      setUpMainFlashCard();
      setUpPrevNext();
      setupDelete();
      setupEdit();
      console.log(flashcards);
    }
  }

  xhr.send();
}

export { getCards, flashcards, setUpMainFlashCard };