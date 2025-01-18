import { supabase } from './supabase';

export type EventName = 
  | 'page_view'
  | 'offer_view'
  | 'offer_copy'
  | 'signup_start'
  | 'signup_complete'
  | 'waitlist_join'
  | 'verification_start'
  | 'verification_complete';

interface EventProperties {
  [key: string]: string | number | boolean | null;
}

export async function trackEvent(
  name: EventName,
  properties: EventProperties = {}
) {
  try {
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user?.id;
    const sessionId = session.data.session?.access_token;

    const { error } = await supabase
      .from('analytics_events')
      .insert({
        event_name: name,
        properties,
        user_id: userId,
        session_id: sessionId
      });

    if (error) throw error;
  } catch (err) {
    console.error('Failed to track event:', err);
  }
}