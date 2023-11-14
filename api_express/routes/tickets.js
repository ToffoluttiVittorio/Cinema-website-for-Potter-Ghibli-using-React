const express = require('express')
const bcrypt = require('bcrypt')

const { User, Ticket } = require('../models/user');

let router = express.Router()

// router.get('', (req,res) => {
//     Ticket.findAll()
//     .then(tickets => res.json ({ data:tickets}))
//     .catch(err => res.status(500).json({ message : 'Database error', error : err}))
// })

router.get('', (req, res) => {
    const { date, categorie, numeroSeance } = req.query;
  
    if (!date || !categorie || !numeroSeance) {
      return res.status(400).json({ message: 'Date and category are required query parameters.' });
    }
  
    Ticket.findAll({
      where: {
        date: date,
        categorie: categorie,
        numeroSeance: numeroSeance,
      },
    })
      .then(tickets => res.json({ data: tickets }))
      .catch(err => res.status(500).json({ message: 'Database error', error: err }));
  });
  

router.delete('/:id', (req,res) =>{
    let ticketId = parseInt(req.params.id)
    if(!ticketId){
        return res.status(400).json({message:'Missing parameters'})
    }
    Ticket.destroy({where: {id:ticketId},force: true})
    .then(() => res.status(204).json({message:'Delete reussi'}))
    .catch(err => res.status(500).json({message:'Database error', error: err}))

})

router.get('/:id',(req,res) =>{
    let userId = parseInt(req.params.id)
    if (!userId){
        return res.json(400).json({message: 'Missing id'})
    }
    Ticket.findAll({
        where :{
            userId:userId
        },})
        .then(tickets => {
            if ((tickets === null)){
                return res.status(404).json({message:'Il ne possède pas de tickets'})
            }

        return res.json({data:tickets})

    })
    .catch(err => res.status(500).json({message:'Database error', error:err}))
});


router.put('', (req, res) => {
    const { categorie, date, numeroSeance, numeroSiege, userId } = req.body;

    if ( !categorie || !date || !numeroSeance || !numeroSiege || !userId) {
        return res.status(400).json({ message: 'Missing data' });
    }

    Ticket.create(req.body)
        .then(newUser => res.json({ message: 'Ticket created', data: newUser }))
        .catch(err => {
            res.status(500).json({ message: 'Error in create', error: err });
        });
})



module.exports = router

