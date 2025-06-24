
import axios from "axios"


const MOCK = [{
    "_id": "1",
    "anfitrion": "Juan Perez",
    "nombre": "Casa en la playa",
    "descripcion": "Hermosa casa frente al mar con todas las comodidades",
    "precioPorNoche": 120,
    "moneda": "USD",
    "horarioCheckIn": "15:00",
    "horarioCheckOut": "11:00",
    "direccion": {
        "calle": "Costa Azul",
        "altura": 1234,
        "ciudad": "Mar del Plata",
        "lat": -38.0055,
        "long": -57.5426,
        "pais": "Argentina"
    },
    "cantHuespedesMax": 6,
    "caracteristicas": [
        "WIFI",
        "PILETA",
        "ESTACIONAMIENTO"
    ],
    "reservas": [],
    "fotos": [
        {
            "descripcion": "Vista del frente",
            "path": "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "descripcion": "Piscina",
            "path": "/imagenes/casa-playa-2.jpg"
        }
    ]
},
{   
    "_id": "2",
    "anfitrion": "Juan Perez",
    "nombre": "Hotel NeyMAR",
    "descripcion": "Hermosa casa en el Brasil",
    "precioPorNoche": 120,
    "moneda": "USD",
    "horarioCheckIn": "15:00",
    "horarioCheckOut": "11:00",
    "direccion": {
        "calle": "Costa Azul",  
        "altura": 1234,
        "ciudad": "Mar del Plata",
        "lat": -38.0055,
        "long": -57.5426,
        "pais": "Argentina"
    },
    "cantHuespedesMax": 6,
    "caracteristicas": [
        "WIFI",
        "PILETA",
        "ESTACIONAMIENTO"
    ],
    "reservas": [],
    "fotos": [
        {
            "descripcion": "Vista del frente",
            "path": "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "descripcion": "Piscina",
            "path": "/imagenes/casa-playa-2.jpg"
        }
    ]
}]

const BACK_END_URL = 'http://localhost:4000' //cambiar BACK_END_URL en .env
export const getAlojamientos = () => axios.get(`${BACK_END_URL}/alojamientos`).then(r => r.data)

//export const getAlojamientos = () => Promise.resolve(MOCK)

export const getAlojamientosSlowly = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(MOCK)
  }, 5000)
})