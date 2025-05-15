function handleFrontend(formData) {

  // Close the modal in case user presses back on browser
  const setModal = document.querySelector('.add-set-modal');
  setModal.close();

  // Take user to set page
  const setName = formData.get('set-name');
  window.location.href = `http://localhost/flashcards/page_files/flashcards.html?set_name=${setName}`;
}

function createSet() {

  //! Make it so if they use a name of a set that is already taken it doesn't let them

  const xhr = new XMLHttpRequest();

  const setForm = document.querySelector('.add-set-form');
  const formData = new FormData(setForm);

  setForm.addEventListener('submit', e => e.preventDefault()); 

  xhr.onerror = () => console.log('Request failed');

  xhr.open('POST', './server_logic/insert_set.php');

  xhr.onload = () => {

    if (xhr.status === 200) {
      
      if (xhr.responseText === 'success') handleFrontend(formData);

      else console.log('error, please try again');
    }
  }

  xhr.send(formData);
}

function setupSetInsertion() {
  // Creates functionality for inserting new sets

  const setModal = document.querySelector('.add-set-modal');
  const createBtn = document.querySelector('.add-set-btn');
  const closeIcon = document.querySelector('.close-icon');
  
  createBtn.addEventListener('click', () => {
    setModal.showModal();
  });

  closeIcon.addEventListener('click', () => setModal.close());

  const confirmSetBtn = document.querySelector('.confirm-set-btn');
  confirmSetBtn.addEventListener('click', createSet);
}

export default setupSetInsertion;