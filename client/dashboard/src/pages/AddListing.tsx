import { Upload, Image as ImageIcon, Link as LinkIcon, FileText, Ruler } from 'lucide-react';

export default function AddListing() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center text-sm text-gray-500">
          <span className="hover:text-gray-900 cursor-pointer">Dashboard</span>
          <span className="mx-2">/</span>
          <span className="hover:text-gray-900 cursor-pointer">Properties</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Add New Listing</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Save Draft
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Upload size={16} />
            Publish Listing
          </button>
        </div>
      </header>

      <div className="flex-1 p-8 max-w-7xl mx-auto w-full flex gap-8">
        {/* Left Sidebar - Steps */}
        <div className="w-64 shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Property</h1>
          <p className="text-sm text-gray-500 mb-8">Fill in the details below to publish a new luxury listing.</p>
          
          <nav className="space-y-1">
            <div className="px-4 py-3 bg-white border-l-4 border-blue-600 rounded-r-lg shadow-sm">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Step 1</div>
              <div className="text-sm font-medium text-gray-900">Basic Information</div>
            </div>
            <div className="px-4 py-3 border-l-4 border-transparent">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 2</div>
              <div className="text-sm font-medium text-gray-500">Location Details</div>
            </div>
            <div className="px-4 py-3 border-l-4 border-transparent">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 3</div>
              <div className="text-sm font-medium text-gray-500">Property Features</div>
            </div>
            <div className="px-4 py-3 border-l-4 border-transparent">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step 4</div>
              <div className="text-sm font-medium text-gray-500">Media Gallery</div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Property Details */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Property Details</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Luxury Bosphorus Villa with Private Pool" 
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>Penthouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Listing Status</label>
                  <select className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded font-bold">B</button>
                    <button className="p-1 hover:bg-gray-200 rounded italic">I</button>
                    <button className="p-1 hover:bg-gray-200 rounded underline">U</button>
                    <div className="w-px h-6 bg-gray-300 mx-1"></div>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                  </div>
                  <textarea 
                    rows={5}
                    placeholder="Describe the property features, view, and unique selling points..."
                    className="w-full px-4 py-3 text-sm focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Featured Listing</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">Available for Citizenship</span>
                </label>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Ruler className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-gray-900">Measurements</h2>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gross Area (m²)</label>
                <input 
                  type="text" 
                  placeholder="0" 
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Net Area (m²)</label>
                <input 
                  type="text" 
                  placeholder="0" 
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <select className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                <select className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 shrink-0 space-y-6">
          {/* Gallery */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Gallery</h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Max 20MB</span>
            </div>

            <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <Upload size={24} />
              </div>
              <div className="text-sm font-medium text-blue-600 mb-1">Click to upload</div>
              <div className="text-xs text-gray-500">or drag and drop images here</div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Gallery 1" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Gallery 2" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 bg-gray-50 cursor-pointer hover:bg-gray-100">
                <ImageIcon size={20} />
              </div>
            </div>
          </div>

          {/* Video Tour */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Video Tour</h2>
            <div>
              <label className="block text-xs text-gray-500 mb-2">YouTube / Vimeo URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="https://youtube.com/..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
