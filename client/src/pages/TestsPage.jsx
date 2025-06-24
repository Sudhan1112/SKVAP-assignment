import { useState, useEffect } from 'react';
import { testService } from '../services/testService';
import { bookingService } from '../services/bookingService';
import TestCard from '../components/TestCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    preferredTime: 'morning',
    notes: ''
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const data = await testService.getAllTests();
      setTests(data);
    } catch (error) {
      setError('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTest = (test) => {
    setSelectedTest(test);
    setShowBookingModal(true);
    setBookingData({
      bookingDate: '',
      preferredTime: 'morning',
      notes: ''
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await bookingService.bookTest({
        testId: selectedTest._id,
        ...bookingData
      });
      
      setSuccess('Test booked successfully!');
      setShowBookingModal(false);
      setSelectedTest(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to book test');
    }
  };

  const handleBookingChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Lab Tests</h1>
        <p className="text-gray-600">Browse and book from our comprehensive test catalog</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <TestCard
            key={test._id}
            test={test}
            onBook={handleBookTest}
          />
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Book {selectedTest?.name}</h3>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  required
                  value={bookingData.bookingDate}
                  onChange={handleBookingChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select
                  name="preferredTime"
                  value={bookingData.preferredTime}
                  onChange={handleBookingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 8PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleBookingChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Book Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsPage;