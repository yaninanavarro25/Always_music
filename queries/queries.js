import pool from "../config/db.js";

const argumento = process.argv.slice(2)
const opcion = argumento[0]
let nombre = argumento[1]
let rut = argumento[2]
let curso = argumento[3]
let nivel = argumento[4]

const agregarEstudiante = async () => {
    try {
        const text = "insert into estudiantes (nombre , rut, curso, nivel ) values($1, $2, $3, $4) returning *";
        const values = [nombre, rut, curso, nivel];
        const respuesta = await pool.query(text, values);
        console.log(`El estudiante ${nombre} fue agregado con exito`);
    } catch (error) {
        console.log(error);
    }
}

const mostrarEstudiantes = async () => {
    try {
        const tex = "select * from estudiantes";
        const {rows} = await pool.query(tex);
        console.log('Registro actual: ',rows)
    } catch (error) {
        console.log (error.message)
    }
}

const consultarestudianteRut = async () => {
    try {
        const consulta = "select * from estudiantes where rut = $1";
        const value = [rut];
        const {rows} = await pool.query(consulta, value);
        console.log(rows)
    
        
    } catch (error) {
        console.log(error.message)
    }
};

const actualizarEstudiante = async () => {
    try {
        const text = "update estudiantes set nombre = $1, curso = $2, nivel = $3 where rut = $4 returning *";
        const values = [nombre, curso, nivel, rut];
        const response = await pool.query(text, values);
        console.log('El estudiante fue actualizado con exito')
        
    } catch (error) {
        console.log(error.message)
    }
}

const eliminarEstudiante = async () => {
    try {
        const text = "delete from estudiantes where rut = $1 ";
        const values = [rut];
        const response = await pool.query(text, values);
        console.log(`El estudiante con RUT ${rut} fue eliminado correctamente`);
        
    } catch (error) {
      console.log(error.message)  
    }
}
if (opcion === 'agregar') {
    agregarEstudiante();
} else if (opcion === 'mostrar') {
    mostrarEstudiantes();
} else if (opcion === 'consultarRut') {
    consultarestudianteRut();
} else if (opcion === 'actualizar') {
    actualizarEstudiante();
} else if (opcion === 'eliminar') {
    rut = argumento[1]
    eliminarEstudiante();
} else {
    console.log('Seleccionar opcion valida')
}


//actualizarEstudiante();
//consultarestudianteRut();
//mostrarEstudiantes();
//agregarEstudiante();
//eliminarEstudiante();