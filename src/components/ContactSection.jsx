import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import emailjs from "@emailjs/browser";
import PropTypes from "prop-types";

const ContactItem = ({ Icon, label, value, href }) => (
  <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-white/60 p-4 shadow-sm dark:bg-card/60">
    <div className="rounded-full bg-primary/10 p-3">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div className="text-left">
      <h4 className="font-medium">{label}</h4>
      {href ? (
        <a href={href} className="text-sm text-foreground/70 transition-colors hover:text-primary">
          {value}
        </a>
      ) : (
        <span className="text-sm text-foreground/70">{value}</span>
      )}
    </div>
  </div>
);

ContactItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string,
};

const ContactInfo = () => (
  <div className="space-y-8 text-left">
    <div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Let&apos;s talk</p>
      <h3 className="text-2xl font-semibold">Contact information</h3>
    </div>

    <div className="space-y-4">
      <ContactItem Icon={Mail} label="Email" value="wazrontechnologies@gmail.com" href="mailto:wazrontechnologies@gmail.com" />
      <ContactItem Icon={Phone} label="Phone" value="+234 (802) 916-5809" href="tel:+2348029165809" />
      <ContactItem Icon={MapPin} label="Location" value="Benin City, ED, Nigeria" />
    </div>

    <div className="rounded-[1.5rem] border border-border/70 bg-white/60 p-5 shadow-sm dark:bg-card/60">
      <h4 className="mb-4 font-medium">Connect with me</h4>
      <div className="flex flex-wrap gap-3">
        <a href="https://www.linkedin.com/in/daramola-tobi" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border/80 bg-card/70 p-3 text-foreground/80 transition-all duration-300 hover:border-primary/40 hover:text-primary">
          <Linkedin size={18} />
        </a>
        <a href="https://x.com/HorebZion/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border/80 bg-card/70 p-3 text-foreground/80 transition-all duration-300 hover:border-primary/40 hover:text-primary">
          <FaXTwitter size={18} />
        </a>
        <a href="https://t.me/+9rD3qGR0BFE2MWVk" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border/80 bg-card/70 p-3 text-foreground/80 transition-all duration-300 hover:border-primary/40 hover:text-primary">
          <FaTelegram size={18} />
        </a>
      </div>
    </div>
  </div>
);

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.send(serviceId, templateId, formData, userId).then(
      () => {
        setTimeout(() => {
          toast({
            title: "Message sent!",
            description: "Thank you for your message. I’ll get back to you soon.",
          });
          setIsSubmitting(false);
        }, 1500);
        setFormData({ name: "", email: "", message: "" });
      },
      (error) => {
        setTimeout(() => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
          setIsSubmitting(false);
        }, 1500);
        console.error(error);
      }
    );
  };

  return (
    <div className="glass-panel p-8">
      <h3 className="mb-6 text-2xl font-semibold">Send a message</h3>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Your Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-xl border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tobi Daramola..." />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">Your Email</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="john@gmail.com" />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">Your Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="min-h-32 w-full resize-none rounded-xl border border-input bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Hello, I’d like to talk about..." />
        </div>

        <button type="submit" disabled={isSubmitting} className={cn("cosmic-button w-full justify-center")}> 
          {isSubmitting ? "Sending..." : "Send Message"}
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export const ContactSection = () => (
  <section id="contact" className="relative px-4 py-24">
    <div className="container mx-auto max-w-5xl">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Get in touch</p>
        <h2 className="section-title">
          Let&apos;s build <span className="text-gradient">something meaningful</span> together.
        </h2>
      </div>

      <p className="mx-auto mb-12 max-w-2xl text-center text-foreground/70">
        Have a project in mind or want to collaborate? Feel free to reach out. I’m always open to discussing new opportunities.
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  </section>
);
