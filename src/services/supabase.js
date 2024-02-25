import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cerqqyruawwpxutetviu.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcnFxeXJ1YXd3cHh1dGV0dml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MDIxMzQsImV4cCI6MjAyNDI3ODEzNH0.L2DN6IanxcJ8PKJW51eTs_lI0Gy_6O1PJ__b2Tdgcls';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
