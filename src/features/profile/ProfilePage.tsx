import { useState } from 'react';
import { FiCamera, FiSave } from 'react-icons/fi';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import { useNotify } from '../../contexts/NotificationContext';
import { initials } from '../../utils/format';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const notify = useNotify();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    bloodGroup: user?.bloodGroup ?? '',
    medicalNotes: user?.medicalNotes ?? '',
  });
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProfile(form);
    setSaving(false);
    notify('Profile updated.', 'success');
  };

  return (
    <div className="max-w-3xl flex flex-col gap-6 pb-10">
      <Card className="flex items-center gap-5">
        <div className="relative">
          <div className="h-20 w-20 rounded-3xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-2xl font-semibold">
            {initials(form.name || 'Tether User')}
          </div>
          <button
            className="absolute -bottom-1.5 -right-1.5 h-8 w-8 rounded-full bg-teal-500 text-dusk-950 flex items-center justify-center shadow-md"
            aria-label="Change avatar"
            onClick={() => notify('Avatar upload is ready once the backend is connected.', 'info')}
          >
            <FiCamera size={13} />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-medium text-sky-50">{form.name}</h2>
          <p className="text-sm text-sky-300/70">{form.email}</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80 mb-5">Basic details</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name">
            <input value={form.name} onChange={handleChange('name')} className="input" />
          </Field>
          <Field label="Email">
            <input value={form.email} onChange={handleChange('email')} className="input" />
          </Field>
          <Field label="Phone number">
            <input value={form.phone} onChange={handleChange('phone')} className="input" />
          </Field>
          <Field label="Blood group">
            <select value={form.bloodGroup} onChange={handleChange('bloodGroup') as any} className="input">
              <option value="">Select</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </Field>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80 mb-5">Medical information</h3>
        <Field label="Notes visible to guardians during an emergency">
          <textarea
            value={form.medicalNotes}
            onChange={handleChange('medicalNotes')}
            rows={4}
            className="input resize-none"
          />
        </Field>
      </Card>

      <div className="flex justify-end">
        <Button icon={<FiSave />} loading={saving} onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-sky-300/70">{label}</span>
      {children}
    </label>
  );
}
