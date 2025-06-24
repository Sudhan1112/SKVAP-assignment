const Alert = ({ message, type = 'info', onClose }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700';
    }
  };

  return (
    <div className={`border px-4 py-3 rounded mb-4 ${getAlertStyles()}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-lg font-bold hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;