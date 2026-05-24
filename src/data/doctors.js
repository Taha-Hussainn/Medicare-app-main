// src/data/doctors.js
export const doctorsData = [
  {
    id: 1,
    name: 'Dr. Ahmed Raza',
    specialization: 'Cardiologist',
    qualification: 'FCPS Cardiology, MBBS',
    experience: 12,
    fee: 2500,
    rating: 4.7,
    totalReviews: 189,
    location: 'Karachi, Pakistan',
    hospital: 'Aga Khan University Hospital',
    clinic: 'Heart Care Center',
    description: 'Senior consultant cardiologist specializing in interventional cardiology and heart failure management.',
    about: 'Dr. Ahmed Raza is a renowned cardiologist with extensive experience in treating complex cardiac conditions.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: '10:00 AM - 6:00 PM',
    languages: ['English', 'Urdu', 'Sindhi'],
    services: ['Angioplasty', 'Echocardiography', 'Stress Test', 'Pacemaker Implantation'],
    education: ['MBBS - Dow University', 'FCPS - Cardiology'],
    awards: ['Best Cardiologist Award 2022', 'Excellence in Healthcare'],
    contact: {
      phone: '+92 300 1234567',
      email: 'dr.ahmed@example.com',
      website: 'www.drahmedraza.com'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health', 'Adamjee Insurance'],
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM']
  },
  {
    id: 2,
    name: 'Dr. Fatima Khan',
    specialization: 'Gynecologist',
    qualification: 'MCPS, FCPS Gynecology',
    experience: 8,
    fee: 2000,
    rating: 4.8,
    totalReviews: 156,
    location: 'Lahore, Pakistan',
    hospital: 'Shaukat Khanum Hospital',
    clinic: 'Women Health Clinic',
    description: 'Expert in high-risk pregnancies, infertility treatments, and laparoscopic surgeries.',
    about: 'Dr. Fatima Khan specializes in women reproductive health with a compassionate approach.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableTime: '9:00 AM - 5:00 PM',
    languages: ['English', 'Urdu', 'Punjabi'],
    services: ['Pregnancy Care', 'Infertility Treatment', 'Laparoscopic Surgery', 'Menopause Management'],
    education: ['MBBS - King Edward Medical University', 'FCPS - Gynecology'],
    awards: ['Women Healthcare Excellence 2021'],
    contact: {
      phone: '+92 321 9876543',
      email: 'dr.fatima@example.com',
      website: 'www.womenhealth.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health', 'ICAP'],
    slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM']
  },
  {
    id: 3,
    name: 'Dr. Hassan Ali',
    specialization: 'Orthopedic',
    qualification: 'FRCS Orthopedics, MBBS',
    experience: 15,
    fee: 3000,
    rating: 4.9,
    totalReviews: 234,
    location: 'Islamabad, Pakistan',
    hospital: 'Pakistan Institute of Medical Sciences',
    clinic: 'Bone & Joint Center',
    description: 'Expert in joint replacement surgeries, sports injuries, and fracture management.',
    about: 'Dr. Hassan Ali has performed over 1000 successful joint replacement surgeries.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    availableTime: '8:00 AM - 4:00 PM',
    languages: ['English', 'Urdu', 'Pashto'],
    services: ['Knee Replacement', 'Hip Replacement', 'Arthroscopic Surgery', 'Sports Injury'],
    education: ['MBBS - Rawalpindi Medical University', 'FRCS - Orthopedics'],
    awards: ['Orthopedic Surgeon of the Year 2023'],
    contact: {
      phone: '+92 333 4567890',
      email: 'dr.hassan@example.com',
      website: 'www.bonejoint.pk'
    },
    emergency: true,
    insurance: ['State Life', 'Adamjee Insurance', 'EFU Health'],
    slots: ['08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM', '02:30 PM']
  },
  {
    id: 4,
    name: 'Dr. Sara Malik',
    specialization: 'Pediatrician',
    qualification: 'DCH, MCPS Pediatrics',
    experience: 7,
    fee: 1500,
    rating: 4.6,
    totalReviews: 142,
    location: 'Karachi, Pakistan',
    hospital: 'National Institute of Child Health',
    clinic: 'Little Stars Clinic',
    description: 'Specializes in child healthcare, vaccinations, and developmental disorders.',
    about: 'Dr. Sara Malik is passionate about child healthcare and preventive pediatrics.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    availableTime: '10:00 AM - 7:00 PM',
    languages: ['English', 'Urdu', 'Sindhi'],
    services: ['Child Vaccination', 'Growth Monitoring', 'Nutrition Counseling', 'Developmental Assessment'],
    education: ['MBBS - Sindh Medical College', 'DCH - Pediatrics'],
    awards: ['Best Pediatrician Award 2021'],
    contact: {
      phone: '+92 345 6789012',
      email: 'dr.sara@example.com',
      website: 'www.littlestarsclinic.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health'],
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM', '06:00 PM']
  },
  {
    id: 5,
    name: 'Dr. Omar Farooq',
    specialization: 'Dermatologist',
    qualification: 'FCPS Dermatology, MBBS',
    experience: 10,
    fee: 1800,
    rating: 4.7,
    totalReviews: 178,
    location: 'Lahore, Pakistan',
    hospital: 'Services Hospital',
    clinic: 'Skin & Hair Clinic',
    description: 'Expert in skin diseases, cosmetic dermatology, and hair transplant.',
    about: 'Dr. Omar Farooq is a leading dermatologist with expertise in cosmetic procedures.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    availableTime: '9:00 AM - 7:00 PM',
    languages: ['English', 'Urdu', 'Punjabi'],
    services: ['Acne Treatment', 'Hair Transplant', 'Laser Therapy', 'Skin Rejuvenation'],
    education: ['MBBS - Allama Iqbal Medical College', 'FCPS - Dermatology'],
    awards: ['Dermatology Excellence Award 2022'],
    contact: {
      phone: '+92 311 2345678',
      email: 'dr.omar@example.com',
      website: 'www.skinhair.pk'
    },
    emergency: false,
    insurance: ['State Life', 'EFU Health', 'Adamjee Insurance'],
    slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM']
  },
  {
    id: 6,
    name: 'Dr. Ayesha Siddiqui',
    specialization: 'Dentist',
    qualification: 'BDS, MDS Orthodontics',
    experience: 9,
    fee: 1200,
    rating: 4.5,
    totalReviews: 165,
    location: 'Islamabad, Pakistan',
    hospital: 'Islamabad Dental Hospital',
    clinic: 'Perfect Smile Dental',
    description: 'Expert in cosmetic dentistry, orthodontic treatments, and dental implants.',
    about: 'Dr. Ayesha Siddiqui specializes in smile design and corrective dentistry.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    availableTime: '10:00 AM - 6:00 PM',
    languages: ['English', 'Urdu'],
    services: ['Braces & Aligners', 'Root Canal Treatment', 'Teeth Whitening', 'Dental Implants'],
    education: ['BDS - Islamic International Dental College', 'MDS - Orthodontics'],
    awards: ['Young Dentist Award 2021'],
    contact: {
      phone: '+92 344 5678901',
      email: 'dr.ayesha@example.com',
      website: 'www.perfectsmile.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health'],
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM']
  },
  {
    id: 7,
    name: 'Dr. Bilal Akhtar',
    specialization: 'Neurologist',
    qualification: 'FCPS Neurology, MBBS',
    experience: 11,
    fee: 2800,
    rating: 4.8,
    totalReviews: 132,
    location: 'Karachi, Pakistan',
    hospital: 'Jinnah Postgraduate Medical Centre',
    clinic: 'Neuro Care Center',
    description: 'Specialist in treating neurological disorders including epilepsy, stroke, and migraine.',
    about: 'Dr. Bilal Akhtar is a renowned neurologist with expertise in movement disorders.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableTime: '8:00 AM - 5:00 PM',
    languages: ['English', 'Urdu', 'Sindhi'],
    services: ['EEG Monitoring', 'EMG & Nerve Conduction', 'Stroke Management', 'Epilepsy Treatment'],
    education: ['MBBS - Dow University', 'FCPS - Neurology'],
    awards: ['Neurology Excellence Award 2022'],
    contact: {
      phone: '+92 322 3456789',
      email: 'dr.bilal@example.com',
      website: 'www.neurocare.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health', 'Adamjee Insurance'],
    slots: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM']
  },
  {
    id: 8,
    name: 'Dr. Nadia Hussain',
    specialization: 'Psychiatrist',
    qualification: 'FCPS Psychiatry, MBBS',
    experience: 8,
    fee: 2200,
    rating: 4.6,
    totalReviews: 98,
    location: 'Lahore, Pakistan',
    hospital: 'Mayo Hospital',
    clinic: 'Mind Wellness Center',
    description: 'Specializes in mental health disorders, therapy, and counseling.',
    about: 'Dr. Nadia Hussain combines medication management with psychotherapy for holistic treatment.',
    availableDays: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '11:00 AM - 8:00 PM',
    languages: ['English', 'Urdu', 'Punjabi'],
    services: ['Anxiety Treatment', 'Depression Management', 'Stress Counseling', 'Relationship Therapy'],
    education: ['MBBS - King Edward Medical University', 'FCPS - Psychiatry'],
    awards: ['Mental Health Champion 2021'],
    contact: {
      phone: '+92 333 4567891',
      email: 'dr.nadia@example.com',
      website: 'www.mindwellness.pk'
    },
    emergency: false,
    insurance: ['State Life', 'EFU Health'],
    slots: ['11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM']
  },
  {
    id: 9,
    name: 'Dr. Kamran Shah',
    specialization: 'ENT Specialist',
    qualification: 'FCPS ENT, MBBS',
    experience: 13,
    fee: 2000,
    rating: 4.7,
    totalReviews: 156,
    location: 'Islamabad, Pakistan',
    hospital: 'Federal Government Hospital',
    clinic: 'Ear Nose Throat Care',
    description: 'Expert in ear, nose, and throat disorders. Performs advanced endoscopic surgeries.',
    about: 'Dr. Kamran Shah specializes in cochlear implants and sinus surgeries.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    availableTime: '9:00 AM - 6:00 PM',
    languages: ['English', 'Urdu', 'Pashto'],
    services: ['Cochlear Implant', 'Sinus Surgery', 'Tonsillectomy', 'Hearing Tests'],
    education: ['MBBS - Khyber Medical College', 'FCPS - ENT'],
    awards: ['ENT Surgeon of the Year 2021'],
    contact: {
      phone: '+92 311 2345680',
      email: 'dr.kamran@example.com',
      website: 'www.entcare.pk'
    },
    emergency: true,
    insurance: ['State Life', 'Adamjee Insurance', 'EFU Health'],
    slots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM']
  },
  {
    id: 10,
    name: 'Dr. Zainab Raza',
    specialization: 'Ophthalmologist',
    qualification: 'FCPS Ophthalmology, MBBS',
    experience: 9,
    fee: 2100,
    rating: 4.8,
    totalReviews: 167,
    location: 'Karachi, Pakistan',
    hospital: 'Al-Ibrahim Eye Hospital',
    clinic: 'Clear Vision Center',
    description: 'Specializes in cataract surgery, LASIK, and retinal diseases.',
    about: 'Dr. Zainab Raza has performed over 3000 successful eye surgeries.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableTime: '10:00 AM - 7:00 PM',
    languages: ['English', 'Urdu', 'Sindhi'],
    services: ['Cataract Surgery', 'LASIK', 'Glaucoma Treatment', 'Retinal Surgery'],
    education: ['MBBS - Liaquat National Hospital', 'FCPS - Ophthalmology'],
    awards: ['Ophthalmology Excellence 2022'],
    contact: {
      phone: '+92 345 6789123',
      email: 'dr.zainab@example.com',
      website: 'www.clearvision.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health', 'Adamjee Insurance'],
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM']
  },
  {
    id: 11,
    name: 'Dr. Asif Mahmood',
    specialization: 'Gastroenterologist',
    qualification: 'FCPS Gastroenterology, MBBS',
    experience: 14,
    fee: 2700,
    rating: 4.9,
    totalReviews: 142,
    location: 'Lahore, Pakistan',
    hospital: 'Ittefaq Hospital',
    clinic: 'Digestive Health Clinic',
    description: 'Expert in liver diseases, endoscopy, and digestive disorders.',
    about: 'Dr. Asif Mahmood is a leading gastroenterologist with expertise in therapeutic endoscopy.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: '8:00 AM - 5:00 PM',
    languages: ['English', 'Urdu', 'Punjabi'],
    services: ['Colonoscopy', 'Endoscopy', 'Liver Disease Treatment', 'IBD Management'],
    education: ['MBBS - Services Institute of Medical Sciences', 'FCPS - Gastroenterology'],
    awards: ['Gastroenterology Excellence 2021'],
    contact: {
      phone: '+92 322 3456790',
      email: 'dr.asif@example.com',
      website: 'www.digestivehealth.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health', 'Adamjee Insurance'],
    slots: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM']
  },
  {
    id: 12,
    name: 'Dr. Sanaullah Khan',
    specialization: 'General Physician',
    qualification: 'FCPS Medicine, MBBS',
    experience: 16,
    fee: 1500,
    rating: 4.7,
    totalReviews: 210,
    location: 'Islamabad, Pakistan',
    hospital: 'Holy Family Hospital',
    clinic: 'Primary Care Clinic',
    description: 'Comprehensive healthcare for adults with expertise in chronic disease management.',
    about: 'Dr. Sanaullah Khan focuses on preventive care and holistic treatment approaches.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableTime: '8:00 AM - 8:00 PM',
    languages: ['English', 'Urdu', 'Pashto'],
    services: ['Diabetes Management', 'Hypertension Treatment', 'General Checkup', 'Chronic Disease Care'],
    education: ['MBBS - Khyber Medical College', 'FCPS - Medicine'],
    awards: ['General Physician of the Year 2022'],
    contact: {
      phone: '+92 333 4567800',
      email: 'dr.sanaullah@example.com',
      website: 'www.primarycare.pk'
    },
    emergency: true,
    insurance: ['State Life', 'EFU Health', 'Adamjee Insurance'],
    slots: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM']
  }
]

// Pakistani Cities
export const pakistaniCities = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Hyderabad',
  'Gujranwala',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Mardan',
  'Gujrat',
  'Kasur',
  'Abbottabad'
]

// Filter functions
export const filterDoctors = (doctors, filters) => {
  return doctors.filter(doctor => {
    // Name filter
    if (filters.name && !doctor.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    
    // Specialization filter
    if (filters.specialization && doctor.specialization !== filters.specialization) {
      return false;
    }
    
    // City filter (extract city from location)
    if (filters.location) {
      const doctorCity = doctor.location.split(',')[0].trim();
      if (doctorCity.toLowerCase() !== filters.location.toLowerCase()) {
        return false;
      }
    }
    
    // Hospital filter
    if (filters.hospital && !doctor.hospital.toLowerCase().includes(filters.hospital.toLowerCase())) {
      return false;
    }
    
    // Experience filter
    if (filters.minExperience && doctor.experience < filters.minExperience) {
      return false;
    }
    
    // Fee range filter
    if (filters.maxFee && doctor.fee > filters.maxFee) {
      return false;
    }
    
    return true;
  });
};

// Sort functions
export const sortDoctors = (doctors, sortBy) => {
  const sortedDoctors = [...doctors];
  
  switch(sortBy) {
    case 'rating':
      return sortedDoctors.sort((a, b) => b.rating - a.rating);
    case 'experience':
      return sortedDoctors.sort((a, b) => b.experience - a.experience);
    case 'fee_low':
      return sortedDoctors.sort((a, b) => a.fee - b.fee);
    case 'fee_high':
      return sortedDoctors.sort((a, b) => b.fee - a.fee);
    case 'name':
      return sortedDoctors.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sortedDoctors;
  }
};

// Get doctor by ID
export const getDoctorById = (id) => {
  return doctorsData.find(doctor => doctor.id === parseInt(id));
};

// Get doctors by specialization
export const getDoctorsBySpecialization = (specialization) => {
  return doctorsData.filter(doctor => 
    doctor.specialization.toLowerCase() === specialization.toLowerCase()
  );
};

// Get all specializations
export const getAllSpecializations = () => {
  const specializations = doctorsData.map(doctor => doctor.specialization);
  return [...new Set(specializations)];
};

// Get all cities
export const getAllCities = () => {
  const cities = doctorsData.map(doctor => doctor.location.split(',')[0].trim());
  return [...new Set(cities)];
};