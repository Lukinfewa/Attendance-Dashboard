const Barra = () => {
  return (
  <section className="mb-8 flex md:justify-end">
            <label className="  items-left bg-white p-3 rounded-xl shadow-md border border-gray-200 w-full md:w-80">
              <span className="material-symbols-outlined text-gray-400 mr-3">search</span>
              <input placeholder="Search student name..." className="flex-1 outline-none text-gray-700" />
            </label>
          </section>
          
  );
};

export default Barra;