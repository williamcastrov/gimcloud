const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const diskstorage = multer.diskStorage({
    destination :   path.join( __dirname, '../../images' ),
    filename    :   (req, file, cb) => {
        //cb(null, Date.now() +'-gimcloud-' + file.originalname )
        cb(null, file.originalname )
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.get('/', (req, res) => {
    res.send('Welcome to my image app')
})

router.post('/images/post', fileUpload ,(req, res) => {
    
    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')
        
        const type = req.file.mimetype;
        const name = req.file.originalname;
        const url  = req.file.path;
        const data = fs.readFileSync(path.join(__dirname, '../../images/'+ req.file.filename ));
        const orden= req.body.orden;
        
        conn.query('INSERT INTO image set ?', [{type, name, url, data, orden }], (err, rows) => {
            if(err) return res.status(500).send('server error')

            //res.send('Archivo Guardo en GIM CLOUD')
        })
    })

    console.log(req.body.orden)
    console.log("RUTA ARCHIVO : ", req.file.path)
    
    res.send('file saved!')
    
})

router.get('/images/get', fileUpload, (req, res) => {

    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')
        
        conn.query('SELECT * FROM image WHERE image.type =! "application/pdf" ', (err, rows) => {
            if(err) return res.status(500).send('server error')

            rows.map(img => 
                   fs.writeFileSync(path.join(__dirname, '../../dbimages/' + img.id + img.name), img.data)
            )

            const imagedir = fs.readdirSync(path.join(__dirname, '../../dbimages/'))
            
            res.json(imagedir)

            //console.log(fs.readdirSync(path.join(__dirname, '../../dbimages/')))
            //res.send('Lectura archivo OK desde GIM CLOUD')
        })
    })
 
    //res.send('file saved!')
})

module.exports = router;