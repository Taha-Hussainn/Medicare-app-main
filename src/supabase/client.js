import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ndqjlfkwfviczvzbxsjz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcWpsZmt3ZnZpY3p2emJ4c2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MjE0MjcsImV4cCI6MjA5NTA5NzQyN30.EI3HrqqLHed2RVwI_jZbl_u7TnYq5RTb-69EglKimDE'

export const supabase = createClient(supabaseUrl, supabaseKey)