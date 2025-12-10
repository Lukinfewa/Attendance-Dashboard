const TotalEstudiantes = ({ total }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex-1 min-w-[150px]">
      <p className="text-gray-500  font-bold ">Total Students</p>
      <p className="text-3xl font-bold ">{total}</p>  {/* 👈 antes era 32 */}
    </div>
  );
};

const Presente = ({ present }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex-1 min-w-[150px]">
      <p className="text-gray-500  font-bold">Present</p>
      <p className="text-3xl text-green-500 font-bold">{present}</p> {/* 28 */}
    </div>
  );
};

const Absent = ({ absent }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex-1 min-w-[150px]">
      <p className="text-gray-500  font-bold">Absent</p>
      <p className="text-3xl text-yellow-500 font-bold">{absent}</p> {/* 3 */}
    </div>
  );
};

const Late = ({ late }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex-1 min-w-[150px]">
      <p className="text-gray-500  font-bold">Late</p>
      <p className="text-3xl text-red-500 font-bold">{late}</p> {/* 1 */}
    </div>
  );
};


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


export default StatsSection;