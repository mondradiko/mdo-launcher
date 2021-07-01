import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Avatar({}) {


  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])


}