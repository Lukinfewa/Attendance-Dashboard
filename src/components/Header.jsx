

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm ">
      <div className="flex items-center space-x-2">
        <span className="material-symbols-outlined text-blue-500 text-3xl">school</span>
        <h1 className="text-xl font-semibold text-gray-800">Attendance Dashboard</h1>
      </div>
      <button className="p-1 rounded-full bg-gray-200">
        <span className="material-symbols-outlined text-gray-600">person</span>
      </button>
    </header>
  );
};

export default Header;