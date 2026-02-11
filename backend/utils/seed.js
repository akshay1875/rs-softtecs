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
const QuizQuestion = require('../models/Quiz');
const QuizQuestion = require('../models/Quiz');

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
  },
  {
    name: 'Data Analytics & Visualization',
    duration: '3 Months',
    description: 'Learn data analytics from scratch. Master Excel, SQL, Python for analytics, Power BI, Tableau, and statistical analysis to become a job-ready Data Analyst.',
    shortDescription: 'Data Analytics with Power BI, Tableau & Python',
    category: 'data-science',
    level: 'beginner',
    icon: 'fas fa-chart-bar',
    isFeatured: true,
    status: 'active',
    syllabus: [
      { title: 'Foundation', topics: ['Excel Advanced', 'Statistics & Probability', 'SQL for Analytics', 'Data Cleaning'] },
      { title: 'Python for Analytics', topics: ['Python Basics', 'Pandas & NumPy', 'Data Manipulation', 'Exploratory Data Analysis'] },
      { title: 'Visualization Tools', topics: ['Power BI', 'Tableau', 'Dashboard Design', 'Storytelling with Data'] },
      { title: 'Projects & Career', topics: ['Real-world Datasets', 'Capstone Project', 'Portfolio Building', 'Interview Prep'] }
    ],
    features: ['Beginner Friendly', 'Industry Tools', 'Real Datasets', 'Portfolio Projects', 'Placement Support'],
    prerequisites: ['Basic computer knowledge', 'No coding experience needed']
  },
  {
    name: 'Frontend Development (React & Angular)',
    duration: '3 Months',
    description: 'Master modern frontend development with React.js and Angular. Build responsive, dynamic web applications with industry-standard tools and frameworks.',
    shortDescription: 'Modern frontend with React.js & Angular',
    category: 'web-development',
    level: 'intermediate',
    icon: 'fas fa-code',
    status: 'active',
    syllabus: [
      { title: 'Web Fundamentals', topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive Design', 'Bootstrap/Tailwind'] },
      { title: 'React.js', topics: ['Components & JSX', 'Hooks & State', 'Redux', 'React Router', 'API Integration'] },
      { title: 'Angular', topics: ['TypeScript', 'Components & Modules', 'Services & DI', 'Routing', 'RxJS'] },
      { title: 'Advanced', topics: ['Testing', 'Performance Optimization', 'Deployment', 'Version Control'] }
    ],
    features: ['Dual Framework', 'Project-Based', 'Industry Practices', 'Code Reviews'],
    prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals']
  },
  {
    name: 'Linux Administration',
    duration: '2 Months',
    description: 'Learn Linux system administration from basics to advanced. Master shell scripting, server management, networking, and security for enterprise environments.',
    shortDescription: 'Linux system administration & shell scripting',
    category: 'cloud',
    level: 'beginner',
    icon: 'fab fa-linux',
    status: 'active',
    syllabus: [
      { title: 'Linux Basics', topics: ['Installation', 'File System', 'Commands', 'Permissions', 'Users & Groups'] },
      { title: 'Administration', topics: ['Package Management', 'Process Management', 'Disk Management', 'Cron Jobs'] },
      { title: 'Networking', topics: ['Network Configuration', 'SSH', 'Firewall', 'DNS', 'Web Server Setup'] },
      { title: 'Advanced', topics: ['Shell Scripting', 'Log Management', 'Security Hardening', 'Backup & Recovery'] }
    ],
    features: ['Hands-on Labs', 'Server Setup', 'Certification Prep', 'Industry Scenarios'],
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
  },
  {
    studentName: 'Aditya Kasar',
    testimonialText: 'RS Softtecs gave me the right direction and skills to crack interviews at top companies. The structured training, real project experience, and continuous placement support helped me land a role at PTC with an excellent package. Highly recommended!',
    courseTaken: 'Full Stack Java Development',
    companyPlaced: 'PTC',
    designation: 'Software Engineer',
    package: '8 LPA',
    batchYear: '2024',
    rating: 5,
    isFeatured: true,
    status: 'active'
  },
  {
    studentName: 'Kalyani Kale',
    testimonialText: 'The training at RS Softtecs was comprehensive and practical. The faculty went above and beyond to ensure we understood every concept. Their placement team connected me with Inspirit Vision, and I got placed within weeks of completing my course!',
    courseTaken: 'Python Full Stack Development',
    companyPlaced: 'Inspirit Vision',
    designation: 'Software Developer',
    package: '4.2 LPA',
    batchYear: '2024',
    rating: 5,
    isFeatured: true,
    status: 'active'
  },
  {
    studentName: 'Vrushali Pawar',
    testimonialText: 'Joining RS Softtecs was a turning point in my career. The industry-aligned curriculum and mock interview sessions prepared me thoroughly. I got placed at Cognizant and I owe it all to the amazing team at RS Softtecs!',
    courseTaken: 'Full Stack Java Development',
    companyPlaced: 'Cognizant',
    designation: 'Programmer Analyst',
    package: '3 LPA',
    batchYear: '2024',
    rating: 5,
    status: 'active'
  },
  {
    studentName: 'Megha More',
    testimonialText: 'The Data Analytics course at RS Softtecs helped me build a strong foundation in data analysis and visualization tools. The hands-on projects with real datasets made me confident for interviews. Now working at Zensar and growing every day!',
    courseTaken: 'Data Analytics & Visualization',
    companyPlaced: 'Zensar',
    designation: 'Data Analyst',
    package: '3.2 LPA',
    batchYear: '2024',
    rating: 5,
    status: 'active'
  },
  {
    studentName: 'Sanika Lagad',
    testimonialText: 'RS Softtecs provided me with the skills and confidence I needed to start my IT career. The practical training approach and supportive mentors made learning enjoyable. Got placed at Valenta Pvt Ltd right after completing my course!',
    courseTaken: 'MERN Stack Development',
    companyPlaced: 'Valenta Pvt Ltd',
    designation: 'Web Developer',
    package: '3 LPA',
    batchYear: '2024',
    rating: 5,
    status: 'active'
  },
  {
    studentName: 'Dnyaneshwar Patharkar',
    testimonialText: 'The training quality at RS Softtecs is exceptional. From basic concepts to advanced topics, everything was covered thoroughly. The placement team worked tirelessly to help me get placed at Eduquity Career Technologies.',
    courseTaken: 'Full Stack Java Development',
    companyPlaced: 'Eduquity Career Technologies Pvt. Ltd',
    designation: 'Software Developer',
    package: '2.5 LPA',
    batchYear: '2024',
    rating: 5,
    status: 'active'
  }
];

const teamMembers = [
  {
    name: 'Rahul Salunke',
    designation: 'Founder & CEO',
    role: 'founder',
    bio: 'Rahul Salunke founded RS Softtecs with a clear vision — to bridge the gap between academic learning and industry requirements. His passion for education and technology, combined with deep industry connections, drives the institute\'s mission of producing job-ready IT professionals who can contribute from day one.',
    expertise: ['Strategic Leadership', 'IT Consulting', 'Training & Development', 'Placement Strategy'],
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
  companyName: 'RS Softtecs Solutions Private Limited',
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
    shortDescription: 'RS Softtecs Solutions Pvt. Ltd. is Pune\'s premier IT training and placement institute, committed to transforming careers and producing job-ready talent for the tech industry.',
    fullDescription: 'Located in the heart of Pune on J.M. Road, RS Softtecs Solutions Private Limited is a trusted name in IT education and career transformation. We specialize in delivering industry-aligned training and producing job-ready talent for the ever-evolving tech landscape. Our training programs cover Full Stack Development (Java, Python, MERN, MEAN), Front-End Technologies (React, Angular), Software Testing & QA, Data Analytics & Visualization, Linux Administration, and Cloud & DevOps. We don\'t just train — we transform learners into professionals who can contribute from day one.',
    mission: 'To empower aspiring IT professionals with quality education, practical skills, and career guidance that transforms their lives and contributes to the technology industry. We strive to bridge the gap between academia and industry.',
    vision: 'To be the most trusted IT training institute in India, known for producing job-ready professionals who excel in their careers. Our goal is to be the strategic partner for companies seeking high-performing tech talent.',
    founderMessage: 'At RS Softtecs, we believe that freshers are fighters — they fight for their first job! Our commitment is to arm them with the right skills, confidence, and industry exposure. Our curriculum is co-designed with industry experts, and our placement cell works closely with hiring partners to ensure every student gets the opportunity they deserve. We don\'t just teach technology; we shape careers and transform lives.'
  },
  workingHours: {
    weekdays: 'Mon - Fri: 9:00 AM - 8:00 PM',
    saturday: 'Sat: 9:00 AM - 6:00 PM',
    sunday: 'Sun: 10:00 AM - 2:00 PM'
  }
};

// Sample Quiz Questions
const quizQuestions = [
  // C Language
  {
    category: 'C Language',
    question: 'Which of the following is the correct syntax to declare a variable in C?',
    options: ['int 1var;', 'int var1;', 'int var 1;', '1int var;'],
    correctAnswer: 1,
    explanation: 'Variable names in C cannot start with a digit. "int var1;" is the correct syntax.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'C Language',
    question: 'What is the size of an int variable in C (on most 32-bit systems)?',
    options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
    correctAnswer: 2,
    explanation: 'On most 32-bit systems, an int occupies 4 bytes (32 bits) of memory.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'C Language',
    question: 'What does the "printf" function do in C?',
    options: ['Reads input', 'Prints output to the console', 'Allocates memory', 'Defines a variable'],
    correctAnswer: 1,
    explanation: 'printf() is used to print formatted output to the standard output (console).',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'C Language',
    question: 'Which loop is guaranteed to execute at least once?',
    options: ['for loop', 'while loop', 'do-while loop', 'None of the above'],
    correctAnswer: 2,
    explanation: 'A do-while loop checks the condition after the loop body, so it always executes at least once.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'C Language',
    question: 'What is a pointer in C?',
    options: ['A variable that stores a character', 'A variable that stores the address of another variable', 'A function that returns an integer', 'A keyword in C'],
    correctAnswer: 1,
    explanation: 'A pointer is a variable that stores the memory address of another variable.',
    difficulty: 'medium',
    status: 'active'
  },
  // Java
  {
    category: 'Java',
    question: 'Which keyword is used to create an object in Java?',
    options: ['class', 'new', 'object', 'create'],
    correctAnswer: 1,
    explanation: 'The "new" keyword is used to create new objects in Java.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Java',
    question: 'What is the default value of a boolean variable in Java?',
    options: ['true', 'false', '0', 'null'],
    correctAnswer: 1,
    explanation: 'The default value of a boolean in Java is false.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Java',
    question: 'Which of the following is NOT an OOP concept?',
    options: ['Encapsulation', 'Polymorphism', 'Compilation', 'Inheritance'],
    correctAnswer: 2,
    explanation: 'Compilation is a process, not an OOP concept. The four OOP concepts are Encapsulation, Polymorphism, Inheritance, and Abstraction.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'Java',
    question: 'What is the parent class of all classes in Java?',
    options: ['Object', 'Main', 'Class', 'Super'],
    correctAnswer: 0,
    explanation: 'The Object class is the parent/root class of all classes in Java.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'Java',
    question: 'Which collection in Java does NOT allow duplicate elements?',
    options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
    correctAnswer: 2,
    explanation: 'HashSet does not allow duplicate elements. It is part of the Set interface.',
    difficulty: 'medium',
    status: 'active'
  },
  // Python
  {
    category: 'Python',
    question: 'What is the output of print(type(5))?',
    options: ['<class \'int\'>', '<class \'float\'>', '<class \'number\'>', '<class \'str\'>'],
    correctAnswer: 0,
    explanation: '5 is an integer in Python, so type(5) returns <class \'int\'>.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Python',
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'func', 'def', 'define'],
    correctAnswer: 2,
    explanation: 'In Python, functions are defined using the "def" keyword.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Python',
    question: 'What does "len()" function do in Python?',
    options: ['Returns the type of object', 'Returns the length of an object', 'Returns the memory size', 'Returns the id of the object'],
    correctAnswer: 1,
    explanation: 'The len() function returns the number of items in an object (like a string, list, etc.).',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Python',
    question: 'Which of the following is a mutable data type in Python?',
    options: ['String', 'Tuple', 'List', 'Integer'],
    correctAnswer: 2,
    explanation: 'Lists are mutable in Python — they can be modified after creation. Strings, tuples, and integers are immutable.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'Python',
    question: 'What is the output of "Hello"[1]?',
    options: ['H', 'e', 'l', 'He'],
    correctAnswer: 1,
    explanation: 'String indexing in Python starts at 0. So "Hello"[1] returns "e".',
    difficulty: 'easy',
    status: 'active'
  },
  // JavaScript
  {
    category: 'JavaScript',
    question: 'Which of the following is used to declare a constant in JavaScript?',
    options: ['var', 'let', 'const', 'constant'],
    correctAnswer: 2,
    explanation: 'The "const" keyword is used to declare constants in JavaScript (ES6+).',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'JavaScript',
    question: 'What is the result of typeof null in JavaScript?',
    options: ['"null"', '"undefined"', '"object"', '"number"'],
    correctAnswer: 2,
    explanation: 'typeof null returns "object" — this is a well-known JavaScript quirk/bug from its early implementation.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'JavaScript',
    question: 'What does "===" operator check in JavaScript?',
    options: ['Only value', 'Only type', 'Both value and type', 'None of the above'],
    correctAnswer: 2,
    explanation: 'The strict equality operator (===) checks both value and type without type coercion.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'JavaScript',
    question: 'Which method is used to add an element at the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'push() adds one or more elements to the end of an array.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'JavaScript',
    question: 'What is a closure in JavaScript?',
    options: ['A way to close the browser', 'A function that has access to the outer function\'s variables', 'A type of loop', 'An error handling mechanism'],
    correctAnswer: 1,
    explanation: 'A closure is a function that retains access to variables from its outer (enclosing) function scope even after the outer function has returned.',
    difficulty: 'hard',
    status: 'active'
  },
  // Aptitude
  {
    category: 'Aptitude',
    question: 'If a train travels 360 km in 4 hours, what is its speed?',
    options: ['80 km/h', '90 km/h', '100 km/h', '70 km/h'],
    correctAnswer: 1,
    explanation: 'Speed = Distance / Time = 360 / 4 = 90 km/h.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Aptitude',
    question: 'What is 25% of 200?',
    options: ['25', '50', '75', '100'],
    correctAnswer: 1,
    explanation: '25% of 200 = (25/100) × 200 = 50.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'Aptitude',
    question: 'If the ratio of A to B is 3:5 and B is 40, what is A?',
    options: ['20', '24', '30', '15'],
    correctAnswer: 1,
    explanation: 'A/B = 3/5, so A = (3/5) × 40 = 24.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'Aptitude',
    question: 'A person buys an article for ₹500 and sells it for ₹600. What is the profit percentage?',
    options: ['10%', '15%', '20%', '25%'],
    correctAnswer: 2,
    explanation: 'Profit = 600 - 500 = 100. Profit % = (100/500) × 100 = 20%.',
    difficulty: 'medium',
    status: 'active'
  },
  {
    category: 'Aptitude',
    question: 'What is the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '44', '38'],
    correctAnswer: 1,
    explanation: 'The differences are 4, 6, 8, 10, 12. So the next number is 30 + 12 = 42.',
    difficulty: 'medium',
    status: 'active'
  },
  // SQL
  {
    category: 'SQL',
    question: 'Which SQL command is used to retrieve data from a database?',
    options: ['GET', 'FETCH', 'SELECT', 'RETRIEVE'],
    correctAnswer: 2,
    explanation: 'SELECT is the SQL command used to query and retrieve data from database tables.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'SQL',
    question: 'Which clause is used to filter records in SQL?',
    options: ['FILTER', 'WHERE', 'HAVING', 'WHEN'],
    correctAnswer: 1,
    explanation: 'The WHERE clause is used to filter records based on specified conditions.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'SQL',
    question: 'What is a PRIMARY KEY in SQL?',
    options: ['A column that allows duplicates', 'A column that uniquely identifies each row', 'A foreign reference', 'A type of index'],
    correctAnswer: 1,
    explanation: 'A PRIMARY KEY is a column (or set of columns) that uniquely identifies each row in a table.',
    difficulty: 'easy',
    status: 'active'
  },
  // HTML & CSS
  {
    category: 'HTML & CSS',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Text Markup Language'],
    correctAnswer: 0,
    explanation: 'HTML stands for HyperText Markup Language.',
    difficulty: 'easy',
    status: 'active'
  },
  {
    category: 'HTML & CSS',
    question: 'Which CSS property is used to change the text color?',
    options: ['text-color', 'font-color', 'color', 'text-style'],
    correctAnswer: 2,
    explanation: 'The "color" property in CSS is used to set the text color of an element.',
    difficulty: 'easy',
    status: 'active'
  },
];

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
    await QuizQuestion.deleteMany();

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

    // Create quiz questions
    await QuizQuestion.insertMany(quizQuestions);
    console.log('Quiz questions created');

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
