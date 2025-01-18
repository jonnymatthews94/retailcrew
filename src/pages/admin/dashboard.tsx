import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth-context';
import { supabase } from '../../lib/supabase';
import { MetaTags } from '../../components/seo/meta-tags';
import { AdminStats } from './components/admin-stats';
import { AdminBrands } from './components/admin-brands';
import { AdminOffers } from './components/admin-offers';
import { AdminWaitlist } from './components/admin-waitlist';
import { AdminMessages } from './components/admin-messages';

export function AdminDashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: { is_admin } } = await supabase.rpc('is_admin');
      setIsAdmin(is_admin);
      setLoading(false);

      if (!is_admin) {
        navigate('/');
      }
    }

    checkAdmin();
  }, [user, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaTags
        title="Admin Dashboard"
        description="RetailCrew Admin Dashboard"
      />

      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <AdminStats />
        <AdminBrands />
        <AdminOffers />
        <AdminWaitlist />
        <AdminMessages />
      </div>
    </div>
  );
}