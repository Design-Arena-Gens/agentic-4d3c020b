'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ChatInterfaceProps {
  onBookingCreated: (booking: any) => void
}

export default function ChatInterface({ onBookingCreated }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI receptionist. I can help you book seats, schedule meetings, and manage your reservations. What would you like to do today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const processUserIntent = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()

    // Book seat patterns
    if (lowerMsg.includes('book') && (lowerMsg.includes('seat') || lowerMsg.includes('desk'))) {
      const dateMatch = userMessage.match(/tomorrow|today|monday|tuesday|wednesday|thursday|friday|(\d{1,2}\/\d{1,2})|next week/)
      const timeMatch = userMessage.match(/(\d{1,2})(:\d{2})?\s*(am|pm)/i)

      const bookingDetails = {
        type: 'seat',
        date: dateMatch ? dateMatch[0] : 'today',
        time: timeMatch ? timeMatch[0] : '9:00 AM',
        duration: '8 hours',
        location: 'Office Floor 3',
        status: 'confirmed'
      }

      onBookingCreated(bookingDetails)

      return `Perfect! I've booked a seat for you:\n\n📅 Date: ${bookingDetails.date}\n⏰ Time: ${bookingDetails.time}\n📍 Location: ${bookingDetails.location}\n⏱️ Duration: ${bookingDetails.duration}\n\nYour booking confirmation has been sent. Is there anything else you need?`
    }

    // Schedule meeting patterns
    if (lowerMsg.includes('schedule') || lowerMsg.includes('meeting') || lowerMsg.includes('book a room')) {
      const meetingDetails = {
        type: 'meeting',
        date: 'tomorrow',
        time: '2:00 PM',
        duration: '1 hour',
        location: 'Conference Room A',
        status: 'confirmed'
      }

      onBookingCreated(meetingDetails)

      return `Great! I've scheduled your meeting:\n\n📅 Date: Tomorrow\n⏰ Time: 2:00 PM\n📍 Location: Conference Room A\n⏱️ Duration: 1 hour\n\nMeeting invite sent! Would you like to add any attendees?`
    }

    // Check availability
    if (lowerMsg.includes('available') || lowerMsg.includes('free')) {
      return `Let me check availability for you:\n\n✅ Today: 5 seats available on Floor 3\n✅ Tomorrow: 8 seats available on Floor 3\n✅ Conference Room A: Available 2-4 PM\n✅ Conference Room B: Available all day\n\nWould you like to book any of these?`
    }

    // View bookings
    if (lowerMsg.includes('my booking') || lowerMsg.includes('reservation') || lowerMsg.includes('show')) {
      return `You can view all your bookings in the "My Bookings" tab above. You currently have bookings scheduled. Would you like to make a new booking?`
    }

    // Cancel booking
    if (lowerMsg.includes('cancel')) {
      return `To cancel a booking, please go to the "My Bookings" tab where you can manage all your reservations. Which booking would you like to cancel?`
    }

    // Help
    if (lowerMsg.includes('help') || lowerMsg.includes('what can you do')) {
      return `I can help you with:\n\n🪑 Book a seat/desk for any day\n📅 Schedule meetings and conference rooms\n🔍 Check availability\n📋 View your bookings\n❌ Cancel reservations\n\nJust tell me what you need! For example:\n- "Book a seat for tomorrow"\n- "Schedule a meeting for 3 PM"\n- "Check availability for Friday"`
    }

    // Default response
    return `I understand you're interested in booking or scheduling. Could you please specify:\n\n• Do you want to book a seat/desk?\n• Or schedule a meeting room?\n• What date and time would you prefer?\n\nExample: "Book a seat for tomorrow at 9 AM"`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: processUserIntent(input),
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions = [
    'Book a seat for tomorrow',
    'Schedule a meeting',
    'Check availability',
    'View my bookings',
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-16rem)]">
      {/* Chat Messages */}
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-indigo-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-medium text-gray-600">Quick Actions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => setInput(action)}
                className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
