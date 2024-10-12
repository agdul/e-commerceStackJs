const fs = require('fs');
const express = require('express'); 
const router = express.Router();

const PATH_ROUTES = __dirname; 
const removeext = (filename) => (filename.split('.').shift());
const xd = fs.readdirSync(PATH_ROUTES).filter((file) =>{
    const name = removeext(file);
    
    if(name !== 'main'){
        console.log('rutas cargadas ,',name);
        router.use(`/${name}`, require(`./${name}`));
    };
    
});

module.exports = router;