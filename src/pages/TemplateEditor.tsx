import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { templates, portfolioData, colorOptions } from "@/utils/templateData";
import { ArrowLeft, Save, FileText, Download, Plus, Minus, ZoomIn, ZoomOut, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic imports for PDF generation (unchanged from original)
let html2canvas: any;
let jsPDF: any;

const loadDependencies = async () => {
  try {
    const html2canvasModule = await import('html2canvas');
    const jsPDFModule = await import('jspdf');
    html2canvas = html2canvasModule.default;
    jsPDF = jsPDFModule.default;
    return true;
  } catch (error) {
    console.error("Error loading PDF dependencies:", error);
    return false;
  }
};

loadDependencies();

// Define data interfaces (unchanged from original)
interface ProjectData {
  title: string;
  description: string;
  role: string;
  technologies: string;
}

interface EducationData {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface ExperienceData {
  position: string;
  company: string;
  period: string;
  description: string;
}

interface ContactData {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
}

interface PortfolioFormData {
  name: string;
  introduction: string;
  bio: string;
  projects: ProjectData[];
  education: EducationData[];
  experience: ExperienceData[];
  contact: ContactData;
}

const TemplateEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const template = templates.find(t => t.id === id);
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  // State for form data with local storage persistence
  const [formData, setFormData] = useState<PortfolioFormData>(() => {
    const savedData = localStorage.getItem(`portfolioData-${id}`);
    return savedData ? JSON.parse(savedData) : {
      name: "John Doe",
      introduction: portfolioData.introduction,
      bio: portfolioData.bio,
      projects: portfolioData.projects.map(p => ({ ...p })),
      education: portfolioData.education.map(e => ({ ...e })),
      experience: portfolioData.experience.map(e => ({ ...e })),
      contact: {
        email: portfolioData.contact.email,
        phone: portfolioData.contact.phone,
        location: portfolioData.contact.location,
        linkedin: portfolioData.contact.social.linkedin,
        github: portfolioData.contact.social.github,
        twitter: portfolioData.contact.social.twitter
      }
    };
  });

  // State for collapsible sections
  const [collapsedSections, setCollapsedSections] = useState({
    personal: false,
    projects: false,
    education: false,
    experience: false,
    contact: false,
  });

  // State for preview zoom level
  const [zoomLevel, setZoomLevel] = useState(1);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`portfolioData-${id}`, JSON.stringify(formData));
  }, [formData, id]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Template not found</h2>
          <Button onClick={() => navigate("/templates")}>
            Back to Templates
          </Button>
        </div>
      </div>
    );
  }

  const color = colorOptions.find(c => c.id === template.color)?.value || "#000000";

  // Toggle collapse for a section
  const toggleCollapse = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle input changes (unchanged from original)
  const handleChange = (section: keyof PortfolioFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleNestedChange = (
    section: "projects" | "education" | "experience",
    index: number,
    field: string,
    value: string
  ) => {
    setFormData(prev => {
      const sectionData = [...prev[section]];
      sectionData[index] = {
        ...sectionData[index],
        [field]: value
      };
      return {
        ...prev,
        [section]: sectionData
      };
    });
  };

  const handleContactChange = (field: keyof ContactData, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  // Add new item to dynamic sections
  const addItem = (section: "projects" | "education" | "experience") => {
    setFormData(prev => ({
      ...prev,
      [section]: section === "projects"
        ? [...prev.projects, { title: "", description: "", role: "", technologies: "" }]
        : section === "education"
        ? [...prev.education, { degree: "", institution: "", year: "", description: "" }]
        : [...prev.experience, { position: "", company: "", period: "", description: "" }]
    }));
  };

  // Remove item from dynamic sections
  const removeItem = (section: "projects" | "education" | "experience", index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Export to PDF (unchanged from original, abbreviated for brevity)
  const exportToPdf = async () => {
    if (!portfolioRef.current) return;
    toast.info("Preparing PDF...", { duration: 2000 });
    try {
      if (!html2canvas || !jsPDF) await loadDependencies();
      if (!html2canvas || !jsPDF) throw new Error("Dependencies not loaded");
      const canvas = await html2canvas(portfolioRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${template.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF.");
    }
  };

  // Save form data as JSON file
  const saveFormData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "portfolio-data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("Form data saved as JSON!");
  };

  // Load form data from JSON file
  const loadFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFormData(json);
          toast.success("Form data loaded successfully!");
        } catch (error) {
          toast.error("Error loading form data.");
        }
      };
      reader.readAsText(file);
    }
  };

  const getTemplateStyle = () => {
    switch (template.category) {
      case "Professional": return "professional";
      case "Creative": return "creative";
      case "Minimal": return "minimal";
      case "Modern": return "modern";
      case "Academic": return "academic";
      case "Corporate": return "corporate";
      default: return "professional";
    }
  };

  const templateStyle = getTemplateStyle();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor controls with sticky positioning */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(`/templates/${id}/preview`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Preview
            </Button>
            <h1 className="text-xl font-semibold hidden md:block">
              Editing: {template.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={saveFormData}>
              <Save className="mr-2 h-4 w-4" />
              Save Data
            </Button>
            <Button asChild>
              <label className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Load Data
                <input type="file" accept=".json" className="hidden" onChange={loadFormData} />
              </label>
            </Button>
            <Button onClick={exportToPdf}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor Form with Scrollable Container */}
          <div className="w-full lg:w-1/3 max-h-[calc(100vh-80px)] overflow-y-auto space-y-6 pr-2">
            {/* Personal Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCollapse('personal')}>
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {collapsedSections.personal ? <ChevronDown /> : <ChevronUp />}
              </div>
              <AnimatePresence>
                {!collapsedSections.personal && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="introduction">Introduction</Label>
                      <Textarea
                        id="introduction"
                        value={formData.introduction}
                        onChange={(e) => handleChange("introduction", "introduction", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleChange("bio", "bio", e.target.value)}
                        rows={5}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects Section with Add/Remove */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCollapse('projects')}>
                <h2 className="text-xl font-semibold">Projects</h2>
                {collapsedSections.projects ? <ChevronDown /> : <ChevronUp />}
              </div>
              <AnimatePresence>
                {!collapsedSections.projects && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="space-y-6 overflow-hidden"
                  >
                    {formData.projects.map((project, index) => (
                      <div key={index} className="space-y-3 pb-4 border-b last:border-0 last:pb-0 relative">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Project {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeItem("projects", index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Label htmlFor={`project-title-${index}`}>Title</Label>
                          <Input
                            id={`project-title-${index}`}
                            value={project.title}
                            onChange={(e) => handleNestedChange("projects", index, "title", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`project-desc-${index}`}
                            value={project.description}
                            onChange={(e) => handleNestedChange("projects", index, "description", e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-role-${index}`}>Role</Label>
                          <Input
                            id={`project-role-${index}`}
                            value={project.role}
                            onChange={(e) => handleNestedChange("projects", index, "role", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-tech-${index}`}>Technologies</Label>
                          <Input
                            id={`project-tech-${index}`}
                            value={project.technologies}
                            onChange={(e) => handleNestedChange("projects", index, "technologies", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => addItem("projects")} className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Similar collapsible and dynamic sections for Education and Experience */}
            {/* Education Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCollapse('education')}>
                <h2 className="text-xl font-semibold">Education</h2>
                {collapsedSections.education ? <ChevronDown /> : <ChevronUp />}
              </div>
              <AnimatePresence>
                {!collapsedSections.education && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="space-y-6 overflow-hidden"
                  >
                    {formData.education.map((edu, index) => (
                      <div key={index} className="space-y-3 pb-4 border-b last:border-0 last:pb-0 relative">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Education {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeItem("education", index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        {/* Input fields similar to Projects */}
                        <div>
                          <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                          <Input
                            id={`edu-degree-${index}`}
                            value={edu.degree}
                            onChange={(e) => handleNestedChange("education", index, "degree", e.target.value)}
                          />
                        </div>
                        {/* Add other fields similarly */}
                        <div>
                          <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                          <Input
                            id={`edu-institution-${index}`}
                            value={edu.institution}
                            onChange={(e) => handleNestedChange("education", index, "institution", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edu-year-${index}`}>Year</Label>
                          <Input
                            id={`edu-year-${index}`}
                            value={edu.year}
                            onChange={(e) => handleNestedChange("education", index, "year", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edu-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`edu-desc-${index}`}
                            value={edu.description}
                            onChange={(e) => handleNestedChange("education", index, "description", e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => addItem("education")} className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCollapse('experience')}>
                <h2 className="text-xl font-semibold">Experience</h2>
                {collapsedSections.experience ? <ChevronDown /> : <ChevronUp />}
              </div>
              <AnimatePresence>
                {!collapsedSections.experience && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="space-y-6 overflow-hidden"
                  >
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="space-y-3 pb-4 border-b last:border-0 last:pb-0 relative">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Experience {index + 1}</h3>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeItem("experience", index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Label htmlFor={`exp-position-${index}`}>Position</Label>
                          <Input
                            id={`exp-position-${index}`}
                            value={exp.position}
                            onChange={(e) => handleNestedChange("experience", index, "position", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-company-${index}`}>Company</Label>
                          <Input
                            id={`exp-company-${index}`}
                            value={exp.company}
                            onChange={(e) => handleNestedChange("experience", index, "company", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-period-${index}`}>Period</Label>
                          <Input
                            id={`exp-period-${index}`}
                            value={exp.period}
                            onChange={(e) => handleNestedChange("experience", index, "period", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`exp-desc-${index}`}
                            value={exp.description}
                            onChange={(e) => handleNestedChange("experience", index, "description", e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => addItem("experience")} className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleCollapse('contact')}>
                <h2 className="text-xl font-semibold">Contact Information</h2>
                {collapsedSections.contact ? <ChevronDown /> : <ChevronUp />}
              </div>
              <AnimatePresence>
                {!collapsedSections.contact && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={formData.contact.email}
                        onChange={(e) => handleContactChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.contact.phone}
                        onChange={(e) => handleContactChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.contact.location}
                        onChange={(e) => handleContactChange("location", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.contact.linkedin}
                        onChange={(e) => handleContactChange("linkedin", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={formData.contact.github}
                        onChange={(e) => handleContactChange("github", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={formData.contact.twitter}
                        onChange={(e) => handleContactChange("twitter", e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Preview Section with Zoom Controls */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-center mb-4 sticky top-[72px] bg-white p-2 z-5">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.1))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div
                ref={portfolioRef}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
                className="bg-white shadow-md w-full"
              >
                {templateStyle === "minimal" && (
                  <div>
                    <header className="p-12 border-b">
                      <h1 className="text-4xl font-light mb-4">{formData.name}</h1>
                      <p className="text-xl text-gray-600">{formData.introduction}</p>
                    </header>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-2xl font-light mb-6">About Me</h2>
                      <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-2xl font-light mb-6">Projects</h2>
                      <div className="space-y-8">
                        {formData.projects.map((project, index) => (
                          <div key={index} className="border-l-4" style={{ borderColor: color }}>
                            <div className="pl-6">
                              <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                              <p className="text-gray-700 mb-2">{project.description}</p>
                              <p className="text-gray-600 mb-1"><span className="font-medium">Role:</span> {project.role}</p>
                              <p className="text-gray-600"><span className="font-medium">Technologies:</span> {project.technologies}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-b">
                      <div>
                        <h2 className="text-2xl font-light mb-6">Education</h2>
                        <div className="space-y-4">
                          {formData.education.map((edu, index) => (
                            <div key={index}>
                              <h3 className="text-lg font-medium">{edu.degree}</h3>
                              <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                              <p className="text-gray-600">{edu.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-light mb-6">Experience</h2>
                        <div className="space-y-4">
                          {formData.experience.map((exp, index) => (
                            <div key={index}>
                              <h3 className="text-lg font-medium">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company}, {exp.period}</p>
                              <p className="text-gray-600">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                    
                    <section className="p-12">
                      <h2 className="text-2xl font-light mb-6">Contact</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-700">{formData.contact.email}</p>
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-700">{formData.contact.phone}</p>
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-700">{formData.contact.location}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-medium">Social</p>
                        <div className="flex gap-4 mt-2">
                          <a href="#" className="text-gray-700 hover:text-black">LinkedIn</a>
                          <a href="#" className="text-gray-700 hover:text-black">GitHub</a>
                          <a href="#" className="text-gray-700 hover:text-black">Twitter</a>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                
                {/* Other template styles remain unchanged for brevity */}
                {templateStyle === "creative" && (
                  <div>
                    <header style={{ backgroundColor: color }} className="p-12 text-white">
                      <h1 className="text-5xl font-bold mb-4">{formData.name}</h1>
                      <p className="text-xl">{formData.introduction}</p>
                    </header>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>About Me</h2>
                      <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Projects</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {formData.projects.map((project, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                            <p className="text-gray-700 mb-4">{project.description}</p>
                            <p className="text-gray-600 mb-2"><span className="font-bold">Role:</span> {project.role}</p>
                            <p className="text-gray-600"><span className="font-bold">Technologies:</span> {project.technologies}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <section className="p-12 border-r border-b">
                        <h2 className="text-3xl font-bold mb-6" style={{ color }}>Education</h2>
                        <div className="space-y-6">
                          {formData.education.map((edu, index) => (
                            <div key={index}>
                              <h3 className="text-lg font-bold">{edu.degree}</h3>
                              <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                              <p className="text-gray-600 mt-1">{edu.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                      
                      <section className="p-12 border-b">
                        <h2 className="text-3xl font-bold mb-6" style={{ color }}>Experience</h2>
                        <div className="space-y-6">
                          {formData.experience.map((exp, index) => (
                            <div key={index}>
                              <h3 className="text-lg font-bold">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company}, {exp.period}</p>
                              <p className="text-gray-600 mt-1">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                    
                    <section className="p-12" style={{ backgroundColor: color + '15' }}>
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Contact</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="font-bold mb-2">Email</p>
                          <p className="text-gray-700">{formData.contact.email}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="font-bold mb-2">Phone</p>
                          <p className="text-gray-700">{formData.contact.phone}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="font-bold mb-2">Location</p>
                          <p className="text-gray-700">{formData.contact.location}</p>
                        </div>
                      </div>
                      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                        <p className="font-bold mb-2">Social</p>
                        <div className="flex gap-4">
                          <a href="#" className="text-gray-700 hover:text-black font-medium">LinkedIn</a>
                          <a href="#" className="text-gray-700 hover:text-black font-medium">GitHub</a>
                          <a href="#" className="text-gray-700 hover:text-black font-medium">Twitter</a>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                
                {templateStyle === "professional" && (
                  <div>
                    <header className="p-12 border-b-4" style={{ borderColor: color }}>
                      <h1 className="text-4xl font-bold mb-3">{formData.name}</h1>
                      <p className="text-xl text-gray-600">{formData.introduction}</p>
                    </header>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-2 p-12 border-r">
                        <section className="mb-12">
                          <h2 className="text-2xl font-bold mb-6" style={{ color }}>About Me</h2>
                          <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                        </section>
                        
                        <section>
                          <h2 className="text-2xl font-bold mb-6" style={{ color }}>Projects</h2>
                          <div className="space-y-8">
                            {formData.projects.map((project, index) => (
                              <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-700 mb-3">{project.description}</p>
                                <p className="text-gray-600 mb-1"><span className="font-semibold">Role:</span> {project.role}</p>
                                <p className="text-gray-600"><span className="font-semibold">Technologies:</span> {project.technologies}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                      
                      <div className="p-12 bg-gray-50">
                        <section className="mb-12">
                          <h2 className="text-2xl font-bold mb-6" style={{ color }}>Education</h2>
                          <div className="space-y-6">
                            {formData.education.map((edu, index) => (
                              <div key={index}>
                                <h3 className="text-lg font-bold">{edu.degree}</h3>
                                <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                                <p className="text-gray-600 mt-1">{edu.description}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                        
                        <section className="mb-12">
                          <h2 className="text-2xl font-bold mb-6" style={{ color }}>Experience</h2>
                          <div className="space-y-6">
                            {formData.experience.map((exp, index) => (
                              <div key={index}>
                                <h3 className="text-lg font-bold">{exp.position}</h3>
                                <p className="text-gray-700">{exp.company}, {exp.period}</p>
                                <p className="text-gray-600 mt-1">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                        
                        <section>
                          <h2 className="text-2xl font-bold mb-6" style={{ color }}>Contact</h2>
                          <div className="space-y-4">
                            <div>
                              <p className="font-semibold">Email</p>
                              <p className="text-gray-700">{formData.contact.email}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Phone</p>
                              <p className="text-gray-700">{formData.contact.phone}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Location</p>
                              <p className="text-gray-700">{formData.contact.location}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="font-semibold">Social</p>
                            <div className="flex flex-col gap-2 mt-2">
                              <a href={formData.contact.linkedin} className="text-gray-700 hover:text-black">LinkedIn</a>
                              <a href={formData.contact.github} className="text-gray-700 hover:text-black">GitHub</a>
                              <a href={formData.contact.twitter} className="text-gray-700 hover:text-black">Twitter</a>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Add other template styles like Modern, Academic, Corporate if needed */}
                {templateStyle === "modern" && (
                  <div>
                    <header className="p-10 bg-gray-900 text-white">
                      <h1 className="text-5xl font-bold mb-3">{formData.name}</h1>
                      <p className="text-lg opacity-80">{formData.introduction}</p>
                    </header>
                    
                    <section className="p-10 bg-gray-50">
                      <h2 className="text-3xl font-semibold mb-6" style={{ color }}>About Me</h2>
                      <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                    </section>
                    
                    <section className="p-10">
                      <h2 className="text-3xl font-semibold mb-6" style={{ color }}>Projects</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formData.projects.map((project, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                            <div className="p-6">
                              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                              <p className="text-gray-700 mb-4">{project.description}</p>
                              <p className="text-gray-600 mb-2"><span className="font-semibold">Role:</span> {project.role}</p>
                              <p className="text-gray-600"><span className="font-semibold">Technologies:</span> {project.technologies}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-10 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-3xl font-semibold mb-6" style={{ color }}>Education</h2>
                        <div className="space-y-6">
                          {formData.education.map((edu, index) => (
                            <div key={index}>
                              <h3 className="text-lg font-bold">{edu.degree}</h3>
                              <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                              <p className="text-gray-600 mt-1">{edu.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-semibold mb-6" style={{ color }}>Experience</h2>
                        <div className="space-y-6">
                          {formData.experience.map((exp, index) => (
                            <div key={index}>
                              <h3 className="text-lg font-bold">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company}, {exp.period}</p>
                              <p className="text-gray-600 mt-1">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                    
                    <section className="p-10">
                      <h2 className="text-3xl font-semibold mb-6" style={{ color }}>Contact</h2>
                      <div className="flex flex-wrap gap-6">
                        <div className="flex-1 min-w-[200px]">
                          <p className="font-semibold">Email</p>
                          <p className="text-gray-700">{formData.contact.email}</p>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <p className="font-semibold">Phone</p>
                          <p className="text-gray-700">{formData.contact.phone}</p>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <p className="font-semibold">Location</p>
                          <p className="text-gray-700">{formData.contact.location}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <p className="font-semibold">Social</p>
                        <div className="flex gap-6 mt-2">
                          <a href={formData.contact.linkedin} className="text-gray-700 hover:text-black">LinkedIn</a>
                          <a href={formData.contact.github} className="text-gray-700 hover:text-black">GitHub</a>
                          <a href={formData.contact.twitter} className="text-gray-700 hover:text-black">Twitter</a>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                
                {templateStyle === "academic" && (
                  <div>
                    <header className="p-12 border-b">
                      <h1 className="text-4xl font-serif font-bold mb-4">{formData.name}</h1>
                      <p className="text-xl text-gray-600">{formData.introduction}</p>
                    </header>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-2xl font-serif font-bold mb-6">Profile</h2>
                      <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-2xl font-serif font-bold mb-6">Education</h2>
                      <div className="space-y-8">
                        {formData.education.map((edu, index) => (
                          <div key={index}>
                            <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                            <p className="text-gray-700 mb-1">{edu.institution}, {edu.year}</p>
                            <p className="text-gray-600">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-2xl font-serif font-bold mb-6">Experience</h2>
                      <div className="space-y-8">
                        {formData.experience.map((exp, index) => (
                          <div key={index}>
                            <h3 className="text-xl font-semibold mb-2">{exp.position}</h3>
                            <p className="text-gray-700 mb-1">{exp.company}, {exp.period}</p>
                            <p className="text-gray-600">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-2xl font-serif font-bold mb-6">Projects & Research</h2>
                      <div className="space-y-8">
                        {formData.projects.map((project, index) => (
                          <div key={index}>
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-700 mb-2">{project.description}</p>
                            <p className="text-gray-600 mb-1"><span className="font-medium">Role:</span> {project.role}</p>
                            <p className="text-gray-600"><span className="font-medium">Technologies:</span> {project.technologies}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12">
                      <h2 className="text-2xl font-serif font-bold mb-6">Contact</h2>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium">Email: <span className="text-gray-700">{formData.contact.email}</span></p>
                        </div>
                        <div>
                          <p className="font-medium">Phone: <span className="text-gray-700">{formData.contact.phone}</span></p>
                        </div>
                        <div>
                          <p className="font-medium">Location: <span className="text-gray-700">{formData.contact.location}</span></p>
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn: <a href={formData.contact.linkedin} className="text-gray-700 hover:text-black">{formData.contact.linkedin}</a></p>
                        </div>
                        <div>
                          <p className="font-medium">GitHub: <a href={formData.contact.github} className="text-gray-700 hover:text-black">{formData.contact.github}</a></p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                
                {templateStyle === "corporate" && (
                  <div>
                    <header className="p-12 bg-blue-900 text-white">
                      <h1 className="text-5xl font-bold mb-4">{formData.name}</h1>
                      <p className="text-xl">{formData.introduction}</p>
                    </header>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Professional Summary</h2>
                      <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Professional Experience</h2>
                      <div className="space-y-8">
                        {formData.experience.map((exp, index) => (
                          <div key={index} className="border-l-4 pl-6" style={{ borderColor: color }}>
                            <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                            <p className="text-gray-700 mb-1">{exp.company}, {exp.period}</p>
                            <p className="text-gray-600">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Projects</h2>
                      <div className="space-y-8">
                        {formData.projects.map((project, index) => (
                          <div key={index} className="border-l-4 pl-6" style={{ borderColor: color }}>
                            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                            <p className="text-gray-700 mb-2">{project.description}</p>
                            <p className="text-gray-600 mb-1"><span className="font-medium">Role:</span> {project.role}</p>
                            <p className="text-gray-600"><span className="font-medium">Technologies:</span> {project.technologies}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12 border-b">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Education</h2>
                      <div className="space-y-6">
                        {formData.education.map((edu, index) => (
                          <div key={index}>
                            <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                            <p className="text-gray-700 mb-1">{edu.institution}, {edu.year}</p>
                            <p className="text-gray-600">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    <section className="p-12">
                      <h2 className="text-3xl font-bold mb-6" style={{ color }}>Contact Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-700">{formData.contact.email}</p>
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-700">{formData.contact.phone}</p>
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-700">{formData.contact.location}</p>
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <a href={formData.contact.linkedin} className="text-gray-700 hover:text-black">{formData.contact.linkedin}</a>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
