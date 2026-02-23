import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, ExternalLink, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parseISO } from 'date-fns';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface CalendarEvent {
  id?: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  description: string;
  type: 'viewing' | 'meeting' | 'other';
  createdAt?: any;
  createdBy?: string;
}

export default function Calendar() {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:00',
    description: '',
    type: 'viewing'
  });

  const showNotificationMsg = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Fetch events for the current month (simplified: fetching all for now, can be optimized)
      const q = query(collection(db, 'events'), orderBy('date', 'asc'), orderBy('time', 'asc'));
      const querySnapshot = await getDocs(q);
      const eventsData: CalendarEvent[] = [];
      querySnapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() } as CalendarEvent);
      });
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const eventData = {
        ...newEvent,
        createdAt: serverTimestamp(),
        createdBy: currentUser?.uid || 'unknown'
      };
      
      // Add to events collection
      const docRef = await addDoc(collection(db, 'events'), eventData);
      
      // Add to notifications collection
      await addDoc(collection(db, 'notifications'), {
        title: 'Yeni Randevu Eklendi',
        message: `${newEvent.title} - ${format(parseISO(newEvent.date), 'dd MMM yyyy')} saat ${newEvent.time}`,
        type: 'event',
        isRead: false,
        createdAt: serverTimestamp(),
        link: '/calendar'
      });

      setEvents([...events, { id: docRef.id, ...eventData }]);
      setShowAddModal(false);
      setNewEvent({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '10:00',
        description: '',
        type: 'viewing'
      });
      showNotificationMsg('Appointment added successfully and notification sent.', 'success');
    } catch (error) {
      console.error("Error adding event:", error);
      showNotificationMsg('An error occurred while adding the appointment.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Calendar Grid Logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      
      // Find events for this day
      const dayEvents = events.filter(e => e.date === format(cloneDay, 'yyyy-MM-dd'));

      days.push(
        <div
          key={day.toString()}
          className={`border-r border-b border-gray-100 p-2 min-h-[100px] ${
            !isSameMonth(day, monthStart)
              ? "bg-gray-50 text-gray-400"
              : isSameDay(day, new Date())
              ? "bg-blue-50/30 border-l-2 border-l-blue-600"
              : "bg-white"
          }`}
        >
          <div className={`flex justify-end mb-1`}>
            <div className={`text-sm ${isSameDay(day, new Date()) ? 'w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold' : 'text-gray-900'}`}>
              {formattedDate}
            </div>
          </div>
          <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
            {dayEvents.map((event, idx) => (
              <div 
                key={idx} 
                className={`text-xs px-2 py-1 rounded truncate cursor-pointer ${
                  event.type === 'viewing' ? 'bg-blue-100 text-blue-800' : 
                  event.type === 'meeting' ? 'bg-purple-100 text-purple-800' : 
                  'bg-gray-100 text-gray-800'
                }`}
                title={`${event.time} - ${event.title}`}
              >
                <span className="font-semibold">{event.time}</span> {event.title}
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 flex-1" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  // Upcoming events for sidebar
  const upcomingEvents = events
    .filter(e => new Date(`${e.date}T${e.time}`) >= new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .slice(0, 5);

  return (
    <div className="flex h-full relative">
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 text-sm font-medium text-white transition-all duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-gray-200">
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{format(currentDate, 'MMMM yyyy')}</h1>
            <p className="text-sm text-gray-500 mt-1">Manage property viewings & meetings.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg">
                <ChevronLeft size={20} />
              </button>
              <button onClick={goToToday} className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                Today
              </button>
              <button onClick={nextMonth} className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg">
                <ChevronRight size={20} />
              </button>
            </div>

            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} />
              New Event
            </button>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 p-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div key={day} className="py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 flex flex-col">
              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : (
                rows
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white flex flex-col h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-sm text-gray-500 mt-1">Your schedule for the next few days</p>
        </div>
        
        <div className="p-6 space-y-6">
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No upcoming events.</p>
          ) : (
            upcomingEvents.map((event, idx) => (
              <div key={idx} className="relative pl-4 border-l-2 border-blue-600">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-600 border-2 border-white"></div>
                <p className="text-xs font-bold text-blue-600 mb-1">{format(parseISO(event.date), 'dd MMM')} • {event.time}</p>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{event.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{event.description}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add New Appointment</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Villa Showing"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    required
                    value={newEvent.time}
                    onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  value={newEvent.type}
                  onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="viewing">Viewing</option>
                  <option value="meeting">Meeting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={newEvent.description}
                  onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Client notes, address, etc."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
