import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, MoreVertical, Upload, FileText, MapPin, Image as ImageIcon } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  status: string;
  date: string;
}

export default function Properties() {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const properties: Property[] = [
    { id: 1, title: 'Luxury Bosphorus Villa', location: 'Bebek, Istanbul', price: '$5,200,000', type: 'Villa', status: 'For Sale', date: 'Oct 24, 2023' },
    { id: 2, title: 'Modern Sea View Penthouse', location: 'Karakoy, Istanbul', price: '$2,100,000', type: 'Penthouse', status: 'For Sale', date: 'Oct 22, 2023' },
    { id: 3, title: 'Exclusive Marina Apartment', location: 'Yalikavak, Bodrum', price: '$15,000/mo', type: 'Apartment', status: 'For Rent', date: 'Oct 20, 2023' },
  ];

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setView('edit');
  };

  if (view === 'add' || view === 'edit') {
    return (
      <div className="flex flex-col h-full">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer" onClick={() => setView('list')}>Properties</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{view === 'add' ? 'Add New Listing' : 'Edit Listing'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('list')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Upload size={16} />
              {view === 'add' ? 'Publish Listing' : 'Save Changes'}
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 max-w-7xl mx-auto w-full flex gap-8">
          <div className="w-64 shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{view === 'add' ? 'Add Property' : 'Edit Property'}</h1>
            <p className="text-sm text-gray-500 mb-8">Fill in the details below to {view === 'add' ? 'publish a new' : 'update the'} luxury listing.</p>
            
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

          <div className="flex-1 space-y-6">
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
                    defaultValue={view === 'edit' ? selectedProperty?.title : ''}
                    placeholder="e.g. Luxury Bosphorus Villa with Private Pool" 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select 
                      defaultValue={view === 'edit' ? selectedProperty?.type : 'Villa'}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option>Villa</option>
                      <option>Apartment</option>
                      <option>Penthouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Listing Status</label>
                    <select 
                      defaultValue={view === 'edit' ? selectedProperty?.status : 'For Sale'}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    >
                      <option>For Sale</option>
                      <option>For Rent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input 
                    type="text" 
                    defaultValue={view === 'edit' ? selectedProperty?.price : ''}
                    placeholder="0.00" 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={5}
                    placeholder="Describe the property..."
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-gray-900">Location</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    type="text" 
                    defaultValue={view === 'edit' ? selectedProperty?.location : ''}
                    placeholder="Full address" 
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-gray-900">Media Gallery</h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Upload size={24} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Click to upload or drag and drop</h3>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your property listings</p>
        </div>
        <button 
          onClick={() => setView('add')}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add New Property
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search properties..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{property.title}</td>
                  <td className="px-6 py-4 text-gray-500">{property.location}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{property.price}</td>
                  <td className="px-6 py-4 text-gray-500">{property.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      property.status === 'For Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{property.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(property)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-blue-50 text-blue-600 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
