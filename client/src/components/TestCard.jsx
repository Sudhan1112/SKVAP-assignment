const TestCard = ({ test, onBook }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{test.name}</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
          {test.category}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{test.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold">${test.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span>{test.duration}</span>
        </div>
      </div>

      {test.preparation && test.preparation.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Preparation:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {test.preparation.map((prep, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {prep}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => onBook(test)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Book Test
      </button>
    </div>
  );
};

export default TestCard;