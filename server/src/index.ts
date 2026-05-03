import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL || "" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OICA Backend is running' });
});

// Basic Auth Simulation (Will expand in next steps)
app.post('/api/auth/login', async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    const user = await prisma.user.findFirst({
      where: { username, role }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In production, use bcrypt.compare
    // For now, simple check or assume password123
    
    res.json({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      branchId: user.branchId,
      rollNo: user.rollNo,
      course: user.course,
      photo: user.photoUrl,
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Student Dashboard Data
app.get('/api/student/dashboard/:studentId', async (req, res) => {
  const { studentId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        branch: {
          include: {
            notices: {
              orderBy: { postedDate: 'desc' },
              take: 5
            }
          }
        }
      }
    });

    if (!user) return res.status(404).json({ message: 'Student not found' });

    const topics = await prisma.course.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        lectures: { orderBy: { sortOrder: 'asc' } }
      }
    });

    res.json({
      user,
      topics,
      notices: user.branch?.notices || []
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
