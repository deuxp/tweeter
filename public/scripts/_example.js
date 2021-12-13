/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// waits for DOM content to load before running callback
$(document).on("ready", () => {
  // find existing DOM elements with matching ids
  const $typesNav = $("#types-nav");
  const $list = $("#pokemon-list");
  const $showAll = $("#show-all");

  // make HTTP request with ajax (defaults to GET request if not specified)
  $.ajax("http://localhost:3001/types").then(types => {
    types.forEach(type => {
      // create DOM element
      const $button = $("<button>");
      // add text to DOM element
      $button.text(type.english);
      // add click event listener to DOM element
      $button.on("click", () => {
        $.ajax(`http://localhost:3001/types/${type.english}`).then(pokemonOfType => {
          // reset item's HTML (change inner HTML to empty string which functionally removes all existing list items)
          $list.html("");
          // create and add DOM element for each item in the array
          pokemonOfType.forEach(pokemon => {
            const $listItem = $("<li>");
            $listItem.text(pokemon.name.english);
            $list.append($listItem);
          });
        });
      });
      // append created DOM element to existing DOM element (so the new element appears on the screen)
      // this adds the $button element as a child of the $typesNav element
      $typesNav.append($button);
    });
  });

  // make HTTP request with ajax
  $.ajax("http://localhost:3001").then(pokedex => {
    // create DOM element for every element in the original array
    const listItems = pokedex.map(pokemon => {
      const $pokemonListItem = $("<li>");
      $pokemonListItem.text(pokemon.name.english);
      return $pokemonListItem;
    });
    // add all newly created DOM elements to existing DOM element
    $list.append(listItems);
  });

  // add click event listener to existing DOM element
  $showAll.on("click", () => {
    // make HTTP request with ajax
    $.ajax("http://localhost:3001").then(pokedex => {
      // reset item's existing HTML
      $list.html("");
      // create and add DOM element for each item in the array
      pokedex.forEach(pokemon => {
        const $listItem = $("<li>");
        $listItem.text(pokemon.name.english);
        $list.append($listItem);
      });
    });
  });
});