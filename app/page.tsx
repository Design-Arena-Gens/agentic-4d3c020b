'use client'

import { useState } from 'react'
import { Calendar, MessageSquare, User, Clock, MapPin, CheckCircle } from 'lucide-react'
import ChatInterface from './components/ChatInterface'
import BookingDisplay from './components/BookingDisplay'
import ScheduleView from './components/ScheduleView'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'bookings' | 'schedule'>('chat')
  const [bookings, setBookings] = useState<any[]>([])

  const addBooking = (booking: any) => {
    setBookings([...bookings, { ...booking, id: Date.now() }])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Receptionist</h1>
                <p className="text-sm text-gray-600">Smart Booking & Scheduling Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-2 flex space-x-2">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === 'chat'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Chat Assistant</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === 'bookings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-medium">My Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === 'schedule'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Schedule</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'chat' && <ChatInterface onBookingCreated={addBooking} />}
        {activeTab === 'bookings' && <BookingDisplay bookings={bookings} />}
        {activeTab === 'schedule' && <ScheduleView bookings={bookings} />}
      </div>
    </main>
  )
}
