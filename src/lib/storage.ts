// Local Storage Manager for OICA Portal Simulation

export const STORAGE_KEYS = {
  USERS: "oica_users",
  LECTURES: "oica_lectures",
  BRANCHES: "oica_branches",
  RESULTS: "oica_results",
  SESSION: "oica_session",
  GALLERY: "oica_gallery",
  JOBS: "oica_jobs",
  CAREER_APPS: "oica_career_apps"
};

export const getStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setStorageData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const firstNames = ["Ankit", "Manas", "Subhra", "Priyanka", "Deepak", "Lipika", "Smaran", "Biswajit", "Rashmi", "Tapas", "Geeta", "Rahul", "Sonia", "Amit", "Puja", "Vikram", "Neha", "Arun", "Shila", "Rajat"];
const lastNames = ["Kumar", "Mohanty", "Das", "Sahu", "Patra", "Rout", "Nayaka", "Behera", "Swain", "Mishra", "Panda", "Pradhan", "Parida", "Jena", "Sethy"];
const courses = ["DCA", "PGDCA", "Tally ERP.9", "Graphic Design", "Web Development", "Python for Business", "Digital Marketing", "Office 2026"];

export const initStorage = () => {
  const districts = [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
    "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", 
    "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", 
    "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "Bhubaneswar HQ"
  ];

  const existingUsers = getStorageData(STORAGE_KEYS.USERS);
  const existingBranches = getStorageData(STORAGE_KEYS.BRANCHES);

  // Initialize Default System Users
  const defaultUsers: any[] = [
    { id: 1, name: "Ankit Kumar", username: "student", password: "password", role: "student", branchId: "KHORDHA-01", rollNo: "OICA/2026/001", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374", age: 20, course: "PGDCA", email: "ankit@demo.com", phone: "9876543210" },
    { id: 2, name: "Admin HQ", username: "admin", password: "admin123", role: "admin" },
  ];

  const defaultBranches: any[] = [];
  const branchIds: string[] = [];

  // 1. Initialize Branches & Branch Managers
  districts.forEach((dist, idx) => {
    const branchId = `${dist.toUpperCase().replace(/\s/g, '')}-01`;
    branchIds.push(branchId);
    
    const branchUser = {
      id: 100 + idx,
      name: `${dist} Manager`,
      username: `branch_${dist.toLowerCase().replace(/\s/g, '_')}`,
      password: "password123",
      role: "branch",
      branchId: branchId
    };
    defaultUsers.push(branchUser);
    
    defaultBranches.push({
      id: branchId,
      name: dist === "Bhubaneswar HQ" ? "OICA Main Branch / Head Quarter" : `OICA ${dist} Branch`,
      location: dist,
      manager: `${dist} District Head`,
      phone: `+91 ${9000000000 + idx}`,
      email: `${dist.toLowerCase().replace(/\s/g, '')}@oica.edu.in`,
      address: `Plot No. ${100 + idx}, Main Road, ${dist}, Odisha`,
      about: `Odisha Institute of Computer Application (OICA) ${dist} center is dedicated to providing premium IT education. We maintain state-of-the-art labs and a career-focused curriculum designed to empower the youth of the district.`,
      gallery: [
        `https://images.unsplash.com/photo-${1516321318423 + idx}-f06f85e504b3?q=80&w=800`,
        `https://images.unsplash.com/photo-${1523050337456 + idx}-5d55f21af557?q=80&w=800`,
        `https://images.unsplash.com/photo-${1541339907198 + idx}-e08756ebafe3?q=80&w=800`
      ],
      students: 0 // Will be updated
    });
  });

  // 2. Generate 200+ Demo Students
  if (existingUsers.length < 50) {
    for (let i = 0; i < 220; i++) {
       const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
       const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
       const bId = branchIds[Math.floor(Math.random() * branchIds.length)];
       const course = courses[Math.floor(Math.random() * courses.length)];
       
       defaultUsers.push({
         id: 1000 + i,
         name: `${fName} ${lName}`,
         username: `stu_${1000 + i}`,
         password: "password123",
         role: "student",
         branchId: bId,
         rollNo: `OICA/2026/${(100 + i).toString()}`,
         photo: `https://i.pravatar.cc/150?u=${i}`,
         age: 18 + Math.floor(Math.random() * 10),
         course: course,
         email: `${fName.toLowerCase()}${i}@gmail.com`,
         phone: `${7000000000 + i}`
       });

       // Update branch student count
       const branchIdx = defaultBranches.findIndex(b => b.id === bId);
       if (branchIdx !== -1) defaultBranches[branchIdx].students++;
    }
  }

  // 3. Save to Storage
  if (existingUsers.length < 50) {
    setStorageData(STORAGE_KEYS.USERS, defaultUsers);
  }
  
  if (existingBranches.length < 31) {
    setStorageData(STORAGE_KEYS.BRANCHES, defaultBranches);
  }

  // 4. Initialize Lectures
  if (!localStorage.getItem(STORAGE_KEYS.LECTURES) || getStorageData(STORAGE_KEYS.LECTURES).length < 5) {
     const mahaTandavVideos = [
      { id: 1, title: "Function One Shot | Maha Tandav", desc: "Complete Function Revision for Computer Science and Math basics.", url: "https://www.youtube.com/embed/8-9-o97S6S8", thumbnail: "https://img.youtube.com/vi/8-9-o97S6S8/maxresdefault.jpg" },
      { id: 2, title: "Inverse Trigonometry | Maha Tandav", desc: "Premium revision session on Trigonometric functions and logic.", url: "https://www.youtube.com/embed/g_T6JvI7v-0", thumbnail: "https://img.youtube.com/vi/g_T6JvI7v-0/maxresdefault.jpg" },
      { id: 3, title: "Matrices & Determinants", desc: "Core data handling and matrix logic for automation.", url: "https://www.youtube.com/embed/6_6xWpZ-XkQ", thumbnail: "https://img.youtube.com/vi/6_6xWpZ-XkQ/maxresdefault.jpg" },
      { id: 4, title: "Limits & Continuity", desc: "Advanced logic structures and continuous function management.", url: "https://www.youtube.com/embed/V6H3K8v7HkQ", thumbnail: "https://img.youtube.com/vi/V6H3K8v7HkQ/maxresdefault.jpg" },
      { id: 5, title: "Differentiation Mastery", desc: "Understanding change and logic optimization.", url: "https://www.youtube.com/embed/k9oW9T6M-T4", thumbnail: "https://img.youtube.com/vi/k9oW9T6M-T4/maxresdefault.jpg" }
    ];
    setStorageData(STORAGE_KEYS.LECTURES, mahaTandavVideos);
  }

  // 5. Initialize Career Data (Jobs & Applications)
  const existingJobs = getStorageData(STORAGE_KEYS.JOBS);
  if (existingJobs.length === 0) {
    const defaultJobs = [
      { id: "j1", title: "Junior Software Developer", company: "TechNova Solutions", location: "Bhubaneswar", type: "Full-time", salary: "₹4.5 - 6.0 LPA", experience: "0-1 Years", requirements: "Knowledge of React, Node.js, and SQL. Good problem-solving skills.", postedAt: "2026-04-10" },
      { id: "j2", title: "Graphic Designer", company: "Pixel Perfect Agency", location: "Cuttack", type: "Full-time", salary: "₹3.0 - 4.2 LPA", experience: "0-2 Years", requirements: "Proficiency in Photoshop, Illustrator, and Canva. Portfolio required.", postedAt: "2026-04-12" },
      { id: "j3", title: "Tally & Accounts Expert", company: "OICA Corporate Office", location: "Bhubaneswar HQ", type: "Full-time", salary: "₹2.4 - 3.6 LPA", experience: "0-1 Years", requirements: "Advanced Tally Prime knowledge, GST filing, and basic bookkeeping.", postedAt: "2026-04-15" },
      { id: "j4", title: "Web Development Intern", company: "CloudSphere IT", location: "Remote", type: "Internship", salary: "₹10,000 / month", experience: "Fresher", requirements: "Basic HTML, CSS, and JS knowledge. Eager to learn modern frameworks.", postedAt: "2026-04-16" },
      { id: "j5", title: "Digital Marketing Specialist", company: "GrowthHacker Odisha", location: "Puri", type: "Full-time", salary: "₹3.5 - 5.0 LPA", experience: "1-2 Years", requirements: "SEO, SEM, Social Media Management, and Google Analytics.", postedAt: "2026-04-08" },
      { id: "j6", title: "Office Assistant", company: "Odisha Govt. Vendor", location: "Sambalpur", type: "Part-time", salary: "₹1.8 - 2.4 LPA", experience: "Fresher", requirements: "Basic computer knowledge (MS Office), good typing speed.", postedAt: "2026-04-14" },
      { id: "j7", title: "IT Faculty / Trainer", company: "OICA Kendrapara", location: "Kendrapara", type: "Full-time", salary: "₹3.0 - 4.5 LPA", experience: "1+ Years", requirements: "Excellent communication, deep knowledge of DCA/PGDCA syllabus.", postedAt: "2026-04-11" },
      { id: "j8", title: "Android App Developer", company: "AppVantage Studio", location: "Berhampur", type: "Contract", salary: "₹5.0 - 7.5 LPA", experience: "2+ Years", requirements: "Java/Kotlin, Firebase integration, and API handling.", postedAt: "2026-04-13" },
      { id: "j9", title: "Data Entry Operator", company: "Global Servicing", location: "Balasore", type: "Full-time", salary: "₹1.5 - 2.0 LPA", experience: "Fresher", requirements: "Fast typing, attention to detail, MS Excel proficiency.", postedAt: "2026-04-09" },
      { id: "j10", title: "System Administrator", company: "OICA Main Branch", location: "Bhubaneswar", type: "Full-time", salary: "₹4.0 - 5.5 LPA", experience: "2+ Years", requirements: "Networking, Hardware maintenance, and Server management.", postedAt: "2026-04-15" }
    ];
    setStorageData(STORAGE_KEYS.JOBS, defaultJobs);
  }

  const existingApps = getStorageData(STORAGE_KEYS.CAREER_APPS);
  if (existingApps.length === 0) {
    const studentUsers = getStorageData(STORAGE_KEYS.USERS).filter((u: any) => u.role === 'student');
    const defaultApps = studentUsers.slice(0, 15).map((student: any, index: number) => ({
      id: `app_${index}`,
      studentId: student.id,
      studentName: student.name,
      studentPhoto: student.photo,
      jobTitle: ["Software Dev", "Web Intern", "Graphic Designer", "Accounts Expert"][index % 4],
      status: ["Pending", "Reviewed", "Shortlisted"][index % 3],
      resumeUrl: "#", // Placeholder
      appliedAt: "2026-04-16"
    }));
    setStorageData(STORAGE_KEYS.CAREER_APPS, defaultApps);
  }
};
