import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  Copy, 
  Check,
  MapPin,
  FileText,
  Code2,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const glitterRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('projects.navadeep@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Glitter effect
  useEffect(() => {
    if (!glitterRef.current) return;
    
    const container = glitterRef.current;
    const particles: HTMLDivElement[] = [];
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'glitter-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      particle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      container.appendChild(particle);
      particles.push(particle);
      
      gsap.to(particle, {
        y: `-=${Math.random() * 100 + 50}`,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 3
      });
    }
    
    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.3 });
      
      heroTl.fromTo('.hero-bg', 
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
      
      heroTl.fromTo('.hero-headline span',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.6'
      );
      
      heroTl.fromTo('.hero-card',
        { x: 100, opacity: 0, rotate: 2 },
        { x: 0, opacity: 1, rotate: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );
      
      heroTl.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
      
      heroTl.fromTo('.hero-microcopy',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
      
      heroTl.fromTo('.scroll-cue',
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1'
      );

      // Hero scroll animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-headline', { 
              x: -18 * exitProgress + 'vw', 
              opacity: 1 - exitProgress * 0.75 
            });
            gsap.set('.hero-card', { 
              x: 10 * exitProgress + 'vw', 
              y: -6 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.75 
            });
            gsap.set('.hero-cta', { 
              y: 10 * exitProgress + 'vh', 
              opacity: 1 - exitProgress * 0.8 
            });
            gsap.set('.hero-bg', { 
              scale: 1 + 0.06 * exitProgress,
              y: -6 * exitProgress + 'vh'
            });
          }
        },
        onLeaveBack: () => {
          gsap.set('.hero-headline', { x: 0, opacity: 1 });
          gsap.set('.hero-card', { x: 0, y: 0, opacity: 1 });
          gsap.set('.hero-cta', { y: 0, opacity: 1 });
          gsap.set('.hero-bg', { scale: 1, y: 0 });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Work section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-title',
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: workRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: 100, opacity: 0, rotate: 1 },
          {
            x: 0, opacity: 1, rotate: 0, duration: 0.8,
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.4
            }
          }
        );
      });
    }, workRef);

    return () => ctx.revert();
  }, []);

  // About section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image',
        { x: -100, opacity: 0, scale: 0.98 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.4
          }
        }
      );

      gsap.fromTo('.about-content',
        { x: 100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 70%',
            end: 'top 35%',
            scrub: 0.4
          }
        }
      );

      gsap.fromTo('.quote-mark-anim',
        { y: -20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // Process section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-heading',
        { y: -50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.process-card-anim').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0, rotate: -1 },
          {
            y: 0, opacity: 1, rotate: 0, duration: 0.8,
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 0.4
            }
          }
        );
      });
    }, processRef);

    return () => ctx.revert();
  }, []);

  // Metrics section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.metric-left',
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4
          }
        }
      );

      gsap.utils.toArray<HTMLElement>('.metric-right-item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: 80, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.4
            }
          }
        );
      });

      gsap.fromTo('.divider-anim',
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1,
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.4
          }
        }
      );
    }, metricsRef);

    return () => ctx.revert();
  }, []);

  // Testimonials section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-quote',
        { x: -100, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.4
          }
        }
      );

      gsap.fromTo('.testimonial-image',
        { x: 100, opacity: 0, scale: 1.02 },
        {
          x: 0, opacity: 1, scale: 1, duration: 1,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 70%',
            end: 'top 35%',
            scrub: 0.4
          }
        }
      );

      gsap.fromTo('.attribution-bar',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.8,
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 55%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, testimonialsRef);

    return () => ctx.revert();
  }, []);

  // Contact section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4
          }
        }
      );

      gsap.fromTo('.contact-right',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4
          }
        }
      );

      gsap.fromTo('.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: '.footer-bottom',
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'Report Generator',
      description: 'Turn data into polished PDF reports in seconds. A powerful tool for generating professional reports from structured data.',
      tags: ['React', 'Node.js', 'PDF'],
      image: '/images/report-generator.jpg',
      github: 'https://github.com/projectsnavadeep/reportgenerator.in',
      live: 'https://reportgenerator.in'
    },
    {
      title: 'Digital Time Capsule',
      description: 'Capture moments, lock them in time, share the key. An emotional platform for preserving memories digitally.',
      tags: ['Firebase', 'React', 'UX'],
      image: '/images/time-capsule.jpg',
      github: 'https://github.com/deepznavzz/timecapsule',
      live: null
    },
    {
      title: 'Resume Builder',
      description: 'A minimal, export-ready resume studio. Create professional resumes with beautiful templates and export to PDF.',
      tags: ['React', 'PWA', 'PDF'],
      image: '/images/resume-builder.jpg',
      github: 'https://github.com/projectsnavadeep/professional-resume-builder',
      live: 'https://projectsnavadeep.github.io/professional-resume-builder/'
    }
  ];

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Glitter particles */}
      <div ref={glitterRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-[6vw] py-6 flex justify-between items-center bg-gradient-to-b from-[#0B0C0F] to-transparent">
        <div className="font-mono text-xs tracking-[0.18em] text-[#F2F4F8]">
          NAVADEEP
        </div>
        <div className="hidden md:flex gap-8">
          {[
            { label: 'Work', ref: workRef },
            { label: 'About', ref: aboutRef },
            { label: 'Process', ref: processRef },
            { label: 'Contact', ref: contactRef }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.ref)}
              className="font-mono text-xs tracking-[0.18em] text-[#A7AFBA] hover:text-[#C8A45C] transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 hero-bg">
          <div className="absolute inset-0 image-gold-tint">
            <img 
              src="/images/hero-bg.jpg" 
              alt="Hero background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0F] via-[#0B0C0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-transparent to-[#0B0C0F]/50" />
        </div>
        
        <div className="section-inner flex flex-col justify-center">
          {/* Headline */}
          <div className="hero-headline relative z-20 max-w-[62vw] mt-[8vh]">
            <h1 className="text-[clamp(36px,5.2vw,78px)] font-bold uppercase tracking-[0.08em] leading-[0.95] text-[#F2F4F8]">
              <span className="block">Creative</span>
              <span className="block text-gradient">Developer</span>
            </h1>
          </div>
          
          {/* CTA Row */}
          <div className="hero-cta flex flex-wrap gap-4 mt-8 relative z-20">
            <button 
              onClick={() => scrollToSection(workRef)}
              className="btn-primary flex items-center gap-2"
            >
              <Sparkles size={16} />
              Explore Work
            </button>
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="btn-secondary"
            >
              Start a Project
            </button>
          </div>
          
          {/* Right Card */}
          <div className="hero-card absolute right-[6vw] top-[18vh] w-[90vw] md:w-[26vw] card-glass rounded-xl p-6 z-20">
            <p className="text-[#A7AFBA] text-sm leading-relaxed">
              I craft websites, interactions, and systems—clean, fast, and memorable.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-[#A7AFBA]">Available for work</span>
            </div>
          </div>
          
          {/* Bottom Microcopy */}
          <div className="hero-microcopy absolute left-[6vw] bottom-[8vh] max-w-[34vw] z-20 hidden md:block">
            <p className="text-xs font-mono text-[#A7AFBA] leading-relaxed">
              Available for freelance & collaborations. Based in India, working worldwide.
            </p>
          </div>
          
          {/* Scroll Cue */}
          <div className="scroll-cue absolute right-[6vw] bottom-[8vh] flex flex-col items-center gap-2 z-20">
            <span className="text-xs font-mono text-[#A7AFBA]">Scroll</span>
            <ChevronDown size={20} className="text-[#C8A45C] scroll-indicator" />
          </div>
        </div>
      </section>

      {/* Section 2: Selected Work */}
      <section ref={workRef} className="relative w-full min-h-screen py-24 z-20 bg-[#0B0C0F]">
        <div className="px-[6vw]">
          <div className="work-title mb-16">
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Selected Work</span>
            <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
              A few builds I'm proud of.
            </h2>
            <p className="text-[#A7AFBA] mt-4 max-w-xl">
              Products, landing pages, and tools—designed for clarity and engineered for performance.
            </p>
          </div>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="project-card card-glass rounded-xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 image-gold-tint">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#F2F4F8] mb-2">{project.title}</h3>
                      <p className="text-[#A7AFBA] text-sm leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[#A7AFBA] hover:text-[#C8A45C] transition-colors"
                        >
                          <ExternalLink size={16} />
                          Live Site
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: About */}
      <section ref={aboutRef} className="relative w-full min-h-screen py-24 z-30 bg-[#0B0C0F]">
        <div className="px-[6vw]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="about-image image-gold-tint rounded-xl overflow-hidden h-[50vh] lg:h-[70vh]">
              <img 
                src="/images/about-portrait.jpg" 
                alt="About portrait"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="about-content">
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">About</span>
              <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                I build with intention.
              </h2>
              
              <div className="quote-mark-anim quote-mark mt-6">"</div>
              
              <div className="space-y-4 mt-4">
                <p className="text-[#A7AFBA] leading-relaxed">
                  I'm Navadeep Sripathi—an engineer who cares about the details. I like systems that scale and interfaces that feel obvious.
                </p>
                <p className="text-[#A7AFBA] leading-relaxed">
                  My work sits at the intersection of design and engineering: clean UI, robust code, and performance that holds up under load.
                </p>
                <p className="text-[#A7AFBA] leading-relaxed">
                  When I'm not shipping, I'm learning—new tools, better patterns, and ways to make the web feel lighter.
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-[rgba(200,164,92,0.08)] rounded-lg border border-[rgba(200,164,92,0.2)]">
                <div className="flex items-center gap-3">
                  <Code2 size={20} className="text-[#C8A45C]" />
                  <div>
                    <p className="text-sm text-[#F2F4F8]">B.Tech 3rd Year</p>
                    <p className="text-xs text-[#A7AFBA]">KITS (S), Singapuram, Karimnagar</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://www.linkedin.com/in/navadeep-sripathi-924b48351/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 link-gold text-sm"
              >
                Read more on LinkedIn
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Process */}
      <section ref={processRef} className="relative w-full min-h-screen py-24 z-40 bg-[#0B0C0F]">
        <div className="px-[6vw]">
          <div className="process-heading mb-16">
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Process</span>
            <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
              How I turn ideas into shipped work.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                title: 'Discover',
                description: 'Define the problem, the user, and the constraints. No guessing.',
                icon: <Globe size={24} />
              },
              {
                number: '02',
                title: 'Design',
                description: 'Wireframes to high-fidelity. Fast iteration, clear feedback loops.',
                icon: <Zap size={24} />
              },
              {
                number: '03',
                title: 'Deliver',
                description: 'Clean codebase, real performance, and a smooth handoff.',
                icon: <Code2 size={24} />
              }
            ].map((step, index) => (
              <div key={index} className="process-card-anim process-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-2xl text-[#C8A45C]">{step.number}</span>
                  <div className="text-[#C8A45C]">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-[#F2F4F8] mb-2">{step.title}</h3>
                <p className="text-[#A7AFBA] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Metrics */}
      <section ref={metricsRef} className="relative w-full min-h-screen py-24 z-50 bg-[#0B0C0F]">
        <div className="px-[6vw]">
          <div className="mb-16">
            <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Impact</span>
            <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
              Numbers that matter.
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
            <div className="lg:w-1/2 metric-left">
              <div className="metric-number">12+</div>
              <p className="text-[#A7AFBA] mt-2">Projects shipped</p>
            </div>
            
            <div className="hidden lg:block divider-anim divider-line origin-top mx-8" />
            
            <div className="lg:w-1/2 space-y-8">
              {[
                { value: '99.9%', label: 'Uptime target' },
                { value: '<1.2s', label: 'Core Web Vitals (LCP)' },
                { value: '100%', label: 'Client communication' }
              ].map((metric, index) => (
                <div key={index} className="metric-right-item">
                  <div className="metric-number text-3xl md:text-4xl">{metric.value}</div>
                  <p className="text-[#A7AFBA] mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section ref={testimonialsRef} className="relative w-full min-h-screen py-24 z-[60] bg-[#0B0C0F]">
        <div className="px-[6vw]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="testimonial-quote">
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Testimonials</span>
              
              <div className="quote-mark mt-6">"</div>
              
              <blockquote className="text-xl md:text-2xl text-[#F2F4F8] leading-relaxed mt-4">
                Navadeep brings calm clarity to complex work. Every delivery was on time, every detail considered.
              </blockquote>
              
              <div className="attribution-bar w-10 h-[3px] bg-[#C8A45C] mt-6 origin-left" />
              
              <p className="text-sm text-[#A7AFBA] mt-4">— Collaborator, Product Team</p>
              
              <p className="text-xs text-[#A7AFBA] mt-8 flex items-center gap-2">
                <Sparkles size={14} className="text-[#C8A45C]" />
                Featured on product showcases and dev communities.
              </p>
            </div>
            
            <div className="testimonial-image image-gold-tint rounded-xl overflow-hidden h-[40vh] lg:h-[60vh]">
              <img 
                src="/images/testimonials-photo.jpg" 
                alt="Testimonials"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Contact / Footer */}
      <section ref={contactRef} className="relative w-full min-h-screen py-24 z-[70] bg-[#14171C]">
        <div className="px-[6vw]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="contact-left">
              <span className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase">Contact</span>
              <h2 className="text-[clamp(28px,3.6vw,48px)] font-bold uppercase tracking-[0.06em] text-[#F2F4F8] mt-4">
                Let's build something great.
              </h2>
              <p className="text-[#A7AFBA] mt-4 max-w-md">
                Tell me what you're making. I'll reply within 1–2 business days.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a 
                  href="mailto:projects.navadeep@gmail.com"
                  className="btn-primary flex items-center gap-2"
                >
                  <Mail size={16} />
                  Email Me
                </a>
                <button 
                  onClick={copyEmail}
                  className="btn-secondary flex items-center gap-2"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
            </div>
            
            <div className="contact-right space-y-6">
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-[#C8A45C] mt-1" />
                <div>
                  <p className="text-sm text-[#A7AFBA]">Email</p>
                  <p className="text-[#F2F4F8]">projects.navadeep@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[#C8A45C] mt-1" />
                <div>
                  <p className="text-sm text-[#A7AFBA]">Location</p>
                  <p className="text-[#F2F4F8]">India (worldwide remote)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <FileText size={20} className="text-[#C8A45C] mt-1" />
                <div>
                  <p className="text-sm text-[#A7AFBA]">Links</p>
                  <div className="flex gap-4 mt-2">
                    <a 
                      href="https://github.com/projectsnavadeep"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#F2F4F8] hover:text-[#C8A45C] transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">GitHub</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/navadeep-sripathi-924b48351/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#F2F4F8] hover:text-[#C8A45C] transition-colors"
                    >
                      <Linkedin size={16} />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom mt-24 pt-8 border-t border-[rgba(242,244,248,0.1)] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#A7AFBA]">
              © Navadeep Sripathi. Built with care.
            </p>
            <p className="text-xs text-[#A7AFBA] font-mono">
              B.Tech 3rd Year • KITS (S)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
