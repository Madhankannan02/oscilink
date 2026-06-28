import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { X, Github, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithGitHub, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [view, setView] = useState<'main' | 'forgot_password'>('main');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    // Reset state on close
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setView('main');
    setActiveTab('signin');
    onClose();
  };

  const validatePasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 0) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass) && (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass))) score += 1;
    return score; // 0 = none, 1 = weak, 2 = medium, 3 = strong, 4 = very strong
  };

  const passwordScore = validatePasswordStrength(password);
  const getStrengthColor = () => {
    if (passwordScore === 0) return 'bg-border-subtle';
    if (passwordScore === 1) return 'bg-red-500';
    if (passwordScore === 2) return 'bg-yellow-500';
    if (passwordScore === 3) return 'bg-accent-blue';
    return 'bg-accent-green';
  };
  const getStrengthLabel = () => {
    if (passwordScore === 0) return '';
    if (passwordScore === 1) return 'Weak';
    if (passwordScore === 2) return 'Medium';
    if (passwordScore === 3) return 'Strong';
    return 'Very Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (view === 'forgot_password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
        });
        if (error) throw error;
        toast.success('Password reset email sent! Check your inbox.');
        setView('main');
      } else if (activeTab === 'signin') {
        await signInWithEmail(email, password);
        handleClose();
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    setErrorMsg('');
    setIsLoading(true);
    if (provider === 'github') {
      await signInWithGitHub();
    } else {
      await signInWithGoogle();
    }
    // Note: OAuth redirects, so isLoading doesn't necessarily need to be set to false here 
    // unless it fails immediately.
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white border border-gray-200 shadow-2xl flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {view === 'main' ? (
          <>
            {/* Header Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'signin' ? 'text-[#2C5E4A] border-b-2 border-[#2C5E4A]' : 'text-[#6A7B76] hover:text-[#2C5E4A]'}`}
                onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'signup' ? 'text-[#2C5E4A] border-b-2 border-[#2C5E4A]' : 'text-[#6A7B76] hover:text-[#2C5E4A]'}`}
                onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
              >
                Create Account
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C5E4A] uppercase tracking-wider">Email Address</label>
                  <div className="relative mt-1">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#2C5E4A] focus:outline-none focus:bg-white focus:border-[#2C5E4A] focus:ring-1 focus:ring-[#2C5E4A] transition-colors placeholder-gray-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2C5E4A] uppercase tracking-wider">Password</label>
                  <div className="relative mt-1">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-10 text-sm text-[#2C5E4A] focus:outline-none focus:bg-white focus:border-[#2C5E4A] focus:ring-1 focus:ring-[#2C5E4A] transition-colors placeholder-gray-400"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator (Sign Up only) */}
                  {activeTab === 'signup' && password.length > 0 && (
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex gap-1 w-full mr-3">
                        {[1, 2, 3, 4].map(level => (
                          <div 
                            key={level} 
                            className={`h-1 flex-1 rounded-full ${passwordScore >= level ? getStrengthColor() : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider w-16 text-right ${getStrengthColor().replace('bg-', 'text-')}`}>
                        {getStrengthLabel()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password (Sign Up only) */}
                {activeTab === 'signup' && (
                  <div className="space-y-1 mt-1">
                    <label className="text-xs font-bold text-[#2C5E4A] uppercase tracking-wider">Confirm Password</label>
                    <div className="relative mt-1">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#2C5E4A] focus:outline-none focus:bg-white focus:border-[#2C5E4A] focus:ring-1 focus:ring-[#2C5E4A] transition-colors placeholder-gray-400"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errorMsg && (
                  <div className="text-xs text-red-500 font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Forgot Password Link */}
                {activeTab === 'signin' && (
                  <button 
                    type="button"
                    onClick={() => { setView('forgot_password'); setErrorMsg(''); }}
                    className="text-xs font-bold text-[#6A7B76] hover:text-[#2C5E4A] self-start mt-[-4px]"
                  >
                    Forgot your password?
                  </button>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 bg-[#2C5E4A] hover:bg-[#1A382C] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* OAuth Providers */}
              <div className="mt-8 pt-6 border-t border-gray-200 relative">
                <div className="absolute top-[-9px] left-1/2 -translate-x-1/2 bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  OR CONTINUE WITH
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 py-2.5 rounded-lg text-[#2C5E4A] text-sm font-bold transition-colors shadow-sm"
                  >
                    <Github size={18} />
                    GitHub
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 py-2.5 rounded-lg text-[#2C5E4A] text-sm font-bold transition-colors shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Forgot Password View */
          <div className="p-6">
            <h3 className="text-lg font-extrabold text-[#2C5E4A] mb-2 mt-2">Reset Password</h3>
            <p className="text-sm text-[#6A7B76] mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2C5E4A] uppercase tracking-wider">Email Address</label>
                <div className="relative mt-1">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#2C5E4A] focus:outline-none focus:bg-white focus:border-[#2C5E4A] focus:ring-1 focus:ring-[#2C5E4A] transition-colors placeholder-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-500 font-bold">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[#2C5E4A] hover:bg-[#1A382C] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                Send Reset Email
              </button>

              <button
                type="button"
                onClick={() => { setView('main'); setErrorMsg(''); }}
                className="w-full mt-3 bg-transparent hover:bg-gray-100 text-[#6A7B76] hover:text-[#2C5E4A] text-sm font-bold py-3 rounded-lg transition-colors"
              >
                Back to Sign In
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
