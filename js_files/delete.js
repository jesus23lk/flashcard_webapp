//Global dom node correpsonds to delete context menu that is currently visible
let visibleContext = null;


function handleFrontend(flashcard) {

  //At this point the card has already been deleted from the DB, we now want to delete it from the page

  //Get the next card so we can adjust the numbers on them for traversal
  let nextCard = flashcard.nextElementSibling;

  flashcard.remove();

  //! We keep iterating while next card is not null, however this node may need to change if the dom tree changes

  while(nextCard) {

    const cardNumber = nextCard.firstElementChild.firstChild;
    cardNumber.textContent = Number(cardNumber.textContent) - 1;

    nextCard = nextCard.nextElementSibling;
  }
}

function deleteCard(e) {

  //Grab the cardtop that corresponds to the delet button we clicked
  const cardTop = e.target.closest('.card-top');

  //Grab the text that contains the number of the card clicked on
  const cardNum = Number(cardTop.firstChild.textContent);
  
  //Grab entire card so it can be removed from page
  const flashcard = cardTop.closest('.flashcard');

  // Retrieve the name of the set we clicked on
  const params = new URLSearchParams(window.location.search);
  const setName = params.get("set_name");
  

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `../server_logic/delete.php?cardNum=${cardNum}&set_name=${setName}`);

  xhr.onload = () => {

    if (xhr.status === 200) {

      if (xhr.responseText === 'success') handleFrontend(flashcard);

      else if (xhr.responseText === 'query failed') console.log("something went wrong please try again");
    }
  }

  xhr.send();
}

function showDeleteContext(e) {

  const curId = e.target.dataset.id;

  //If a context is currently visible and it doesn't correspond to the icon we clicked on, then we need to hide it
  if (visibleContext && visibleContext.dataset.id !== curId) hideVisibleContext();

  //The next sibling of the delete icon is the delete context menu
  visibleContext = document.querySelector(`.delete-context[data-id="${curId}"]`);
  visibleContext.style.display = 'block';
}

function hideVisibleContext(e) {

  //We check if e is defined because this function can be called without e
  if (e && e.target.classList.contains('delete-card-icon')) return;

  if (visibleContext) {
    
    visibleContext.style.display = 'none';
    visibleContext = null;
  }
}

function setupDelete() {

  //Set up delete functionality allowing us to delete any card

  const deleteIcons = document.querySelectorAll('.delete-card-icon');
  const deleteBtns = document.querySelectorAll('.delete-card-btn');
  const cancelDeleteBtns = document.querySelectorAll('.cancel-delete-btn');
  const deleteContexts = document.querySelectorAll('.delete-context');
  
  document.addEventListener('click', hideVisibleContext);

  for (let i = 0; i < deleteIcons.length; i++) {

    //data-id attributes so we can quickly acess any given context or icon
    deleteContexts[i].setAttribute('data-id', `${i}`);
    deleteIcons[i].setAttribute('data-id', `${i}`);
    deleteIcons[i].onclick = showDeleteContext;
    cancelDeleteBtns[i].onclick = hideVisibleContext;
    deleteBtns[i].onclick = deleteCard;
  }
}

export default setupDelete;