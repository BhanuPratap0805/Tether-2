import Card from '../../components/common/Card';
import Toggle from '../../components/common/Toggle';
import { useSettings } from '../../contexts/SettingsContext';
import { useNotify } from '../../contexts/NotificationContext';
import type { AppSettings } from '../../types';

const accuracyOptions: { value: AppSettings['locationAccuracy']; label: string }[] = [
  { value: 'high', label: 'High accuracy' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'battery-saver', label: 'Battery saver' },
];

const languageOptions: { value: AppSettings['language']; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
];

export default function SettingsPage() {
  const { settings, updateSettings, updateNested } = useSettings();
  const notify = useNotify();

  return (
    <div className="max-w-2xl flex flex-col gap-6 pb-10">
      <Card>
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80 mb-4">Appearance</h3>
        <Toggle
          checked={settings.darkMode}
          onChange={(v) => updateSettings({ darkMode: v })}
          label="Dark mode"
          description="Tether is designed dark-first for a calmer, always-on feel."
        />
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80">Notifications</h3>
        <Toggle
          checked={settings.notifications.push}
          onChange={(v) => updateNested('notifications', { push: v })}
          label="Push notifications"
          description="Alerts, check-ins, and AI insights."
        />
        <Toggle
          checked={settings.notifications.sms}
          onChange={(v) => updateNested('notifications', { sms: v })}
          label="SMS fallback"
          description="Used automatically when signal is weak or unavailable."
        />
        <Toggle
          checked={settings.notifications.email}
          onChange={(v) => updateNested('notifications', { email: v })}
          label="Email summaries"
          description="A weekly digest of your protected time and activity."
        />
      </Card>

      <Card className="flex flex-col gap-4">
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80">Privacy</h3>
        <Toggle
          checked={settings.privacy.shareLiveLocation}
          onChange={(v) => updateNested('privacy', { shareLiveLocation: v })}
          label="Share live location during alerts"
          description="Required for guardians to see your position in real time."
        />
        <Toggle
          checked={settings.privacy.shareWithGuardiansOnly}
          onChange={(v) => updateNested('privacy', { shareWithGuardiansOnly: v })}
          label="Restrict to guardian circle only"
          description="Nobody outside your added guardians can view an alert link."
        />
      </Card>

      <Card>
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80 mb-4">Location accuracy</h3>
        <div className="grid grid-cols-3 gap-2">
          {accuracyOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateSettings({ locationAccuracy: opt.value })}
              className={`rounded-xl px-3 py-2.5 text-xs font-medium transition-colors ${
                settings.locationAccuracy === opt.value
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/40'
                  : 'bg-white/[0.04] text-sky-300/80 border border-transparent hover:bg-white/[0.07]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm uppercase tracking-wide text-sky-300/80 mb-4">Language</h3>
        <div className="grid grid-cols-2 gap-2 max-w-xs">
          {languageOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                updateSettings({ language: opt.value });
                notify(`Language set to ${opt.label}.`, 'success');
              }}
              className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                settings.language === opt.value
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-400/40'
                  : 'bg-white/[0.04] text-sky-300/80 border border-transparent hover:bg-white/[0.07]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
