/**
 * Nerd Academy — Idempotent Development Seed Data Script
 * Safe: Uses { $setOnInsert: doc }, { upsert: true } to guarantee that
 * existing courses, user accounts, and transactions are NEVER overwritten.
 */

const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-nerd-academy.c2dutjx.mongodb.net/?retryWrites=true&w=majority`;

// ==========================================
// 1. INSTRUCTORS (8 Accounts)
// ==========================================
const INSTRUCTORS = [
  {
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    skill: 'Staff Distributed Systems Architect & Ex-Google Lead',
    about: 'Sarah holds a Ph.D. in Computer Science from MIT and previously led cloud infrastructure scaling at Google. She specializes in distributed consensus, Kubernetes architectures, and ultra-high-throughput systems.',
    coursesCount: 3,
    rating: 4.95,
    studentsCount: 14200
  },
  {
    name: 'Marcus Vance',
    email: 'marcus.vance@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    skill: 'Principal Frontend Architect & React Core Contributor',
    about: 'Marcus has architected design systems for Fortune 500 SaaS platforms and contributed to React 18 concurrent rendering features. Passionate about web performance, accessibility, and modern component design.',
    coursesCount: 4,
    rating: 4.92,
    studentsCount: 18500
  },
  {
    name: 'Elena Rostova',
    email: 'elena.rostova@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    skill: 'AI Research Scientist & LLM Systems Engineer',
    about: 'Elena conducts research in neural retrieval, multi-modal generative agents, and transformer fine-tuning. She bridges foundational mathematics with production LLM deployments in Python and PyTorch.',
    coursesCount: 3,
    rating: 4.97,
    studentsCount: 11800
  },
  {
    name: 'Devon Thorne',
    email: 'devon.thorne@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    skill: 'Full-Stack Lead & Cloud Native Security Specialist',
    about: 'Devon has spent 12 years building production cloud microservices on AWS and GCP. He teaches full-stack Node.js, security threat modeling, OWASP hardening, and scalable payment infrastructure.',
    coursesCount: 3,
    rating: 4.89,
    studentsCount: 13400
  },
  {
    name: 'Aisha Al-Mansoor',
    email: 'aisha.almansoor@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    skill: 'Mobile App Lead & React Native / Flutter Specialist',
    about: 'Aisha has shipped multi-million download mobile applications across iOS and Android. Her courses focus on performant cross-platform mobile architecture, offline sync, and native platform modules.',
    coursesCount: 3,
    rating: 4.91,
    studentsCount: 9600
  },
  {
    name: 'Kaito Tanaka',
    email: 'kaito.tanaka@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    skill: 'Systems Programming Specialist & Rust Core Enthusiast',
    about: 'Kaito is a low-level systems programmer focused on memory safety, concurrency, compiler optimizations, and performance-critical network engines built with Rust and modern C++.',
    coursesCount: 3,
    rating: 4.96,
    studentsCount: 8400
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    skill: 'DevOps & Site Reliability Engineering (SRE) Director',
    about: 'Priya manages multi-region cloud clusters with 99.999% uptime SLAs. She mentors developers on Docker containerization, Terraform Infrastructure as Code, CI/CD observability, and Chaos Engineering.',
    coursesCount: 3,
    rating: 4.93,
    studentsCount: 10200
  },
  {
    name: 'Lucas Silva',
    email: 'lucas.silva@nerdacademy.edu',
    role: 'teacher',
    picture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    skill: 'Data Engineering Lead & Apache Spark Architect',
    about: 'Lucas designs petabyte-scale data streaming pipelines, lakehouse architectures, and modern analytical warehouses using Snowflake, Kafka, Databricks, and Python.',
    coursesCount: 2,
    rating: 4.88,
    studentsCount: 7900
  }
];

// ==========================================
// 2. STUDENTS (30 Accounts)
// ==========================================
const STUDENTS = [
  { name: 'Liam O\'Connor', email: 'liam.oc@devstudent.io', role: 'student' },
  { name: 'Chloe Dubois', email: 'chloe.dubois@devstudent.io', role: 'student' },
  { name: 'Noah Chen', email: 'noah.chen@devstudent.io', role: 'student' },
  { name: 'Maya Patel', email: 'maya.patel@devstudent.io', role: 'student' },
  { name: 'Ethan Wright', email: 'ethan.wright@devstudent.io', role: 'student' },
  { name: 'Sophia Kowalska', email: 'sophia.k@devstudent.io', role: 'student' },
  { name: 'Jackson Reed', email: 'jackson.r@devstudent.io', role: 'student' },
  { name: 'Emma Lindqvist', email: 'emma.l@devstudent.io', role: 'student' },
  { name: 'Mateo Rossi', email: 'mateo.rossi@devstudent.io', role: 'student' },
  { name: 'Aaliyah Khan', email: 'aaliyah.k@devstudent.io', role: 'student' },
  { name: 'Benjamin Scott', email: 'ben.scott@devstudent.io', role: 'student' },
  { name: 'Isabella Silva', email: 'isabella.s@devstudent.io', role: 'student' },
  { name: 'Oliver Mueller', email: 'oliver.m@devstudent.io', role: 'student' },
  { name: 'Zoe Nguyen', email: 'zoe.nguyen@devstudent.io', role: 'student' },
  { name: 'Alexander Novak', email: 'alex.novak@devstudent.io', role: 'student' },
  { name: 'Mia Tanaka', email: 'mia.t@devstudent.io', role: 'student' },
  { name: 'William Gomez', email: 'william.g@devstudent.io', role: 'student' },
  { name: 'Harper Davies', email: 'harper.d@devstudent.io', role: 'student' },
  { name: 'Daniel Kim', email: 'daniel.kim@devstudent.io', role: 'student' },
  { name: 'Evelyn Taylor', email: 'evelyn.t@devstudent.io', role: 'student' },
  { name: 'James Martin', email: 'james.m@devstudent.io', role: 'student' },
  { name: 'Charlotte Roy', email: 'charlotte.r@devstudent.io', role: 'student' },
  { name: 'Henry Adams', email: 'henry.a@devstudent.io', role: 'student' },
  { name: 'Amelia Ortiz', email: 'amelia.o@devstudent.io', role: 'student' },
  { name: 'Sebastian Wagner', email: 'sebastian.w@devstudent.io', role: 'student' },
  { name: 'Victoria Santos', email: 'victoria.s@devstudent.io', role: 'student' },
  { name: 'Gabriel Morel', email: 'gabriel.m@devstudent.io', role: 'student' },
  { name: 'Aria Takahashi', email: 'aria.t@devstudent.io', role: 'student' },
  { name: 'Samuel Evans', email: 'samuel.e@devstudent.io', role: 'student' },
  { name: 'Layla Morales', email: 'layla.m@devstudent.io', role: 'student' }
];

// ==========================================
// 3. COURSES (24 Courses across 5 Categories)
// ==========================================
const COURSES = [
  // Web Development (6 courses)
  {
    title: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture',
    picture: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    tutor: 'Marcus Vance',
    email: 'marcus.vance@nerdacademy.edu',
    price: 89.99,
    rating: 4.9,
    reviews: 284,
    bought: 3420,
    hours: 36.5,
    lectures: 148,
    category: 'Web Development',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-01-15',
    description: 'Master React 18 concurrent rendering, Next.js 14 App Router, Server Actions, TypeScript strict mode, Tailwind CSS design systems, and Prisma ORM integration in an end-to-end production SaaS build.',
    learningOutcomes: [
      'Architect production Next.js 14 apps with App Router & Server Components',
      'Integrate strict TypeScript types across client and server boundaries',
      'Implement authentication, role authorization, and Stripe payment processing',
      'Deploy resilient full-stack applications to Vercel and AWS'
    ],
    requirements: ['Solid understanding of modern JavaScript (ES6+)', 'Basic familiarity with React components and props']
  },
  {
    title: 'Tailwind CSS Mastery: Designing Production-Grade SaaS Interfaces',
    picture: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    tutor: 'Marcus Vance',
    email: 'marcus.vance@nerdacademy.edu',
    price: 49.99,
    rating: 4.88,
    reviews: 195,
    bought: 2850,
    hours: 22.0,
    lectures: 94,
    category: 'Web Development',
    difficulty: 'Beginner',
    status: 'approved',
    postingDate: '2024-02-10',
    description: 'Learn utility-first CSS from first principles. Build custom theme tokens, dark mode toggle pipelines, responsive grid dashboards, and accessible headless component abstractions with zero custom CSS files.',
    learningOutcomes: [
      'Master Tailwind CSS 3.4 configuration and custom plugin development',
      'Build dark-mode ready, fully responsive SaaS dashboard layouts',
      'Eliminate CSS bloat and produce lightning-fast production bundles',
      'Implement accessible components using Headless UI and Radix primitives'
    ],
    requirements: ['Basic HTML and CSS knowledge']
  },
  {
    title: 'Micro-Frontend Architectures: Module Federation in Production',
    picture: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tutor: 'Marcus Vance',
    email: 'marcus.vance@nerdacademy.edu',
    price: 99.99,
    rating: 4.94,
    reviews: 142,
    bought: 1680,
    hours: 28.0,
    lectures: 110,
    category: 'Web Development',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-03-01',
    description: 'Scale multi-team frontend codebases with Webpack Module Federation, Turborepo monorepos, runtime orchestration, shared state buses, and independent team deployment strategies.',
    learningOutcomes: [
      'Architect decoupled web applications using Webpack Module Federation',
      'Orchestrate multi-package monorepos with Turborepo and PNPM',
      'Prevent cross-application style leakage and dependency collisions',
      'Deploy independently versioned micro-apps with zero downtime'
    ],
    requirements: ['Strong React experience', 'Familiarity with Webpack or Vite build tools']
  },
  {
    title: 'Node.js, Express & Fastify: High-Throughput RESTful APIs',
    picture: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    tutor: 'Devon Thorne',
    email: 'devon.thorne@nerdacademy.edu',
    price: 69.99,
    rating: 4.91,
    reviews: 218,
    bought: 2940,
    hours: 31.0,
    lectures: 125,
    category: 'Web Development',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-01-20',
    description: 'Construct high-throughput backend services using Node.js, Fastify, and Express. Deep-dive into event loops, streams, worker threads, rate limiting, and JWT/OAuth2 security protocols.',
    learningOutcomes: [
      'Design RESTful web services benchmarked at over 30,000 req/sec',
      'Implement robust authentication with JWT, refresh tokens, and bcrypt',
      'Sanitize request payloads using Zod and standard JSON Schema',
      'Handle background asynchronous jobs and database transactions cleanly'
    ],
    requirements: ['Intermediate JavaScript experience', 'Basic terminal / command line familiarity']
  },
  {
    title: 'Modern Vue 3 & Nuxt 3 Full-Stack Application Blueprint',
    picture: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=80',
    tutor: 'Marcus Vance',
    email: 'marcus.vance@nerdacademy.edu',
    price: 59.99,
    rating: 4.87,
    reviews: 130,
    bought: 1820,
    hours: 24.5,
    lectures: 102,
    category: 'Web Development',
    difficulty: 'Beginner',
    status: 'approved',
    postingDate: '2024-02-18',
    description: 'Comprehensive guide to Vue 3 Composition API, Pinia state management, Nuxt 3 hybrid rendering, auto-imports, and full-stack Nitro server engine deployment.',
    learningOutcomes: [
      'Master Vue 3 Composition API and reactivity system',
      'Manage complex application state cleanly with Pinia stores',
      'Leverage Nuxt 3 SSR and static site generation for peak SEO',
      'Connect backend Nitro server endpoints and database layers'
    ],
    requirements: ['Basic HTML, CSS, and modern JavaScript knowledge']
  },
  {
    title: 'Web Security & Penetration Testing for Full-Stack Developers',
    picture: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    tutor: 'Devon Thorne',
    email: 'devon.thorne@nerdacademy.edu',
    price: 84.99,
    rating: 4.95,
    reviews: 175,
    bought: 2210,
    hours: 26.0,
    lectures: 98,
    category: 'Web Development',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-03-12',
    description: 'Identify and remediate the OWASP Top 10 web vulnerabilities. Learn how attackers exploit XSS, CSRF, SSRF, SQL/NoSQL injection, prototype pollution, and broken access controls.',
    learningOutcomes: [
      'Perform automated vulnerability scanning and security audits',
      'Prevent SQL injection, NoSQL injection, and SSRF attacks',
      'Harden HTTP headers (CSP, HSTS, CORS) against browser-based exploits',
      'Implement multi-factor authentication (MFA) and secure session cookies'
    ],
    requirements: ['Experience building web apps with client and server components']
  },

  // Programming Languages (5 courses)
  {
    title: 'The Complete Python 3.12 Developer Bootcamp: Zero to Hero',
    picture: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    tutor: 'Elena Rostova',
    email: 'elena.rostova@nerdacademy.edu',
    price: 69.99,
    rating: 4.93,
    reviews: 410,
    bought: 5120,
    hours: 42.0,
    lectures: 180,
    category: 'Programming',
    difficulty: 'Beginner',
    status: 'approved',
    postingDate: '2024-01-05',
    description: 'Master modern Python 3.12 from foundational control flow to object-oriented programming, decorators, generators, asyncio, file automation, and web scraping with BeautifulSoup and Playwright.',
    learningOutcomes: [
      'Write clean, idiomatic Python using modern type annotations and match-case statements',
      'Build reusable classes, custom exceptions, and generator pipelines',
      'Automate repetitive workflows, file system tasks, and data processing',
      'Develop concurrent, non-blocking network scripts with asyncio'
    ],
    requirements: ['No prior programming experience required']
  },
  {
    title: 'Rust Systems Programming: Memory Safety Without Garbage Collection',
    picture: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    tutor: 'Kaito Tanaka',
    email: 'kaito.tanaka@nerdacademy.edu',
    price: 94.99,
    rating: 4.98,
    reviews: 198,
    bought: 2450,
    hours: 38.0,
    lectures: 154,
    category: 'Programming',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-02-01',
    description: 'Demystify ownership, borrowing, lifetimes, smart pointers, and zero-cost abstractions in Rust. Build high-speed CLI tools, concurrent multithreaded servers, and WebAssembly modules.',
    learningOutcomes: [
      'Master the Rust borrow checker and lifetime annotations',
      'Write fearless concurrent programs with Arc, Mutex, and crossbeam channels',
      'Build blazing-fast CLI applications using Clap and Tokio async runtime',
      'Compile Rust modules to WebAssembly (Wasm) for high-speed browser compute'
    ],
    requirements: ['Prior experience in C, C++, Java, or Go recommended']
  },
  {
    title: 'Modern C++20 for Systems Engineers: Metaprogramming & Concepts',
    picture: 'https://images.unsplash.com/photo-1550439062-609e15737780?w=800&auto=format&fit=crop&q=80',
    tutor: 'Kaito Tanaka',
    email: 'kaito.tanaka@nerdacademy.edu',
    price: 89.99,
    rating: 4.9,
    reviews: 112,
    bought: 1410,
    hours: 34.0,
    lectures: 132,
    category: 'Programming',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-03-05',
    description: 'Explore the modern C++20 standard: Concepts, Ranges, Coroutines, Modules, compile-time constexpr execution, and RAII memory management strategies.',
    learningOutcomes: [
      'Write constrained templates using C++20 Concepts and requires clauses',
      'Process collections fluently using the C++20 Ranges library',
      'Implement asynchronous coroutines with co_await and co_yield',
      'Eliminate header file re-compilation bottlenecks with C++ Modules'
    ],
    requirements: ['Solid foundational understanding of basic C or C++']
  },
  {
    title: 'Go (Golang) Microservices: High-Concurrency Backend Systems',
    picture: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    tutor: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@nerdacademy.edu',
    price: 79.99,
    rating: 4.94,
    reviews: 230,
    bought: 3100,
    hours: 30.5,
    lectures: 128,
    category: 'Programming',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-01-25',
    description: 'Harness Goroutines, buffered channels, context cancellation, and gRPC to engineer production microservices with minimal memory footprint and instant startup times.',
    learningOutcomes: [
      'Master Go concurrency primitives (Goroutines, Channels, Select, WaitGroups)',
      'Construct high-speed gRPC services and Protocol Buffer definitions',
      'Structure clean idiomatic Go packages following Standard Go Project Layout',
      'Deploy containerized Go microservice binaries under 25MB'
    ],
    requirements: ['Basic understanding of programming logic and HTTP protocols']
  },
  {
    title: 'TypeScript Full Mastery: Type Gymnastics & Large-Scale Design',
    picture: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    tutor: 'Marcus Vance',
    email: 'marcus.vance@nerdacademy.edu',
    price: 54.99,
    rating: 4.91,
    reviews: 280,
    bought: 3950,
    hours: 21.0,
    lectures: 88,
    category: 'Programming',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-02-14',
    description: 'Transform your JavaScript into bulletproof code. Deep dive into conditional types, template literal types, distributive infer, type narrowing guards, and TSConfig optimization.',
    learningOutcomes: [
      'Write advanced conditional types with the infer keyword',
      'Author robust custom type guards and assertion functions',
      'Build strictly typed API clients and database abstraction layers',
      'Migrate massive legacy JavaScript codebases to strict TypeScript'
    ],
    requirements: ['Intermediate JavaScript experience']
  },

  // Computer Science & Architecture (5 courses)
  {
    title: 'Distributed Systems & Cloud Computing at Scale',
    picture: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    tutor: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@nerdacademy.edu',
    price: 119.99,
    rating: 4.97,
    reviews: 215,
    bought: 2780,
    hours: 45.0,
    lectures: 165,
    category: 'Computer Science',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-01-10',
    description: 'Learn the architectural principles behind global cloud platforms. Study CAP theorem, Raft consensus protocol, vector clocks, sharding, distributed transactions, and fault tolerance.',
    learningOutcomes: [
      'Design fault-tolerant distributed systems capable of surviving zone outages',
      'Implement consensus mechanisms based on the Raft algorithm',
      'Scale relational and NoSQL databases through consistent hashing and sharding',
      'Prevent cascading failures using circuit breakers and bulkhead patterns'
    ],
    requirements: ['Solid understanding of operating systems, networking, and data structures']
  },
  {
    title: 'Data Structures & Algorithms: The Technical Interview Masterclass',
    picture: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    tutor: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@nerdacademy.edu',
    price: 74.99,
    rating: 4.96,
    reviews: 520,
    bought: 6800,
    hours: 50.0,
    lectures: 210,
    category: 'Computer Science',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-01-02',
    description: 'Master Big-O analysis, trees, graphs, dynamic programming, heaps, and backtrack search patterns. Solve 150+ curated LeetCode-style technical interview problems with clear explanations.',
    learningOutcomes: [
      'Analyze time and space complexity using Big-O notation with confidence',
      'Solve complex dynamic programming and graph traversal problems',
      'Master sliding window, two-pointer, and monotonic stack techniques',
      'Aces technical coding interviews at top tech companies'
    ],
    requirements: ['Proficiency in at least one language (Python, JavaScript, Java, or C++)']
  },
  {
    title: 'Operating Systems & Concurrency: From Hardware to Threads',
    picture: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    tutor: 'Kaito Tanaka',
    email: 'kaito.tanaka@nerdacademy.edu',
    price: 84.99,
    rating: 4.92,
    reviews: 140,
    bought: 1650,
    hours: 32.0,
    lectures: 120,
    category: 'Computer Science',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-02-22',
    description: 'Uncover how modern processors and kernels manage memory, processes, virtual memory paging, CPU scheduling, thread synchronization primitives, and cache coherence.',
    learningOutcomes: [
      'Understand virtual memory, page tables, TLBs, and memory protection',
      'Avoid race conditions and deadlocks using semaphores, mutexes, and atomics',
      'Analyze CPU cache lines (L1/L2/L3) and false sharing in multi-core chips',
      'Inspect Linux system calls using strace, perf, and GDB'
    ],
    requirements: ['Foundational C or C++ knowledge']
  },
  {
    title: 'Database Internals: How Relational & NoSQL Engines Store Data',
    picture: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    tutor: 'Lucas Silva',
    email: 'lucas.silva@nerdacademy.edu',
    price: 89.99,
    rating: 4.91,
    reviews: 165,
    bought: 1980,
    hours: 29.0,
    lectures: 115,
    category: 'Computer Science',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-03-08',
    description: 'Demystify B-Trees, LSM-Trees, Write-Ahead Logs (WAL), buffer pool managers, cost-based query optimizers, and isolation levels (MVCC) in PostgreSQL and MongoDB.',
    learningOutcomes: [
      'Understand the trade-offs between B+ Trees and Log-Structured Merge (LSM) Trees',
      'Write optimized database queries by interpreting EXPLAIN ANALYZE execution plans',
      'Master Multi-Version Concurrency Control (MVCC) and transaction isolation',
      'Tune connection pooling, indexing, and disk I/O for high-throughput databases'
    ],
    requirements: ['Working knowledge of SQL and relational database schemas']
  },
  {
    title: 'Computer Networking Deep-Dive: TCP/IP, HTTP/3 & DNS',
    picture: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    tutor: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@nerdacademy.edu',
    price: 64.99,
    rating: 4.89,
    reviews: 180,
    bought: 2240,
    hours: 24.0,
    lectures: 96,
    category: 'Computer Science',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-02-28',
    description: 'From Ethernet frames and IP routing to TCP flow control, TLS 1.3 handshakes, WebSocket frames, and QUIC / HTTP/3. Inspect live packets using Wireshark.',
    learningOutcomes: [
      'Trace packets across the OSI model using Wireshark and tcpdump',
      'Understand TCP handshakes, congestion control algorithms, and head-of-line blocking',
      'Analyze the performance advantages of QUIC and HTTP/3 over HTTP/2',
      'Configure DNS records, TLS certificates, and edge CDNs with confidence'
    ],
    requirements: ['Basic computer science literacy']
  },

  // Artificial Intelligence & Machine Learning (4 courses)
  {
    title: 'LLM Engineering: Building Production Generative AI Agents',
    picture: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    tutor: 'Elena Rostova',
    email: 'elena.rostova@nerdacademy.edu',
    price: 109.99,
    rating: 4.98,
    reviews: 340,
    bought: 4320,
    hours: 38.0,
    lectures: 145,
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    status: 'approved',
    postingDate: '2024-01-18',
    description: 'Build enterprise-grade LLM applications using LangChain, LlamaIndex, vector embeddings, hybrid RAG pipelines, fine-tuning techniques (LoRA/QLoRA), and self-healing autonomous agents.',
    learningOutcomes: [
      'Architect hybrid Retrieval-Augmented Generation (RAG) with vector databases',
      'Fine-tune open-source models (Llama 3, Mistral) using LoRA on consumer GPUs',
      'Implement multi-turn autonomous agent swarms with tool-calling capabilities',
      'Evaluate model hallucination rates and deploy guardrails with LangSmith'
    ],
    requirements: ['Proficiency in Python', 'Familiarity with foundational machine learning concepts']
  },
  {
    title: 'Deep Learning & Neural Networks with PyTorch 2.x',
    picture: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
    tutor: 'Elena Rostova',
    email: 'elena.rostova@nerdacademy.edu',
    price: 89.99,
    rating: 4.93,
    reviews: 260,
    bought: 3200,
    hours: 44.0,
    lectures: 172,
    category: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-02-05',
    description: 'Code neural networks from scratch: tensors, autograd, CNNs for computer vision, RNNs/Transformers for sequences, and torch.compile optimizations for production inference.',
    learningOutcomes: [
      'Understand backpropagation and computational graphs in PyTorch',
      'Train Convolutional Neural Networks (CNNs) for vision classification',
      'Build Transformer attention mechanisms and positional encodings from scratch',
      'Accelerate model training with mixed precision (AMP) and distributed data parallel'
    ],
    requirements: ['Comfortable with Python and basic linear algebra / calculus']
  },
  {
    title: 'Applied Machine Learning & Feature Engineering for Data Science',
    picture: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tutor: 'Lucas Silva',
    email: 'lucas.silva@nerdacademy.edu',
    price: 69.99,
    rating: 4.88,
    reviews: 190,
    bought: 2400,
    hours: 32.0,
    lectures: 124,
    category: 'Artificial Intelligence',
    difficulty: 'Beginner',
    status: 'approved',
    postingDate: '2024-02-12',
    description: 'Master Scikit-Learn, XGBoost, Pandas, and NumPy. Learn rigorous data cleaning, missing value imputation, cross-validation, hyperparameter optimization, and model interpretability.',
    learningOutcomes: [
      'Clean, transform, and impute real-world tabular datasets using Pandas',
      'Train high-accuracy classification and regression models with XGBoost & LightGBM',
      'Evaluate model performance using ROC-AUC, precision-recall, and cross-validation',
      'Interpret model predictions with SHAP values and feature importance scores'
    ],
    requirements: ['Basic Python programming skills']
  },
  {
    title: 'Computer Vision & Real-Time Object Detection with OpenCV and YOLO',
    picture: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    tutor: 'Elena Rostova',
    email: 'elena.rostova@nerdacademy.edu',
    price: 79.99,
    rating: 4.91,
    reviews: 175,
    bought: 2150,
    hours: 27.5,
    lectures: 108,
    category: 'Artificial Intelligence',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-03-02',
    description: 'Build real-time video surveillance, optical character recognition (OCR), face recognition, and autonomous driving object tracking with OpenCV and YOLOv9.',
    learningOutcomes: [
      'Process live video streams with OpenCV filter kernels and transforms',
      'Train custom YOLOv9 detectors on custom annotated datasets',
      'Track objects across frames using ByteTrack and DeepSORT',
      'Export models to ONNX and TensorRT for real-time edge hardware execution'
    ],
    requirements: ['Intermediate Python knowledge']
  },

  // Mobile App Development (4 courses)
  {
    title: 'React Native & Expo: Cross-Platform iOS & Android Masterclass',
    picture: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    tutor: 'Aisha Al-Mansoor',
    email: 'aisha.almansoor@nerdacademy.edu',
    price: 79.99,
    rating: 4.92,
    reviews: 295,
    bought: 3750,
    hours: 35.0,
    lectures: 138,
    category: 'Mobile App Development',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-01-12',
    description: 'Build polished 60FPS mobile apps for iOS and Android using React Native, Expo Router, Reanimated 3, native push notifications, offline SQLite persistence, and App Store releases.',
    learningOutcomes: [
      'Build native iOS and Android apps from a single TypeScript React codebase',
      'Animate complex gestures smoothly with React Native Reanimated 3',
      'Implement offline-first data caching with WatermelonDB and SQLite',
      'Automate builds and submission using Expo EAS and GitHub Actions'
    ],
    requirements: ['Solid understanding of React and JavaScript']
  },
  {
    title: 'Flutter & Dart: Complete Cross-Platform Mobile Blueprint',
    picture: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80',
    tutor: 'Aisha Al-Mansoor',
    email: 'aisha.almansoor@nerdacademy.edu',
    price: 74.99,
    rating: 4.9,
    reviews: 240,
    bought: 3120,
    hours: 39.0,
    lectures: 156,
    category: 'Mobile App Development',
    difficulty: 'Beginner',
    status: 'approved',
    postingDate: '2024-01-30',
    description: 'Master Google Flutter 3 and Dart language essentials. Construct pixel-perfect native UIs, Bloc state management, REST API client integration, and background push notifications.',
    learningOutcomes: [
      'Master the Dart programming language and Flutter widget tree hierarchy',
      'Manage complex app state predictably using Flutter Bloc and Cubit',
      'Integrate device hardware APIs (Camera, GPS, Biometrics, Bluetooth)',
      'Publish compiled native apps to the Apple App Store and Google Play'
    ],
    requirements: ['No prior mobile experience needed; basic programming knowledge recommended']
  },
  {
    title: 'SwiftUI & iOS 17 App Development: Modern Apple Ecosystem',
    picture: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop&q=80',
    tutor: 'Aisha Al-Mansoor',
    email: 'aisha.almansoor@nerdacademy.edu',
    price: 89.99,
    rating: 4.95,
    reviews: 185,
    bought: 2300,
    hours: 33.0,
    lectures: 126,
    category: 'Mobile App Development',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-02-20',
    description: 'Design Apple-quality experiences using SwiftUI, SwiftData, Swift Concurrency (async/await), WidgetKit, and CloudKit sync for iPhone, iPad, and Apple Watch.',
    learningOutcomes: [
      'Build declarative user interfaces matching Apple Human Interface Guidelines',
      'Persist complex relational models locally using SwiftData and Core Data',
      'Leverage Swift async/await, Tasks, and Actors for thread-safe networking',
      'Implement home screen widgets and Live Activities using WidgetKit'
    ],
    requirements: ['Access to a Mac with Xcode 15+ installed']
  },
  {
    title: 'Modern Android with Kotlin, Jetpack Compose & Clean Architecture',
    picture: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&auto=format&fit=crop&q=80',
    tutor: 'Aisha Al-Mansoor',
    email: 'aisha.almansoor@nerdacademy.edu',
    price: 84.99,
    rating: 4.89,
    reviews: 160,
    bought: 2050,
    hours: 31.5,
    lectures: 118,
    category: 'Mobile App Development',
    difficulty: 'Intermediate',
    status: 'approved',
    postingDate: '2024-03-10',
    description: 'Build modern Android apps according to official Google architecture guidelines: Jetpack Compose, Kotlin Coroutines, StateFlow, Room DB, Hilt dependency injection, and Retrofit.',
    learningOutcomes: [
      'Design reactive Android UIs purely in Kotlin with Jetpack Compose',
      'Implement clean architecture separating UI, Domain, and Data layers',
      'Inject dependencies cleanly with Hilt (Dagger under the hood)',
      'Manage background tasks reliably with WorkManager and Room persistence'
    ],
    requirements: ['Familiarity with object-oriented programming (Java or Kotlin)']
  }
];

// ==========================================
// 4. BLOGS (12 Technical Articles)
// ==========================================
const BLOGS = [
  {
    title: 'Demystifying React 18 Concurrent Rendering & Server Components',
    name: 'Marcus Vance',
    date: 'February 12, 2024',
    category: 'Web Development',
    readTime: '6 min read',
    blogImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    summary: 'A deep architectural dive into how React 18 schedules non-blocking priority renders and how Server Components redefine zero-bundle client execution.',
    blogDetails: `<p>React 18 brought a generational shift to how frontend web applications compute, schedule, and render UI trees. For nearly a decade, React rendering was strictly synchronous and blocking: once an update started, the browser main thread could not be interrupted until the full virtual DOM reconciliation finished.</p><h3>The Power of Concurrent Scheduling</h3><p>With concurrent rendering, React decouples UI reconciliation from immediate DOM mutation. Updates can be prioritized: high-priority updates (such as typing into an input field or clicking an accordion) preempt lower-priority background renders (such as filtering a table of 10,000 courses).</p><p>By utilizing primitives like <code>useTransition</code> and <code>useDeferredValue</code>, developers can keep user interactions butter-smooth at 60 frames per second without complex debounce throttling hacks.</p><h3>Why Server Components Change Everything</h3><p>React Server Components (RSC) take this paradigm one step further: components that execute solely on the server and stream serialized JSON trees over the wire. This means heavy markdown parsers, database clients, and cryptographic helpers cost zero kilobytes of JavaScript in your student's browser bundle.</p>`
  },
  {
    title: 'Building Resilient Distributed Systems: Lessons from Google Cloud',
    name: 'Dr. Sarah Jenkins',
    date: 'February 20, 2024',
    category: 'Computer Science',
    readTime: '8 min read',
    blogImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    summary: 'Key design patterns for surviving network partitions, cascading failures, and unexpected traffic spikes in cloud-native microservices.',
    blogDetails: `<p>In distributed computing, the fallacies of distributed networks are not theoretical edge cases; they are everyday operational realities. Networks will partition, latencies will fluctuate, and servers will fail abruptly.</p><h3>The Bulkhead and Circuit Breaker Pattern</h3><p>When an upstream authentication microservice starts experiencing slow database queries, standard HTTP clients will hold TCP sockets open. Within seconds, connection pools exhaust, cascading failure to every downstream product catalog and checkout service.</p><p>Implementing the Circuit Breaker pattern with health checks allows an application to quickly fail fast or serve cached fallback data rather than locking system threads.</p>`
  },
  {
    title: 'Retrieval-Augmented Generation (RAG) Architecture Patterns in 2024',
    name: 'Elena Rostova',
    date: 'March 02, 2024',
    category: 'Artificial Intelligence',
    readTime: '7 min read',
    blogImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    summary: 'How to move beyond naive cosine similarity and engineer production RAG systems with rerankers, hybrid sparse-dense search, and recursive retrieval.',
    blogDetails: `<p>Naive RAG—chunking text into 500-token blocks, embedding them with a standard model, and pulling top-k vectors by cosine similarity—rarely cuts it in enterprise environments. It frequently hallucinates, misses cross-section context, and fails on keyword-precise searches.</p><h3>Hybrid Search: Combining BM25 with Dense Vectors</h3><p>State-of-the-art retrieval systems combine lexical sparse indexers (BM25) with semantic dense vector embeddings (such as OpenAI or Cohere embeddings) using Reciprocal Rank Fusion (RRF). This ensures that exact acronyms, order numbers, and semantic meaning are retrieved concurrently.</p>`
  },
  {
    title: 'Why Rust is the Future of Low-Latency Systems & Web Infrastructure',
    name: 'Kaito Tanaka',
    date: 'March 15, 2024',
    category: 'Programming',
    readTime: '5 min read',
    blogImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
    summary: 'Analyzing why major infrastructure giants are migrating critical C++ and Go services to Rust for memory safety without garbage collector pauses.',
    blogDetails: `<p>Garbage collection has made modern web development accessible and productive. However, in low-latency environments—such as trading systems, edge proxies, and container runtimes—stop-the-world garbage collection pauses introduce unacceptable tail latency (p99/p999 spikes).</p><p>Rust solves this without manual memory allocation bugs through its innovative compile-time borrow checker, providing C-level execution speed with mathematically verified memory safety.</p>`
  },
  {
    title: 'The Modern Software Engineer Roadmap: From Junior to Staff Architect',
    name: 'Devon Thorne',
    date: 'March 22, 2024',
    category: 'Career & Industry',
    readTime: '9 min read',
    blogImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    summary: 'Strategic advice on expanding your impact beyond individual coding tickets into architectural leadership, mentoring, and technical vision.',
    blogDetails: `<p>Progressing from junior developer to mid-level is primarily about execution speed and code quality. But moving from senior to staff and principal architect requires a fundamental mindset shift: your value is no longer measured in pull requests authored, but in the leverage and clarity you provide to entire engineering teams.</p>`
  },
  {
    title: 'Zero-Downtime Database Migrations in High-Traffic Production',
    name: 'Lucas Silva',
    date: 'April 04, 2024',
    category: 'Computer Science',
    readTime: '6 min read',
    blogImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    summary: 'The Expand and Contract pattern: How to safely alter tables with millions of rows without locking writes or taking your platform offline.',
    blogDetails: `<p>Running <code>ALTER TABLE users ADD COLUMN verified BOOLEAN DEFAULT false;</code> on a 50-million-row PostgreSQL table can lock writes for minutes, causing API timeouts and customer downtime.</p><p>We examine the Expand and Contract pattern, backward-compatible dual writes, and asynchronous background backfilling strategies.</p>`
  },
  {
    title: 'Cross-Platform Mobile Performance: React Native vs Flutter in 2024',
    name: 'Aisha Al-Mansoor',
    date: 'April 14, 2024',
    category: 'Mobile App Development',
    readTime: '7 min read',
    blogImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
    summary: 'A benchmark-backed comparison of React Native with New Architecture (Hermes, Fabric) versus Flutter Impeller engine on iOS and Android.',
    blogDetails: `<p>Both React Native and Flutter have achieved remarkable maturity. With React Native's New Architecture removing the asynchronous bridge in favor of synchronous JSI bindings, and Flutter's Impeller rendering engine eliminating shader compilation jank on iOS, both frameworks can deliver native 120Hz performance.</p>`
  },
  {
    title: 'Kubernetes for Developers: Simplifying Container Orchestration',
    name: 'Priya Sharma',
    date: 'April 28, 2024',
    category: 'Cloud & DevOps',
    readTime: '8 min read',
    blogImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
    summary: 'A pragmatic guide to Pods, Deployments, Services, and Ingress controllers without getting lost in Kubernetes YAML complexity.',
    blogDetails: `<p>Kubernetes has a reputation for steep learning curves and overwhelming YAML files. But at its core, Kubernetes is simply a declarative reconciliation loop: you describe the desired state of your services, and the control plane works tirelessly to maintain it.</p>`
  },
  {
    title: 'Writing Clean TypeScript: Patterns and Anti-Patterns to Avoid',
    name: 'Marcus Vance',
    date: 'May 06, 2024',
    category: 'Web Development',
    readTime: '5 min read',
    blogImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    summary: 'Avoid `any`, over-engineered generics, and type assertions with these battle-tested typing conventions used by top SaaS teams.',
    blogDetails: `<p>TypeScript is designed to save developers from runtime type errors. Yet all too often, codebases end up littered with <code>as unknown as Type</code> assertions and unconstrained generic soup. We walk through clean typing rules that keep your code readable and safe.</p>`
  },
  {
    title: 'Demystifying Vector Databases: HNSW vs IVF-PQ Indexing',
    name: 'Elena Rostova',
    date: 'May 18, 2024',
    category: 'Artificial Intelligence',
    readTime: '7 min read',
    blogImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
    summary: 'An intuitive breakdown of Hierarchical Navigable Small World graphs and Inverted File Product Quantization for sub-millisecond vector search.',
    blogDetails: `<p>How do vector databases like Pinecone, Milvus, and pgvector query millions of high-dimensional embeddings in less than 5 milliseconds? The answer lies in Approximate Nearest Neighbor (ANN) algorithms.</p>`
  },
  {
    title: 'The Art of Pragmatic Code Reviews: Nurturing High-Velocity Teams',
    name: 'Devon Thorne',
    date: 'June 01, 2024',
    category: 'Career & Industry',
    readTime: '6 min read',
    blogImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
    summary: 'How to transition code reviews from pedantic nit-picking sessions into high-trust learning opportunities that ship production software faster.',
    blogDetails: `<p>Code reviews often become a battleground of subjective formatting opinions and bikeshedding. We examine conventions like Conventional Comments, automated linter enforcement, and asynchronous pairing to foster a healthy engineering culture.</p>`
  },
  {
    title: 'Continuous Integration with GitHub Actions: Speeding Up Test Suites',
    name: 'Priya Sharma',
    date: 'June 12, 2024',
    category: 'Cloud & DevOps',
    readTime: '6 min read',
    blogImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80',
    summary: 'Shave 70% off your GitHub Actions runtime using layer caching, test sharding, dependency pre-warming, and RAM-backed matrix runners.',
    blogDetails: `<p>Slow CI pipelines kill engineering momentum. When developers have to wait 25 minutes for automated tests to pass before merging, context-switching spikes. We look at test matrix sharding and Docker buildx caching to drop CI times under 4 minutes.</p>`
  }
];

// ==========================================
// 5. REVIEWS (40 Realistic Reviews)
// ==========================================
const REVIEWS = [
  { courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture', student: 'Liam O\'Connor', rating: 5, review: 'Hands down the best Next.js course available. Marcus explains Server Components and App Router caching mechanisms better than official documentation.' },
  { courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture', student: 'Chloe Dubois', rating: 5, review: 'The monorepo structure and strict TypeScript integration were game-changers for my daily work. Landed a senior frontend role right after finishing the capstone!' },
  { courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture', student: 'Noah Chen', rating: 5, review: 'Incredible detail on real-world patterns like optimistic UI updates and Stripe checkout integration.' },
  { courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture', student: 'Maya Patel', rating: 4, review: 'Fantastic course. The pace is intense, but the assignments give you true production confidence.' },
  { courseTitle: 'Tailwind CSS Mastery: Designing Production-Grade SaaS Interfaces', student: 'Ethan Wright', rating: 5, review: 'Never thought I could build such clean dark mode dashboards without writing messy custom CSS. Highly recommended!' },
  { courseTitle: 'Tailwind CSS Mastery: Designing Production-Grade SaaS Interfaces', student: 'Sophia Kowalska', rating: 5, review: 'Marcus is an exceptional teacher. The section on design tokens and accessible Headless UI primitives was worth 10x the course price.' },
  { courseTitle: 'Micro-Frontend Architectures: Module Federation in Production', student: 'Jackson Reed', rating: 5, review: 'Module federation demystified. We used the exact monorepo setup from this course to split our monolithic frontend at my company.' },
  { courseTitle: 'Node.js, Express & Fastify: High-Throughput RESTful APIs', student: 'Emma Lindqvist', rating: 5, review: 'Clear, concise, and benchmark-driven. The Fastify performance comparison and security middleware lessons were top-tier.' },
  { courseTitle: 'Node.js, Express & Fastify: High-Throughput RESTful APIs', student: 'Mateo Rossi', rating: 5, review: 'Devon explains authentication, rate limiting, and database connection pooling with extreme clarity.' },
  { courseTitle: 'The Complete Python 3.12 Developer Bootcamp: Zero to Hero', student: 'Aaliyah Khan', rating: 5, review: 'Started with zero programming background and built full web scrapers and automation bots in week 4. Elena is a phenomenal educator!' },
  { courseTitle: 'The Complete Python 3.12 Developer Bootcamp: Zero to Hero', student: 'Benjamin Scott', rating: 5, review: 'Extremely thorough. The modern Python 3.12 features and asyncio sections make this stand out from older courses.' },
  { courseTitle: 'The Complete Python 3.12 Developer Bootcamp: Zero to Hero', student: 'Isabella Silva', rating: 5, review: 'Great exercises and progressive assignments. The instructor answers questions in the dashboard promptly.' },
  { courseTitle: 'Rust Systems Programming: Memory Safety Without Garbage Collection', student: 'Oliver Mueller', rating: 5, review: 'The borrow checker finally clicked! Kaito\'s visual diagrams for lifetimes and smart pointers are brilliant.' },
  { courseTitle: 'Rust Systems Programming: Memory Safety Without Garbage Collection', student: 'Zoe Nguyen', rating: 5, review: 'Building a multi-threaded async web server from scratch gave me immense respect for Rust\'s zero-cost abstractions.' },
  { courseTitle: 'Modern C++20 for Systems Engineers: Metaprogramming & Concepts', student: 'Alexander Novak', rating: 5, review: 'C++20 Concepts and Ranges explained with utmost precision. Ideal for developers upgrading from C++11 or C++14.' },
  { courseTitle: 'Go (Golang) Microservices: High-Concurrency Backend Systems', student: 'Mia Tanaka', rating: 5, review: 'Dr. Sarah Jenkins is a true distributed systems master. The gRPC and protocol buffer lessons are production-ready.' },
  { courseTitle: 'Go (Golang) Microservices: High-Concurrency Backend Systems', student: 'William Gomez', rating: 5, review: 'Super clear explanations of Goroutines, race condition detection, and Docker multi-stage builds.' },
  { courseTitle: 'Distributed Systems & Cloud Computing at Scale', student: 'Harper Davies', rating: 5, review: 'This course is equivalent to a graduate university course on distributed systems. The Raft consensus implementation was unforgettable.' },
  { courseTitle: 'Distributed Systems & Cloud Computing at Scale', student: 'Daniel Kim', rating: 5, review: 'Helped me pass system design rounds for FAANG engineering roles. The fault injection and partition simulations were gold.' },
  { courseTitle: 'Data Structures & Algorithms: The Technical Interview Masterclass', student: 'Evelyn Taylor', rating: 5, review: 'Cleared my Google technical interview after working through Sarah\'s dynamic programming and graph problem sets!' },
  { courseTitle: 'Data Structures & Algorithms: The Technical Interview Masterclass', student: 'James Martin', rating: 5, review: 'The visual breakdowns of sliding window and two-pointer algorithms saved me hundreds of hours of frustration.' },
  { courseTitle: 'Data Structures & Algorithms: The Technical Interview Masterclass', student: 'Charlotte Roy', rating: 5, review: 'Crystal clear explanations. No gimmicks, just sound problem-solving frameworks.' },
  { courseTitle: 'Operating Systems & Concurrency: From Hardware to Threads', student: 'Henry Adams', rating: 5, review: 'Fascinating exploration of CPU cache coherence, memory barriers, and virtual memory paging.' },
  { courseTitle: 'Database Internals: How Relational & NoSQL Engines Store Data', student: 'Amelia Ortiz', rating: 5, review: 'Finally understand what happens under the hood when PostgreSQL writes to the WAL and buffer pool!' },
  { courseTitle: 'LLM Engineering: Building Production Generative AI Agents', student: 'Sebastian Wagner', rating: 5, review: 'The most comprehensive RAG and fine-tuning course on the internet. Built an enterprise doc assistant that my team now uses daily.' },
  { courseTitle: 'LLM Engineering: Building Production Generative AI Agents', student: 'Victoria Santos', rating: 5, review: 'Elena bridges cutting-edge research papers with practical LangChain and vector DB deployments seamlessly.' },
  { courseTitle: 'LLM Engineering: Building Production Generative AI Agents', student: 'Gabriel Morel', rating: 5, review: 'Outstanding coverage of LoRA fine-tuning and agentic tool use. Worth every single dollar.' },
  { courseTitle: 'Deep Learning & Neural Networks with PyTorch 2.x', student: 'Aria Takahashi', rating: 5, review: 'Coding backprop and transformer attention from scratch gave me total intuition into how modern AI works.' },
  { courseTitle: 'Applied Machine Learning & Feature Engineering for Data Science', student: 'Samuel Evans', rating: 5, review: 'Practical, data-focused, and free of dry academic tangents. The XGBoost tuning section is stellar.' },
  { courseTitle: 'Computer Vision & Real-Time Object Detection with OpenCV and YOLO', student: 'Layla Morales', rating: 5, review: 'Trained custom YOLOv9 models on video feeds with 90+ FPS on my local GPU. Incredible course!' },
  { courseTitle: 'React Native & Expo: Cross-Platform iOS & Android Masterclass', student: 'Liam O\'Connor', rating: 5, review: 'Shipped my first cross-platform mobile app to both the App Store and Google Play in under two months. Aisha is fantastic!' },
  { courseTitle: 'React Native & Expo: Cross-Platform iOS & Android Masterclass', student: 'Chloe Dubois', rating: 5, review: 'Reanimated 3 gesture animations look completely native. Beautiful course materials and starter code.' },
  { courseTitle: 'Flutter & Dart: Complete Cross-Platform Mobile Blueprint', student: 'Noah Chen', rating: 5, review: 'The Flutter Bloc state management breakdown was the best I have ever seen. Everything is well structured.' },
  { courseTitle: 'SwiftUI & iOS 17 App Development: Modern Apple Ecosystem', student: 'Maya Patel', rating: 5, review: 'SwiftData and iOS 17 widgets covered in depth. Feel completely confident building native Apple apps now.' },
  { courseTitle: 'Modern Android with Kotlin, Jetpack Compose & Clean Architecture', student: 'Ethan Wright', rating: 5, review: 'No legacy XML layouts—100% modern Jetpack Compose, Coroutines, and Hilt. Google-recommended architecture done right.' },
  { courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture', student: 'Sophia Kowalska', rating: 5, review: 'The best investment in my career this year. Highly recommend Nerd Academy to every aspiring developer.' },
  { courseTitle: 'Web Security & Penetration Testing for Full-Stack Developers', student: 'Jackson Reed', rating: 5, review: 'Opened my eyes to critical vulnerabilities I had accidentally introduced in past client projects. Essential for every dev.' },
  { courseTitle: 'Computer Networking Deep-Dive: TCP/IP, HTTP/3 & DNS', student: 'Emma Lindqvist', rating: 5, review: 'Capturing live packets with Wireshark made abstract networking protocols completely tangible.' },
  { courseTitle: 'Modern Vue 3 & Nuxt 3 Full-Stack Application Blueprint', student: 'Mateo Rossi', rating: 5, review: 'Nuxt 3 SSR and Pinia explained cleanly. Great alternative to the React ecosystem.' },
  { courseTitle: 'TypeScript Full Mastery: Type Gymnastics & Large-Scale Design', student: 'Aaliyah Khan', rating: 5, review: 'Conditional types and generics no longer look like alien hieroglyphics. Incredible course!' }
];

// ==========================================
// 6. ASSIGNMENTS (15 Practical Tasks)
// ==========================================
const ASSIGNMENTS = [
  {
    courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture',
    title: 'Assignment 1: Build an Authenticated App Router Dashboard',
    dueDate: '2024-11-20',
    totalPoints: 100,
    status: 'Pending',
    description: 'Implement a protected dashboard route using Next.js 14 Server Actions, Zod schema validation, and optimistic UI updates for course bookmarks.'
  },
  {
    courseTitle: 'Modern Full-Stack React & Next.js 14 Enterprise Architecture',
    title: 'Assignment 2: Stripe Webhook Fulfillment & Idempotency',
    dueDate: '2024-11-28',
    totalPoints: 100,
    status: 'Submitted',
    score: 95,
    description: 'Handle Stripe checkout session completed webhooks. Verify cryptographic signatures, prevent replay attacks, and update database purchase records.'
  },
  {
    courseTitle: 'Tailwind CSS Mastery: Designing Production-Grade SaaS Interfaces',
    title: 'Assignment 1: Responsive Multi-Tier Pricing Table',
    dueDate: '2024-11-18',
    totalPoints: 50,
    status: 'Submitted',
    score: 50,
    description: 'Design a responsive pricing table component supporting annual/monthly toggles, feature comparison checklists, and dark mode theming.'
  },
  {
    courseTitle: 'Node.js, Express & Fastify: High-Throughput RESTful APIs',
    title: 'Assignment 1: JWT Access & Refresh Token Authentication Cycle',
    dueDate: '2024-11-25',
    totalPoints: 100,
    status: 'Pending',
    description: 'Build an Express middleware pipeline issuing 15-minute access tokens and 7-day revolving refresh tokens with Redis revocation checks.'
  },
  {
    courseTitle: 'The Complete Python 3.12 Developer Bootcamp: Zero to Hero',
    title: 'Assignment 1: Automated Web Scraper with Rate Limiting',
    dueDate: '2024-11-15',
    totalPoints: 75,
    status: 'Submitted',
    score: 72,
    description: 'Write an asynchronous Python script scraping product catalogs while respecting robots.txt and applying exponential backoff retry logic.'
  },
  {
    courseTitle: 'Rust Systems Programming: Memory Safety Without Garbage Collection',
    title: 'Assignment 1: Multi-Threaded In-Memory Key-Value Store',
    dueDate: '2024-11-30',
    totalPoints: 100,
    status: 'Pending',
    description: 'Implement an in-memory key-value cache supporting concurrent reads and writes using Arc<RwLock<HashMap<String, String>>>.'
  },
  {
    courseTitle: 'Distributed Systems & Cloud Computing at Scale',
    title: 'Assignment 1: Raft Leader Election & Heartbeat Simulation',
    dueDate: '2024-12-05',
    totalPoints: 150,
    status: 'Pending',
    description: 'Implement leader election, randomized split-vote timeouts, and append-entry RPC heartbeats across a 5-node simulated cluster.'
  },
  {
    courseTitle: 'Data Structures & Algorithms: The Technical Interview Masterclass',
    title: 'Assignment 1: Dynamic Programming Grid Paths & Subsets',
    dueDate: '2024-11-22',
    totalPoints: 100,
    status: 'Submitted',
    score: 100,
    description: 'Solve 5 foundational dynamic programming challenges including 0/1 Knapsack, Coin Change, and Longest Common Subsequence.'
  },
  {
    courseTitle: 'Database Internals: How Relational & NoSQL Engines Store Data',
    title: 'Assignment 1: B+ Tree Insertion and Node Splitting',
    dueDate: '2024-12-02',
    totalPoints: 100,
    status: 'Pending',
    description: 'Implement a memory-backed B+ Tree supporting key insertion, child node splitting, and leaf pointer traversal.'
  },
  {
    courseTitle: 'LLM Engineering: Building Production Generative AI Agents',
    title: 'Assignment 1: Hybrid RAG Pipeline with Document Reranker',
    dueDate: '2024-11-29',
    totalPoints: 100,
    status: 'Pending',
    description: 'Construct a LangChain retrieval pipeline integrating BM25 lexical search with vector similarity and Cohere cross-encoder reranking.'
  },
  {
    courseTitle: 'Deep Learning & Neural Networks with PyTorch 2.x',
    title: 'Assignment 1: Multi-Class Image Classifier with Custom PyTorch Module',
    dueDate: '2024-11-19',
    totalPoints: 80,
    status: 'Submitted',
    score: 78,
    description: 'Train a 4-layer Convolutional Neural Network on CIFAR-10 achieving at least 82% validation accuracy with data augmentation.'
  },
  {
    courseTitle: 'React Native & Expo: Cross-Platform iOS & Android Masterclass',
    title: 'Assignment 1: Offline SQLite Sync for Notes Application',
    dueDate: '2024-12-08',
    totalPoints: 100,
    status: 'Pending',
    description: 'Implement local offline caching with Expo SQLite and bidirectional reconciliation when network connectivity is restored.'
  },
  {
    courseTitle: 'SwiftUI & iOS 17 App Development: Modern Apple Ecosystem',
    title: 'Assignment 1: Interactive WidgetKit Home Screen Extension',
    dueDate: '2024-12-01',
    totalPoints: 75,
    status: 'Pending',
    description: 'Build an interactive iOS 17 Home Screen widget displaying daily student study streak with tap-to-complete button actions.'
  },
  {
    courseTitle: 'Web Security & Penetration Testing for Full-Stack Developers',
    title: 'Assignment 1: CSRF & XSS Mitigation Lab',
    dueDate: '2024-11-27',
    totalPoints: 100,
    status: 'Pending',
    description: 'Identify and fix stored XSS and cross-site request forgery vulnerabilities in a provided vulnerable Express application.'
  },
  {
    courseTitle: 'TypeScript Full Mastery: Type Gymnastics & Large-Scale Design',
    title: 'Assignment 1: Strictly Typed Deep Partial & Deep Readonly Helpers',
    dueDate: '2024-11-21',
    totalPoints: 50,
    status: 'Submitted',
    score: 50,
    description: 'Author recursive conditional types implementing DeepPartial<T>, DeepReadonly<T>, and UnionToIntersection<U>.'
  }
];

// ==========================================
// 7. ANNOUNCEMENTS (10 Items)
// ==========================================
const ANNOUNCEMENTS = [
  {
    title: 'Live Q&A: Next.js 14 Server Actions with Marcus Vance',
    date: 'November 14, 2024',
    author: 'Marcus Vance',
    category: 'Live Session',
    message: 'Join us this Thursday at 6:00 PM EST for a deep dive into Server Actions, revalidatePath strategies, and production error boundaries.'
  },
  {
    title: 'System Design Mock Interviews Schedule Open',
    date: 'November 12, 2024',
    author: 'Dr. Sarah Jenkins',
    category: 'Mentorship',
    message: 'Mock system design interview slots for students enrolled in the Computer Science and Full-Stack tracks are now available for booking in the student dashboard.'
  },
  {
    title: 'New AI Track Course Released: LLM Multi-Agent Swarms',
    date: 'November 10, 2024',
    author: 'Elena Rostova',
    category: 'Curriculum Update',
    message: 'We have just published a new hands-on module covering LangGraph and autonomous multi-agent systems with tool calling in PyTorch and Python.'
  },
  {
    title: 'Platform Maintenance Notice: Sunday 2:00 AM UTC',
    date: 'November 08, 2024',
    author: 'Priya Sharma',
    category: 'Maintenance',
    message: 'Nerd Academy database clusters will undergo routine performance indexing optimization. Expected downtime is under 5 minutes.'
  },
  {
    title: 'Fall 2024 Student Capstone Project Showcase',
    date: 'November 05, 2024',
    author: 'Devon Thorne',
    category: 'Community',
    message: 'Submit your end-of-track capstone projects by December 15th to be featured in the Nerd Academy Alumni Directory and viewed by hiring partners.'
  },
  {
    title: 'Rust 2024 Edition Compatibility Updates',
    date: 'November 02, 2024',
    author: 'Kaito Tanaka',
    category: 'Curriculum Update',
    message: 'All code examples in the Rust Systems Programming course have been updated to target the latest stable toolchain with async closures support.'
  },
  {
    title: 'Mobile Track Office Hours: Expo SDK 51 Upgrades',
    date: 'October 28, 2024',
    author: 'Aisha Al-Mansoor',
    category: 'Live Session',
    message: 'Aisha will be walking through Expo SDK 51 migrations, React 18.3 updates, and Apple privacy manifest requirements this Friday.'
  },
  {
    title: 'Student Discord Community Hits 25,000 Verified Members',
    date: 'October 22, 2024',
    author: 'Nerd Academy Team',
    category: 'Community',
    message: 'Thank you to our vibrant student community! Connect your account on Discord to access private cohort study groups and 24/7 coding support.'
  },
  {
    title: 'Stripe Sandbox Integration Guide for Checkout Lab',
    date: 'October 15, 2024',
    author: 'Devon Thorne',
    category: 'Curriculum Update',
    message: 'A comprehensive troubleshooting guide and mock webhook event payloads for the FinTech payment module are now pinned in the assignments tab.'
  },
  {
    title: 'Welcome to Nerd Academy Fall Cohort!',
    date: 'October 01, 2024',
    author: 'Nerd Academy Team',
    category: 'General',
    message: 'Welcome to all our new students. Make sure to check out the recommended software engineering roadmaps and complete your dashboard profile.'
  }
];

// ==========================================
// 8. FAQS (15 Categorized FAQs)
// ==========================================
const FAQS = [
  {
    question: 'How do courses work on Nerd Academy?',
    answer: 'All Nerd Academy courses are self-paced with lifetime access. Each course includes video lectures, code repositories, downloadable cheat-sheets, hands-on assignments evaluated by instructors, and an official verifiable completion certificate upon finishing.',
    category: 'General'
  },
  {
    question: 'Are there any prerequisites before taking advanced courses?',
    answer: 'Each course details its specific prerequisites on the course details page. Beginner courses start from absolute zero, while intermediate and advanced courses assume comfort with foundational programming logic.',
    category: 'Courses'
  },
  {
    question: 'What is the 30-Day Money-Back Guarantee policy?',
    answer: 'We want you to learn with complete peace of mind. If any course does not meet your expectations, you can request a 100% refund within 30 days of purchase—no complicated questions asked.',
    category: 'Billing'
  },
  {
    question: 'How do instructors review my assignments?',
    answer: 'When you submit an assignment through your Student Dashboard, the course instructor receives an alert. Instructors review your submitted code, provide line-by-line feedback, assign points, and offer guidance on architectural improvements.',
    category: 'Learning'
  },
  {
    question: 'Can I switch between Dark and Light mode?',
    answer: 'Yes! Nerd Academy features a built-in theme switcher in the navigation bar. Your preference is automatically remembered across your browsing sessions.',
    category: 'Platform'
  },
  {
    question: 'Do I receive a certificate after completing a course?',
    answer: 'Yes, completing all curriculum modules and submitting the required assignments unlocks a digital, verifiable Certificate of Completion that you can add directly to your LinkedIn profile and engineering CV.',
    category: 'Certificates'
  },
  {
    question: 'How does the student-to-instructor messaging work?',
    answer: 'Students can leave course reviews, ask questions inside specific module lesson threads, and engage during live office hours hosted by instructors throughout each semester.',
    category: 'Mentorship'
  },
  {
    question: 'What payment methods are supported on checkout?',
    answer: 'We support all major credit and debit cards (Visa, Mastercard, American Express, Discover) processed securely via Stripe with 256-bit SSL encryption.',
    category: 'Billing'
  },
  {
    question: 'How can I apply to become an instructor on Nerd Academy?',
    answer: 'We welcome passionate engineers and educators! Click "Teach on Nerd Academy" in the navigation bar or footer to review instructor prerequisites and submit your portfolio.',
    category: 'Instructors'
  },
  {
    question: 'Can I access courses on mobile and tablet devices?',
    answer: 'Absolutely. The entire Nerd Academy website and student dashboard are fully responsive across smartphones, tablets, laptops, and desktop ultra-wide displays.',
    category: 'Platform'
  },
  {
    question: 'What are Career Roadmaps and how do I follow them?',
    answer: 'Our Career Roadmaps (Frontend, Backend, and Full-Stack) sequence courses into chronological milestone phases spanning 4 to 10 months to take you from fundamentals to employment-ready skills.',
    category: 'Curriculum'
  },
  {
    question: 'Is course content kept up to date with new framework releases?',
    answer: 'Yes. Our instructors regularly update lectures, code repos, and dependencies when major framework versions (e.g. Next.js 14, React 18, Python 3.12) are released.',
    category: 'Courses'
  },
  {
    question: 'Do you offer team or enterprise licenses for companies?',
    answer: 'Yes! Organizations looking to upskill engineering teams can reach out through our Contact page for customized enterprise licensing and dedicated mentor channels.',
    category: 'Enterprise'
  },
  {
    question: 'Can I download videos for offline viewing?',
    answer: 'Lecture notes, slides, source code archives, and cheat-sheets are fully downloadable. Streaming videos require an active internet connection.',
    category: 'Learning'
  },
  {
    question: 'How do I track my overall learning progress and order receipts?',
    answer: 'Your dedicated Student Dashboard includes tabs for enrolled courses with visual progress bars, submitted assignments with scores, and full order history receipts.',
    category: 'Platform'
  }
];

// ==========================================
// SEED EXECUTION
// ==========================================
async function seedDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    console.log(' Successfully connected to MongoDB Atlas cluster (NERD-ACADEMY)');
    const db = client.db('NERD-ACADEMY');

    // 1. Seed Instructors into 'users' collection
    console.log('\n--- Seeding Instructors (Idempotent) ---');
    const usersCol = db.collection('users');
    let instructorCount = 0;
    for (const inst of INSTRUCTORS) {
      const res = await usersCol.updateOne(
        { email: inst.email },
        { $setOnInsert: inst },
        { upsert: true }
      );
      if (res.upsertedCount > 0) instructorCount++;
    }
    console.log(`Instructors: ${instructorCount} new inserted, existing untouched.`);

    // 2. Seed Students into 'users' collection
    console.log('\n--- Seeding Students (Idempotent) ---');
    let studentCount = 0;
    for (const student of STUDENTS) {
      const res = await usersCol.updateOne(
        { email: student.email },
        { $setOnInsert: student },
        { upsert: true }
      );
      if (res.upsertedCount > 0) studentCount++;
    }
    console.log(`Students: ${studentCount} new inserted, existing untouched.`);

    // 3. Seed Courses into 'courses' collection
    console.log('\n--- Seeding Courses (Idempotent) ---');
    const coursesCol = db.collection('courses');
    let courseCount = 0;
    for (const course of COURSES) {
      const res = await coursesCol.updateOne(
        { title: course.title },
        { $setOnInsert: course },
        { upsert: true }
      );
      if (res.upsertedCount > 0) courseCount++;
    }
    console.log(`Courses: ${courseCount} new inserted, existing untouched.`);

    // 4. Seed Blogs into 'blogdetails' collection
    console.log('\n--- Seeding Blogs (Idempotent) ---');
    const blogsCol = db.collection('blogdetails');
    let blogCount = 0;
    for (const blog of BLOGS) {
      const res = await blogsCol.updateOne(
        { title: blog.title },
        { $setOnInsert: blog },
        { upsert: true }
      );
      if (res.upsertedCount > 0) blogCount++;
    }
    console.log(`Blogs: ${blogCount} new inserted, existing untouched.`);

    // 5. Seed Reviews into 'review' collection
    console.log('\n--- Seeding Reviews (Idempotent) ---');
    const reviewsCol = db.collection('review');
    let reviewCount = 0;
    for (const rev of REVIEWS) {
      const res = await reviewsCol.updateOne(
        { courseTitle: rev.courseTitle, student: rev.student },
        { $setOnInsert: rev },
        { upsert: true }
      );
      if (res.upsertedCount > 0) reviewCount++;
    }
    console.log(`Reviews: ${reviewCount} new inserted, existing untouched.`);

    // 6. Seed Assignments into 'studentAssignment' collection
    console.log('\n--- Seeding Assignments (Idempotent) ---');
    const assignmentsCol = db.collection('studentAssignment');
    let assignmentCount = 0;
    for (const assign of ASSIGNMENTS) {
      const res = await assignmentsCol.updateOne(
        { title: assign.title },
        { $setOnInsert: assign },
        { upsert: true }
      );
      if (res.upsertedCount > 0) assignmentCount++;
    }
    console.log(`Assignments: ${assignmentCount} new inserted, existing untouched.`);

    // 7. Seed Announcements into 'announcements' collection
    console.log('\n--- Seeding Announcements (Idempotent) ---');
    const announcementsCol = db.collection('announcements');
    let announcementCount = 0;
    for (const ann of ANNOUNCEMENTS) {
      const res = await announcementsCol.updateOne(
        { title: ann.title },
        { $setOnInsert: ann },
        { upsert: true }
      );
      if (res.upsertedCount > 0) announcementCount++;
    }
    console.log(`Announcements: ${announcementCount} new inserted, existing untouched.`);

    // 8. Seed FAQs into 'faq' and 'FAQ' collection
    console.log('\n--- Seeding FAQs (Idempotent) ---');
    const faqCol = db.collection('faq');
    const FAQCol = db.collection('FAQ');
    let faqCount = 0;
    for (const item of FAQS) {
      const res = await faqCol.updateOne(
        { question: item.question },
        { $setOnInsert: item },
        { upsert: true }
      );
      await FAQCol.updateOne(
        { question: item.question },
        { $setOnInsert: item },
        { upsert: true }
      );
      if (res.upsertedCount > 0) faqCount++;
    }
    console.log(`FAQs: ${faqCount} new inserted, existing untouched.`);

    console.log('\n SUCCESS: Idempotent database population completed smoothly!');
  } catch (err) {
    console.error(' Error running seed script:', err);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

seedDatabase();
