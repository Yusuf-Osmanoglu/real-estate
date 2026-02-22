import { ChevronLeft, ChevronRight, Plus, ExternalLink } from 'lucide-react';

export default function Calendar() {
  return (
    <div className="flex h-full">
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-gray-200">
        {/* Header */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">October 2023</h1>
            <p className="text-sm text-gray-500 mt-1">Manage property viewings & meetings.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button className="px-4 py-1.5 text-sm font-medium bg-white text-gray-900 rounded shadow-sm">Month</button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Week</button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900">Day</button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg">
                <ChevronLeft size={20} />
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                Today
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
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
            <div className="flex-1 grid grid-cols-7 grid-rows-5">
              {/* Row 1 */}
              <div className="border-r border-b border-gray-100 p-2 bg-gray-50">
                <div className="text-right text-sm text-gray-400 mb-1">28</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2 bg-gray-50">
                <div className="text-right text-sm text-gray-400 mb-1">29</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2 bg-gray-50">
                <div className="text-right text-sm text-gray-400 mb-1">30</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">1</div>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded truncate mb-1">
                  10:00 Vil...
                </div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">2</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">3</div>
                <div className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded truncate mb-1">
                  14:30 A...
                </div>
              </div>
              <div className="border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">4</div>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded truncate mb-1">
                  09:00 Yi...
                </div>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded truncate mb-1">
                  13:00 S...
                </div>
              </div>

              {/* Row 2 */}
              <div className="border-r border-b border-gray-100 p-2 border-l-2 border-l-blue-600 bg-blue-50/30">
                <div className="flex justify-end mb-1">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                </div>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded truncate mb-1">
                  11:00 G...
                </div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">6</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">7</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">8</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">9</div>
                <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded truncate mb-1">
                  10:00 K...
                </div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">10</div>
              </div>
              <div className="border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">11</div>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded truncate mb-1">
                  14:00 M...
                </div>
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded truncate mb-1">
                  16:30 Z...
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">+ 2 more</div>
              </div>

              {/* Row 3 */}
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">12</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">13</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">14</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">15</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">16</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">17</div>
              </div>
              <div className="border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">18</div>
              </div>

              {/* Row 4 */}
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">19</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">20</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-blue-600 font-bold mb-1">21</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">22</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">23</div>
              </div>
              <div className="border-r border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">24</div>
              </div>
              <div className="border-b border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">25</div>
              </div>

              {/* Row 5 */}
              <div className="border-r border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">26</div>
              </div>
              <div className="border-r border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">27</div>
              </div>
              <div className="border-r border-gray-100 p-2">
                <div className="text-right text-sm text-blue-600 font-bold mb-1">28</div>
              </div>
              <div className="border-r border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">29</div>
              </div>
              <div className="border-r border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">30</div>
              </div>
              <div className="border-r border-gray-100 p-2">
                <div className="text-right text-sm text-gray-900 mb-1">31</div>
              </div>
              <div className="p-2 bg-gray-50">
                <div className="text-right text-sm text-gray-400 mb-1">1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Upcoming */}
      <div className="w-80 shrink-0 bg-white flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Upcoming Today</h2>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">5 Oct</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="relative border-l-2 border-gray-200 ml-3 space-y-8">
            {/* Event 1 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-gray-900"></div>
              <div className="text-sm font-bold text-gray-900 mb-1">11:00 AM</div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Galata Penthouse Viewing</h3>
                <div className="flex items-center gap-2 mb-3">
                  <img src="https://i.pravatar.cc/150?img=68" alt="Client" className="w-6 h-6 rounded-full" />
                  <span className="text-sm text-gray-600">Mr. & Mrs. Yilmaz</span>
                </div>
                <a href="#" className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  View Property <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-gray-300"></div>
              <div className="text-sm font-bold text-gray-500 mb-1">02:30 PM</div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm opacity-75">
                <h3 className="font-bold text-gray-900 mb-2">Contract Signing</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">K</div>
                  <span className="text-sm text-gray-600">Kerem Bursin</span>
                </div>
                <div className="text-sm text-gray-400 flex items-center gap-1">
                  Office Meeting Room B
                </div>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white bg-gray-400"></div>
              <div className="text-sm font-bold text-gray-500 mb-1">04:00 PM</div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">Bosphorus Villa Tour</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">E</div>
                  <span className="text-sm text-gray-600">Elif Kara</span>
                </div>
                <a href="#" className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  View Property <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">Next: November 2023</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            <div className="text-gray-400 font-medium py-1">M</div>
            <div className="text-gray-400 font-medium py-1">T</div>
            <div className="text-gray-400 font-medium py-1">W</div>
            <div className="text-gray-400 font-medium py-1">T</div>
            <div className="text-gray-400 font-medium py-1">F</div>
            <div className="text-gray-400 font-medium py-1">S</div>
            <div className="text-gray-400 font-medium py-1">S</div>
            
            <div className="text-gray-300 py-1">30</div>
            <div className="text-gray-300 py-1">31</div>
            <div className="text-gray-900 font-medium py-1">1</div>
            <div className="text-gray-900 font-medium py-1">2</div>
            <div className="text-gray-900 font-medium py-1">3</div>
            <div className="text-gray-900 font-medium py-1">4</div>
            <div className="text-gray-900 font-medium py-1">5</div>
          </div>
        </div>
      </div>
    </div>
  );
}
