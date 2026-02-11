const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('../models/User');
const Course = require('../models/Course');
const GoogleReview = require('../models/GoogleReview');
const Testimonial = require('../models/Testimonial');
const TeamMember = require('../models/TeamMember');
const SiteSettings = require('../models/SiteSettings');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rs-softtecs');

// Sample Data
const adminUser = {
  name: 'Admin User',
  email: 'admin@rssofttecs.com',
  password: 'admin123',
  role: 'super-admin',
  isActive: true
};

const courses = [
  {
    name: 'Full Stack Java Development',
    duration: '4 Months',
    description: 'Master Java programming from basics to advanced concepts. Learn Spring Boot, Hibernate, Microservices, and build enterprise-level applications.',
    shortDescription: 'Complete Java development course with Spring Boot and Microservices',
    category: 'programming',
    level: 'intermediate',
    icon: 'fab fa-java',
    isFeatured: true,
    status: 'active',
    syllabus: [
      { title: 'Core Java', topics: ['OOP Concepts', 'Collections Framework', 'Exception Handling', 'Multithreading', 'Java 8+ Features'] },
      { title: 'Database', topics: ['SQL Fundamentals', 'MySQL/PostgreSQL', 'JDBC', 'Transactions'] },
      { title: 'Spring Framework', topics: ['Spring Core', 'Spring Boot', 'Spring MVC', 'Spring Security', 'REST APIs'] },
      { title: 'Advanced Topics', topics: ['Hibernate/JPA', 'Microservices', 'Docker Basics', 'CI/CD', 'Cloud Deployment'] }
    ],
    features: ['100+ Hours Training', 'Live Projects', 'Interview Preparation', 'Placement Assistance', 'Certificate'],
    prerequisites: ['Basic programming knowledge', 'Computer fundamentals']
  },
  {
    name: 'Python Full Stack Development',
    duration: '4 Months',
    description: 'Learn Python programming and web development with Django/Flask. Master data structures, algorithms, and build scalable web applications.',
    shortDescription: 'Python programming with Django/Flask web development',
    category: 'programming',
    level: 'beginner',
    icon: 'fab fa-python',
    isFeatured: true,
    status: 'active',
    syllabus: [
      { title: 'Python Basics', topics: ['Python Fundamentals', 'Data Structures', 'OOP in Python', 'File Handling', 'Libraries'] },
      { title: 'Web Development', topics: ['HTML/CSS/JavaScript', 'Django Framework', 'Flask Framework', 'REST APIs'] },
      { title: 'Database', topics: ['SQL', 'PostgreSQL', 'MongoDB', 'ORM'] },
      { title: 'Advanced', topics: ['Testing', 'Deployment', 'AWS Basics', 'DevOps Intro'] }
    ],
    features: ['Beginner Friendly', 'Hands-on Projects', 'Industry Curriculum', 'Placement Support'],
    prerequisites: ['No prior experience needed', 'Basic computer skills']
  },
  {
    name: 'MERN Stack Development',
    duration: '3.5 Months',
    description: 'Build modern web applications using MongoDB, Express.js, React.js, and Node.js. Learn full-stack JavaScript development.',
    shortDescription: 'Full-stack JavaScript with React and Node.js',
    category: 'web-development',
    level: 'intermediate',
    icon: 'fab fa-react',
    isFeatured: true,
    status: 'active',
    syllabus: [
      { title: 'Frontend', topics: ['HTML5/CSS3', 'JavaScript ES6+', 'React.js', 'Redux', 'TypeScript Basics'] },
      { title: 'Backend', topics: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'] },
      { title: 'Database', topics: ['MongoDB', 'Mongoose', 'Data Modeling'] },
      { title: 'DevOps', topics: ['Git/GitHub', 'Deployment', 'AWS/Heroku'] }
    ],
    features: ['Modern Tech Stack', 'Real-world Projects', 'Job Ready Skills', 'Career Support'],
    prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals helpful']
  },
  {
    name: 'Data Science & Machine Learning',
    duration: '5 Months',
    description: 'Comprehensive data science program covering Python, statistics, machine learning, deep learning, and real-world projects.',
    shortDescription: 'Data Science with Python and Machine Learning',
    category: 'data-science',
    level: 'intermediate',
    icon: 'fas fa-brain',
    isFeatured: true,
    status: 'active',
    syllabus: [
      { title: 'Foundation', topics: ['Python for DS', 'Statistics', 'Probability', 'Linear Algebra'] },
      { title: 'Data Analysis', topics: ['NumPy', 'Pandas', 'Data Visualization', 'EDA'] },
      { title: 'Machine Learning', topics: ['Scikit-learn', 'Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'] },
      { title: 'Deep Learning', topics: ['Neural Networks', 'TensorFlow/Keras', 'Computer Vision', 'NLP Basics'] }
    ],
    features: ['Industry Projects', 'Kaggle Competitions', 'Portfolio Building', 'Interview Prep'],
    prerequisites: ['Basic Python knowledge', 'Mathematics background helpful']
  },
  {
    name: 'AWS Cloud Computing',
    duration: '2.5 Months',
    description: 'Learn Amazon Web Services from scratch. Prepare for AWS certifications and gain hands-on experience with cloud infrastructure.',
    shortDescription: 'AWS Cloud services and certification preparation',
    category: 'cloud',
    level: 'beginner',
    icon: 'fab fa-aws',
    status: 'active',
    syllabus: [
      { title: 'AWS Fundamentals', topics: ['Cloud Concepts', 'AWS Global Infrastructure', 'IAM', 'Billing'] },
      { title: 'Compute & Storage', topics: ['EC2', 'EBS', 'S3', 'Lambda', 'ECS'] },
      { title: 'Networking & Database', topics: ['VPC', 'Route 53', 'RDS', 'DynamoDB'] },
      { title: 'DevOps on AWS', topics: ['CodePipeline', 'CloudFormation', 'CloudWatch', 'Best Practices'] }
    ],
    features: ['Certification Focused', 'Hands-on Labs', 'Free Tier Usage', 'Exam Voucher Discount'],
    prerequisites: ['Basic IT knowledge', 'Networking fundamentals helpful']
  },
  {
    name: 'Software Testing (Manual + Automation)',
    duration: '3 Months',
    description: 'Complete software testing course covering manual testing, Selenium automation, API testing, and performance testing.',
    shortDescription: 'Manual and Automation Testing with Selenium',
    category: 'testing',
    level: 'beginner',
    icon: 'fas fa-bug',
    status: 'active',
    syllabus: [
      { title: 'Manual Testing', topics: ['STLC/SDLC', 'Test Cases', 'Bug Tracking', 'Test Documentation'] },
      { title: 'Automation', topics: ['Selenium WebDriver', 'TestNG', 'Page Object Model', 'Framework Design'] },
      { title: 'API Testing', topics: ['REST/SOAP', 'Postman', 'REST Assured'] },
      { title: 'Advanced', topics: ['Performance Testing', 'JMeter', 'CI/CD Integration'] }
    ],
    features: ['Real Project Experience', 'Tool Hands-on', 'ISTQB Preparation', 'Quick Placement'],
    prerequisites: ['No coding required for manual', 'Basic Java for automation']
  },
  {
    name: 'DevOps Engineering',
    duration: '3 Months',
    description: 'Learn DevOps practices, tools, and culture. Master CI/CD pipelines, containerization, orchestration, and cloud deployments.',
    shortDescription: 'DevOps tools and practices for modern deployment',
    category: 'cloud',
    level: 'intermediate',
    icon: 'fas fa-infinity',
    status: 'active',
    syllabus: [
      { title: 'Foundation', topics: ['Linux Administration', 'Shell Scripting', 'Git/GitHub', 'Networking'] },
      { title: 'CI/CD', topics: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Build Automation'] },
      { title: 'Containers', topics: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm'] },
      { title: 'Infrastructure', topics: ['Terraform', 'Ansible', 'AWS/Azure', 'Monitoring'] }
    ],
    features: ['Industry Tools', 'Real Pipelines', 'Cloud Hands-on', 'DevOps Culture'],
    prerequisites: ['Basic Linux knowledge', 'Programming experience helpful']
  },
  {
    name: 'SQL & Database Administration',
    duration: '2 Months',
    description: 'Master SQL programming and database administration. Learn MySQL, PostgreSQL, performance tuning, and data management.',
    shortDescription: 'SQL programming and database management',
    category: 'database',
    level: 'beginner',
    icon: 'fas fa-database',
    status: 'active',
    syllabus: [
      { title: 'SQL Basics', topics: ['Data Types', 'CRUD Operations', 'Joins', 'Subqueries', 'Views'] },
      { title: 'Advanced SQL', topics: ['Stored Procedures', 'Functions', 'Triggers', 'Transactions'] },
      { title: 'Administration', topics: ['Installation', 'User Management', 'Backup/Recovery', 'Security'] },
      { title: 'Performance', topics: ['Indexing', 'Query Optimization', 'Monitoring', 'Best Practices'] }
    ],
    features: ['Hands-on Practice', 'Real Scenarios', 'Quick Learning', 'Foundation Course'],
    prerequisites: ['Basic computer knowledge']
  }
];

const reviews = [
  {
    reviewerName: 'Rahul Patil',
    rating: 5,
    reviewMessage: 'Excellent institute for IT training! The faculty is highly experienced and the placement support is outstanding. Got placed at TCS within a month of completing my Java course.',
    status: 'active'
  },
  {
    reviewerName: 'Priya Sharma',
    rating: 5,
    reviewMessage: 'Best decision I made was joining RS Softtecs. The Python course was comprehensive and the practical approach helped me understand concepts better. Now working as a Python Developer!',
    status: 'active'
  },
  {
    reviewerName: 'Amit Kumar',
    rating: 5,
    reviewMessage: 'The instructors are very supportive and knowledgeable. They go beyond the syllabus to prepare you for real-world challenges. Highly recommended for anyone starting their IT career.',
    status: 'active'
  },
  {
    reviewerName: 'Sneha Deshmukh',
    rating: 5,
    reviewMessage: 'Amazing learning experience! The MERN stack course covered everything from basics to advanced topics. The projects we built gave me confidence for interviews.',
    status: 'active'
  },
  {
    reviewerName: 'Vikram Joshi',
    rating: 4,
    reviewMessage: 'Good institute with quality training. The AWS course helped me get certified and land a cloud engineer role. Infrastructure could be slightly better.',
    status: 'active'
  },
  {
    reviewerName: 'Anjali More',
    rating: 5,
    reviewMessage: 'From a non-IT background, I was nervous about learning programming. But the faculty at RS Softtecs made it so easy to understand. Now Im a confident developer!',
    status: 'active'
  }
];

const testimonials = [
  {
    studentName: 'Rajesh Kulkarni',
    testimonialText: 'RS Softtecs transformed my career completely. Coming from a mechanical engineering background, I had zero coding knowledge. The structured Java course and dedicated mentors helped me transition into IT smoothly. Within 2 months of completing the course, I got placed at Infosys!',
    courseTaken: 'Full Stack Java Development',
    companyPlaced: 'Infosys',
    designation: 'Software Engineer',
    package: '5.2 LPA',
    batchYear: '2024',
    rating: 5,
    isFeatured: true,
    status: 'active'
  },
  {
    studentName: 'Pooja Pawar',
    testimonialText: 'The Data Science course at RS Softtecs is industry-relevant and comprehensive. The hands-on projects on real datasets gave me practical experience that impressed my interviewers. Special thanks to the placement team for their continuous support!',
    courseTaken: 'Data Science & Machine Learning',
    companyPlaced: 'Accenture',
    designation: 'Data Analyst',
    package: '6 LPA',
    batchYear: '2024',
    rating: 5,
    isFeatured: true,
    status: 'active'
  },
  {
    studentName: 'Saurabh Nikam',
    testimonialText: 'Best institute in Pune for IT training! The MERN stack course was exactly what I needed. The faculty not only taught the technology but also shared real-world experiences. Their mock interview sessions were incredibly helpful.',
    courseTaken: 'MERN Stack Development',
    companyPlaced: 'Capgemini',
    designation: 'Frontend Developer',
    package: '4.8 LPA',
    batchYear: '2023',
    rating: 5,
    isFeatured: true,
    status: 'active'
  },
  {
    studentName: 'Neha Gaikwad',
    testimonialText: 'After completing my BSc, I was confused about my career. RS Softtecs not only provided excellent training in Python but also guided me towards the right career path. The personalized attention from trainers made all the difference.',
    courseTaken: 'Python Full Stack Development',
    companyPlaced: 'Wipro',
    designation: 'Python Developer',
    package: '4.5 LPA',
    batchYear: '2023',
    rating: 5,
    status: 'active'
  },
  {
    studentName: 'Akash Chavan',
    testimonialText: 'The Software Testing course gave me a complete understanding of both manual and automation testing. The Selenium and API testing modules were particularly helpful. Now working as a QA Engineer and loving it!',
    courseTaken: 'Software Testing',
    companyPlaced: 'TCS',
    designation: 'QA Engineer',
    package: '4 LPA',
    batchYear: '2024',
    rating: 5,
    status: 'active'
  },
  {
    studentName: 'Manasi Shah',
    testimonialText: 'I switched my career from teaching to IT at age 28, and RS Softtecs made it possible. The supportive environment, flexible batch timings, and quality training helped me achieve my dream. Forever grateful!',
    courseTaken: 'Full Stack Java Development',
    companyPlaced: 'Tech Mahindra',
    designation: 'Associate Software Engineer',
    package: '4.2 LPA',
    batchYear: '2023',
    rating: 5,
    isFeatured: true,
    status: 'active'
  }
];

const teamMembers = [
  {
    name: 'Rajendra Shinde',
    designation: 'Founder & CEO',
    role: 'founder',
    bio: 'With over 15 years of experience in the IT industry, Rajendra founded RS Softtecs with a vision to bridge the gap between academic learning and industry requirements. His passion for education and technology drives the institute\'s mission.',
    expertise: ['Strategic Leadership', 'IT Consulting', 'Training & Development'],
    experience: '15+ Years',
    status: 'active',
    displayOrder: 1
  },
  {
    name: 'Sunil Patil',
    designation: 'Technical Director',
    role: 'director',
    bio: 'Sunil brings extensive experience in software development and training. He leads the technical curriculum design and ensures our courses meet industry standards.',
    expertise: ['Java/J2EE', 'Spring Framework', 'Microservices', 'Cloud Architecture'],
    experience: '12+ Years',
    status: 'active',
    displayOrder: 2
  },
  {
    name: 'Priya Joshi',
    designation: 'Head of Placements',
    role: 'management',
    bio: 'Priya manages our placement cell and has successfully placed over 2000+ students in top IT companies. Her industry connections and guidance help students achieve their career goals.',
    expertise: ['Corporate Relations', 'Career Counseling', 'Interview Preparation'],
    experience: '8+ Years',
    status: 'active',
    displayOrder: 3
  },
  {
    name: 'Amit Deshmukh',
    designation: 'Senior Java Trainer',
    role: 'trainer',
    bio: 'Amit is a certified Java professional with experience in enterprise application development. He makes complex concepts simple and ensures hands-on learning for all students.',
    expertise: ['Core Java', 'Spring Boot', 'Hibernate', 'REST APIs'],
    experience: '10+ Years',
    status: 'active',
    displayOrder: 4
  },
  {
    name: 'Sneha Kulkarni',
    designation: 'Python & Data Science Trainer',
    role: 'trainer',
    bio: 'Sneha specializes in Python programming and Data Science. Her practical approach to teaching and real-world project guidance help students build strong portfolios.',
    expertise: ['Python', 'Machine Learning', 'Data Analysis', 'TensorFlow'],
    experience: '7+ Years',
    status: 'active',
    displayOrder: 5
  },
  {
    name: 'Vikram More',
    designation: 'MERN Stack Trainer',
    role: 'trainer',
    bio: 'Vikram is a full-stack developer specializing in JavaScript technologies. He brings startup experience and teaches modern web development practices.',
    expertise: ['React.js', 'Node.js', 'MongoDB', 'TypeScript'],
    experience: '6+ Years',
    status: 'active',
    displayOrder: 6
  }
];

const siteSettings = {
  companyName: 'RS Softtecs Pvt Ltd',
  tagline: "Pune's #1 IT Training & Placement Institute",
  contact: {
    phone: '+91 9172 101 012',
    phone2: '+91 9172 201 101',
    branchPhone: '+91 9172 011 021',
    branchPhone2: '+91 9172 110 012',
    email: 'info@rssofttecs.com',
    headOfficeAddress: 'Office No 2, 4th Floor, Bhosale Shinde Arcade, JM Road, Near Deccan Bus Stop, Pune.',
    branchAddress: 'Office No 29/B Wing, 4th Floor, Yashashree Park, Warje Malwadi Rd, Near Karve Nagar PMT Bus Stop, Karve Nagar, Pune.',
    address: 'Pune, Maharashtra, India',
    mapUrl: 'https://maps.app.goo.gl/KeCcYoEwFwvMUAE66'
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/share/12FpWXUrb5S/',
    instagram: 'https://www.instagram.com/rssofttecs?igsh=MWphMTJ3dHhpbGYxYw==',
    linkedin: 'https://www.linkedin.com/company/rs-softtecs/',
    youtube: 'https://youtube.com/@rssofttecs?si=yVSXa3cakXQNeHaj'
  },
  stats: {
    studentsPlaced: 5000,
    yearsExperience: 13,
    coursesOffered: 25,
    hiringPartners: 200
  },
  aboutUs: {
    shortDescription: 'RS Softtecs is a leading IT training and placement institute in Pune, committed to transforming careers since 2011.',
    fullDescription: 'Established in 2011, RS Softtecs Pvt Ltd has been at the forefront of IT education in Pune. We specialize in providing industry-oriented training that bridges the gap between academic knowledge and practical skills required in the IT industry. Our comprehensive courses, experienced faculty, and strong placement support have helped thousands of students launch successful careers in technology.',
    mission: 'To empower aspiring IT professionals with quality education, practical skills, and career guidance that transforms their lives and contributes to the technology industry.',
    vision: 'To be the most trusted IT training institute in India, known for producing job-ready professionals who excel in their careers.',
    founderMessage: 'At RS Softtecs, we believe that quality education should be accessible to everyone. Our commitment to excellence, industry-relevant curriculum, and personalized attention sets us apart. We dont just teach technology; we shape careers and transform lives.'
  },
  workingHours: {
    weekdays: 'Mon - Fri: 9:00 AM - 8:00 PM',
    saturday: 'Sat: 9:00 AM - 6:00 PM',
    sunday: 'Sun: 10:00 AM - 2:00 PM'
  }
};

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await GoogleReview.deleteMany();
    await Testimonial.deleteMany();
    await TeamMember.deleteMany();
    await SiteSettings.deleteMany();

    console.log('Cleared existing data...');

    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    // Create courses
    await Course.insertMany(courses);
    console.log('Courses created');

    // Create reviews
    await GoogleReview.insertMany(reviews);
    console.log('Reviews created');

    // Create testimonials
    await Testimonial.insertMany(testimonials);
    console.log('Testimonials created');

    // Create team members
    await TeamMember.insertMany(teamMembers);
    console.log('Team members created');

    // Create site settings
    await SiteSettings.create(siteSettings);
    console.log('Site settings created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Admin Login Credentials:');
    console.log('   Email: admin@rssofttecs.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
