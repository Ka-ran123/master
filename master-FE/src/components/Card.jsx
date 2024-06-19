// src/components/Card.js



// src/components/Card.js

// eslint-disable-next-line react/prop-types
const Card = ({ title, description, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 flex items-center space-x-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="text-5xl text-blue-500">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;


