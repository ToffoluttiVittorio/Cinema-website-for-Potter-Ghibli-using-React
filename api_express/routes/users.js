const express = require('express')
const bcrypt = require('bcrypt')

const { User, Ticket } = require('../models/user');

let router = express.Router()

router.get('', (req,res) => {
    User.findAll()
    .then(users => res.json ({ data:users}))
    .catch(err => res.status(500).json({ message : 'Database error', error : err}))
})

// router.get('/:id', (req,res) => {
//     let userId = parseInt(req.params.id)

//     if (!userId){
//         return res.json(400).json({message: 'Missing parameters'})
//     }
//     User.findOne({where :{id:userId}, raw:true})
//     .then(user => {
//         if ((user === null)){
//             return res.status(404).json({message:'This user does not exist'})
//         }

//         return res.json({data:user})

//     })
//     .catch(err => res.status(500).json({message:'Database error', error:err}))
// })

router.get('/:email', (req, res) => {
    const encodedEmail = req.params.email;
    if (!encodedEmail) {
      return res.status(400).json({ message: 'Missing parameters' });
    }
  
    const userEmail = decodeURIComponent(encodedEmail);
  
    User.findOne({ where: { email: userEmail }, raw: true })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'This user does not exist' });
        }
  

        return res.status(200).json({ data: user });
      })
      .catch(err => res.status(500).json({ message: 'Database error', error: err }));
  });
  

router.put('', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing data' });
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if (user !== null) {
                return res.status(409).json({ message: `The user ${email} already exists!` });
            }

            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then(hash => {
                    req.body.password = hash;

                    User.create(req.body)
                        .then(newUser => res.json({ message: 'User created', data: newUser }))
                        .catch(err => {
                            res.status(500).json({ message: 'Error in create', error: err });
                        });
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error', error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error', error: err });
        });
});



router.patch('/:id', (req,res) =>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message:'Missing parameters'})
    }


    User.findOne({where: {id:userId}, raw:true})
    .then(user =>{
        if(user === null){
            return res.status(404).json({message:'this user does not exist'})
        }

        User.update(req.body, {where: {id:userId}})
        .then(user=>res.json({message: 'User updated'}))
        .catch(err => res.status(500).json({message:'Database error', error: err}))
    })
    .catch(err => res.status(500).json({message:'Database error', error: err}))

})

router.post('untrash/:id', (req,res)=>{

    let userId = parseInt(req.params.id)

    if (!userId){
        return res.json(400).json({message: 'Missing parameters'})
        .catch(err => res.status(500).json({message:'Database error', error: err}))

    }

    User.restore({where: {id:userId}})
    .then(() => res.status(204).json({}))
    
})

router.delete('thrash/:id', (req,res) =>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message:'Missing parameters'})
    }

    User.destroy({where: {id:userId},force: true})
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({message:'Database error', error: err}))


})

router.delete('/:id', (req,res) =>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message:'Missing parameters'})
    }
    User.destroy({where: {id:userId},force: true})
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({message:'Database error', error: err}))



})

module.exports = router