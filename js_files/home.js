//Js file that sets up everything for our homepage
import setupSetInsertion from "./insert_set.js";
import getSets from "./get_sets.js";

function main() {
  getSets();
  setupSetInsertion();
}

main();