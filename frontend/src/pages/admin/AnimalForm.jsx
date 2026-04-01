import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, ImagePlus, AlertCircle } from 'lucide-react';
import { animalsAPI } from '../../services/api';

const initialState = {
  name: '', species: 'cachorro', gender: 'femea', size: '',
  age_label: '', breed: '', color: '',
  vaccinated: false, neutered: false, dewormed: false, microchipped: false,
  description: '', personality: '', special_needs: '', location: '',
  status: 'disponivel', featured: false,
};

const Fieldset = ({ title, children }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5">
    <h2 className="font-bold text-gray-900 text-sm mb-4">{title}</h2>
    {children}
  </div>
);

const AdminAnimalForm = () => {
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
    animalsAPI.getById(id).then(({ data }) => {
      setForm({
        name: data.name || '',
        species: data.species || 'cachorro',
        gender: data.gender || 'femea',
        size: data.size || '',
        age_label: data.age_label || '',
        breed: data.breed || '',
        color: data.color || '',
        vaccinated: !!data.vaccinated,
        neutered: !!data.neutered,
        dewormed: !!data.dewormed,
        microchipped: !!data.microchipped,
        description: data.description || '',
        personality: data.personality || '',
        special_needs: data.special_needs || '',
        location: data.location || '',
        status: data.status || 'disponivel',
        featured: !!data.featured,
      });
      setCurrentPhoto(data.photo_main);
      setLoading(false);
    }).catch(() => navigate('/admin/animais'));
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);
      if (isEdit) { await animalsAPI.update(id, fd); }
      else        { await animalsAPI.create(fd); }
      navigate('/admin/animais');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar. Tente novamente.');
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="text-center py-20 text-gray-300">
      <div className="w-8 h-8 border-2 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );

  return (
    <div className="animate-fade-in max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link to="/admin/animais" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-xl font-extrabold text-gray-900">
          {isEdit ? 'Editar Animal' : 'Novo Animal'}
        </h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3.5 text-sm">
          <AlertCircle size={14} className="flex-shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Foto */}
        <Fieldset title="Foto">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
              {photoPreview || currentPhoto
                ? <img src={photoPreview || currentPhoto} alt="Preview" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><ImagePlus size={24} className="text-gray-300" /></div>
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

        {/* Dados básicos */}
        <Fieldset title="Dados básicos">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label">Nome *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                className="input-field" placeholder="Ex: Bolinha" required />
            </div>
            <div>
              <label className="label">Espécie *</label>
              <select name="species" value={form.species} onChange={handleChange} className="select-field">
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
              </select>
            </div>
            <div>
              <label className="label">Gênero *</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="select-field">
                <option value="femea">Fêmea</option>
                <option value="macho">Macho</option>
              </select>
            </div>
            <div>
              <label className="label">Porte</label>
              <select name="size" value={form.size} onChange={handleChange} className="select-field">
                <option value="">Não informado</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>
            <div>
              <label className="label">Idade</label>
              <input type="text" name="age_label" value={form.age_label} onChange={handleChange}
                className="input-field" placeholder="Ex: Estima-se 3 anos" />
            </div>
            <div>
              <label className="label">Raça</label>
              <input type="text" name="breed" value={form.breed} onChange={handleChange}
                className="input-field" placeholder="Ex: SRD" />
            </div>
            <div>
              <label className="label">Cor / Pelagem</label>
              <input type="text" name="color" value={form.color} onChange={handleChange}
                className="input-field" placeholder="Ex: Caramelo" />
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="select-field">
                <option value="disponivel">Disponível</option>
                <option value="em_processo">Em processo de adoção</option>
                <option value="adotado">Adotado</option>
              </select>
            </div>
            <div>
              <label className="label">Localização</label>
              <input type="text" name="location" value={form.location} onChange={handleChange}
                className="input-field" placeholder="Ex: São Paulo — SP" />
            </div>
          </div>
        </Fieldset>

        {/* Saúde */}
        <Fieldset title="Saúde">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: 'vaccinated',   label: 'Vacinado'    },
              { name: 'neutered',     label: 'Castrado'    },
              { name: 'dewormed',     label: 'Vermifugado' },
              { name: 'microchipped', label: 'Microchipado'},
            ].map((item) => (
              <label key={item.name} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" name={item.name} checked={form[item.name]} onChange={handleChange}
                  className="w-4 h-4 rounded accent-brand-purple cursor-pointer" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{item.label}</span>
              </label>
            ))}
          </div>
        </Fieldset>

        {/* Descrição */}
        <Fieldset title="Descrição">
          <div className="space-y-4">
            <div>
              <label className="label">Sobre o animal</label>
              <textarea name="description" value={form.description} onChange={handleChange}
                rows={3} className="input-field resize-none" placeholder="História e características do animal..." />
            </div>
            <div>
              <label className="label">Personalidade</label>
              <textarea name="personality" value={form.personality} onChange={handleChange}
                rows={2} className="input-field resize-none" placeholder="Ex: Carinhoso, brincalhão..." />
            </div>
            <div>
              <label className="label">Necessidades especiais</label>
              <textarea name="special_needs" value={form.special_needs} onChange={handleChange}
                rows={2} className="input-field resize-none" placeholder="Deixe em branco se não houver" />
            </div>
          </div>
        </Fieldset>

        {/* Destaque */}
        <Fieldset title="Configurações">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
              className="w-4 h-4 rounded accent-brand-purple cursor-pointer mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Destacar na página inicial</p>
              <p className="text-xs text-gray-400">Aparece primeiro na home e na listagem de adoção</p>
            </div>
          </label>
        </Fieldset>

        {/* Botões */}
        <div className="flex gap-3 pt-1">
          <button type="submit" disabled={saving}
            className="btn-primary flex-1 justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Salvando...' : isEdit ? 'Salvar Alterações' : 'Cadastrar Animal'}
          </button>
          <Link to="/admin/animais" className="btn-outline px-5">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminAnimalForm;
