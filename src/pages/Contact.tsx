import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Send } from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';

export default function Contact() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    userType: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [formStartTime] = useState(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      console.log('Bot detected via honeypot');
      return;
    }

    // Time-based check - form filled too quickly (less than 3 seconds)
    const formFillTime = Date.now() - formStartTime;
    if (formFillTime < 3000) {
      console.log('Bot detected via timing check');
      setSubmitStatus('error');
      setErrorMessage(t('contact.form.error.timing'));
      return;
    }

    // Vérifier que les conditions sont acceptées
    if (!acceptTerms) {
      setShowTermsError(true);
      setSubmitStatus('error');
      setErrorMessage(t('contact.form.error.consent'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setShowTermsError(false);

    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([{
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);

      if (dbError) throw dbError;

      const emailResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            ...formData,
            formFillTime
          }),
        }
      );

      if (!emailResponse.ok) {
        console.error('Failed to send email notification');
      }

      setSubmitStatus('success');
      setFormData({
        lastName: '',
        firstName: '',
        userType: '',
        email: '',
        subject: '',
        message: '',
        website: ''
      });
      setAcceptTerms(false);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      setErrorMessage(t('contact.form.error.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-wrapper min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-full lg:max-w-7xl">
        <div className="bg-[#3D2B1F]/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-[#3D2B1F]/10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D2B1F] mb-2">
            {t('contact.title')}
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gold mb-8">
            {t('contact.hero.title')}
          </h2>

          <div className="text-[#3D2B1F]/80 space-y-8 leading-relaxed">
            <p className="text-lg">
              {t('contact.intro')}
            </p>

            {submitStatus === 'success' && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-100">
                <p className="font-semibold">{t('contact.form.success.title')}</p>
                <p className="text-sm mt-1">{t('contact.form.success.text')}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-100">
                <p className="font-semibold">{t('contact.form.error.title')}</p>
                <p className="text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lastName" className="block text-[#3D2B1F] font-semibold mb-2">
                    {t('contact.form.lastName')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#3D2B1F]/10 border border-[#3D2B1F]/20 rounded-lg text-[#3D2B1F] placeholder-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder={t('contact.form.lastName')}
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-[#3D2B1F] font-semibold mb-2">
                    {t('contact.form.firstName')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#3D2B1F]/10 border border-[#3D2B1F]/20 rounded-lg text-[#3D2B1F] placeholder-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder={t('contact.form.firstName')}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="userType" className="block text-[#3D2B1F] font-semibold mb-2">
                    {t('contact.form.userType')} *
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#3D2B1F]/10 border border-[#3D2B1F]/20 rounded-lg text-[#3D2B1F] focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  >
                    <option value="" className="bg-slate-100">{t('contact.form.userType.select')}</option>
                    <option value="particulier" className="bg-slate-100">{t('contact.form.userType.individual')}</option>
                    <option value="professionnel" className="bg-slate-100">{t('contact.form.userType.professional')}</option>
                    <option value="journaliste" className="bg-slate-100">{t('contact.form.userType.journalist')}</option>
                    <option value="chercheur" className="bg-slate-100">{t('contact.form.userType.researcher')}</option>
                    <option value="autre" className="bg-slate-100">{t('contact.form.userType.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#3D2B1F] font-semibold mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#3D2B1F]/10 border border-[#3D2B1F]/20 rounded-lg text-[#3D2B1F] placeholder-[#3D2B1F]/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#3D2B1F] font-semibold mb-2">
                  {t('contact.form.subject')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                  placeholder={t('contact.form.subject.placeholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#3D2B1F] font-semibold mb-2">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                  placeholder={t('contact.form.message.placeholder')}
                />
              </div>

              {/* Honeypot field - hidden from users, visible to bots */}
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className={`bg-[#3D2B1F]/5 border rounded-lg p-6 my-6 space-y-4 transition-all ${
                showTermsError ? 'border-red-500 bg-red-500/10' : 'border-[#3D2B1F]/10'
              }`}>
                <p className="text-[#3D2B1F] text-base font-bold leading-relaxed">
                  {t('contact.form.consent.title')} *
                </p>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={acceptTerms}
                    onChange={(e) => {
                      setAcceptTerms(e.target.checked);
                      if (e.target.checked) {
                        setShowTermsError(false);
                      }
                    }}
                    required
                    className={`mt-1 w-5 h-5 rounded bg-[#3D2B1F]/10 text-gold focus:ring-2 focus:ring-gold focus:ring-offset-0 cursor-pointer transition-all ${
                      showTermsError ? 'border-2 border-red-500' : 'border border-[#3D2B1F]/20'
                    }`}
                  />
                  <label htmlFor="acceptTerms" className="text-[#3D2B1F] text-base leading-relaxed cursor-pointer">
                    {t('contact.form.consent.text')}{' '}
                    <a href="/cgu" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">
                      {t('contact.form.consent.terms')}
                    </a>
                    {' '}{t('contact.form.consent.and')}{' '}
                    <a href="/rgpd" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">
                      {t('contact.form.consent.privacy')}
                    </a>
                  </label>
                </div>
                {showTermsError && (
                  <p className="text-red-400 text-sm font-semibold flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    <span>{t('contact.form.consent.error')}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-[#3D2B1F]/60">
                  * {t('contact.form.required')}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || !acceptTerms}
                  className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold/90 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>{t('contact.form.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t('contact.form.submit')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
