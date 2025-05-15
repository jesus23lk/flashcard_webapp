import { getCards } from "./get_flashcards.js";
import setupInsertion from "./insert_card.js";

function setUpHeader() {

  //Here we set the text inside of our header to the name of our card set
  const params = new URLSearchParams(window.location.search);
  const setName = params.get("set_name");
  const header = document.querySelector('h1');
  header.textContent = setName;
}

function main() {
  setUpHeader();
  getCards();
  setupInsertion();
}

main();