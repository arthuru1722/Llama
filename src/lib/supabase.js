import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://uoygocppnjkqilyxtivk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVveWdvY3BwbmprcWlseXh0aXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQwMzksImV4cCI6MjA4OTg4MDAzOX0.do_3PT4cOt-lUUPT9knw95f_VyHpt-Jgw03glopXpm4',
)
