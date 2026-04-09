import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, User, Mail, MessageSquare, Loader2, Check, AlertCircle } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// EmailJS credentials
// Public Key (User ID): provided by user
// Service ID & Template ID: user must create these in EmailJS dashboard
//   1. Go to https://dashboard.emailjs.com
//   2. Add an Email Service (e.g. Gmail) → copy the Service ID
//   3. Create an Email Template → copy the Template ID
//      Template variables: {{from_name}}, {{from_email}}, {{message}}
// ──────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'OMNYautZyvKsGMrB5';
const EMAILJS_SERVICE_ID = 'service_zuy5n8q'; // From user screenshot
const EMAILJS_TEMPLATE_ID = 'template_y5gwzlo'; // Reverted as requested

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all fields.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      const now = new Date();
      const formattedTime = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,      // Matches {{name}}
          from_name: formData.name, // Matches {{from_name}} in subject
          email: formData.email,     // Matches {{email}}
          message: formData.message, // Matches {{message}}
          time: formattedTime,       // Matches {{time}}
          to_name: 'Navadeep',
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setErrorMsg(err?.text || 'Failed to send message. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="contact-form-wrapper">
      {/* Success overlay */}
      {status === 'success' && (
        <div className="contact-form-toast contact-form-toast--success">
          <div className="contact-form-toast-icon">
            <Check size={24} />
          </div>
          <p className="text-[#F2F4F8] font-bold text-lg">Message sent successfully!</p>
          <p className="text-[#A7AFBA] text-sm mt-1">I'll get back to you soon.</p>
        </div>
      )}

      {/* Error overlay */}
      {status === 'error' && (
        <div className="contact-form-toast contact-form-toast--error">
          <div className="contact-form-toast-icon contact-form-toast-icon--error">
            <AlertCircle size={24} />
          </div>
          <p className="text-[#F2F4F8] font-bold text-lg">Oops!</p>
          <p className="text-[#A7AFBA] text-sm mt-1">{errorMsg}</p>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`contact-form ${status === 'success' || status === 'error' ? 'contact-form--hidden' : ''}`}
      >
        <h3 className="font-mono text-xs tracking-[0.18em] text-[#C8A45C] uppercase mb-6">
          Send a Message
        </h3>

        {/* Name field */}
        <div className="contact-field-group">
          <label htmlFor="from_name" className="contact-label">
            <User size={14} className="text-[#C8A45C]" />
            Name
          </label>
          <input
            type="text"
            id="from_name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="contact-input"
            autoComplete="name"
          />
        </div>

        {/* Email field */}
        <div className="contact-field-group">
          <label htmlFor="email" className="contact-label">
            <Mail size={14} className="text-[#C8A45C]" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="contact-input"
            autoComplete="email"
          />
        </div>

        {/* Message field */}
        <div className="contact-field-group">
          <label htmlFor="message" className="contact-label">
            <MessageSquare size={14} className="text-[#C8A45C]" />
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="contact-input contact-textarea"
            rows={5}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="contact-submit-btn"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
