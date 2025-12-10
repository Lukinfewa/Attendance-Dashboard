import { useState } from "react";
import Barra from "./components/Barra";
import Header from "./components/Header";
import StatsSection from "./components/Statscard";
import EstadoEstudiantes from "./components/StudentCard";
import initialStudents from "./students";


function App() {
  const [students, setStudents] = useState(initialStudents);

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

  const total = 32;
  let present = 25;
  let absent = 1;
  let late = 0;

  students.forEach((s) => {
    if (s.status === "present") present++;
    else if (s.status === "absent") absent++;
    else if (s.status === "late") late++;
  });

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
}

export default App;
