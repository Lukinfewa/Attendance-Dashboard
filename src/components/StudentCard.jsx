// src/components/StudentCard.jsx

// Componente que recibe la lista de alumnos
function EstadoEstudiantes({ students, onStatusChange }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}

// Tarjeta individual (se parece a tu StudentCardOlivia, pero con datos dinámicos)
function StudentCard({ student, onStatusChange }) {
  const status = student.status;

  let badgeClass = "";
  let badgeText = "";

  if (status === "present") {
    badgeClass = "text-green-700 bg-green-300";
    badgeText = "Present";
  } else if (status === "absent") {
    badgeClass = "text-red-700 bg-red-300";
    badgeText = "Absent";
  } else if (status === "late") {
    badgeClass = "text-yellow-700 bg-yellow-300";
    badgeText = "Late";
  }

  function buttonClass(buttonStatus) {
    if (status === buttonStatus) {
      // botón seleccionado → azul
      return "flex-1 py-2 text-sm font-medium rounded-lg bg-blue-500 text-white shadow-md";
    } else {
      // botón normal
      return "flex-1 py-2 text-sm font-medium rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-300";
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between h-full">
      {/* Información del estudiante */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <img
            alt={`Avatar de ${student.name}`}
            src={student.image}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{student.name}</p>
            <p className="text-xs text-gray-500">ID: {student.id}</p>
          </div>
        </div>

        {/* Etiqueta de estado */}
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full mt-1 ${badgeClass}`}
        >
          {badgeText}
        </span>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        <button
          className={buttonClass("present")}
          onClick={() => onStatusChange(student.id, "present")}
        >
          Present
        </button>

        <button
          className={buttonClass("absent")}
          onClick={() => onStatusChange(student.id, "absent")}
        >
          Absent
        </button>

        <button
          className={buttonClass("late")}
          onClick={() => onStatusChange(student.id, "late")}
        >
          Late
        </button>
      </div>
    </div>
  );
}

export default EstadoEstudiantes;
