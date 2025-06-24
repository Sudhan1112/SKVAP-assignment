// src/pages/BookingsPage.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import BookingCard from '../components/BookingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingService.cancelBooking(bookingId);
      setSuccess('Booking cancelled successfully');
      fetchBookings(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleDownloadReport = async (bookingId) => {
    try {
      const reportData = await bookingService.downloadReport(bookingId);
      
      // Create and download a JSON file with report data
      const dataStr = JSON.stringify(reportData.report, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `test-report-${bookingId}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSuccess('Report downloaded successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to download report');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your test bookings</p>
      </div>

      {error && (
        <Alert 
          message={error} 
          type="error" 
          onClose={() => setError('')} 
        />
      )}

      {success && (
        <Alert 
          message={success} 
          type="success" 
          onClose={() => setSuccess('')} 
        />
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No bookings found</div>
          <p className="text-gray-400 mb-6">You haven't booked any tests yet.</p>
          <Link
            to="/tests"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Available Tests
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancelBooking}
              onDownloadReport={handleDownloadReport}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;