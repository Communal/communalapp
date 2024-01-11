
import { EnvironmentVariable } from '@communalapp/common/env'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = EnvironmentVariable.Supabase.url;
const supabaseKey = EnvironmentVariable.Supabase.anon;
const supabase = createClient(supabaseUrl, supabaseKey);

export {
  supabase
}