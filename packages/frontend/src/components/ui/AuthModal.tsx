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
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-surface border border-border-default shadow-2xl flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 p-1 rounded-md text-text-muted hover:text-text hover:bg-surface-hover transition-colors z-10"
        >
          <X size={20} />
        </button>

        {view === 'main' ? (
          <>
            {/* Header Tabs */}
            <div className="flex border-b border-border-default">
              <button
                className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'signin' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-text-muted hover:text-text'}`}
                onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'signup' ? 'text-accent-blue border-b-2 border-accent-blue' : 'text-text-muted hover:text-text'}`}
                onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
              >
                Create Account
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-elevated border border-border-default rounded-md py-2 pl-9 pr-3 text-sm text-text focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-text-secondary">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-elevated border border-border-default rounded-md py-2 pl-9 pr-10 text-sm text-text focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator (Sign Up only) */}
                  {activeTab === 'signup' && password.length > 0 && (
                    <div className="pt-1 flex items-center justify-between">
                      <div className="flex gap-1 w-full mr-3">
                        {[1, 2, 3, 4].map(level => (
                          <div 
                            key={level} 
                            className={`h-1 flex-1 rounded-full ${passwordScore >= level ? getStrengthColor() : 'bg-border-subtle'}`}
                          />
                        ))}
                      </div>
                      <span className={`text-[10px] font-medium w-16 text-right ${getStrengthColor().replace('bg-', 'text-')}`}>
                        {getStrengthLabel()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password (Sign Up only) */}
                {activeTab === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-text-secondary">Confirm Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-elevated border border-border-default rounded-md py-2 pl-9 pr-3 text-sm text-text focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
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
                    className="text-xs text-accent-blue hover:text-blue-400 self-start mt-[-4px]"
                  >
                    Forgot your password?
                  </button>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-accent-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* OAuth Providers */}
              <div className="mt-6 pt-6 border-t border-border-default relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-surface px-2 text-xs font-medium text-text-muted">
                  OR CONTINUE WITH
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleOAuth('github')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-elevated hover:bg-surface-hover border border-border-default py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <Github size={18} />
                    GitHub
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOAuth('google')}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-elevated hover:bg-surface-hover border border-border-default py-2 rounded-md text-sm font-medium transition-colors"
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
            <h3 className="text-lg font-semibold text-text mb-2 mt-2">Reset Password</h3>
            <p className="text-sm text-text-secondary mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-text-secondary">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-elevated border border-border-default rounded-md py-2 pl-9 pr-3 text-sm text-text focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="text-xs text-red-500 font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-accent-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                Send Reset Email
              </button>

              <button
                type="button"
                onClick={() => { setView('main'); setErrorMsg(''); }}
                className="w-full mt-2 bg-transparent hover:bg-surface-hover text-text-secondary text-sm font-medium py-2 rounded-md transition-colors"
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
