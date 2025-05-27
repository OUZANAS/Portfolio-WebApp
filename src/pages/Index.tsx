import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight * 100}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4" data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Free online<br />portfolio maker.
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Create a professional portfolio in minutes without any design skills.
              </p>
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row items-start gap-2">
                  <Link to="/templates">
                    <Button className="rounded-full px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                      create now
                    </Button>
                  </Link>
                  <span className="text-left text-xs font-thin text-zinc-600 my-[9px] mx-[3px]">
                    Free to use<br />No credit card required
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1" data-aos="fade-left">
              <div className="border rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Portfolio example"
                  className="w-full aspect-video object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 border-b">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12" data-aos="fade-up">
            How to make a digital portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "Step 1", text: "Choose from our professionally designed templates" },
              { step: "Step 2", text: "Customize it with your personal information and projects" },
              { step: "Step 3", text: "Download as PDF or share your portfolio online" }
            ].map((item, index) => (
              <div
                key={item.step}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="border rounded-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
              >
                <div className="font-bold text-xl mb-3">{item.step}</div>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Features */}
      <section className="py-16 md:py-20 border-b">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why use Portfolio Express?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Design</h3>
              <p className="text-muted-foreground">Templates designed by professionals to make your portfolio stand out</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
              <p className="text-muted-foreground">Simple editing interface to personalize your portfolio</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline points="14 2 14 8 20 8" /><path d="M9 18h1" /><path d="M13 18h1" /><path d="M9 14.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3Z" /><path d="M12 14.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3Z" /><path d="M16 14.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3Z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Export</h3>
              <p className="text-muted-foreground">Download your portfolio as a PDF to share with recruiters</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 4.24 4.24" /><path d="m14.83 9.17 4.24-4.24" /><path d="m14.83 14.83 4.24 4.24" /><path d="m9.17 14.83-4.24 4.24" /><circle cx="12" cy="12" r="4" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Categories</h3>
              <p className="text-muted-foreground">Templates for different professions and industries</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 17h6" /><path d="m9 11 3 3 3-3" /><path d="M12 14V7" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free to Use</h3>
              <p className="text-muted-foreground">Create professional portfolios without any cost</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5M4 15a6 6 0 0 0 8 0" /><path d="M14 16.5c.8-1 1.5-1.7 2.5-2.5" /><path d="M4 13a6 6 0 0 0 6 0" /><path d="M10 9.9a5 5 0 0 1 8.3 5.7" /><path d="M11.2 8.5a5 5 0 0 1 2.8.9" /><path d="M8 14a6 6 0 0 0 3-5.5" /><path d="M15 4c-.5 1.5-.5 3 0 4.5M9 4c.5 1.5.5 3 0 4.5" /><line x1="12" x2="12" y1="20" y2="2" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-muted-foreground">All templates look great on any device</p>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/templates">
              <Button className="group">
                Browse Templates
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Project Credits */}
      <section className="py-12 md:py-16 bg-black text-white">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6">
            {[
              { label: "Module", value: "Technologies web" },
              { label: "Teacher", value: "Ilham Ait Lbachir" },
              { label: "Students", value: "Anas Ouzine & Mohamed Amsguin" },
              { label: "Project Type", value: "Le projet de fin de module." }
            ].map((item, index) => (
              <div
                key={item.label}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="transform hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-sm font-semibold text-sky-400 tracking-wider uppercase mb-1">
                  {item.label}
                </p>
                <p className="text-xl md:text-2xl text-gray-100">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
