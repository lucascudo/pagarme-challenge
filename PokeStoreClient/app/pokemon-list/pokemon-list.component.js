'use strict';

// Register `pokemonList` component, along with its associated controller and template
angular.
  module('pokemonList').
  component('pokemonList', {
    templateUrl: 'pokemon-list/pokemon-list.template.html',
    controller: ['Pokemon', 'Purchase',
      function PokemonListController(Pokemon, Purchase) {
      	const that = this;
      	const resetMessages = () => {
    		that.errorMessages = [];
        	that.successMessage = '';
      	};
        this.pokemons = Pokemon.query();
        this.create = (newPokemon) => {
        	const pokemon = new Pokemon();
        	resetMessages();
        	if (!newPokemon) {
        		that.errorMessages = [ 'New pokemon data was not provided.' ];
        		return;
        	}
    		pokemon.name = newPokemon.name;
    		pokemon.price = newPokemon.price;
    		pokemon.stock = newPokemon.stock;
    		pokemon.$save((res) => {
    			that.successMessage = 'New pokemon created successfully.';
    			that.pokemons = Pokemon.query();
    		}, (err) => {
    			that.errorMessages = err.data.error;
    		});
    	}
    	this.purchase = (pokemonId, quantity, card) => {
    		const purchase = new Purchase();
        	resetMessages();
        	if (!card) {
        		that.errorMessages = [ 'Credit card data was not provided.' ];
        		return;
        	}
        	purchase.id = pokemonId;
    		purchase.quantity = (quantity) ? quantity : 1;
    		purchase.card_number = card.number;
    		purchase.card_expiration_date = card.expiration_date.replace('/', '').replace('-', '');
    		purchase.card_holder_name = card.holder_name;
    		purchase.card_cvv = card.cvv; 
    		purchase.$save((res) => {
    			that.successMessage = 'Pokemon purchased successfully.';
    		}, (err) => {
    			that.errorMessages = (typeof err.data.error == 'string') ? [ err.data.error ] : err.data.error;
    		});
    	}
      }
    ]
  });
