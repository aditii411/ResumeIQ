/* ==========================================================================
   APP DATA: Realistic SaaS Career & ATS Benchmark Datasets
   ========================================================================== */

const SAMPLE_DATA = {
  candidate: {
    name: "Alexander Wright",
    title: "Senior Full-Stack & Cloud Systems Engineer",
    email: "alexander.wright@devflow.io",
    phone: "+1 (415) 890-4421",
    location: "San Francisco, CA (Open to Remote)",
    linkedin: "linkedin.com/in/alex-wright-eng",
    github: "github.com/alexwright",
    currentAtsScore: 74,
    targetScore: 92,
    scannedDate: "Nov 23, 2026",
    summary: "Senior Full-Stack & Cloud Infrastructure Engineer with 7+ years designing fault-tolerant microservices, high-traffic web applications, and event-driven architectures. Proven track record leading migration to containerized workflows, scaling PostgreSQL databases, and mentoring engineering teams."
  },

  targetJob: {
    title: "Staff Cloud Platform & Full-Stack Engineer",
    company: "CloudScale Systems Inc.",
    location: "San Francisco, CA (Hybrid)",
    salaryRange: "$185,000 - $225,000 + Equity",
    department: "Core Infrastructure & Developer Platform",
    atsSystem: "Greenhouse / Workday ATS Parser v4.2",
    descriptionText: `About the Role:
We are seeking an exceptional Staff Cloud Platform & Full-Stack Engineer to architect and scale our next-generation enterprise SaaS workflow engine. You will lead cross-functional architecture initiatives across frontend client applications, Node/Go backend microservices, and AWS distributed infrastructure.

Key Responsibilities:
- Design and execute scalable distributed microservices handling over 50,000 requests/sec with sub-50ms latency.
- Spearhead container orchestration using Kubernetes (EKS), Docker, and Terraform infrastructure-as-code.
- Build resilient CI/CD deployment pipelines utilizing GitHub Actions, ArgoCD, and automated regression testing.
- Champion GraphQL Federation and RESTful API standards across internal and public-facing APIs.
- Instrument robust observability across services using OpenTelemetry, Datadog, and distributed tracing.
- Mentor senior engineers and author high-impact Request for Comments (RFC) technical design documents.

Required Technical Qualifications:
- 7+ years of hands-on software engineering experience in modern JavaScript/TypeScript, Go, or Python.
- Deep expertise in React, Next.js, and modern browser state management.
- Strong proficiency in AWS Cloud Infrastructure (ECS/EKS, Lambda, S3, RDS, CloudFront).
- Proven experience with Docker, Kubernetes, and Terraform infrastructure-as-code.
- Demonstrated success scaling PostgreSQL, Redis caching, and Kafka event streaming.
- Bachelor's or Master's degree in Computer Science, or equivalent practical industry experience.`
  },

  // Keyword Matrix Breakdown
  keywords: [
    // Core Engineering
    { id: 'kw-1', category: 'Core Engineering', name: 'TypeScript', status: 'matched', jdCount: 4, resumeCount: 5, weight: 'Critical', context: 'Used in primary stack and type safety requirements' },
    { id: 'kw-2', category: 'Core Engineering', name: 'React & Next.js', status: 'matched', jdCount: 5, resumeCount: 4, weight: 'Critical', context: 'Frontend architecture and SSR execution' },
    { id: 'kw-3', category: 'Core Engineering', name: 'Node.js Microservices', status: 'matched', jdCount: 6, resumeCount: 6, weight: 'Critical', context: 'High-throughput backend services' },
    { id: 'kw-4', category: 'Core Engineering', name: 'Go (Golang)', status: 'partial', jdCount: 3, resumeCount: 1, weight: 'Preferred', context: 'Found in secondary skills; mentioned in personal projects only' },
    { id: 'kw-5', category: 'Core Engineering', name: 'GraphQL Federation', status: 'missing', jdCount: 3, resumeCount: 0, weight: 'High', context: 'Target JD requires Apollo/GraphQL schema stitching' },

    // Cloud & Infrastructure
    { id: 'kw-6', category: 'Cloud & Infrastructure', name: 'AWS Cloud (ECS/RDS/S3)', status: 'matched', jdCount: 7, resumeCount: 8, weight: 'Critical', context: 'Extensively verified in production deployments' },
    { id: 'kw-7', category: 'Cloud & Infrastructure', name: 'Docker Containers', status: 'matched', jdCount: 4, resumeCount: 5, weight: 'High', context: 'Multi-stage Docker builds and image security' },
    { id: 'kw-8', category: 'Cloud & Infrastructure', name: 'Kubernetes (EKS)', status: 'missing', jdCount: 5, resumeCount: 0, weight: 'Critical', context: 'Core requirement: Pod lifecycle, Helm charts, autoscaling' },
    { id: 'kw-9', category: 'Cloud & Infrastructure', name: 'Terraform (IaC)', status: 'partial', jdCount: 4, resumeCount: 1, weight: 'High', context: 'Listed under tooling, but lacks quantified production scope' },
    { id: 'kw-10', category: 'Cloud & Infrastructure', name: 'CI/CD Pipelines (ArgoCD)', status: 'partial', jdCount: 3, resumeCount: 2, weight: 'High', context: 'GitHub Actions listed, but ArgoCD gitops missing' },

    // Observability & Data
    { id: 'kw-11', category: 'Observability & Data', name: 'PostgreSQL Optimization', status: 'matched', jdCount: 4, resumeCount: 3, weight: 'Critical', context: 'Index tuning, connection pooling, and schema design' },
    { id: 'kw-12', category: 'Observability & Data', name: 'Redis Caching', status: 'matched', jdCount: 3, resumeCount: 3, weight: 'High', context: 'Session storage and distributed locks' },
    { id: 'kw-13', category: 'Observability & Data', name: 'Kafka Event Streaming', status: 'partial', jdCount: 3, resumeCount: 1, weight: 'High', context: 'Mentioned RabbitMQ/SQS; Kafka listed without volume metrics' },
    { id: 'kw-14', category: 'Observability & Data', name: 'OpenTelemetry & Tracing', status: 'missing', jdCount: 3, resumeCount: 0, weight: 'High', context: 'Distributed tracing for microservice latency tracking' },

    // Architecture & Leadership
    { id: 'kw-15', category: 'Architecture & Leadership', name: 'RFC Technical Design Docs', status: 'missing', jdCount: 2, resumeCount: 0, weight: 'Medium', context: 'Staff-level requirement for cross-org architectural alignment' },
    { id: 'kw-16', category: 'Architecture & Leadership', name: 'Engineering Mentorship', status: 'matched', jdCount: 2, resumeCount: 3, weight: 'Medium', context: 'Mentored 4 mid-level engineers to promotion' }
  ],

  // What-If Simulation Items
  simulatorOptions: [
    {
      id: 'sim_k8s',
      name: 'Add Kubernetes (EKS) & Helm Orchestration',
      category: 'Cloud Infrastructure',
      scoreDelta: 6,
      selected: false,
      description: 'Adds pod scaling, cluster configuration, and container governance.'
    },
    {
      id: 'sim_graphql',
      name: 'Add GraphQL Federation & Apollo Gateway',
      category: 'API Architecture',
      scoreDelta: 4,
      selected: false,
      description: 'Covers the exact microservice unification keyword required by Greenhouse parser.'
    },
    {
      id: 'sim_otel',
      name: 'Add OpenTelemetry & Distributed Tracing',
      category: 'Observability',
      scoreDelta: 4,
      selected: false,
      description: 'Closes observability gap by documenting sub-50ms latency instrumentation.'
    },
    {
      id: 'sim_cert',
      name: 'Add AWS Certified Solutions Architect (Professional)',
      category: 'Certifications',
      scoreDelta: 5,
      selected: false,
      description: 'Direct credential match against recruiter search filters.'
    },
    {
      id: 'sim_rfc',
      name: 'Add Staff RFC Architectural Design Leadership',
      category: 'Leadership & Process',
      scoreDelta: 3,
      selected: false,
      description: 'Validates senior staff capability in aligning 15+ engineering peers.'
    }
  ],

  // Bullet Point Optimization Examples
  bulletOptimizations: [
    {
      id: 'b-1',
      role: 'Senior Software Engineer at Horizon Cloud',
      weak: 'Worked on backend APIs, improved performance and handled customer bug fixes for the main product.',
      strong: 'Architected 14 resilient Node.js microservices handling 45K RPM, reducing p99 latency by 38% and slashing customer bug escalations by 52% across 3 quarters.',
      scoreGain: '+8 pts',
      verbs: ['Architected', 'Reducing', 'Slashing'],
      metrics: ['14 microservices', '45K RPM', '38% latency reduction', '52% bug drop']
    },
    {
      id: 'b-2',
      role: 'Full-Stack Engineer at NexaFlow Tech',
      weak: 'Responsible for setting up Docker containers and migrating old servers to AWS.',
      strong: 'Spearheaded zero-downtime migration of 22 legacy monolithic instances into Dockerized AWS ECS services, reducing cloud infrastructure expenditure by $140,000 annually.',
      scoreGain: '+9 pts',
      verbs: ['Spearheaded', 'Dockerized', 'Reducing'],
      metrics: ['22 legacy instances', 'Zero-downtime', '$140K annual cost reduction']
    },
    {
      id: 'b-3',
      role: 'Platform Engineer at DataCore Systems',
      weak: 'Helped the team with database queries and made things run faster with cache.',
      strong: 'Optimized high-contention PostgreSQL queries and deployed multi-region Redis cluster, achieving 99.99% uptime and accelerating analytical query execution by 4.2x.',
      scoreGain: '+7 pts',
      verbs: ['Optimized', 'Deployed', 'Achieving', 'Accelerating'],
      metrics: ['99.99% uptime', '4.2x faster query speed', 'Multi-region Redis']
    }
  ],

  // Job Applications Pipeline
  applications: [
    { id: 'app-1', company: 'CloudScale Systems', role: 'Staff Cloud Platform Engineer', location: 'San Francisco, CA', score: 74, status: 'Reviewing', date: 'Nov 23, 2026', salary: '$185k - $225k' },
    { id: 'app-2', company: 'Stripe', role: 'Staff Infrastructure Engineer', location: 'Remote (US)', score: 86, status: 'Interviewing', date: 'Nov 21, 2026', salary: '$210k - $250k' },
    { id: 'app-3', company: 'Datadog', role: 'Senior Distributed Systems Engineer', location: 'New York, NY', score: 91, status: 'Technical Round', date: 'Nov 18, 2026', salary: '$195k - $235k' },
    { id: 'app-4', company: 'Linear', role: 'Full-Stack Performance Engineer', location: 'Remote (Global)', score: 88, status: 'Offer Received', date: 'Nov 14, 2026', salary: '$190k - $220k' },
    { id: 'app-5', company: 'Retool', role: 'Platform Architect', location: 'San Francisco, CA', score: 81, status: 'Application Sent', date: 'Nov 22, 2026', salary: '$180k - $215k' },
    { id: 'app-6', company: 'Figma', role: 'Senior Cloud Services Engineer', location: 'San Francisco, CA', score: 79, status: 'Screening Call', date: 'Nov 19, 2026', salary: '$200k - $240k' }
  ]
};

if (typeof window !== 'undefined') {
  window.SAMPLE_DATA = SAMPLE_DATA;
}
