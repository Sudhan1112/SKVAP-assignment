const BookingCard = ({ booking, onCancel, onDownloadReport }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {booking.labTest.name}
        </h3>
        <span className={`px-2 py-1 rounded text-sm capitalize ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Booking Date:</span>
          <span>{formatDate(booking.bookingDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Preferred Time:</span>
          <span className="capitalize">{booking.preferredTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-semibold">${booking.labTest.price}</span>
        </div>
      </div>

      {booking.notes && (
        <div className="mb-4">
          <span className="text-gray-600">Notes:</span>
          <p className="text-gray-800 mt-1">{booking.notes}</p>
        </div>
      )}

      <div className="flex gap-2">
        {booking.status === 'completed' && (
          <button
            onClick={() => onDownloadReport(booking._id)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Download Report
          </button>
        )}
        
        {(booking.status === 'pending' || booking.status === 'confirmed') && (
          <button
            onClick={() => onCancel(booking._id)}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;