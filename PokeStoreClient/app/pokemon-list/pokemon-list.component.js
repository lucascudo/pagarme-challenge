'use strict';

// Register `pokemonList` component, along with its associated controller and template
angular.
  module('pokemonList').
  component('pokemonList', {
    templateUrl: 'pokemon-list/pokemon-list.template.html',
    controller: ['Pokemon',
      function PokemonListController(Pokemon) {
        this.pokemons = Pokemon.query();
      }
    ]
  });
