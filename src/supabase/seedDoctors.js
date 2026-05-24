export const seedDoctors = async () => {
  const { data } = await supabase.from('doctors').select('id').limit(1)
  if (data && data.length > 0) {
    console.log('Doctors already seeded, skipping.')
    return
  }
  const { error } = await supabase.from('doctors').insert(doctorsData)
  if (error) console.error('Seed error:', error)
  else console.log('✅ 12 doctors seeded!')
}