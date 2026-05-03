import { PrismaClient, Role, InquiryType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL || "" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create Branches
  const districts = [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
    "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", 
    "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", 
    "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh", "Bhubaneswar HQ"
  ];

  const branchMap: Record<string, string> = {};

  for (const [idx, dist] of districts.entries()) {
    const branchCode = `${dist.toUpperCase().replace(/\s/g, '')}-01`;
    const branch = await prisma.branch.create({
      data: {
        branchCode,
        name: dist === "Bhubaneswar HQ" ? "OICA Main Branch / Head Quarter" : `OICA ${dist} Branch`,
        location: dist,
        managerName: `${dist} District Head`,
        phone: `+91 ${9000000000 + idx}`,
        email: `${dist.toLowerCase().replace(/\s/g, '')}@oica.edu.in`,
        address: `Plot No. ${100 + idx}, Main Road, ${dist}, Odisha`,
        aboutText: `Odisha Institute of Computer Application (OICA) ${dist} center is dedicated to providing premium IT education.`,
      },
    });
    branchMap[dist] = branch.id;

    // Add some notices for each branch
    await prisma.notice.createMany({
      data: [
        { branchId: branch.id, title: "New Batch Starting Next Week", postedDate: new Date() },
        { branchId: branch.id, title: "Holiday on account of Local Festival", postedDate: new Date() },
        { branchId: branch.id, title: "Exam Schedule for DCA Students", postedDate: new Date() },
      ],
    });
  }

  // 2. Create Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: "Admin HQ",
      username: "admin",
      email: "admin@oica.edu.in",
      passwordHash,
      role: Role.admin,
    },
  });

  // 3. Create Branch Manager Users
  for (const dist of districts) {
    const branchId = branchMap[dist];
    await prisma.user.create({
      data: {
        name: `${dist} Manager`,
        username: `branch_${dist.toLowerCase().replace(/\s/g, '_')}`,
        email: `${dist.toLowerCase().replace(/\s/g, '')}_mgr@oica.edu.in`,
        passwordHash, // password123
        role: Role.branch,
        branchId,
      },
    });
  }

  // 4. Create Courses & Lectures
  const courseData = [
    { name: "PGDCA", category: "Diploma", order: 1, description: "Post Graduate Diploma in Computer Application", color: "blue" },
    { name: "DCA", category: "Diploma", order: 2, description: "Diploma in Computer Application", color: "emerald" },
    { name: "Tally ERP.9", category: "Accounts", order: 3, description: "Financial Accounting with Tally", color: "violet" },
  ];

  for (const c of courseData) {
    const course = await prisma.course.create({
      data: {
        name: c.name,
        category: c.category,
        sortOrder: c.order,
        description: c.description,
        uiColor: c.color,
      },
    });

    // Add Lectures
    await prisma.lecture.createMany({
      data: [
        { courseId: course.id, title: `Intro to ${c.name}`, description: "Basics and setup", videoUrl: "https://www.youtube.com/embed/8-9-o97S6S8", duration: "15:00", sortOrder: 1 },
        { courseId: course.id, title: `Advanced ${c.name}`, description: "Professional techniques", videoUrl: "https://www.youtube.com/embed/g_T6JvI7v-0", duration: "25:00", sortOrder: 2 },
      ],
    });

    // Add Mock Test
    const test = await prisma.mockTest.create({
      data: {
        courseId: course.id,
        isFinal: false,
        timeLimitMins: 15,
      },
    });

    // Add Questions
    await prisma.question.createMany({
      data: [
        { testId: test.id, questionText: "What is the primary use of this course?", options: ["Work", "Study", "Both", "None"], correctIndex: 2 },
        { testId: test.id, questionText: "Is this course certified?", options: ["Yes", "No", "Maybe", "NA"], correctIndex: 0 },
      ],
    });
  }

  // 5. Create 200+ Students
  console.log('Generating 220 students...');
  const firstNames = ["Ankit", "Manas", "Subhra", "Priyanka", "Deepak", "Lipika", "Smaran", "Biswajit", "Rashmi", "Tapas", "Geeta", "Rahul", "Sonia", "Amit", "Puja", "Vikram", "Neha", "Arun", "Shila", "Rajat"];
  const lastNames = ["Kumar", "Mohanty", "Das", "Sahu", "Patra", "Rout", "Nayaka", "Behera", "Swain", "Mishra", "Panda", "Pradhan", "Parida", "Jena", "Sethy"];
  const courses = ["PGDCA", "DCA", "Tally ERP.9"];

  const branchIds = Object.values(branchMap);

  for (let i = 0; i < 220; i++) {
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[i % lastNames.length];
    const bId = branchIds[i % branchIds.length];
    const course = courses[i % courses.length];

    await prisma.user.create({
      data: {
        name: `${fName} ${lName}`,
        username: `stu_${1000 + i}`,
        email: `${fName.toLowerCase()}${i}@demo.com`,
        passwordHash,
        role: Role.student,
        branchId: bId,
        rollNo: `OICA/2026/${(100 + i).toString()}`,
        photoUrl: `https://i.pravatar.cc/150?u=${i}`,
        age: 18 + (i % 10),
        course: course,
        phone: `${7000000000 + i}`,
      },
    });
  }

  // 6. Create Jobs
  await prisma.job.createMany({
    data: [
      { title: "Junior Software Developer", company: "TechNova Solutions", location: "Bhubaneswar", type: "Full-time", salary: "₹4.5 - 6.0 LPA", experience: "0-1 Years", requirements: "Knowledge of React, Node.js, and SQL." },
      { title: "Graphic Designer", company: "Pixel Perfect Agency", location: "Cuttack", type: "Full-time", salary: "₹3.0 - 4.2 LPA", experience: "0-2 Years", requirements: "Proficiency in Photoshop, Illustrator." },
    ],
  });

  // 7. Create Inquiries
  await prisma.inquiry.createMany({
    data: [
      { type: InquiryType.admission, name: "John Doe", email: "john@test.com", phone: "9988776655", message: "Interested in PGDCA", status: "New" },
      { type: InquiryType.franchise, name: "Local Entrepreneur", email: "biz@test.com", phone: "1122334455", message: "Want to open branch in Puri", status: "New" },
    ],
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
