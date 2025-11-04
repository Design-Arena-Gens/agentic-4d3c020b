'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react'

interface Booking {
  id: number
  type: string
  date: string
  time: string
  duration: string
  location: string
  status: string
}

interface ScheduleViewProps {
  bookings: Booking[]
}

export default function ScheduleView({ bookings }: ScheduleViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const hasBookingOnDate = (day: number) => {
    return bookings.some((booking) => {
      const bookingDate = booking.date.toLowerCase()
      const currentDay = day
      const today = new Date().getDate()

      if (bookingDate === 'today' && day === today) return true
      if (bookingDate === 'tomorrow' && day === today + 1) return true

      return false
    })
  }

  const upcomingBookings = bookings.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex items-center justify-between text-white">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p className="text-indigo-100 text-sm">Your Schedule Overview</p>
            </div>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isToday = day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear()
              const hasBooking = hasBookingOnDate(day)

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all ${
                    isToday
                      ? 'bg-indigo-600 text-white font-bold shadow-lg'
                      : hasBooking
                      ? 'bg-purple-100 text-purple-900 font-semibold hover:bg-purple-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm">{day}</div>
                    {hasBooking && !isToday && (
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mx-auto mt-1"></div>
                    )}
                    {hasBooking && isToday && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Upcoming Bookings</h3>
            <Calendar className="w-6 h-6 text-indigo-600" />
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    booking.type === 'seat' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 capitalize">
                      {booking.type} - {booking.date}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.time} • {booking.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No upcoming bookings</p>
            </div>
          )}
        </div>

        {/* Available Resources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Available Today</h3>
            <MapPin className="w-6 h-6 text-indigo-600" />
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Desk Spaces</h4>
                <span className="text-2xl font-bold text-green-600">12</span>
              </div>
              <p className="text-sm text-gray-600">Floor 3 • 8 AM - 6 PM</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Conference Room A</h4>
                <span className="text-sm font-medium text-blue-600">Available</span>
              </div>
              <p className="text-sm text-gray-600">Next slot: 2 PM - 4 PM</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Conference Room B</h4>
                <span className="text-sm font-medium text-purple-600">Available</span>
              </div>
              <p className="text-sm text-gray-600">Next slot: 10 AM - 12 PM</p>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Meeting Pods</h4>
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <p className="text-sm text-gray-600">Floor 2 • Quick meetings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
