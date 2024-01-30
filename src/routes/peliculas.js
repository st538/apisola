const {Router} = require('express');
const router = Router();
const _ = require('underscore');

const peliculas = require('../sample.json');
const { title } = require('process');
console.log(peliculas);


router.get('/', (req, res) =>{
    res.send(peliculas);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const pelicula = peliculas.find(pelicula => pelicula.id == id);

    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});



router.post('/', (req, res)=>{
  
    const {nombre_pelicula, precio, descripcion, formato} = req.body
    if(  nombre_pelicula && precio && descripcion, formato) {
        const id = peliculas.length +1;
        const newPelicula = {...req.body,id};
        console.log(newPelicula);
        peliculas.push(newPelicula);
        res.json(peliculas)
    }else {
        res.status(500)({error: 'Ocurrio un error inesperado'});
    }
 });



router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Encuentra el índice del producto con el ID dado
    const index = peliculas.findIndex(pelicula => pelicula.id == id);

    if (index !== -1) {
        // Elimina el producto del array
        peliculas.splice(index, 1);
        res.send(peliculas);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});



router.put('/:id', (req, res)=>{
    const {id} = req.params
    const {nombre_pelicula, precio, descripcion, formato } = req.body
    if(nombre_pelicula && precio && descripcion, formato) {
        _.each(peliculas, (pelicula, i) =>{
            if(pelicula.id == id){
                pelicula.nombre_pelicula = nombre_pelicula;
                pelicula.precio = precio;
                pelicula.descripcion = descripcion;
                pelicula.formato = formato

            }
        });
        res.json(peliculas);
    }else{
        res.status(500).json({error: 'Hubo un error'});
    }
});

        

module.exports= router;
