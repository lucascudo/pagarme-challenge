'use strict';

const DBConn = require('../config/database.js');
const Pokemon = DBConn.models.pokemon;
const Purchase = DBConn.models.purchase;
const request = require('request-promise');

/**
 * POST Pokemon Purchase data (Pokemon ID, Quantity)
 *
 * Returns:
 * - `200 OK` with the purchase information if completed successfully
 * - `400 Bad Request` if the request body fails validation or if
 * there's less Pokemons in stock than the 'quantity' request field;
 * - `500 Internal Server Error` if an internal issue prevented the server
 * from completing the request
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.apiPost = (req, res) => {
  const pkmnId = req.body.id;
  const quantity = req.body.quantity;

  Pokemon
    .findById(pkmnId)
    .then(pkmn => {
      if (!pkmn) {
        return res.status(404).json({});
      }
      //  Checking if the operation may be done
      if (pkmn.stock < quantity) {
        return res
          .status(400)
          .json({
            error: `The amount of ${pkmn.name} 
              in stock (${pkmn.stock}) is lesser 
              than the requested purchase.`,
          });
      }

      const reqFields = ['card_number', 'card_expiration_date',
        'card_holder_name', 'card_cvv'];

      //  Validating the presence of the required fields
      const invalidFields = [];
      reqFields.forEach(field => {
        if (!req.body[field]) {
          invalidFields.push(`You must supply a valid ${field}.`);
          return false;
        }
        return true;
      });
      if (invalidFields.length >= 1) {
        return res
          .status(400)
          .json({
            error: invalidFields,
          });
      }
      //  After the validatins we request a new transaction with our data
      const amount = pkmn.price * quantity * 100;
      return request(
        {
          uri: 'https://api.pagar.me/1/transactions',
          method: 'POST',
          json: {
            api_key: process.env.PM_KEY,
            amount: amount, // Pagar.me payments are in cents
            card_number: req.body.card_number,
            card_expiration_date: req.body.card_expiration_date,
            card_holder_name: req.body.card_holder_name,
            card_cvv: req.body.card_cvv,
            metadata: {
              product: 'pokemon',
              name: pkmn.name,
              quantity,
            },
          },
        })
        .then(data => {
          // Store purchase data
          const newPurchase = Purchase.build({
            pokemon_id: pkmnId,
            quantity: quantity,
            amount: amount,
            card_number: req.body.card_number,
            card_expiration_date: req.body.card_expiration_date,
            card_holder_name: req.body.card_holder_name,
            card_cvv: req.body.card_cvv,
            status: data.status
          });
          newPurchase.save().then((purchase) => {
            // Check Pagar.me's response and treat it accordingly
            if (data.status === 'paid') {
              pkmn.stock = pkmn.stock - quantity;
              return pkmn
                .save()
                .then(() => res.send(data)) // All is well, forward Pagarme's response
                .catch(() => res.status(500).json({
                  error: 'The transaction was completed, but there was an error updating stock ',
                }));
            }

            let error = 'The payment gateway refused this purchase.';
            if (data.refuse_reason) {
              error = `The payment gateway refused this purchase: ${data.refuse_reason}`;
            }
            return res.status(500).json({
              error,
            });
          });
        })
        .catch(() =>
          res.status(500).json({
            error: 'There was an error contacting the payment gateway. Please try again later.',
          })
        );
    });
};
