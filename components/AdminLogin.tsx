
import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'iker@gmail.com' && password === 'ikeradminjijel') {
      onSuccess();
    } else {
      setError('Invalid credentials for Axis Core access.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 pt-32">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl border border-zinc-100 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-2xl mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">Systems Access</h1>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-2 text-center">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Mail size={12} /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-zinc-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="iker@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Lock size={12} /> Access Key
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-zinc-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="••••••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold uppercase text-center">{error}</p>}

          <div className="pt-4 flex flex-col gap-4">
            <button type="submit" className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
              Initialize Access
            </button>
            <button type="button" onClick={onCancel} className="w-full py-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
              Abort Sequence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
