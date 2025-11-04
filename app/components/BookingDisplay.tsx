'use client'

import { MapPin, Clock, Calendar, CheckCircle, XCircle, Trash2 } from 'lucide-react'

interface Booking {
  id: number
  type: string
  date: string
  time: string
  duration: string
  location: string
  status: string
}

interface BookingDisplayProps {
  bookings: Booking[]
}

export default function BookingDisplay({ bookings }: BookingDisplayProps) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 p-6 rounded-full">
            <Calendar className="w-16 h-16 text-gray-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
        <p className="text-gray-600 mb-6">
          You don't have any bookings at the moment. Use the Chat Assistant to create your first booking!
        </p>
        <div className="flex justify-center space-x-4">
          <div className="text-left bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Try saying:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• "Book a seat for tomorrow"</li>
              <li>• "Schedule a meeting for 3 PM"</li>
              <li>• "I need a desk for next Monday"</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <p className="text-gray-600">Manage all your seat bookings and meeting schedules</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div
              className={`h-2 ${
                booking.type === 'seat'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            ></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {booking.type} Booking
                  </h3>
                  <div className="flex items-center mt-1">
                    {booking.status === 'confirmed' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-xs font-medium text-green-600">Confirmed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-xs font-medium text-yellow-600">Pending</span>
                      </>
                    )}
                  </div>
                </div>
                <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium capitalize">{booking.date}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-3 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">Time & Duration</p>
                    <p className="text-sm font-medium">
                      {booking.time} ({booking.duration})
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{booking.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex space-x-2">
                <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                  Modify
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white mt-6">
        <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{bookings.length}</p>
            <p className="text-sm text-indigo-100">Total Bookings</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </p>
            <p className="text-sm text-indigo-100">Confirmed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              {bookings.filter((b) => b.type === 'seat').length}
            </p>
            <p className="text-sm text-indigo-100">Seats</p>
          </div>
        </div>
      </div>
    </div>
  )
}
