import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, ImagePlus, Heart } from 'lucide-react';
import { storiesAPI } from '../../services/api';

const AdminStories = () => {
  const [stories, setStories]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState({ adopter_name: '', animal_name: '', story: '', adoption_date: '' });
  const [photo, setPhoto]       = useState(null);
  const [photoPreview, setPreview] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    const { data } = await storiesAPI.getAll();
    setStories(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchStories(); }, [fetchStories]);

  const openNew = () => {
    setEditing(null);
    setForm({ adopter_name: '', animal_name: '', story: '', adoption_date: '' });
    setPhoto(null);
    setPreview(null);
    setShowForm(true);
  };

  const openEdit = (s) => {
    setEditing(s);
    setForm({ adopter_name: s.adopter_name, animal_name: s.animal_name, story: s.story, adoption_date: s.adoption_date?.slice(0, 10) || '' });
    setPhoto(null);
    setPreview(s.photo || null);
    setShowForm(true);
  };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handlePhoto  = (e) => {
    const f = e.target.files[0];
    if (f) { setPhoto(f); setPreview(URL.createObjectURL(f)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photo) fd.append('photo', photo);
      if (editing) { await storiesAPI.update(editing.id, fd); }
      else         { await storiesAPI.create(fd); }
      setShowForm(false);
      fetchStories();
    } catch { alert('Erro ao salvar história.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remover a história de ${name}?`)) return;
    setDeleting(id);
    await storiesAPI.remove(id);
    setDeleting(null);
    fetchStories();
  };

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Histórias de Sucesso</h1>
          <p className="text-xs text-gray-400 mt-0.5">{stories.length} história{stories.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openNew} className="btn-primary gap-1.5 text-xs py-2 px-4">
          <Plus size={13} /> Nova História
        </button>
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-extrabold text-gray-900 text-base">
                {editing ? 'Editar História' : 'Nova História'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="label">Nome do adotante *</label>
                <input type="text" name="adopter_name" value={form.adopter_name} onChange={handleChange}
                  className="input-field" required />
              </div>
              <div>
                <label className="label">Nome do animal *</label>
                <input type="text" name="animal_name" value={form.animal_name} onChange={handleChange}
                  className="input-field" required />
              </div>
              <div>
                <label className="label">História *</label>
                <textarea name="story" value={form.story} onChange={handleChange}
                  rows={5} className="input-field resize-none" required
                  placeholder="Conte a história de adoção..." />
              </div>
              <div>
                <label className="label">Data da adoção</label>
                <input type="date" name="adoption_date" value={form.adoption_date} onChange={handleChange}
                  className="input-field" />
              </div>
              <div>
                <label className="label">Foto</label>
                {photoPreview && (
                  <img src={photoPreview} alt="preview" className="w-16 h-16 rounded-xl object-cover mb-2" />
                )}
                <label className="btn-outline text-xs py-2 px-4 cursor-pointer inline-flex items-center gap-1.5">
                  <ImagePlus size={13} /> Escolher foto
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhoto} />
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="btn-primary flex-1 justify-center disabled:opacity-50">
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline px-5">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-16 text-gray-200">
            <Heart size={32} strokeWidth={1} className="mx-auto mb-3 animate-bounce" />
            <p className="text-gray-400 text-sm">Carregando...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-14 text-center">
            <Heart size={32} strokeWidth={1} className="mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400 text-sm mb-4">Nenhuma história cadastrada ainda</p>
            <button onClick={openNew} className="btn-primary text-xs gap-1 inline-flex">
              <Plus size={12} /> Adicionar história
            </button>
          </div>
        ) : stories.map((story) => (
          <div key={story.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-start">
            {story.photo
              ? <img src={story.photo} alt={story.adopter_name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              : <div className="w-12 h-12 rounded-xl bg-brand-purple flex items-center justify-center text-white font-extrabold text-base flex-shrink-0">
                  {story.adopter_name.charAt(0)}
                </div>
            }
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{story.adopter_name}</p>
                  <p className="text-xs text-brand-purple-medium">Adotou {story.animal_name}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => openEdit(story)}
                    className="p-1.5 rounded-lg bg-brand-purple-lighter text-brand-purple hover:bg-brand-purple hover:text-white transition-colors">
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => handleDelete(story.id, story.adopter_name)}
                    disabled={deleting === story.id}
                    className="p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-colors disabled:opacity-40">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStories;
