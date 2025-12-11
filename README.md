# Attendance Dashboard

Este proyecto es una pequeña aplicación hecha con **React** que muestra un
panel de asistencia de estudiantes (attendance dashboard).

La idea principal es:

- Tener una lista de estudiantes con su estado de asistencia.
- Ver unas tarjetas de resumen con:
  - Total de estudiantes.
  - Presentes (**Present**).
  - Ausentes (**Absent**).
  - Llegadas tarde (**Late**).
- Poder cambiar el estado de cada estudiante desde su propia tarjeta y que
  las estadísticas de arriba se actualicen automáticamente.

He escrito este README pensando en que, dentro de unos meses, alguien (o yo
mismo) pueda volver al proyecto y entender rápido cómo funciona sin tener que
bucear en todo el código.

---

## 1. Cómo ejecutar la aplicación

### Requisitos

- **Node.js** versión 18 o superior.  
- **npm**, que viene incluido con Node.

### Pasos

1. Situarse en la carpeta del proyecto:

   
   cd attendance-dashboard
Instalar las dependencias:


npm install
Ejecutar la aplicación en modo desarrollo:

npm run dev
Abrir en el navegador la URL que aparezca en la consola.
Normalmente será algo como:


http://localhost:5173/

Scripts disponibles
En el archivo package.json tengo definidos estos scripts:

npm run dev
Arranca el servidor de desarrollo de Vite.

npm run build
Genera la versión optimizada para producción en la carpeta dist/.

npm run preview
Sirve localmente el contenido de dist/ para comprobar el build.

npm run lint
Lanza ESLint para revisar la calidad del código.

## 2. Estructura general del proyecto
A nivel simplificado, la parte importante del código está organizada así:


src/
├─ components/
│  ├─ Barra.jsx          # Barra de búsqueda de estudiantes
│  ├─ Header.jsx         # Cabecera del dashboard
│  ├─ Statscard.jsx      # Tarjetas de estadísticas (StatsSection)
│  └─ StudentCard.jsx    # Listado / tarjetas de estudiantes
├─ App.jsx               # Lógica principal y estado global
├─ main.jsx              # Punto de entrada de React
├─ index.css             # Estilos globales
└─ students.js           # Datos iniciales de los estudiantes
La idea es:

App.jsx centraliza el estado y la lógica.

Los componentes dentro de components/ son sobre todo piezas visuales que
reciben datos y callbacks desde App.

students.js contiene la lista inicial de estudiantes que se usa como base.

## 3. Datos iniciales: students.js
En students.js defino un array de estudiantes. Cada estudiante es un objeto
con, como mínimo:

id – identificador numérico del estudiante.

name – nombre del estudiante.

status – estado de asistencia, que puede ser:

"present"

"absent"

"late"

(Opcionalmente también puedo incluir otros campos, como la ruta de una foto).

Este archivo no tiene lógica, solo datos. Su función es servir como punto de
partida para el estado de la aplicación.

En App.jsx lo importo así:

import initialStudents from "./students";
Y lo uso para inicializar el estado:

const [students, setStudents] = useState(initialStudents);
A partir de ahí, toda la app trabaja siempre con students, que es la versión
“viva” y actualizada de esa lista.

## 4. Componente principal: App.jsx
App.jsx es el corazón de la aplicación. Aquí hago todo lo importante:

Guardo la lista de estudiantes en el estado.

Defino cómo cambia el estado de un estudiante.

Calculo las estadísticas (presentes, ausentes, tarde).

Renderizo los componentes visuales (Header, StatsSection, Barra y
EstadoEstudiantes).

## 4.1. Estado de los estudiantes
Al principio del componente creo el estado:


const [students, setStudents] = useState(initialStudents);
students almacena la lista actual de estudiantes con su estado.

setStudents es la función que uso para actualizar esa lista cuando se
pulsa un botón de “Present”, “Absent” o “Late”.

## 4.2. Cambiar el estado de un estudiante
Dentro de App tengo esta función:


function handleStatusChange(id, newStatus) {
  const updated = students.map((s) => {
    if (s.id === id) {
      return { ...s, status: newStatus };
    } else {
      return s;
    }
  });
  setStudents(updated);
}

Cómo funciona:

Recibe el id del estudiante y el nuevo estado (newStatus), que será
"present", "absent" o "late".

Recorre el array students con map.

Si el id del estudiante coincide, devuelvo una copia del objeto
original ({ ...s }) pero cambiando solo status.

Si no coincide, devuelvo el estudiante tal cual.

Al final llamo a setStudents(updated) con el nuevo array.

Importante: no modifico el array original ni el objeto original, siempre
creo una copia. Es la forma recomendada de trabajar con estado en React.

Esta función se pasa como prop al componente EstadoEstudiantes
(StudentCard.jsx) para que los botones de cada tarjeta puedan invocarla
cuando el usuario hace clic.

## 4.3. Cálculo de estadísticas
En App.jsx también calculo los valores que se muestran en la parte
superior del dashboard:


const total = 32;
let present = 25;
let absent = 1;
let late = 0;

students.forEach((s) => {
  if (s.status === "present") present++;
  else if (s.status === "absent") absent++;
  else if (s.status === "late") late++;
});
Aquí lo que hago es:

Definir unos valores base:

total (por ejemplo 32).

present, absent y late con valores iniciales.
(Estos valores iniciales se pueden ajustar según el diseño o los datos que
quiera simular).

Recorrer el array actual students con forEach.

Para cada estudiante:

Si status es "present", sumo 1 a present.

Si es "absent", sumo 1 a absent.

Si es "late", sumo 1 a late.

De esta forma, las tarjetas de estadísticas de la parte superior muestran
siempre un recuento coherente con los estados de la lista students.

## 4.4. Renderizado principal
El componente App termina devolviendo este JSX:


return (
  <div className="min-h-screen bg-gray-100">
    <Header />

    <main className="p-4 md:p-8">
      <section className="mb-8">
        <StatsSection
          total={total}
          present={present}
          absent={absent}
          late={late}
        />
      </section>

      <Barra />

      <EstadoEstudiantes
        students={students}
        onStatusChange={handleStatusChange}
      />
    </main>
  </div>
);
Traducción rápida de lo que pasa aquí:

Header pinta la cabecera general del dashboard.

StatsSection recibe los números (total, present, absent, late)
ya calculados y se limita a mostrarlos en tarjetas.

Barra muestra un buscador (a nivel visual, listo para conectar).

EstadoEstudiantes pinta la lista de estudiantes y usa
onStatusChange para cambiar el estado cuando se pulsan los botones.

## 5. Barra de búsqueda: Barra.jsx
Barra.jsx es un componente pequeño que solo dibuja la caja de búsqueda.
La estructura es algo así:


const Barra = () => {
  return (
    <section className="mb-8 flex md:justify-end">
      <label className="items-left bg-white p-3 rounded-xl shadow-md border border-gray-200 w-full md:w-80">
        <span className="material-symbols-outlined text-gray-400 mr-3">
          search
        </span>
        <input
          placeholder="Search student name..."
          className="flex-1 outline-none text-gray-700"
        />
      </label>
    </section>
  );
};
Ahora mismo:

Enseña un input con un icono de lupa y estilos de tarjeta.

No está conectado a ningún estado ni filtra la lista todavía.

Si en el futuro quiero activar el buscador:

Puedo guardar el texto del input en un estado (por ejemplo en App.jsx).

Filtrar students antes de pasarlos a EstadoEstudiantes.

6. ## Tarjetas de estadísticas: Statscard.jsx 
En Statscard.jsx defino varios componentes pequeños para cada tarjeta de
estadísticas (total, presentes, ausentes, tarde) y un componente contenedor.

Un ejemplo simplificado:


const TotalEstudiantes = ({ total }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex-1 min-w-[150px]">
      <p className="text-gray-500 font-bold">Total Students</p>
      <p className="text-3xl font-bold">{total}</p>
    </div>
  );
};
Además tengo componentes similares para:

Presente → muestra el número de presentes y lo pinta en verde.

Absent → muestra los ausentes y los pinta en amarillo.

Late → muestra los que llegan tarde y los pinta en rojo.

El componente que agrupa todo es StatsSection:


const StatsSection = ({ total, present, absent, late }) => {
  return (
    <section className="flex flex-col md:flex-row gap-4 mb-8">
      <TotalEstudiantes total={total} />
      <Presente present={present} />
      <Absent absent={absent} />
      <Late late={late} />
    </section>
  );
};
Ideas clave:

StatsSection no tiene lógica, solo recibe los números y los pasa a las tarjetas.

Cada tarjeta es puramente visual: muestra el valor que le llega por props.

El diseño está hecho con clases utilitarias (fondos blancos, sombras, bordes
redondeados, colores para cada estado).

## 7. Listado de estudiantes: StudentCard.jsx
Aunque no copio aquí todo el archivo, la función de StudentCard.jsx es:

Recibir dos props desde App.jsx:

students: la lista actual de estudiantes.

onStatusChange: la función para cambiar el estado de un estudiante.

Dentro del componente:

Recorro students con .map.

Para cada estudiante pinto una tarjeta con:

Nombre, ID y (si lo he definido) una imagen.

Una etiqueta o indicador visual del estado actual.

Tres botones:

Present

Absent

Late

Cuando se pulsa uno de esos botones, llamo a onStatusChange pasando el id
del estudiante y el nuevo estado, por ejemplo:


onStatusChange(student.id, "present");
onStatusChange(student.id, "absent");
onStatusChange(student.id, "late");

Eso dispara la lógica en App.jsx, se actualiza el estado global y React
vuelve a renderizar tanto la lista como las estadísticas.

La idea es que StudentCard.jsx no decide nada de lógica “gorda”, solo se
encarga de:

Mostrar los datos que recibe.

Avisar a App cuando el usuario hace algo.

## 8. Cabecera y estilos
8.1. Header.jsx
En Header.jsx tengo la cabecera del dashboard: título principal, posible
icono, y el estilo general de la parte superior. Es un componente de
presentación que no gestiona lógica de asistencia.

8.2. Estilos
Los estilos los manejo principalmente de dos formas:

Clases tipo bg-gray-100, rounded-xl, shadow-md, etc. directamente en
los JSX.

El archivo index.css para ajustes globales (fuente, márgenes, etc.).

El resultado es un diseño tipo tarjetas sobre un fondo gris claro, con
sombras suaves y un aspecto limpio.

## 9. Resumen del flujo de datos
El flujo completo de la app es este:

students.js define la lista inicial de estudiantes.

App.jsx guarda esa lista en el estado con useState.

App.jsx calcula los contadores total, present, absent y late.

App.jsx pasa esos valores a StatsSection, que los muestra en las tarjetas.

App.jsx pasa la lista de students y la función handleStatusChange a
EstadoEstudiantes (StudentCard.jsx).

El usuario pulsa un botón en la tarjeta de un estudiante.

StudentCard.jsx llama a onStatusChange(id, nuevoEstado).

App.jsx actualiza el estado con setStudents(updated).

React vuelve a renderizar todo:

La lista de estudiantes con los nuevos estados.

Las estadísticas recalculadas.
