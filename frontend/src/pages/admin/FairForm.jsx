import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, ImagePlus, AlertCircle } from 'lucide-react';
import { fairsAPI } from '../../services/api';

const initialState = {
  title: '', description: '', date: '', start_time: '', end_time: '',
  location_name: '', address: '', city: '', state: 'SP',
  maps_link: '', status: 'agendada',
};

const Fieldset = ({ title, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5">
    <h2 className="font-bold text-gray-900 text-sm mb-4">{title}</h2>
    {children}
  </div>
);

const AdminFairForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    fairsAPI.getById(id).then(({ data }) => {
      setForm({
        title: data.title || '',
        description: data.description || '',
        date: data.date?.slice(0, 10) || '',
        start_time: data.start_time?.slice(0, 5) || '',
        end_time: data.end_time?.slice(0, 5) || '',
        location_name: data.location_name || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || 'SP',
        maps_link: data.maps_link || '',
        status: data.status || 'agendada',
      });
      setCurrentPhoto(data.cover_photo);
      setLoading(false);
    }).catch(() => navigate('/admin/feirinhas'));
  }, [id, isEdit, navigate]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) { setPhoto(file); setPhotoPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('cover_photo', photo);
      if (isEdit) { await fairsAPI.update(id, fd); }
      else        { await fairsAPI.create(fd); }
      navigate('/admin/feirinhas');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar. Tente novamente.');
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="text-center py-20">
      <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );

  return (
    <div className="animate-fade-in max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/admin/feirinhas" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-xl font-extrabold text-gray-900">
          {isEdit ? 'Editar Feirinha' : 'Nova Feirinha'}
        </h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-sm">
          <AlertCircle size={14} className="flex-shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Foto */}
        <Fieldset title="Foto de capa">
          <div className="flex items-center gap-5">
            <div className="w-32 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              {photoPreview || currentPhoto
                ? <img src={photoPreview || currentPhoto} alt="Preview" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><ImagePlus size={22} className="text-gray-300" /></div>
              }
            </div>
            <div>
              <label className="btn-outline text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-1.5">
                <ImagePlus size={13} /> Escolher foto
                <input type="file" className="hidden" accept="image/*" onChange={handlePhoto} />
              </label>
              <p className="text-xs text-gray-400 mt-2">JPEG, PNG ou WebP · Máx. 5MB</p>
            </div>
          </div>
        </Fieldset>

        {/* Informações */}
        <Fieldset title="Informações">
          <div className="space-y-4">
            <div>
              <label className="label">Título *</label>
              <input type="text" name="title" value={form.title} onChange={handleChange}
                className="input-field" placeholder="Ex: Feirinha de Adoção — Shopping Interlagos" required />
            </div>
            <div>
              <label className="label">Descrição</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={3} className="input-field resize-none"
                placeholder="O que esperar da feirinha, informações gerais..." />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 sm:col-span-1">
                <label className="label">Data *</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="label">Início *</label>
                <input type="time" name="start_time" value={form.start_time} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="label">Fim</label>
                <input type="time" name="end_time" value={form.end_time} onChange={handleChange} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="select-field">
                <option value="agendada">Agendada</option>
                <option value="realizada">Realizada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </Fieldset>

        {/* Local */}
        <Fieldset title="Local">
          <div className="space-y-4">
            <div>
              <label className="label">Nome do local *</label>
              <input type="text" name="location_name" value={form.location_name} onChange={handleChange}
                className="input-field" placeholder="Ex: Shopping Interlagos" required />
            </div>
            <div>
              <label className="label">Endereço</label>
              <input type="text" name="address" value={form.address} onChange={handleChange}
                className="input-field" placeholder="Ex: Av. Interlagos, 2255" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="label">Cidade</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} className="input-field" placeholder="São Paulo" />
              </div>
              <div>
                <label className="label">UF</label>
                <input type="text" name="state" value={form.state} onChange={handleChange} className="input-field" placeholder="SP" maxLength={2} />
              </div>
            </div>
            <div>
              <label className="label">Link do Google Maps</label>
              <input type="url" name="maps_link" value={form.maps_link} onChange={handleChange}
                className="input-field" placeholder="https://maps.google.com/..." />
            </div>
          </div>
        </Fieldset>

        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="btn-primary flex-1 justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Cadastrar Feirinha'}
          </button>
          <Link to="/admin/feirinhas" className="btn-outline px-5">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminFairForm;
