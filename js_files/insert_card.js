import { flashcards, setUpMainFlashCard } from "./get_flashcards.js";

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function setupTextAreas() {
  //Setup text areas so they can expand dynamically with the amount of content inside of them

  const textAreas = document.querySelectorAll('textarea');
  
  textAreas.forEach(textarea => {
    textarea.addEventListener('input', () => {

      textarea.style.height = "1px";
      textarea.style.height = (textarea.scrollHeight) + "px";
    });
  });
}

function showInsertForm(e) {

  document.querySelector('.submit-button').style.display = 'flex';
  this.style.display = 'none';

  const flashcardContainer = document.querySelector('.flashcard-container');

  //Check how many flashcards are on the page
  const numCards = document.querySelectorAll('.flashcard').length;

  flashcardContainer.insertAdjacentHTML('beforeend', `
    <div class="flashcard insert-card">
      <div class="card-top">
        ${numCards + 1}
      </div>
      <div class="card-bottom">
        <form class="insert-card-form">
          <div class="edit-term">
            <textarea class="term-textarea" placeholder="term" name="term"></textarea>
          </div>
          <div class="edit-def">
            <textarea class="def-textarea" placeholder="definition" name="def"></textarea>
          </div>
        </form>
      </div>
    </div>
    `);
}

function updateMainCard(term, def) {

  // Logic below only applies if it is our first card being added to the set
  const message = document.querySelector(".message-div");
  const mainCard = document.querySelector('.main-card');
  const prevNextBtns = document.querySelector('.prev-next-btns');

  if (!message.classList.contains('hidden')) message.classList.toggle('hidden');
  if (mainCard.classList.contains('hidden')) mainCard.classList.toggle('hidden');
  if (prevNextBtns.classList.contains('hidden')) prevNextBtns.classList.toggle('hidden');

  // Now we add our new card to our list of flashcards global array
  const newCard = {
    card_id: null,
    set_id: null,
    term: term, 
    definition: def,
    position: null,
  }

  flashcards.push(newCard);

  if (flashcards.length === 1) {
    // If this is the first card we are adding to the page then we need to set everything up
    setUpMainFlashCard();
  }
}

function handleSucess(insertCard, formData) {
  //handles sucessfully insertion of flashcard 

  //remove form
  insertCard.remove();

  //get user input
  let term = formData.get('term');
  let def = formData.get('def');

  // Escape the strigns to remove markup
  term = escapeHTML(term);
  def = escapeHTML(def);

  //Check how many flashcards are on the page
  const numCards = document.querySelectorAll('.flashcard').length;

  //Add the user's card to the page
  const flashcardContainer = document.querySelector('.flashcard-container');
  flashcardContainer.insertAdjacentHTML('beforeend', `
    <div class="flashcard">
      <div class="card-top"> 
        ${numCards + 1}
        <div class="card-actions">
          <div>
            <span class="material-symbols-outlined edit-card-icon">edit</span>
          </div>
          <div>
            <span class="material-symbols-outlined delete-card-icon">delete</span>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="term">${term}</div>
        <div class="definition">${def}</div>
      </div>
    </div>`);
  
  // Hide submit button and show add button
  document.querySelector('.submit-button').style.display = 'none';
  document.querySelector('.add-button').style.display = 'flex';

  updateMainCard(term, def);

}

function submitCard() {

  const xhr = new XMLHttpRequest();

  // Retrieve the name of the set we clicked on
  const params = new URLSearchParams(window.location.search);
  const setName = params.get("set_name");
  

  const formData = new FormData(document.querySelector('.insert-card-form'));

  //Add set name to the form data
  formData.append("set_name", setName);

  //Get card that has form
  const insertCard = document.querySelector('.insert-card');  
  
  //TODO: Properly handle the error here
  xhr.onerror = () => console.log("Request Failed");

  xhr.open('POST', '../server_logic/submit.php');

  xhr.onload = () => {

    if (xhr.status === 200) {
      handleSucess(insertCard, formData);
    }
  }

  xhr.send(formData);
}

function setupInsertion() {

  // Sets up functionality for insertion

  //Retrieve button to add a new card
  const addButton = document.querySelector('.add-button');
  const submitButton = document.querySelector('.submit-button');
  
  addButton.addEventListener('click', showInsertForm);
  addButton.addEventListener('click', setupTextAreas);
  submitButton.addEventListener('click', submitCard);
}

export default setupInsertion;