// Local Storage Manager for OICA Portal Simulation

export const STORAGE_KEYS = {
  USERS: "oica_users",
  LECTURES: "oica_lectures",
  TOPICS: "oica_topics",
  MOCK_TESTS: "oica_mock_tests",
  TEST_RESULTS: "oica_test_results",
  BRANCHES: "oica_branches",
  RESULTS: "oica_results",
  SESSION: "oica_session",
  GALLERY: "oica_gallery",
  JOBS: "oica_jobs",
  CAREER_APPS: "oica_career_apps",
  FEEDBACK: "oica_feedback",
  CONTACT_MESSAGES: "oica_contact_messages",
  FRANCHISE_ENQUIRIES: "oica_franchise_enquiries",
  ENROLLMENTS: "oica_enrollments",
  ATTENDANCE: "oica_attendance"
};

export const getStorageData = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    if (!data || data === "null") return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return [];
  }
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
  let existingBranches = getStorageData(STORAGE_KEYS.BRANCHES);

  // Migration: if any branch lacks the notices field or if we need to force re-init for new videos
  const needsMigration = existingBranches.length > 0 && (
    existingBranches.some((b: any) => !b.notices) || 
    (existingBranches.some((b: any) => b.location === "Angul" && !b.locationVideo))
  );
  if (needsMigration) {
    localStorage.removeItem(STORAGE_KEYS.BRANCHES);
    existingBranches = [];
  }

  // Initialize Default System Users
  const defaultUsers: any[] = [
    { id: 1, name: "Ankit Kumar", username: "student", password: "password", role: "student", branchId: "KHORDHA-01", rollNo: "OICA/2026/001", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374", age: 20, course: "PGDCA", email: "ankit@demo.com", phone: "9876543210", completedVideos: [] },
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
    
    const getVideoForDistrict = (dist: string) => {
      if (dist === "Angul") return "/mapvideos/angul.mp4";
      if (dist === "Ganjam") return "/mapvideos/KHALIKOTE.mp4";
      if (dist === "Sundargarh") return "/mapvideos/sundargarh.mp4";
      if (dist === "Bhubaneswar HQ") return "/mapvideos/bhubaneswar oica map (Stitched Clip).mp4";
      if (dist === "Khordha") return "/mapvideos/Gothapatna.mp4";
      if (dist === "Jajpur") return "/mapvideos/haripur.mp4";
      return undefined;
    };

    defaultBranches.push({
      id: branchId,
      name: dist === "Bhubaneswar HQ" ? "OICA Main Branch / Head Quarter" : `OICA ${dist} Branch`,
      location: dist,
      locationVideo: getVideoForDistrict(dist),
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
      notices: [
        { id: `n1_${idx}`, title: "New Batch Starting Next Week", date: "May 10, 2026" },
        { id: `n2_${idx}`, title: "Holiday on account of Local Festival", date: "May 15, 2026" },
        { id: `n3_${idx}`, title: "Exam Schedule for DCA Students", date: "May 20, 2026" }
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
         phone: `${7000000000 + i}`,
         completedVideos: []
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

  // 4. Initialize Topics & Lectures
  const existingTopics = getStorageData(STORAGE_KEYS.TOPICS);
  if (existingTopics.length === 0) {
    const defaultTopics = [
      { id: "t1", name: "C Programming", courseId: "PGDCA", order: 1, description: "Master the fundamentals of C Programming language.", color: "blue" },
      { id: "t2", name: "Office Automation", courseId: "PGDCA", order: 2, description: "Advanced MS Office tools and productivity hacks.", color: "emerald" },
      { id: "t3", name: "Web Design", courseId: "PGDCA", order: 3, description: "Modern web architecture with HTML, CSS, and JS.", color: "violet" },
    ];
    setStorageData(STORAGE_KEYS.TOPICS, defaultTopics);

    const defaultLectures = [
      { id: "l1", topicId: "t1", order: 1, title: "Introduction to C", desc: "Setting up environment and first program.", url: "https://www.youtube.com/embed/8-9-o97S6S8", thumbnail: "https://img.youtube.com/vi/8-9-o97S6S8/maxresdefault.jpg", duration: "12:45" },
      { id: "l2", topicId: "t1", order: 2, title: "Variables & Data Types", desc: "Understanding memory and types in C.", url: "https://www.youtube.com/embed/g_T6JvI7v-0", thumbnail: "https://img.youtube.com/vi/g_T6JvI7v-0/maxresdefault.jpg", duration: "15:20" },
      { id: "l3", topicId: "t1", order: 3, title: "Control Flow", desc: "If-else and switch statements.", url: "https://www.youtube.com/embed/6_6xWpZ-XkQ", thumbnail: "https://img.youtube.com/vi/6_6xWpZ-XkQ/maxresdefault.jpg", duration: "18:10" },
      { id: "l4", topicId: "t2", order: 1, title: "Advanced Excel Formulas", desc: "VLOOKUP, INDEX, MATCH and more.", url: "https://www.youtube.com/embed/V6H3K8v7HkQ", thumbnail: "https://img.youtube.com/vi/V6H3K8v7HkQ/maxresdefault.jpg", duration: "25:00" },
    ];
    setStorageData(STORAGE_KEYS.LECTURES, defaultLectures);
  }

  // 5. Initialize Mock Tests
  const existingTests = getStorageData(STORAGE_KEYS.MOCK_TESTS);
  if (existingTests.length === 0) {
    const defaultTests = [
      {
        id: "mt1",
        topicId: "t1",
        isFinal: false,
        timeLimit: 15,
        questions: [
          { id: "q1", text: "Who is the father of C language?", options: ["Steve Jobs", "James Gosling", "Dennis Ritchie", "Rasmus Lerdorf"], correct: 2 },
          { id: "q2", text: "C is a ________ level language.", options: ["Low", "High", "Middle", "None"], correct: 2 },
          { id: "q3", text: "Which of these is not a keyword in C?", options: ["auto", "case", "default", "function"], correct: 3 },
        ]
      },
      {
        id: "ft1",
        topicId: "all",
        isFinal: true,
        timeLimit: 30,
        questions: [
          { id: "fq1", text: "What is the full form of PGDCA?", options: ["Post Graduate Diploma in Computer Application", "Primary Graduate Diploma in Computer Architecture", "Post General Diploma in Computer Art", "None"], correct: 0 },
        ]
      }
    ];
    setStorageData(STORAGE_KEYS.MOCK_TESTS, defaultTests);
  }

  // 6. Initialize Career Data (Jobs & Applications)
  const existingJobs = getStorageData(STORAGE_KEYS.JOBS);
  if (existingJobs.length === 0) {
    const defaultJobs = [
      { id: "j1", title: "Junior Software Developer", company: "TechNova Solutions", location: "Bhubaneswar", type: "Full-time", salary: "₹4.5 - 6.0 LPA", experience: "0-1 Years", requirements: "Knowledge of React, Node.js, and SQL. Good problem-solving skills.", postedAt: "2026-04-10" },
      { id: "j2", title: "Graphic Designer", company: "Pixel Perfect Agency", location: "Cuttack", type: "Full-time", salary: "₹3.0 - 4.2 LPA", experience: "0-2 Years", requirements: "Proficiency in Photoshop, Illustrator, and Canva. Portfolio required.", postedAt: "2026-04-12" },
      { id: "j3", title: "Tally & Accounts Expert", company: "OICA Corporate Office", location: "Bhubaneswar HQ", type: "Full-time", salary: "₹2.4 - 3.6 LPA", experience: "0-1 Years", requirements: "Advanced Tally Prime knowledge, GST filing, and basic bookkeeping.", postedAt: "2026-04-15" },
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
  // 7. Seed Attendance Records (30 days)
  const existingAttendance = getStorageData(STORAGE_KEYS.ATTENDANCE);
  if (existingAttendance.length === 0) {
    const allUsers = getStorageData(STORAGE_KEYS.USERS);
    const students = allUsers.filter((u: any) => u.role === 'student').slice(0, 30);
    const records: any[] = [];
    const today = new Date();
    students.forEach((student: any) => {
      for (let d = 29; d >= 0; d--) {
        const date = new Date(today);
        date.setDate(today.getDate() - d);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue; // skip weekends
        const present = Math.random() > 0.2; // 80% attendance
        if (present) {
          records.push({
            id: `att_${student.id}_${d}`,
            studentId: student.id,
            rollNo: student.rollNo,
            studentName: student.name,
            branchId: student.branchId,
            course: student.course,
            date: date.toISOString().split('T')[0],
            time: `${9 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '00' : '30'} AM`,
            markedBy: 'system',
            method: 'manual',
            status: 'present'
          });
        }
      }
    });
    setStorageData(STORAGE_KEYS.ATTENDANCE, records);
  }
};

