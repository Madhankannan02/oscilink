import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  initialize: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error.message);
      }
      
      set({ 
        user: session?.user || null, 
        isAuthenticated: !!session?.user,
        isLoading: false 
      });

      // Listen for auth changes (token refresh, sign out, etc.)
      supabase.auth.onAuthStateChange((_event, newSession) => {
        set({ 
          user: newSession?.user || null,
          isAuthenticated: !!newSession?.user,
          isLoading: false
        });
      });
    } catch (err) {
      console.error('Unexpected error during auth initialization:', err);
      set({ isLoading: false });
    }
  },

  signInWithGitHub: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      set({ isLoading: false });
      toast.error(err.message || 'Failed to sign in with GitHub');
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      set({ isLoading: false });
      toast.error(err.message || 'Failed to sign in with Google');
    }
  },

  signInWithEmail: async (email, password) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success('Successfully signed in');
    } catch (err: any) {
      toast.error(err.message || 'Invalid email or password');
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signUpWithEmail: async (email, password) => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });
      if (error) throw error;
      
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast.error('An account with this email already exists.');
      } else if (data.session === null) {
        toast.success('Please check your email to verify your account.');
      } else {
        toast.success('Account created successfully!');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to create account');
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, isAuthenticated: false });
      toast.success('Signed out successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign out');
    } finally {
      set({ isLoading: false });
    }
  }
}));
