import { useEffect, useState } from "react";
import "../src/app/globals.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h2 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Schools List
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* School Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={school.image}
                alt={school.name}
                className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* School Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {school.name}
              </h3>
              <p className="text-gray-600 text-sm">{school.address}</p>
              <p className="text-gray-500 text-sm">{school.city}</p>
            </div>

            {/* CTA button like your screenshot */}
            <div className="px-4 pb-4">
              <button className="w-full bg-gradient-to-r from-purple-800 to-blue-800 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
