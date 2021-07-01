import React from 'react';
import { createClient } from '@supabase/supabase-js';

export default function supabase(){ 
    return (createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
  ));
}