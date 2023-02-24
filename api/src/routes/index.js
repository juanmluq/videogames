const { Router } = require('express');
const axios = require('axios');
const {Genre, Videogame} = require ("../db");

const router = Router();



//Creo usuarios de prueba
const users = [
  {id: 1, name: 'Franco', email: 'Franco@gmail.com', password: '1234'},
  {id: 2, name: 'Matias', email: 'Matias@gmail.com', password: '1234'}
]



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


const YOUR_API_KEY = "24a0984fbc3b468eabc19039739e1d36";
const getApiInfo = async () => {
    //
    const apiUrl = await axios.get('https://api.rawg.io/api/games?key=YOUR_API_KEY');
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

const getDbInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"], 
            through: {
                attributes: [],
            },
        }
    })
}

const getAllVideogames = async () => { 
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}
//para la validacion de platforms hago una funcion:
//const allPlatforms = async () => {
//  const apiPlat = await axios.get('https://api.rawg.io/api/platforms?key=YOUR_API_KEY');
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
    if(name) {
        let videogameName = await videogamesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        res.status(200).send(videogameName) : 
        res.status(404).send("No esta el videogame");
    } else { 
        res.status(200).send(videogamesTotal)
    }
    })



 router.get("/genres", async (req, res) => {
const genresApi = await axios.get('https://api.rawg.io/api/genres?key=YOUR_API_KEY');
const genres = genresApi.data.results.map(el => el.name)
genres.forEach(el => {
    Genre.findOrCreate({
        where: { name: el } 
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
        createdInDb, 
        Genr
    } = req.body
    //para validar platforms: 
    //const plataformas = await allPlatforms();
    //for(var i = 0; i < plataformas.length; i++) {
    //if( plataformas[i] ==! platforms ) res.send("plataforma incorrecta")
    //}
    const plataformas = await axios.get('https://api.rawg.io/api/platforms?key=YOUR_API_KEY');
    const plataformasdata = plataformas.data.results.map(el => el.name )
    
    const platforms = []
    validarPlat(platforms, platform, plataformasdata);
    // const aux = platforms.map(e => e)
    // console.log(plataformasdata)
    // console.log(videogameCreated)

    let videogameCreated = await Videogame.create ({ 
        name,
        released,
        rating,
        platforms,
        image,
        createdInDb //no se pone genres porque es una relacion aparte
    })
   
    let genreDb = await Genre.findAll ({ 
        where: { name : Genr }
   })
   videogameCreated.addGenre(genreDb) 
  //el addGenres se puede usar cuando uso el create. Si uso findorCreate o algun otro no me lo permite
  
  console.log(videogameCreated); 
  res.send("Videogame creado con exito")
 });

 router.get("/videogames/:id", async (req, res) => {
    const id = req.params.id; 
    const videoGamesTotal = await getAllVideogames();
    if(id) {
        let videoGameId = await videoGamesTotal.filter(el => el.id == id)
        videoGameId.length ?
        res.status(200).json(videoGameId) :
        res.status(404).send("no encontre ese videogame");
    }
})

module.exports = router;
