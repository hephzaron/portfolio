import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

/**
 * Render a single contact item (icon + label + value).
 *
 * @param {object} props
 * @param {React.ElementType} props.Icon - Lucide icon component.
 * @param {string} props.label - Contact label.
 * @param {string} props.value - Contact value (text or link).
 * @param {string} [props.href] - Optional hyperlink for the value.
 * @returns {JSX.Element}
 */
const ContactItem = ({ Icon, label, value, href }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-full bg-primary/10">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h4 className="font-medium">{label}</h4>
      {href ? (
        <a
          href={href}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-muted-foreground">{value}</span>
      )}
    </div>
  </div>
);

/**
 * Render the left column: contact information and social links.
 *
 * @returns {JSX.Element}
 */
const ContactInfo = () => (
  <div className="space-y-8">
    <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

    <div className="space-y-6 justify-center">
      <ContactItem
        Icon={Mail}
        label="Email"
        value="hello@gmail.com"
        href="mailto:hello@gmail.com"
      />
      <ContactItem
        Icon={Phone}
        label="Phone"
        value="+1 (123) 456-7890"
        href="tel:+11234567890"
      />
      <ContactItem
        Icon={MapPin}
        label="Location"
        value="Vancouver, BC, Canada"
      />
    </div>

    <div className="pt-8">
      <h4 className="font-medium mb-4">Connect With Me</h4>
      <div className="flex space-x-4 justify-center">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Twitch />
        </a>
      </div>
    </div>
  </div>
);

/**
 * Render the contact form.
 *
 * @returns {JSX.Element}
 */
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle form submission.
   * Displays a toast message after a simulated delay.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Message sent!",
        description:
          "Thank you for your message. I'll get back to you soon.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-card p-8 rounded-lg shadow-xs">
      <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
            placeholder="Pedro Machado..."
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
            placeholder="john@gmail.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
            placeholder="Hello, I'd like to talk about..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "cosmic-button w-full flex items-center justify-center gap-2"
          )}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

/**
 * @function ContactSection
 * @description A section component for displaying contact information,
 *              social links, and a message submission form.
 */
export const ContactSection = () => (
  <section id="contact" className="py-24 px-4 relative bg-secondary/30">
    <div className="container mx-auto max-w-5xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Get In <span className="text-primary"> Touch</span>
      </h2>

      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Have a project in mind or want to collaborate? Feel free to reach out.
        I&apos;m always open to discussing new opportunities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  </section>
);
