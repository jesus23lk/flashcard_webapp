//! NEXT STEP IS TO WORK ON edit_card.php AS THAT FILE IS INCOMPLETE
//! COMBINE CODE FROM submit.php AND delete.php TO COMPLETE IT

// Global variable, set to true when an edit form is visible
let editFormVisible = false;
let curFlashcard = null;
let cardBottom = null;
let curEditBtn = null;
let curTerm = null;
let curDef = null;

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function hideEditForm() {

  //! This function has a bug

  const buttonsDiv = curFlashcard.querySelector('.confirm-cancel-changes');
  buttonsDiv.remove();

  cardBottom.innerHTML = `
    <div class="term">${curTerm}</div>
    <div class="definition">${curDef}</div>
  `;  

  editFormVisible = false;
  curEditBtn = null;
  curTerm = null;
  curDef = null;
}

function setupCancelButton() {
  const cancelButton = document.querySelector('.cancel-edit-btn');
  cancelButton.addEventListener('click', hideEditForm);
}

function handleFrontEnd() {
  let newTerm = curFlashcard.querySelector('.term-textarea').value;
  let newDef = curFlashcard.querySelector('.def-textarea').value;

  // Escape user input
  newTerm = escapeHTML(newTerm);
  newDef = escapeHTML(newDef);

  cardBottom.innerHTML = `
    <div class="term">${newTerm}</div>
    <div class="definition">${newDef}</div>
  `;

  const buttonsDiv = curFlashcard.querySelector('.confirm-cancel-changes');
  buttonsDiv.remove();
  editFormVisible = false;
  curEditBtn = null;    

}

function changeCard() {
  //Function that sends a network request to change cards value in DB

  const xhr = new XMLHttpRequest();
  const formData = new FormData(curFlashcard.querySelector('.insert-card-form'));

  // Grab the card number
  const cardTop = curFlashcard.querySelector('.card-top');
  const cardNum = Number(cardTop.firstChild.textContent);

  // Retrieve the name of the set we clicked on
  const params = new URLSearchParams(window.location.search);
  const setName = params.get("set_name");

  // Add cardNumber and setName to the form data
  formData.append("cardNum", cardNum);
  formData.append("set_name", setName)

  xhr.onerror = () => console.log("Request failed");

  xhr.open('POST', '../server_logic/edit_card.php');

  xhr.onload = () => {

    if (xhr.status === 200) {
      if (xhr.responseText === 'success') handleFrontEnd();

      else if (xhr.responseText === 'query failed') console.log("something went wrong please try again");
    }
  }

  xhr.send(formData);
}

function setupConfirmButton() {
  const confirmBtn = curFlashcard.querySelector(".confirm-edit-btn");
  confirmBtn.addEventListener('click', changeCard);
}

function showEditForm() {

  const term = curFlashcard.querySelector('.term').textContent;
  const def = curFlashcard.querySelector('.definition').textContent;
  
  cardBottom.innerHTML = `
    <form class="insert-card-form">
      <div class="edit-term">
        <textarea class="term-textarea" placeholder="term" name="term"></textarea>
      </div>
      <div class="edit-def">
        <textarea class="def-textarea" placeholder="definition" name="def"></textarea>
      </div>
    </form>`;
  
  curFlashcard.insertAdjacentHTML('beforeend', `
    <div class="confirm-cancel-changes">
      <button class="confirm-edit-btn">Confirm</button>
      <button class="cancel-edit-btn">Cancel</button>
    </div>
    `);
    
    const textAreas = document.querySelectorAll('textarea');
    
    textAreas.forEach(textarea => {
      
      textarea.style.height = 'auto';
      
      textarea.addEventListener('input', () => {
        
        textarea.style.height = "1px";
        textarea.style.height = (textarea.scrollHeight) + "px";
      });
    });
    
    curFlashcard.querySelector('.term-textarea').value = term;
    curFlashcard.querySelector('.def-textarea').value = def;
    
    editFormVisible = true;

}
  
function handleEditClick(e) {
    
  // Entered when a user clicks the edit button (pencil icon)
  
  if (curEditBtn && curEditBtn !== e.target) {
    //Entered when a user clicks a different card's edit button while the current card's edit form is still open
    hideEditForm();
  }
  
  curEditBtn = e.target;
  
  // Get flashcard we are in, and also term & defintion
  curFlashcard = curEditBtn.closest('.flashcard');
  cardBottom = curFlashcard.querySelector('.card-bottom');
  cardBottom.classList.add('edit');
  
  if (!editFormVisible) {
    // These are used to reset the flashcard content
    curTerm = curFlashcard.querySelector('.term').textContent;
    curDef = curFlashcard.querySelector('.definition').textContent;

    showEditForm();
    setupCancelButton();
    setupConfirmButton();
  }

  // For edit button is clicked but form is open 
  else hideEditForm();
}

function setupEdit() {

  const editIcons = document.querySelectorAll('.edit-card-icon');

  for (let icon of editIcons) {
    icon.addEventListener('click', handleEditClick)
  }

}

export default setupEdit;