import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY?.trim()
const hasPlaceholder = [supabaseUrl, supabaseKey].some((value) =>
  value?.startsWith('MY_SUPABASE_'),
)

function isValidSupabaseUrl(value) {
  if (!value) {
    return false
  }

  try {
    const parsedUrl = new URL(value)
    return ['http:', 'https:'].includes(parsedUrl.protocol) && Boolean(parsedUrl.hostname)
  } catch {
    return false
  }
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseKey && !hasPlaceholder && isValidSupabaseUrl(supabaseUrl),
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null

export const supabaseSetupMessage =
  'Check VITE_SUPABASE_URL and VITE_SUPABASE_KEY in the root .env file. Use your project HTTP(S) URL and public/publishable key, then restart the dev server.'