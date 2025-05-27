
export interface Tag {
  id: string;
  name: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: Tag[];
  color: string;
  image: string;
}

export const categories = [
  "Professional",
  "Creative",
  "Minimal",
  "Modern",
  "Academic",
  "Corporate"
];

export const tags: Tag[] = [
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "photography", name: "Photography" },
  { id: "art", name: "Art" },
  { id: "technology", name: "Technology" },
  { id: "business", name: "Business" },
  { id: "marketing", name: "Marketing" },
  { id: "education", name: "Education" },
  { id: "engineering", name: "Engineering" },
  { id: "architecture", name: "Architecture" },
  { id: "writing", name: "Writing" },
  { id: "multimedia", name: "Multimedia" },
];

export const colorOptions = [
  { id: "black", name: "Black", value: "#222222" },
  { id: "blue", name: "Blue", value: "#3498db" },
  { id: "red", name: "Red", value: "#e74c3c" },
  { id: "green", name: "Green", value: "#2ecc71" },
  { id: "orange", name: "Orange", value: "#f39c12" },
  { id: "purple", name: "Purple", value: "#9b59b6" },
  { id: "teal", name: "Teal", value: "#1abc9c" },
];

export const templates: Template[] = [
  {
    id: "template-1",
    name: "Modern Developer",
    description: "Clean and modern template for developers",
    category: "Professional",
    tags: [
      { id: "development", name: "Development" },
      { id: "technology", name: "Technology" }
    ],
    color: "blue",
    image: "https://bairesdev.mo.cloudinary.net/blog/2022/08/portrait-of-a-man-using-a-computer-in-a-modern-office-picture-id1344688156-1.jpg?tx=w_1280,q_auto"
  },
  {
    id: "template-2",
    name: "Creative Designer",
    description: "Showcase your creative work with style",
    category: "Creative",
    tags: [
      { id: "design", name: "Design" },
      { id: "art", name: "Art" }
    ],
    color: "purple",
    image: "https://images.shiksha.com/mediadata/shikshaOnline/mailers/2022/naukri-learning/August/Graphic-designer1.jpg"
  },
  {
    id: "template-3",
    name: "Minimal Portfolio",
    description: "Less is more with this minimal template",
    category: "Minimal",
    tags: [
      { id: "design", name: "Design" },
      { id: "architecture", name: "Architecture" }
    ],
    color: "black",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "template-4",
    name: "Corporate Professional",
    description: "Perfect for business professionals",
    category: "Corporate",
    tags: [
      { id: "business", name: "Business" },
      { id: "marketing", name: "Marketing" }
    ],
    color: "blue",
    image: "https://cdn.shopify.com/s/files/1/0176/7945/0212/files/profmeeting_480x480.jpg?v=1676663549"
  },
  {
    id: "template-5",
    name: "Academic Researcher",
    description: "Highlight your academic achievements",
    category: "Academic",
    tags: [
      { id: "education", name: "Education" },
      { id: "writing", name: "Writing" }
    ],
    color: "green",
    image: "https://www.graduateprogram.org/wp-content/uploads/2022/09/Sept-22-How-Google-Has-Changed-Academic-Research_web.jpg"
  },
  {
    id: "template-6",
    name: "Photography Portfolio",
    description: "Showcase your photography work",
    category: "Creative",
    tags: [
      { id: "photography", name: "Photography" },
      { id: "art", name: "Art" }
    ],
    color: "black",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "template-7",
    name: "Tech Startup",
    description: "Modern template for tech entrepreneurs",
    category: "Modern",
    tags: [
      { id: "technology", name: "Technology" },
      { id: "business", name: "Business" }
    ],
    color: "teal",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "template-8",
    name: "Content Creator",
    description: "Perfect for writers and content creators",
    category: "Creative",
    tags: [
      { id: "writing", name: "Writing" },
      { id: "multimedia", name: "Multimedia" }
    ],
    color: "orange",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "template-9",
    name: "Engineer Portfolio",
    description: "Showcase your engineering projects",
    category: "Professional",
    tags: [
      { id: "engineering", name: "Engineering" },
      { id: "technology", name: "Technology" }
    ],
    color: "red",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "template-10",
    name: "Digital Marketer",
    description: "Highlight your marketing expertise",
    category: "Corporate",
    tags: [
      { id: "marketing", name: "Marketing" },
      { id: "business", name: "Business" }
    ],
    color: "purple",
    image: "https://romebusinessschool.com/wp-content/uploads/2025/01/Screenshot-2025-01-21-alle-15.45.48-scaled.webp"
  },
  {
    id: "template-11",
    name: "Architect Portfolio",
    description: "Showcase your architectural designs",
    category: "Professional",
    tags: [
      { id: "architecture", name: "Architecture" },
      { id: "design", name: "Design" }
    ],
    color: "green",
    image: "https://blog.novatr.com/hubfs/An%20architect%20creating%20a%20building%20model.webp"
  },
  {
    id: "template-12",
    name: "Educator Resume",
    description: "Perfect for teachers and educators",
    category: "Academic",
    tags: [
      { id: "education", name: "Education" },
      { id: "writing", name: "Writing" }
    ],
    color: "teal",
    image: "https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/486325400InternationalMathTeacher.jpg=ws1280x960"
  }
];

export const portfolioData = {
  introduction: "I'm a [PROFESSION] with [X] years of experience specializing in [SPECIALTY].",
  bio: "I am passionate about [INTEREST/SPECIALTY] and have dedicated my career to [CAREER GOAL]. With a background in [BACKGROUND/EDUCATION], I bring a unique perspective to my work. I believe in [YOUR PHILOSOPHY/APPROACH] and strive to [YOUR MISSION/GOAL] in every project I undertake.",
  projects: [
    {
      title: "Project Name",
      description: "A brief description of the project and its goals. Discuss the challenges faced and how you overcame them.",
      role: "Your specific role in the project and your key responsibilities.",
      technologies: "List of technologies, tools, or methods used in this project."
    },
    {
      title: "Another Project",
      description: "Description of another significant project showcasing different skills or achievements.",
      role: "Your contributions and responsibilities in this project.",
      technologies: "Different set of technologies or tools utilized in this project."
    },
    {
      title: "Third Project Example",
      description: "A third example to demonstrate the breadth of your experience.",
      role: "Your role and how you contributed to the success of this project.",
      technologies: "Technologies that highlight your versatility."
    }
  ],
  education: [
    {
      degree: "Degree/Certification Name",
      institution: "Institution Name",
      year: "Graduation Year",
      description: "Brief description or notable achievements during this educational period."
    },
    {
      degree: "Another Degree/Certification",
      institution: "Another Institution",
      year: "Year Completed",
      description: "Relevant details about this educational experience."
    }
  ],
  experience: [
    {
      position: "Job Title",
      company: "Company Name",
      period: "Employment Period (e.g., Jan 2020 - Present)",
      description: "Description of your responsibilities and achievements in this role."
    },
    {
      position: "Previous Position",
      company: "Previous Company",
      period: "Employment Period (e.g., Mar 2018 - Dec 2019)",
      description: "Key responsibilities and accomplishments from this role."
    }
  ],
  contact: {
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "City, Country",
    social: {
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername",
      twitter: "twitter.com/yourhandle"
    }
  }
};
