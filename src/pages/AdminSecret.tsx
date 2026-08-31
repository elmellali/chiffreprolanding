import React, { useState, useEffect, useMemo } from 'react';
import { 
  Lock, Key, Activity, LogOut, CheckCircle, AlertCircle, Settings, 
  Calendar as CalendarIcon, List, Search, Download, Copy, Check, RefreshCw, 
  ShieldCheck, Clock, Database, Sparkles, Terminal, AlertTriangle, 
  Eye, Cpu
} from 'lucide-react';

interface Activation {
  id: number;
  machine_id: string;
  license_key: string;
  action: string;
  ip_address: string;
  created_at: string;
  plan_id?: string;
  plan_name?: string;
  expires_at?: string;
  is_expired?: boolean;
  days_left?: number | null;
}

interface GeneratedLicense {
  id: number;
  machine_id: string;
  license_key: string;
  plan: string;
  client_name?: string;
  client_contact?: string;
  notes?: string;
  expires_at?: string;
  created_at: string;
}

interface SystemInfo {
  php_version: string;
  server_software: string;
  server_time: string;
  database_size: string;
  total_activations: number;
  total_generated_licenses: number;
  unique_machines: number;
  ip_address: string;
}

interface DecodedKeyInfo {
  license_key: string;
  plan_id: string;
  plan_name: string;
  yymm: string;
  checksum: string;
  expiry_formatted: string;
  is_lifetime: boolean;
  is_trial: boolean;
  machine_id_tested?: string | null;
  calculated_checksum?: string | null;
  is_machine_match?: boolean | null;
}

export const AdminSecret = () => {
  // Authentication
  const savedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken') || '';
  const [password, setPassword] = useState(savedToken);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(!!savedToken);
  const [loginError, setLoginError] = useState('');

  // Tabs: 'overview' | 'generate' | 'telemetry' | 'decoder' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'generate' | 'telemetry' | 'decoder' | 'settings'>('overview');

  // Generator State
  const [machineId, setMachineId] = useState('');
  const [plan, setPlan] = useState('1');
  const [expirationDate, setExpirationDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [notes, setNotes] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [generatedHistory, setGeneratedHistory] = useState<GeneratedLicense[]>([]);

  // Telemetry State
  const [activations, setActivations] = useState<Activation[]>([]);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);
  const [telemetryView, setTelemetryView] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [telemetrySearch, setTelemetrySearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, expiring, expired
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<{ day: number; activations: Activation[] } | null>(null);

  // Key Decoder State
  const [decodeKeyInput, setDecodeKeyInput] = useState('');
  const [decodeMachineInput, setDecodeMachineInput] = useState('');
  const [decodedResult, setDecodedResult] = useState<DecodedKeyInfo | null>(null);
  const [decodeError, setDecodeError] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);

  // Settings & System State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const copyToClipboard = (text: string, label: string = 'Texte') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    showToast(`${label} copié dans le presse-papier !`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Check auth on mount
  useEffect(() => {
    if (savedToken) {
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (tokenToTest: string) => {
    setIsVerifyingAuth(true);
    try {
      const res = await fetch('/api/admin.php?action=verify_auth', {
        headers: { 'Authorization': `Bearer ${tokenToTest}` }
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword(tokenToTest);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminToken');
        setLoginError('Session expirée ou mot de passe invalide');
      }
    } catch (e) {
      setIsAuthenticated(false);
      setLoginError('Erreur de connexion avec le serveur');
    } finally {
      setIsVerifyingAuth(false);
    }
  };

  // Set default expiration date based on plan
  useEffect(() => {
    if (plan === '1' || plan === '2') {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      setExpirationDate(`${yyyy}-${mm}`);
    } else {
      setExpirationDate('9999-12');
    }
  }, [plan]);

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoginError('');
    setIsVerifyingAuth(true);

    try {
      const res = await fetch('/api/admin.php?action=verify_auth', {
        headers: { 'Authorization': `Bearer ${password.trim()}` }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setIsAuthenticated(true);
        if (rememberMe) {
          localStorage.setItem('adminToken', password.trim());
        } else {
          sessionStorage.setItem('adminToken', password.trim());
        }
      } else {
        setLoginError('Mot de passe administrateur incorrect.');
      }
    } catch (err) {
      setLoginError('Impossible de contacter le serveur distant.');
    } finally {
      setIsVerifyingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setPassword('');
    setActivations([]);
    setGeneratedKey('');
    setGeneratedHistory([]);
  };

  // Fetch Telemetry Data
  const fetchTelemetry = async () => {
    setIsLoadingTelemetry(true);
    try {
      const res = await fetch('/api/admin.php?action=activations', {
        headers: { 'Authorization': `Bearer ${password}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.status === 'success') {
        setActivations(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTelemetry(false);
    }
  };

  // Fetch Generated History
  const fetchGeneratedHistory = async () => {
    try {
      const res = await fetch('/api/admin.php?action=generated_history', {
        headers: { 'Authorization': `Bearer ${password}` }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setGeneratedHistory(data.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch System Info
  const fetchSystemInfo = async () => {
    try {
      const res = await fetch('/api/admin.php?action=system_info', {
        headers: { 'Authorization': `Bearer ${password}` }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSystemInfo(data.info);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTelemetry();
      fetchGeneratedHistory();
      fetchSystemInfo();
    }
  }, [isAuthenticated]);

  // Tab change triggers
  useEffect(() => {
    if (!isAuthenticated) return;
    if (activeTab === 'telemetry' || activeTab === 'overview') {
      fetchTelemetry();
    }
    if (activeTab === 'generate') {
      fetchGeneratedHistory();
    }
    if (activeTab === 'settings') {
      fetchSystemInfo();
    }
  }, [activeTab]);

  // Generate License Key
  const generateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenError('');
    setGeneratedKey('');
    setIsGenerating(true);

    let yymm = '';
    if (plan === '3' || plan === '4') {
      yymm = '9999';
    } else {
      if (!expirationDate) {
        setGenError('Veuillez sélectionner le mois et l\'année d\'expiration.');
        setIsGenerating(false);
        return;
      }
      const [yyyy, mm] = expirationDate.split('-');
      yymm = `${yyyy.slice(2)}${mm}`;
    }

    try {
      const res = await fetch('/api/admin.php?action=generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          machine_id: machineId.trim(),
          plan,
          yymm,
          client_name: clientName.trim(),
          client_contact: clientContact.trim(),
          notes: notes.trim()
        })
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.status === 'success') {
        setGeneratedKey(data.license_key);
        showToast('Clé de licence générée avec succès !');
        fetchGeneratedHistory();
      } else {
        setGenError(data.message || 'Erreur lors de la génération de la clé.');
      }
    } catch (err) {
      setGenError('Erreur de communication réseau.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Decode Key
  const handleDecode = async (e: React.FormEvent) => {
    e.preventDefault();
    setDecodeError('');
    setDecodedResult(null);
    setIsDecoding(true);

    try {
      const res = await fetch('/api/admin.php?action=decode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          license_key: decodeKeyInput.trim(),
          machine_id: decodeMachineInput.trim()
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        setDecodedResult(data.decoded);
      } else {
        setDecodeError(data.message || 'Format de clé invalide.');
      }
    } catch (err) {
      setDecodeError('Erreur de réseau lors de l\'analyse.');
    } finally {
      setIsDecoding(false);
    }
  };

  // Change Password
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg('');
    setPwdError('');

    if (newPassword !== confirmPassword) {
      setPwdError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsChangingPwd(true);
    try {
      const res = await fetch('/api/admin.php?action=change_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ new_password: newPassword })
      });

      const data = await res.json();
      if (data.status === 'success') {
        setPwdMsg('Mot de passe principal mis à jour avec succès !');
        setPassword(newPassword);
        if (localStorage.getItem('adminToken')) {
          localStorage.setItem('adminToken', newPassword);
        } else {
          sessionStorage.setItem('adminToken', newPassword);
        }
        setNewPassword('');
        setConfirmPassword('');
        showToast('Nouveau mot de passe enregistré');
      } else {
        setPwdError(data.message || 'Erreur lors du changement de mot de passe.');
      }
    } catch (err) {
      setPwdError('Erreur de connexion au serveur.');
    } finally {
      setIsChangingPwd(false);
    }
  };

  // Quick Action: Renew 1-Year License
  const handleQuickRenew = (machineIdToRenew: string) => {
    setMachineId(machineIdToRenew);
    setPlan('1');
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    setExpirationDate(`${yyyy}-${mm}`);
    setActiveTab('generate');
    showToast(`Machine ID ${machineIdToRenew} pré-rempli pour renouvellement`);
  };

  // Delete Activation Record
  const handleDeleteActivation = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement de télémétrie ?')) return;
    try {
      const res = await fetch('/api/admin.php?action=delete_activation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        setActivations(prev => prev.filter(a => a.id !== id));
        showToast('Enregistrement supprimé');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export Telemetry to CSV
  const exportToCSV = () => {
    if (activations.length === 0) return;
    const headers = ['ID', 'Machine ID', 'License Key', 'Plan', 'Action', 'IP Address', 'Date', 'Expiration', 'Status'];
    const rows = filteredActivations.map(a => [
      a.id,
      `"${a.machine_id}"`,
      `"${a.license_key}"`,
      `"${a.plan_name || 'Standard'}"`,
      `"${a.action}"`,
      `"${a.ip_address}"`,
      `"${a.created_at}"`,
      `"${a.expires_at || 'Permanent'}"`,
      a.is_expired ? 'Expired' : (a.days_left !== null && a.days_left !== undefined && a.days_left <= 30) ? 'Expiring Soon' : 'Active'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chiffrepro_telemetry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export CSV téléchargé');
  };

  // Download DB Backup
  const downloadDatabase = () => {
    window.open(`/api/admin.php?action=download_db`, '_blank');
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const total = activations.length;
    const uniqueMachines = new Set(activations.map(a => a.machine_id)).size;
    
    // Activations this month
    const now = new Date();
    const thisMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const thisMonthCount = activations.filter(a => a.created_at && a.created_at.startsWith(thisMonthPrefix)).length;

    // Plans breakdown
    const standardCount = activations.filter(a => a.plan_id === '1').length;
    const cloudCount = activations.filter(a => a.plan_id === '2').length;
    const lifetimeCount = activations.filter(a => a.plan_id === '3').length;
    const trialCount = activations.filter(a => a.plan_id === '4').length;

    // Expiring & Expired
    const expiringSoon = activations.filter(a => !a.is_expired && a.days_left !== null && a.days_left !== undefined && a.days_left <= 30 && a.days_left >= 0).length;
    const expiredCount = activations.filter(a => a.is_expired).length;

    return {
      total,
      uniqueMachines,
      thisMonthCount,
      standardCount,
      cloudCount,
      lifetimeCount,
      trialCount,
      expiringSoon,
      expiredCount
    };
  }, [activations]);

  // Filtered Activations
  const filteredActivations = useMemo(() => {
    return activations.filter(a => {
      // Search
      const s = telemetrySearch.toLowerCase();
      const matchSearch = !s || 
        a.machine_id.toLowerCase().includes(s) || 
        a.license_key.toLowerCase().includes(s) || 
        a.ip_address.toLowerCase().includes(s) ||
        (a.plan_name && a.plan_name.toLowerCase().includes(s));

      // Plan Filter
      const matchPlan = planFilter === 'all' || a.plan_id === planFilter;

      // Status Filter
      let matchStatus = true;
      if (statusFilter === 'active') {
        matchStatus = !a.is_expired;
      } else if (statusFilter === 'expiring') {
        matchStatus = !a.is_expired && a.days_left !== null && a.days_left !== undefined && a.days_left <= 30 && a.days_left >= 0;
      } else if (statusFilter === 'expired') {
        matchStatus = !!a.is_expired;
      }

      return matchSearch && matchPlan && matchStatus;
    });
  }, [activations, telemetrySearch, planFilter, statusFilter]);

  // Calendar Rendering
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    const isToday = (day: number) => {
      const today = new Date();
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };
    
    const getActivationsForDay = (day: number) => {
      const targetStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return activations.filter(a => a.created_at && a.created_at.startsWith(targetStr));
    };

    return (
      <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors border border-gray-800"
            >
              &larr; Précédent
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date())}
              className="px-3 py-1.5 text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
            >
              Aujourd'hui
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors border border-gray-800"
            >
              Suivant &rarr;
            </button>
          </div>
          <h4 className="text-xl font-bold capitalize text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-400" />
            {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
          </h4>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => {
            if (d === null) return <div key={`empty-${i}`} className="aspect-square bg-gray-950/40 rounded-xl border border-transparent"></div>;
            
            const dayActs = getActivationsForDay(d);
            const count = dayActs.length;
            const active = count > 0;
            
            return (
              <div 
                key={d} 
                onClick={() => active && setSelectedCalendarDay({ day: d, activations: dayActs })}
                className={`relative aspect-square rounded-xl border p-2 flex flex-col justify-between transition-all group ${
                  isToday(d) ? 'border-blue-500 bg-blue-950/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-gray-800/80 bg-gray-950/60'
                } ${active ? 'hover:border-emerald-500 hover:bg-emerald-950/20 cursor-pointer' : 'hover:border-gray-700'}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-semibold ${isToday(d) ? 'text-blue-400 font-bold' : 'text-gray-300'}`}>{d}</span>
                  {active && (
                    <span className="text-[10px] font-bold bg-emerald-500 text-black px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </div>

                {active && (
                  <div className="mt-auto">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] text-gray-400 truncate hidden md:inline">
                        {count} act.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-gray-900 flex items-center justify-center p-4">
        <div className="relative max-w-md w-full">
          {/* Subtle Glow Backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
          
          <div className="relative bg-gray-900/90 border border-gray-800/80 backdrop-blur-2xl p-8 rounded-3xl text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Lock className="w-10 h-10 text-blue-400" />
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Zone Sécurisée
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">ChiffrePro Admin</h2>
            <p className="text-gray-400 text-sm mb-8">Authentification requise pour gérer les licences et la télémétrie.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Mot de passe Maître"
                  className="w-full bg-black/70 border border-gray-700/80 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-black border-gray-700 text-blue-600 focus:ring-0"
                  />
                  Mémoriser sur cet appareil
                </label>
                <span className="text-gray-600">v2.4.0 Live</span>
              </div>

              {loginError && (
                <div className="flex items-center text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-xs text-left">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingAuth}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifyingAuth ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Vérification...
                  </>
                ) : (
                  <>
                    <Key className="w-5 h-5" />
                    Déverrouiller le panneau
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white p-4 md:p-8 font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 border border-blue-500/40 px-4 py-3 rounded-xl shadow-2xl text-sm text-blue-200 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900/40 p-6 rounded-3xl border border-gray-800/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-white">ChiffrePro Admin Console</h1>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Connecté
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-0.5">Contrôle des licences logicielles, suivi télémétrique et diagnostics</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button 
              onClick={() => { fetchTelemetry(); fetchGeneratedHistory(); fetchSystemInfo(); showToast('Données rafraîchies !'); }}
              className="flex items-center gap-2 text-xs bg-gray-800/80 hover:bg-gray-800 text-gray-300 px-3.5 py-2 rounded-xl border border-gray-700/60 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Actualiser
            </button>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 px-3.5 py-2 rounded-xl border border-red-900/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="flex border-b border-gray-800/80 gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'overview', label: 'Vue d\'ensemble & Alertes', icon: Activity, badge: metrics.expiringSoon > 0 ? metrics.expiringSoon : null },
            { id: 'generate', label: 'Générateur & Registre', icon: Key },
            { id: 'telemetry', label: 'Télémétrie des Activations', icon: Terminal, count: activations.length },
            { id: 'decoder', label: 'Inspecteur de Clés', icon: Search },
            { id: 'settings', label: 'Sécurité & Diagnostics', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm transition-all whitespace-nowrap border ${
                  active 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20' 
                    : 'bg-gray-900/40 text-gray-400 hover:text-white border-gray-800 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && (
                  <span className="px-2 py-0.5 text-xs bg-amber-500 text-black font-bold rounded-full animate-bounce">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${active ? 'bg-blue-800 text-blue-200' : 'bg-gray-800 text-gray-400'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 1. OVERVIEW & METRICS TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900/40 border border-gray-800/80 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Activations</p>
                    <h3 className="text-3xl font-extrabold text-white mt-2">{metrics.total}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                  <span className="text-blue-400 font-semibold">{metrics.uniqueMachines}</span> machines uniques enregistrées
                </p>
              </div>

              <div className="bg-gray-900/40 border border-gray-800/80 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Ce Mois-ci</p>
                    <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">+{metrics.thisMonthCount}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Nouvelles activations enregistrées</p>
              </div>

              <div className="bg-gray-900/40 border border-gray-800/80 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Expire Bientôt (&le; 30j)</p>
                    <h3 className="text-3xl font-extrabold text-amber-400 mt-2">{metrics.expiringSoon}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-amber-400/80 mt-3">À contacter pour renouvellement</p>
              </div>

              <div className="bg-gray-900/40 border border-gray-800/80 p-5 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Licences Expirées</p>
                    <h3 className="text-3xl font-extrabold text-red-400 mt-2">{metrics.expiredCount}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Accès suspendu côté client</p>
              </div>
            </div>

            {/* Plans Breakdown & Expiring Soon List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Plans Distribution */}
              <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-3xl backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Répartition des Plans
                </h3>

                <div className="space-y-4">
                  {[
                    { label: 'Plan 1 - Standard (1 An)', count: metrics.standardCount, color: 'bg-blue-500' },
                    { label: 'Plan 2 - Cloud Edition (1 An)', count: metrics.cloudCount, color: 'bg-indigo-500' },
                    { label: 'Plan 3 - Lifetime (À vie)', count: metrics.lifetimeCount, color: 'bg-purple-500' },
                    { label: 'Plan 4 - Essai (15 Jours)', count: metrics.trialCount, color: 'bg-amber-500' }
                  ].map(p => {
                    const pct = metrics.total > 0 ? Math.round((p.count / metrics.total) * 100) : 0;
                    return (
                      <div key={p.label} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300 font-medium">{p.label}</span>
                          <span className="text-gray-400">{p.count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full`} style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expiring Soon Alerts Table */}
              <div className="lg:col-span-2 bg-gray-900/40 border border-gray-800/80 p-6 rounded-3xl backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      Clients avec Expiration Proche
                    </h3>
                    <p className="text-gray-400 text-xs mt-0.5">Priorité de relance commerciale</p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('telemetry'); setStatusFilter('expiring'); }}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Voir tout &rarr;
                  </button>
                </div>

                {activations.filter(a => !a.is_expired && a.days_left !== null && a.days_left !== undefined && a.days_left <= 30 && a.days_left >= 0).length === 0 ? (
                  <div className="text-center py-10 text-gray-500 text-sm">
                    <CheckCircle className="w-8 h-8 text-emerald-500/50 mx-auto mb-2" />
                    Aucune licence n'expire dans les 30 prochains jours.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activations
                      .filter(a => !a.is_expired && a.days_left !== null && a.days_left !== undefined && a.days_left <= 30 && a.days_left >= 0)
                      .slice(0, 5)
                      .map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-gray-800 hover:border-amber-500/40 transition-all gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-blue-300 bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-800/40">
                                {item.machine_id}
                              </span>
                              <span className="text-xs text-gray-400">{item.plan_name}</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">Clé: {item.license_key}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-xs font-bold text-amber-400 block">
                                Reste {item.days_left} jour(s)
                              </span>
                              <span className="text-[10px] text-gray-500">Exp: {item.expires_at}</span>
                            </div>

                            <button
                              onClick={() => handleQuickRenew(item.machine_id)}
                              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-xl transition-colors shadow-sm"
                            >
                              Renouveler (1 An)
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. LICENSE GENERATOR & REGISTRY TAB */}
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-6 bg-gray-900/40 border border-gray-800/80 p-6 md:p-8 rounded-3xl backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-400" />
                  Générer une Nouvelle Licence
                </h3>
                <p className="text-gray-400 text-xs mt-1">Crée un serial unique de 9 chiffres lié au matériel du client.</p>
              </div>

              <form onSubmit={generateLicense} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Machine ID (Matériel) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Ex: 6982004C-2C74-11B2-A85C-E0570A4DE0F6 ou DISK-12345"
                      className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white text-sm font-mono placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={machineId}
                      onChange={(e) => setMachineId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Type de Plan <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                    >
                      <option value="1">Plan 1 - Standard (1 An)</option>
                      <option value="2">Plan 2 - Cloud Edition (1 An)</option>
                      <option value="3">Plan 3 - Lifetime (À vie)</option>
                      <option value="4">Plan 4 - Essai (15 Jours)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Mois d'expiration
                    </label>
                    <input
                      type="month"
                      required
                      disabled={plan === '3' || plan === '4'}
                      className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
                      value={plan === '3' || plan === '4' ? '9999-12' : expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Optional Metadata */}
                <div className="pt-2 border-t border-gray-800 space-y-4">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Informations Client (Optionnel)</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nom du Client / Société"
                      className="bg-black/60 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Email ou Téléphone"
                      className="bg-black/60 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Notes internes (ex: Facture #1042)"
                    className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {genError && (
                  <div className="flex items-center text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {genError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Key className="w-5 h-5" />}
                  Calculer et Enregistrer la Clé
                </button>
              </form>
            </div>

            {/* Generated Output & History */}
            <div className="lg:col-span-6 space-y-6">
              {/* Active Generated Key Box */}
              {generatedKey ? (
                <div className="bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/40 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                      <CheckCircle className="w-5 h-5" />
                      Clé de Série Générée !
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full font-mono">
                      9 Chiffres
                    </span>
                  </div>

                  <div className="bg-black/80 border border-blue-500/30 rounded-2xl p-5 text-center my-4 relative group">
                    <div className="font-mono text-3xl md:text-4xl text-blue-200 tracking-widest font-extrabold select-all">
                      {generatedKey}
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedKey, 'Clé de licence')}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                    >
                      {copiedKey === generatedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      Copier la Clé
                    </button>
                  </div>

                  <div className="text-xs text-gray-400 space-y-1">
                    <p><span className="text-gray-500">Machine ID:</span> {machineId}</p>
                    <p><span className="text-gray-500">Plan:</span> {plan === '1' ? 'Standard 1 An' : plan === '2' ? 'Cloud 1 An' : plan === '3' ? 'Lifetime' : 'Trial 15j'}</p>
                    {clientName && <p><span className="text-gray-500">Client:</span> {clientName}</p>}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900/20 border border-dashed border-gray-800 p-8 rounded-3xl text-center text-gray-500">
                  <Key className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                  <p className="text-sm font-medium">Aucune clé générée lors de cette session.</p>
                  <p className="text-xs text-gray-600 mt-1">Remplissez le formulaire à gauche pour générer un code série.</p>
                </div>
              )}

              {/* Recent Generations Registry */}
              <div className="bg-gray-900/40 border border-gray-800/80 p-6 rounded-3xl backdrop-blur-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-purple-400" />
                    Historique des Licences Émises ({generatedHistory.length})
                  </h4>
                </div>

                {generatedHistory.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center">Aucune clé enregistrée dans la base.</p>
                ) : (
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                    {generatedHistory.map((item) => (
                      <div key={item.id} className="p-3 bg-black/40 border border-gray-800/80 rounded-2xl flex items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-blue-300 font-bold">{item.license_key}</span>
                            {item.client_name && (
                              <span className="text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">
                                {item.client_name}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 font-mono text-[10px] truncate max-w-[200px]">
                            ID: {item.machine_id}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(item.license_key, 'Clé')}
                            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                            title="Copier"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. TELEMETRY TAB */}
        {activeTab === 'telemetry' && (
          <div className="bg-gray-900/40 border border-gray-800/80 rounded-3xl overflow-hidden backdrop-blur-md">
            {/* Action Bar */}
            <div className="p-5 border-b border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-900/60">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrer par Machine ID, IP, Clé..."
                    className="w-full bg-black/70 border border-gray-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    value={telemetrySearch}
                    onChange={(e) => setTelemetrySearch(e.target.value)}
                  />
                </div>

                <select
                  className="bg-black/70 border border-gray-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                >
                  <option value="all">Tous les Plans</option>
                  <option value="1">Plan 1 - Standard</option>
                  <option value="2">Plan 2 - Cloud Edition</option>
                  <option value="3">Plan 3 - Lifetime</option>
                  <option value="4">Plan 4 - Essai 15j</option>
                </select>

                <select
                  className="bg-black/70 border border-gray-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tous les Statuts</option>
                  <option value="active">Actif</option>
                  <option value="expiring">Expire Bientôt (&le; 30j)</option>
                  <option value="expired">Expiré</option>
                </select>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                {/* View Switcher */}
                <div className="flex bg-black/80 rounded-xl border border-gray-800 p-1">
                  <button 
                    onClick={() => setTelemetryView('list')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      telemetryView === 'list' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    Liste
                  </button>
                  <button 
                    onClick={() => setTelemetryView('calendar')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      telemetryView === 'calendar' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    Calendrier
                  </button>
                </div>

                <button
                  onClick={exportToCSV}
                  className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl border border-gray-700 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exporter CSV
                </button>
              </div>
            </div>

            {/* Content */}
            {isLoadingTelemetry ? (
              <div className="p-16 text-center text-gray-500 text-sm flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                Chargement des flux télémétriques...
              </div>
            ) : activations.length === 0 ? (
              <div className="p-16 text-center text-gray-500 text-sm">
                Aucune activation enregistrée dans la base pour le moment.
              </div>
            ) : telemetryView === 'calendar' ? (
              <div className="p-6">
                {renderCalendar()}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 text-gray-400 uppercase text-[10px] tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-3.5">ID</th>
                      <th className="px-6 py-3.5">Machine ID</th>
                      <th className="px-6 py-3.5">Clé / Plan</th>
                      <th className="px-6 py-3.5">Expiration / Statut</th>
                      <th className="px-6 py-3.5">IP & Date</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {filteredActivations.map(act => (
                      <tr key={act.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 text-gray-500 font-mono">#{act.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-blue-300 font-semibold">{act.machine_id}</span>
                            <button
                              onClick={() => copyToClipboard(act.machine_id, 'Machine ID')}
                              className="text-gray-500 hover:text-gray-300"
                              title="Copier ID"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <span className="font-mono text-white block">{act.license_key}</span>
                            <span className="text-[10px] text-gray-400">{act.plan_name || 'Standard'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {act.is_expired ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 border border-red-500/20 text-red-400">
                              Expiré ({act.expires_at})
                            </span>
                          ) : act.days_left !== null && act.days_left !== undefined && act.days_left <= 30 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                              Reste {act.days_left}j ({act.expires_at})
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                              Actif ({act.expires_at || 'À vie'})
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-400 space-y-0.5">
                            <span className="block font-mono text-[11px] text-gray-300">{act.ip_address}</span>
                            <span className="block text-[10px] text-gray-500">{new Date(act.created_at).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleQuickRenew(act.machine_id)}
                              className="px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-lg transition-colors text-[11px]"
                            >
                              Renouveler
                            </button>
                            <button
                              onClick={() => handleDeleteActivation(act.id)}
                              className="p-1 hover:text-red-400 text-gray-600 transition-colors"
                              title="Supprimer"
                            >
                              &times;
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 4. KEY DECODER & INSPECTOR TAB */}
        {activeTab === 'decoder' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-900/40 border border-gray-800/80 p-6 md:p-8 rounded-3xl backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-400" />
                  Inspecteur & Décodeur de Clés de Série
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  Rétro-ingénierie et vérification d'intégrité de n'importe quel code série émis.
                </p>
              </div>

              <form onSubmit={handleDecode} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Clé de Série (9 Chiffres) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 126081234"
                      maxLength={9}
                      className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white text-base font-mono tracking-wider focus:outline-none focus:border-blue-500"
                      value={decodeKeyInput}
                      onChange={(e) => setDecodeKeyInput(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                      Machine ID (Pour tester l'appariement)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 6982004C-2C74-11B2-A85C-E0570A4DE0F6"
                      className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                      value={decodeMachineInput}
                      onChange={(e) => setDecodeMachineInput(e.target.value)}
                    />
                  </div>
                </div>

                {decodeError && (
                  <div className="flex items-center text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {decodeError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isDecoding}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  {isDecoding ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Eye className="w-5 h-5" />}
                  Décoder et Analyser la Clé
                </button>
              </form>

              {/* Decoded Result Presentation */}
              {decodedResult && (
                <div className="bg-black/70 border border-gray-800 rounded-3xl p-6 space-y-4">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Structure Décodée
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-gray-900/60 p-3.5 rounded-2xl border border-gray-800">
                      <span className="text-gray-500 block">Plan Détecté</span>
                      <span className="text-sm font-bold text-white mt-1 block">{decodedResult.plan_name}</span>
                    </div>

                    <div className="bg-gray-900/60 p-3.5 rounded-2xl border border-gray-800">
                      <span className="text-gray-500 block">Date d'Expiration Encodée</span>
                      <span className="text-sm font-bold text-emerald-400 mt-1 block">{decodedResult.expiry_formatted}</span>
                    </div>

                    <div className="bg-gray-900/60 p-3.5 rounded-2xl border border-gray-800">
                      <span className="text-gray-500 block">Checksum Intégré</span>
                      <span className="text-sm font-mono font-bold text-purple-400 mt-1 block">{decodedResult.checksum}</span>
                    </div>
                  </div>

                  {decodedResult.machine_id_tested && (
                    <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
                      decodedResult.is_machine_match 
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300' 
                        : 'bg-red-950/20 border-red-500/40 text-red-300'
                    }`}>
                      {decodedResult.is_machine_match ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <div>
                            <p className="font-bold">Correspondance Matérielle Parfaite !</p>
                            <p className="text-gray-400 mt-0.5">Le checksum calculé pour cette machine ({decodedResult.calculated_checksum}) correspond exactement au checksum de la clé ({decodedResult.checksum}).</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <div>
                            <p className="font-bold">Non Correspondant !</p>
                            <p className="text-gray-400 mt-0.5">Cette clé n'a pas été générée pour ce Machine ID (Checksum attendu: {decodedResult.calculated_checksum}, Reçu: {decodedResult.checksum}).</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. SECURITY & DIAGNOSTICS TAB */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Password Change Form */}
            <div className="bg-gray-900/40 border border-gray-800/80 p-6 md:p-8 rounded-3xl backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-400" />
                  Sécurité du Panneau
                </h3>
                <p className="text-gray-400 text-xs mt-1">Changer le mot de passe maître de l'administration.</p>
              </div>

              <form onSubmit={changePassword} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Nouveau Mot de Passe (min. 6 caractères)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                    Confirmer le Nouveau Mot de Passe
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full bg-black/60 border border-gray-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {pwdError && (
                  <div className="flex items-center text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl text-xs">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {pwdError}
                  </div>
                )}
                {pwdMsg && (
                  <div className="flex items-center text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl text-xs">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {pwdMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isChangingPwd}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  {isChangingPwd ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                  Mettre à Jour le Mot de Passe
                </button>
              </form>
            </div>

            {/* System Info & DB Backup */}
            <div className="bg-gray-900/40 border border-gray-800/80 p-6 md:p-8 rounded-3xl backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  Diagnostics & Sauvegarde
                </h3>
                <p className="text-gray-400 text-xs mt-1">État du serveur et téléchargement de la base SQLite.</p>
              </div>

              {systemInfo ? (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-gray-800">
                    <span className="text-gray-400">Version PHP Serveur</span>
                    <span className="font-mono text-white">{systemInfo.php_version}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-gray-800">
                    <span className="text-gray-400">Heure Serveur (UTC/Local)</span>
                    <span className="font-mono text-white">{systemInfo.server_time}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-gray-800">
                    <span className="text-gray-400">Taille Base de Données Télémétrie</span>
                    <span className="font-mono text-emerald-400 font-bold">{systemInfo.database_size}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-gray-800">
                    <span className="text-gray-400">Total Licences Émises</span>
                    <span className="font-mono text-white">{systemInfo.total_generated_licenses}</span>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 text-xs">Chargement des diagnostics...</div>
              )}

              <div className="pt-2 border-t border-gray-800">
                <button
                  onClick={downloadDatabase}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-xl border border-gray-700 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <Download className="w-4 h-4 text-blue-400" />
                  Télécharger Sauvegarde SQLite (.telemetry.sqlite)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar Day Detail Modal */}
      {selectedCalendarDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h4 className="font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-400" />
                Activations du {selectedCalendarDay.day} {currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
              </h4>
              <button 
                onClick={() => setSelectedCalendarDay(null)}
                className="text-gray-400 hover:text-white text-lg font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {selectedCalendarDay.activations.map(act => (
                <div key={act.id} className="p-3 bg-black/60 border border-gray-800 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-blue-300 font-bold">{act.machine_id}</span>
                    <span className="text-[10px] text-gray-500">{new Date(act.created_at).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Clé: <span className="font-mono text-white">{act.license_key}</span></span>
                    <span>IP: {act.ip_address}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedCalendarDay(null)}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
