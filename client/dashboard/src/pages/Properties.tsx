import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Upload, FileText, MapPin, Image as ImageIcon, Loader2, CheckCircle, AlertCircle, ListChecks } from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    district: string;
    address: string;
  };
  type: 'villa' | 'apartment' | 'commercial';
  status: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features?: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: { seconds: number; nanoseconds: number } | null;
  createdBy?: string;
}

export default function Properties() {
  const { currentUser } = useAuth();
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
  
  const initialFormState: Property = {
    title: '',
    description: '',
    price: 0,
    location: { city: '', district: '', address: '' },
    type: 'apartment',
    status: 'sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: [],
    features: [],
    isFeatured: false,
    isActive: true,
  };

  const AVAILABLE_FEATURES = [
    'Swimming Pool',
    'Private Gym',
    'Indoor Parking',
    'Smart Home System',
    '24/7 Security',
    'Central Cooling',
    'Balcony',
    'Sea View',
    'Elevator',
    'Children\'s Playground'
  ];

  const [formData, setFormData] = useState<Property>(initialFormState);
  const [uploadingCount, setUploadingCount] = useState(0);

  useEffect(() => {
    if (view === 'list') {
      fetchProperties();
    }
  }, [view]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const propsData: Property[] = [];
      querySnapshot.forEach((doc) => {
        propsData.push({ id: doc.id, ...doc.data() } as Property);
      });
      setProperties(propsData);
    } catch (error) {
      console.error("Error fetching properties: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setPropertyToDelete(id);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    try {
      await deleteDoc(doc(db, 'properties', propertyToDelete));
      setProperties(properties.filter(p => p.id !== propertyToDelete));
      showNotification('Listing deleted successfully.', 'success');
    } catch (error) {
      console.error("Error deleting property: ", error);
      showNotification('An error occurred while deleting the listing.', 'error');
    } finally {
      setPropertyToDelete(null);
    }
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setFormData(property);
    setView('edit');
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    e.target.value = '';

    setUploadingCount(prev => prev + files.length);

    for (const file of files) {
      try {
        const data = new FormData();
        data.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: 'POST',
          body: data,
        });
        const json = await res.json();
        if (json.success) {
          const url: string = json.data.url;
          setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
        } else {
          showNotification('Image upload failed: ' + (json.error?.message || 'Unknown error'), 'error');
        }
      } catch {
        showNotification('Connection error while uploading image.', 'error');
      } finally {
        setUploadingCount(prev => prev - 1);
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const propertyData = {
        ...formData,
        createdAt: formData.createdAt || serverTimestamp(),
        createdBy: formData.createdBy || currentUser?.uid || 'unknown'
      };

      if (view === 'add') {
        await addDoc(collection(db, 'properties'), propertyData);
      } else if (view === 'edit' && selectedProperty?.id) {
        await updateDoc(doc(db, 'properties', selectedProperty.id), propertyData);
      }

      setView('list');
      setFormData(initialFormState);
      showNotification('Listing saved successfully.', 'success');
    } catch (error) {
      console.error("Error saving property: ", error);
      showNotification('An error occurred while saving the listing.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (view === 'add' || view === 'edit') {
    return (
      <div className="flex flex-col h-full relative">
        {notification && (
          <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 text-sm font-medium text-white transition-all duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {notification.message}
          </div>
        )}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center text-sm text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer" onClick={() => setView('list')}>Properties</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{view === 'add' ? 'Add New Listing' : 'Edit Listing'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => {
                setView('list');
                setFormData(initialFormState);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {view === 'add' ? 'Publish Listing' : 'Save Changes'}
            </button>
          </div>
        </header>

        <div className="flex-1 p-8 max-w-7xl mx-auto w-full flex gap-8">
          <div className="flex-1 space-y-6">
            <form id="property-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Info */}
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
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Modern Loft in Besiktas" 
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                      <select 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value as Property['type']})}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Listing Status</label>
                      <select 
                        value={formData.status}
                        onChange={e => setFormData({...formData, status: e.target.value as Property['status']})}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₺)</label>
                      <input 
                        type="number" 
                        required
                        value={formData.price || ''}
                        onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                        placeholder="4500000" 
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (m²)</label>
                      <input 
                        type="number" 
                        required
                        value={formData.area || ''}
                        onChange={e => setFormData({...formData, area: Number(e.target.value)})}
                        placeholder="120" 
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                      <input 
                        type="number" 
                        required
                        value={formData.bedrooms || ''}
                        onChange={e => setFormData({...formData, bedrooms: Number(e.target.value)})}
                        placeholder="2" 
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                      <input 
                        type="number" 
                        required
                        value={formData.bathrooms || ''}
                        onChange={e => setFormData({...formData, bathrooms: Number(e.target.value)})}
                        placeholder="1" 
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      placeholder="Sea view, fully furnished luxury loft apartment..."
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">Featured Property</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="isActive"
                        checked={formData.isActive}
                        onChange={e => setFormData({...formData, isActive: e.target.checked})}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="text-blue-600" size={20} />
                  <h2 className="text-lg font-bold text-gray-900">Location</h2>
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        required
                        value={formData.location.city}
                        onChange={e => setFormData({...formData, location: {...formData.location, city: e.target.value}})}
                        placeholder="Istanbul" 
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <input 
                        type="text" 
                        required
                        value={formData.location.district}
                        onChange={e => setFormData({...formData, location: {...formData.location, district: e.target.value}})}
                        placeholder="Besiktas" 
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                    <input 
                      type="text" 
                      required
                      value={formData.location.address}
                      onChange={e => setFormData({...formData, location: {...formData.location, address: e.target.value}})}
                      placeholder="Ciragan St. No:10" 
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities & Features */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ListChecks className="text-blue-600" size={20} />
                  <h2 className="text-lg font-bold text-gray-900">Amenities & Features</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {AVAILABLE_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`feature-${feature}`}
                        checked={formData.features?.includes(feature) || false}
                        onChange={(e) => {
                          const currentFeatures = formData.features || [];
                          if (e.target.checked) {
                            setFormData({ ...formData, features: [...currentFeatures, feature] });
                          } else {
                            setFormData({ ...formData, features: currentFeatures.filter(f => f !== feature) });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`feature-${feature}`} className="text-sm text-gray-700 cursor-pointer">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ImageIcon className="text-blue-600" size={20} />
                  <h2 className="text-lg font-bold text-gray-900">Media Gallery</h2>
                </div>

                {/* Uploaded image previews */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                    {formData.images.map((url, i) => (
                      <div key={`img-${i}`} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >✕</button>
                      </div>
                    ))}
                    {uploadingCount > 0 && Array.from({ length: uploadingCount }).map((_, i) => (
                      <div key={`uploading-${i}`} className="aspect-square rounded-lg border-2 border-blue-300 border-dashed bg-blue-50 flex flex-col items-center justify-center gap-1">
                        <Loader2 size={20} className="animate-spin text-blue-500" />
                        <span className="text-[10px] text-blue-500">Uploading</span>
                      </div>
                    ))}
                  </div>
                )}

                {formData.images.length === 0 && uploadingCount > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                    {Array.from({ length: uploadingCount }).map((_, i) => (
                      <div key={`uploading-${i}`} className="aspect-square rounded-lg border-2 border-blue-300 border-dashed bg-blue-50 flex flex-col items-center justify-center gap-1">
                        <Loader2 size={20} className="animate-spin text-blue-500" />
                        <span className="text-[10px] text-blue-500">Uploading</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors relative ${uploadingCount > 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploadingCount > 0}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    {uploadingCount > 0 ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {uploadingCount > 0 ? `${uploadingCount} image(s) uploading...` : 'Click or drag to upload images'}
                  </h3>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP — Uploaded to ImgBB</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full relative">
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 text-sm font-medium text-white transition-all duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {propertyToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-lg font-bold text-gray-900">Delete Listing</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPropertyToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
          {loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : properties.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No properties found. Add a new property to get started.
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Visibility</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {properties.map((property) => (
                  <tr key={property.id} className={`hover:bg-gray-50 transition-colors ${!property.isActive ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        {property.images && property.images.length > 0 ? (
                          <img src={property.images[0]} alt={property.title} className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                            <ImageIcon size={16} />
                          </div>
                        )}
                        <span>{property.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{property.location.district}, {property.location.city}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">₺{property.price.toLocaleString('tr-TR')}</td>
                    <td className="px-6 py-4 text-gray-500 capitalize">{property.type}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.status === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.status === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          if (property.id) {
                            await updateDoc(doc(db, 'properties', property.id), { isActive: !property.isActive });
                            setProperties(properties.map(p => p.id === property.id ? { ...p, isActive: !p.isActive } : p));
                          }
                        }}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          property.isActive ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {property.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(property)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => property.id && handleDelete(property.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
