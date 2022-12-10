const { Router } = require('express');
//const { path } = require('../app');
const axios = require('axios');
const {Genre, Videogame} = require ("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// const express = require('express');
// const morgan = require('morgan');
// const cookieParser = require('cookie-parser');

// const app = express();

const users = [
  {id: 1, name: 'Franco', email: 'Franco@gmail.com', password: '1234'},
  {id: 2, name: 'Matias', email: 'Matias@gmail.com', password: '1234'}
]

// app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

const isAuthenticated = (req, res, next) => {
  const { userId } = req.cookies;
  const user = users.find(user => user.id.toString() == userId);
  if ( user ) return res.redirect('/home');
  next();
};

const isNotAuthenticated = (req, res, next) => {
  const { userId } = req.cookies;
  const user = users.find(user => user.id.toString() == userId);
  if ( !user ) return res.redirect('/login');
  next();
};



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//const YOUR_API_KEY = a256b5f8e0754e568482f7d8ef4cf6d8;
const getApiInfo = async () => {// esta funcion me trae la info de la api
    //
    const apiUrl = await axios.get('https://api.rawg.io/api/games?key=24a0984fbc3b468eabc19039739e1d36');
    // const api2 = await api2.data.results.map(e => {return {e}})
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            id: el.id,
            name: el.name, 
            released: el.released, // el nombre que le doy de la parte izquierda (released) conviene hacerlo de la misma forma que lo denomine en la db para acceder a cada componente con esa misma denominacion. Lo que esta a la derecha (el.released) lo saco de la api
            platforms: el.platforms.map(el => el.platform.name),
            rating: el.rating, 
            Img: el.background_image,
            website: el.stores[0].store.domain,
            genres: el.genres.map(el => el.name)
        };
    });
    console.log(apiInfo)
    return apiInfo;
    

};

const getDbInfo = async () => {// esta funcion me trae la info de la base de datos
    return await Videogame.findAll({//retorno todo videogame
        include: {//el include es porque si quiero crear un videogame sin eso nunca me va a incluir el genero
            model: Genre,
            attributes: ["name"], //el unico atributo que tiene Genero es name. El id me lo trae solo
            through: {//esto habla sobre la tabla intermedia. esto va siempre!
                attributes: [],
            },
        }
    })
}

const getAllVideogames = async () => { //aca JUNTO LA DB Y LA INFO DE LA API
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}
//para la validacion de platforms hago una funcion:
//const allPlatforms = async () => {
//  const apiPlat = await axios.get('https://api.rawg.io/api/platforms?key=24a0984fbc3b468eabc19039739e1d36');
// const apiInf = await apiPlat.data.results.map(el => el.name);
//return apiInf
//}

function validarPlat(platforms, platform, plataformasdata) {
    var i = 0;
    platform.map((el) => {  
    plataformasdata.map((e) => {
        if(e === el) {
            platforms[i] = el;
            // console.log(el)
            i++
          } })})}

          
          
          router.get('/inicio', (req, res) => {
            const { userId } = req.cookies;
            
            res.send(`
            <div style="background: url('https://fondosmil.com/fondo/32026.jpg');display: flex; align-items: center; flex-direction: column; font-family: arial" >
            <div style= "display: flex; align-items: center; flex-direction: column; border: 1px solid white; margin: 15%; margin-bottom: 41rem; border-radius: 8px; padding: 5px">    
            <h1 style="color: white; display:flex; justifty_content: center; font-size:xx-large;">Bienvenidos a Videogames</h1>
                </br></br>
              ${ userId ? `
              <a href='/home'>Perfil</a>
              </br>
              <form method="post" action="/logout">
                <button>Salir</button>
                </form>
                
              </div>
              </br></br></br></br></br></br></br></br>
                </br></br></br></br></br></br>
              ` : `
              <a style="font-size:x-large;" href='/login'>Ingresar</a>
              </br>
              <a style="font-size:x-large;" href='/register'>Registrarse</a>
              </br>
              </div>
              </br></br></br></br></br></br></br></br>
                </br></br></br></br></br></br></br>
              </div>
              `}
            `);
          });
          
          router.get('/register', isAuthenticated, (req, res) => {
            res.send(`
            <div style="background: url('https://fondosmil.com/fondo/32026.jpg');display: flex; align-items: center; flex-direction: column; font-family: arial" >
            <div style= "display: flex; align-items: center; flex-direction: column; border: 1px solid white; margin: 15%; margin-bottom: 30rem; border-radius: 8px; padding: 5px; padding-bottom: 4%">    
          
            <h1 style="color: white; font-size:xx-large;">Registrarse</h1>
            <form style= "font-size: x-large; display:flex; flex-direction: column" method="post" action="/register">
              <input style= "font-size: x-large;" name='name' placeholder='Nombre' required />
              <input style= "font-size: x-large;"  type='email' name='email' placeholder='Email' required />
              <input style= "font-size: x-large;"  type='password' name='password' placeholder='Contraseña' required />
              <input style= "font-size: x-large;"  type="submit" value='Registrarse' />
            </form>
            <a style= "font-size: x-large;"  href='/login'>Iniciar sesión</a>
            </div>
            </br></br></br></br></br></br></br></br></br></br>
                </br></br></br></br></br></br></br></br></br></br>
            </div>
            `)
          });
          
          router.get('/login', isAuthenticated, (req, res) => {
            res.send(`
            <div style="background: url('https://fondosmil.com/fondo/32026.jpg');display: flex; align-items: center; flex-direction: column; font-family: arial;" >
            <div style= "display: flex; align-items: center; flex-direction: column; border: 1px solid white; border-radius: 8px; padding: 5px; padding-bottom: 4%; margin: 15%; margin-bottom: 54rem;">    
          
              <h1 style="color: white; font-size:xx-large;">Iniciar sesión</h1>
              <form style= "font-size: x-large; display:flex; flex-direction: column" method="post" action="/login">
                <input style= "font-size: x-large;" type='email' name='email' placeholder='Email' required />
                <input style= "font-size: x-large;" type='password' name='password' placeholder='Contraseña' required />
                <input style= "font-size: x-large;" type="submit" value='Ingresar' />
              </form>
              <a style= "font-size: x-large;" href='/register'>Registrarse</a>
              </div>
              

            </div>
            `)
          });
          
          router.get('/home', isNotAuthenticated, async (req, res) => {
            const { userId } = req.cookies;
            const user = users.find(user => user.id.toString() == userId);
          
            res.send(`
            <div style="background: url('https://fondosmil.com/fondo/32026.jpg');display: flex; align-items: center; flex-direction: column; font-family: arial" >
            <div style= "display: flex; align-items: center; flex-direction: column; border: 1px solid white; margin: 15%; margin-bottom: 41rem; border-radius: 8px; padding: 5px">    
          
              <h1 style="color: white; font-size:xx-large;">Bienvenido ${user.name}</h1>
              <p style="color: white; font-size: x-large;">${user.email}</p>
              <a style= "font-size: x-large;" href="http://localhost:3000/home">Inicio</a>
              </br>
              <form method="post" action="/logout">
                <button>Salir</button>
                </form>
              </br>
              </div>
              </br></br></br></br></br></br></br></br>
                </br></br></br></br></br></br></br></br></br></br>
            </div>
                `)
          });
          
          router.post('/register', (req, res) => {
            const { name, email, password } = req.body;
            const user = users.find(user => user.email === email);
            if (user || (!name || !email || !password)) {
              res.redirect('/register');
            } else {
              users.push({
                id: users.length + 1,
                name,
                email,
                password
              });
              res.redirect('/inicio');
            }
          });
          
          router.post('/login', (req, res) => {
            console.log('Hice post a /login');
            const { email, password } = req.body;
            const user = users.find(u => u.email === email && u.password === password);
            if (user.id)   {
              res.cookie('userId', user.id);
              res.redirect('/home');
            } else {
              res.redirect('/login');
            }
          });
          
          router.post('/logout', (req, res) => {
            console.log('Hice post a /logout');
            console.log('Hice post a /logout');
            res.clearCookie('userId');
            res.redirect('/inicio');
          });

router.get("/videogames", async (req, res) => {
    const name = req.query.name
    let videogamesTotal = await getAllVideogames();
    if(name) {//si hay un name que me pasen por query
        let videogameName = await videogamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))//agarra el name y fijate si incluye lo que le pase por query en este caso name. tambien convierte a minuscula para comparar que sea igual indistinto si hay mayusculas. El include es para hacer una busqueda mas global (si pongo === deberia ser exactamente lo mismo).
        videogameName.length ? //si existe videogameName devolver ese videogameName:
        res.status(200).send(videogameName) : //sino hacer:
        res.status(404).send("No esta el videogame");
    } else { //si no me pasan name por query hacer:
        res.status(200).send(videogamesTotal)
    }
    })



 router.get("/genres", async (req, res) => {
const genresApi = await axios.get('https://api.rawg.io/api/genres?key=24a0984fbc3b468eabc19039739e1d36');
const genres = genresApi.data.results.map(el => el.name)
genres.forEach(el => {
    Genre.findOrCreate({//si esta no lo crea. Si no esta lo crea
        where: { name: el } //Crea en genres estas genres que le pase arriba (es decir las genres que vienen de la api) donde si encuentra el elemento que estoy mapeando no lo crea. Sino si lo crea.
    })
})
const allGenres = await Genre.findAll();
res.send(allGenres);
 })

 router.post("/videogame", async (req, res) => {
    let { 
        name,
        released,
        rating,
        platform,
        image,
        createdInDb, //esto es para ver si esta creado en db
        Genr
    } = req.body
    //para validar platforms: 
    //const plataformas = await allPlatforms();
    //for(var i = 0; i < plataformas.length; i++) {
    //if( plataformas[i] ==! platforms ) res.send("plataforma incorrecta")
    //}
    const plataformas = await axios.get('https://api.rawg.io/api/platforms?key=24a0984fbc3b468eabc19039739e1d36');
    const plataformasdata = plataformas.data.results.map(el => el.name )
    
    const platforms = []
    validarPlat(platforms, platform, plataformasdata);
    // const aux = platforms.map(e => e)
    // console.log(plataformasdata)
    // console.log(videogameCreated)

    let videogameCreated = await Videogame.create ({ //creo el videogame
        name,
        released,
        rating,
        platforms,
        image,
        createdInDb //no se pone genres porque es una relacion aparte
    })
   
    let genreDb = await Genre.findAll ({ //esto me lo traigo del modelo de Genres. Dentro de Genres busco todas las que donde name= genres que me llega por body
        where: { name : Genr }
   })
   videogameCreated.addGenre(genreDb) //agrega el genre donde coincidieron en este caso lo tengo en genreDb. El addGenres es un metodo de sequelize que trae de la tabla esto que le paso(genreDb)
  //el addGenres se puede usar cuando uso el create. Si uso findorCreate o algun otro no me lo permite
  
  console.log(videogameCreated); 
  res.send("Videogame creado con exito")
 });

 router.get("/videogames/:id", async (req, res) => {
    const id = req.params.id; //es lo mismo que hacer const {id}: req.params
    const videoGamesTotal = await getAllVideogames();
    if(id) {
        let videoGameId = await videoGamesTotal.filter(el => el.id == id)
        videoGameId.length ?
        res.status(200).json(videoGameId) :
        res.status(404).send("no encontre ese videogame");
    }
})

module.exports = router;
