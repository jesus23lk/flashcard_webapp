// File that retrieves all sets and puts them on the homepage

function handleFrontend(sets) {
  if (sets.length === 0) {
    console.log('you have no sets');
    return;
  }

  const createBtn = document.querySelector('.add-set-btn');

  for (let set of sets) {

    createBtn.insertAdjacentHTML('beforebegin', `
      <a class="card-set" href="./page_files/flashcards.html?set_name=${set.name}">
        ${set.name}
      </a>
      `);
  }
}

function getSets() {

  const xhr = new XMLHttpRequest();
  xhr.open('GET', './server_logic/get_sets.php');

  xhr.onload = () => {

    if (xhr.status === 200) {

      if (xhr.responseText === 'error') {
        console.log('failed to retrieve sets');
        return;
      }

      const sets = JSON.parse(xhr.responseText);
      handleFrontend(sets);
    }
  }

  xhr.send();
}

export default getSets;