
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { templates, portfolioData, colorOptions } from "@/utils/templateData";
import { ArrowLeft, Download, Edit } from "lucide-react";

const TemplatePreview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const template = templates.find(t => t.id === id);
  
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
  
  // Template style based on category
  const getTemplateStyle = () => {
    switch (template.category) {
      case "Professional":
        return "professional";
      case "Creative":
        return "creative";
      case "Minimal":
        return "minimal";
      case "Modern":
        return "modern";
      case "Academic":
        return "academic";
      case "Corporate":
        return "corporate";
      default:
        return "professional";
    }
  };
  
  const templateStyle = getTemplateStyle();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview controls */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/templates")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
            <h1 className="text-xl font-semibold hidden md:block">
              Previewing: {template.name}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/templates/${id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Use this Template
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Template Preview */}
      <div className="container px-4 py-8">
        {templateStyle === "minimal" && (
          <div className="bg-white shadow-md max-w-4xl mx-auto">
            <header className="p-12 border-b">
              <h1 className="text-4xl font-light mb-4">John Doe</h1>
              <p className="text-xl text-gray-600">{portfolioData.introduction}</p>
            </header>
            
            <section className="p-12 border-b">
              <h2 className="text-2xl font-light mb-6">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{portfolioData.bio}</p>
            </section>
            
            <section className="p-12 border-b">
              <h2 className="text-2xl font-light mb-6">Projects</h2>
              <div className="space-y-8">
                {portfolioData.projects.map((project, index) => (
                  <div key={index} className="border-l-4" style={{borderColor: color}}>
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
                  {portfolioData.education.map((edu, index) => (
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
                  {portfolioData.experience.map((exp, index) => (
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
                  <p className="text-gray-700">{portfolioData.contact.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-700">{portfolioData.contact.phone}</p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-700">{portfolioData.contact.location}</p>
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
        
        {templateStyle === "creative" && (
          <div className="bg-white shadow-md max-w-4xl mx-auto">
            <header style={{backgroundColor: color}} className="p-12 text-white">
              <h1 className="text-5xl font-bold mb-4">John Doe</h1>
              <p className="text-xl">{portfolioData.introduction}</p>
            </header>
            
            <section className="p-12 border-b">
              <h2 className="text-3xl font-bold mb-6" style={{color}}>About Me</h2>
              <p className="text-gray-700 leading-relaxed">{portfolioData.bio}</p>
            </section>
            
            <section className="p-12 border-b">
              <h2 className="text-3xl font-bold mb-6" style={{color}}>Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project, index) => (
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
                <h2 className="text-3xl font-bold mb-6" style={{color}}>Education</h2>
                <div className="space-y-6">
                  {portfolioData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                      <p className="text-gray-600 mt-1">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className="p-12 border-b">
                <h2 className="text-3xl font-bold mb-6" style={{color}}>Experience</h2>
                <div className="space-y-6">
                  {portfolioData.experience.map((exp, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}, {exp.period}</p>
                      <p className="text-gray-600 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            <section className="p-12" style={{backgroundColor: color + '15'}}>
              <h2 className="text-3xl font-bold mb-6" style={{color}}>Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-bold mb-2">Email</p>
                  <p className="text-gray-700">{portfolioData.contact.email}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-bold mb-2">Phone</p>
                  <p className="text-gray-700">{portfolioData.contact.phone}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="font-bold mb-2">Location</p>
                  <p className="text-gray-700">{portfolioData.contact.location}</p>
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
          <div className="bg-white shadow-md max-w-4xl mx-auto">
            <header className="p-12 border-b-4" style={{borderColor: color}}>
              <h1 className="text-4xl font-bold mb-3">John Doe</h1>
              <p className="text-xl text-gray-600">{portfolioData.introduction}</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2 p-12 border-r">
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6" style={{color}}>About Me</h2>
                  <p className="text-gray-700 leading-relaxed">{portfolioData.bio}</p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-6" style={{color}}>Projects</h2>
                  <div className="space-y-8">
                    {portfolioData.projects.map((project, index) => (
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
                  <h2 className="text-2xl font-bold mb-6" style={{color}}>Education</h2>
                  <div className="space-y-6">
                    {portfolioData.education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-bold">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                        <p className="text-gray-600 mt-1">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="mb-12">
                  <h2 className="text-2xl font-bold mb-6" style={{color}}>Experience</h2>
                  <div className="space-y-6">
                    {portfolioData.experience.map((exp, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-bold">{exp.position}</h3>
                        <p className="text-gray-700">{exp.company}, {exp.period}</p>
                        <p className="text-gray-600 mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold mb-6" style={{color}}>Contact</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold mb-1">Email</p>
                      <p className="text-gray-700">{portfolioData.contact.email}</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Phone</p>
                      <p className="text-gray-700">{portfolioData.contact.phone}</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Location</p>
                      <p className="text-gray-700">{portfolioData.contact.location}</p>
                    </div>
                    <div>
                      <p className="font-bold mb-1">Social</p>
                      <div className="flex gap-4 mt-1">
                        <a href="#" className="text-gray-700 hover:text-black">LinkedIn</a>
                        <a href="#" className="text-gray-700 hover:text-black">GitHub</a>
                        <a href="#" className="text-gray-700 hover:text-black">Twitter</a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
        
        {/* Add more template styles based on categories */}
        {["modern", "academic", "corporate"].includes(templateStyle) && (
          // Default template for other categories
          <div className="bg-white shadow-md max-w-4xl mx-auto">
            <header className="p-12 bg-gray-900 text-white">
              <h1 className="text-4xl font-bold mb-4">John Doe</h1>
              <p className="text-xl">{portfolioData.introduction}</p>
            </header>
            
            <section className="p-12 border-b">
              <h2 className="text-3xl font-bold mb-6" style={{color}}>About Me</h2>
              <p className="text-gray-700 leading-relaxed">{portfolioData.bio}</p>
            </section>
            
            <section className="p-12 border-b">
              <h2 className="text-3xl font-bold mb-6" style={{color}}>Projects</h2>
              <div className="space-y-8">
                {portfolioData.projects.map((project, index) => (
                  <div key={index} className="border-l-4 pl-6" style={{borderColor: color}}>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    <p className="text-gray-600 mb-1"><span className="font-bold">Role:</span> {project.role}</p>
                    <p className="text-gray-600"><span className="font-bold">Technologies:</span> {project.technologies}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <section className="p-12 border-r border-b">
                <h2 className="text-3xl font-bold mb-6" style={{color}}>Education</h2>
                <div className="space-y-6">
                  {portfolioData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}, {edu.year}</p>
                      <p className="text-gray-600 mt-1">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
              
              <section className="p-12 border-b">
                <h2 className="text-3xl font-bold mb-6" style={{color}}>Experience</h2>
                <div className="space-y-6">
                  {portfolioData.experience.map((exp, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}, {exp.period}</p>
                      <p className="text-gray-600 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            <section className="p-12">
              <h2 className="text-3xl font-bold mb-6" style={{color}}>Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-bold mb-1">Email</p>
                  <p className="text-gray-700">{portfolioData.contact.email}</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Phone</p>
                  <p className="text-gray-700">{portfolioData.contact.phone}</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Location</p>
                  <p className="text-gray-700">{portfolioData.contact.location}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold mb-1">Social</p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-700 hover:text-black">LinkedIn</a>
                  <a href="#" className="text-gray-700 hover:text-black">GitHub</a>
                  <a href="#" className="text-gray-700 hover:text-black">Twitter</a>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
