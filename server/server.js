const express = require('express');
// const cors = require('cors')


const app = express();

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))


// app.get('/', (req,res) => res.send('Welcome !'));
// app.get('*',(req,res) => res.status(501).send('existe pas'))

// app.listen(8989, () =>{
//   console.log('Server on port 8989')
// })

const port = process.env.PORT || 3001;
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
