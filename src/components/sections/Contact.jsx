import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Github, Linkedin, Mail, MessageCircle, Phone, User, MessageSquare, CheckCircle2,
  AlertCircle, Loader2, Copy, ArrowUpRight, Send, Sparkles,
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { contactConfig, socials, site } from '../../data/site';
import { LIMITS, FIELD_ORDER, clean, validateField, validateContact } from '../../utils/validate';

const categories = [
  'Static / Business Website',
  'E-commerce',
  'Full Stack Web Application',
  'Admin Dashboard / Enterprise System',
  'Mobile Application',
  'Backend / API',
  'Deployment / Hosting',
  'Other',
];

const labels = { name: 'Name', email: 'Email', phone: 'Phone', category: 'Project category', message: 'Message' };
const empty = { name: '', email: '', phone: '', category: '', message: '' };

function buildMessage(v) {
  return [
    `Hello ${site.name}, I found your portfolio and have an enquiry.`,
    '',
    `*Name:* ${clean(v.name)}`,
    `*Email:* ${v.email.trim()}`,
    v.phone.trim() ? `*Phone:* ${v.phone.trim()}` : null,
    `*Project category:* ${v.category}`,
    '',
    '*Message:*',
    v.message.trim(),
  ]
    .filter((l) => l !== null)
    .join('\n');
}

function Field({ k, icon: Icon, required, hint, error, valid, children }) {
  const pos = k === 'message' ? 'top-4' : 'top-1/2 -translate-y-1/2';
  return (
    <div>
      <label htmlFor={k} className="mb-1.5 flex items-center justify-between text-sm font-medium">
        <span>
          {labels[k]}{' '}
          {required ? (
            <span className="text-red-400" aria-hidden="true">*</span>
          ) : (
            <span className="text-xs font-normal text-muted">(optional)</span>
          )}
        </span>
        {hint}
      </label>
      <div className="relative">
        <Icon size={17} className={`pointer-events-none absolute left-4 ${pos} ${error ? 'text-red-400' : 'text-electric'}`} />
        {children}
        {valid && <CheckCircle2 size={17} className={`absolute right-3.5 ${pos} text-emerald-400`} aria-hidden="true" />}
      </div>
      {error && (
        <p id={`${k}-err`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-red-400">
          <AlertCircle size={13} className="mt-px shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | opened | blocked
  const [waUrl, setWaUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const refs = useRef({});

  const enabled = contactConfig.enabled && !!contactConfig.whatsapp;
  const sending = status === 'sending';

  const setField = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key] || errors[key]) setErrors((e) => ({ ...e, [key]: validateField(key, value) }));
    if (status === 'opened') setStatus('idle');
  };
  const blurField = (key) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateField(key, values[key]) }));
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!enabled || sending) return;

    const errs = validateContact(values);
    setTouched({ name: true, email: true, phone: true, category: true, message: true });
    setErrors(errs);
    const firstBad = FIELD_ORDER.find((k) => errs[k]);
    if (firstBad) {
      setShowSummary(true);
      setStatus('idle');
      refs.current[firstBad]?.focus();
      return;
    }
    setShowSummary(false);

    const url = `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(buildMessage(values))}`;
    setWaUrl(url);
    setStatus('sending');
    setTimeout(() => {
      let win = null;
      try {
        win = window.open(url, '_blank', 'noopener,noreferrer');
      } catch {
        win = null;
      }
      if (!win) {
        setStatus('blocked'); // keep the form data so nothing is lost
        return;
      }
      setStatus('opened');
      setValues(empty);
      setTouched({});
      setErrors({});
    }, 500);
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(buildMessage(values));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);
  const isValid = (k) => touched[k] && !errors[k] && (k !== 'phone' || values.phone.trim()) && values[k];

  const inputCls = (k) =>
    `peer w-full rounded-xl border bg-white py-3.5 pl-11 pr-10 text-sm text-black outline-none transition placeholder:text-slate-500 disabled:opacity-60 ${
      errors[k]
        ? 'border-red-500/70 shadow-[0_0_18px_-6px_rgba(239,68,68,0.7)]'
        : isValid(k)
        ? 'border-emerald-500/50'
        : 'border-line focus:border-electric focus:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)]'
    }`;

  const aria = (k, required) => ({
    id: k,
    'aria-required': required || undefined,
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${k}-err` : undefined,
    ref: (el) => (refs.current[k] = el),
    disabled: sending,
  });

  const social = (id) => socials.find((s) => s.id === id);
  const channels = [
    { id: 'email', icon: Mail, label: 'Email', value: site.email, href: social('email')?.href },
    { id: 'phone', icon: Phone, label: 'Phone', value: site.phone, href: site.phone ? `tel:${site.phone.replace(/\s/g, '')}` : null },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: 'Connect professionally', href: social('linkedin')?.href },
    { id: 'github', icon: Github, label: 'GitHub', value: 'See my code', href: social('github')?.href },
  ].filter((c) => c.href && c.value);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <SectionHeading
        eyebrow="Contact"
        title={<span id="contact-title">Have an Idea? Let's Build Something Amazing.</span>}
        subtitle="Fill in the details and your enquiry opens directly in WhatsApp, ready to send."
      />

      <Reveal>
        <div
          className="relative overflow-hidden rounded-[2rem] border border-line"
          style={{
            background:
              'radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.2), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(139,92,246,0.18), transparent 55%), var(--surface)',
          }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent shadow-[0_0_16px_rgba(59,130,246,0.8)]" aria-hidden="true" />

          <div className="relative grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* ── Left: ways to reach me ── */}
            <aside className="space-y-6 p-7 sm:p-10 lg:border-r lg:border-line">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-cyan">
                <Sparkles size={12} /> Let's connect
              </span>
              <div>
                <h3 className="text-3xl font-bold leading-tight xl:text-4xl">
                  Tell me about <span className="gradient-text">your idea.</span>
                </h3>
                <p className="mt-3 text-muted">
                  Websites, web apps, mobile apps, APIs or deployment: share what you have in mind and we can take it from there.
                </p>
              </div>

              {enabled && (
                <a
                  href={`https://wa.me/${contactConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl p-4 text-white transition hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(120deg,#15803d,#22c55e)', boxShadow: '0 0 28px -6px rgba(34,197,94,0.65)' }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <MessageCircle size={24} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-widest text-white/80">Fastest way</span>
                    <span className="block font-display text-lg font-semibold">Chat on WhatsApp</span>
                  </span>
                  <ArrowUpRight size={20} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}

              <ul className="space-y-3">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.id}>
                      <a
                        href={c.href}
                        target={c.id === 'email' || c.id === 'phone' ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="glass group flex items-center gap-3 rounded-xl px-4 py-3 transition"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric/15 text-electric">
                          <Icon size={18} className="neon-icon" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] uppercase tracking-widest text-muted">{c.label}</span>
                          <span className="block truncate text-sm font-medium">{c.value}</span>
                        </span>
                        <ArrowUpRight size={16} className="text-muted transition group-hover:text-fg" />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <p className="text-xs text-muted">Based in {site.location}</p>
            </aside>

            {/* ── Right: enquiry form ── */}
            <form onSubmit={onSubmit} noValidate className="space-y-5 p-7 sm:p-10" aria-label="Enquiry form">
              <AnimatePresence>
                {showSummary && errorList.length > 0 && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-sm"
                  >
                    <p className="flex items-center gap-2 font-medium text-red-300">
                      <AlertCircle size={16} /> Please fix {errorList.length} {errorList.length === 1 ? 'field' : 'fields'} to continue
                    </p>
                    <ul className="mt-2 space-y-1 pl-6 text-xs text-red-300/90">
                      {errorList.map((k) => (
                        <li key={k} className="list-disc">
                          <button type="button" onClick={() => refs.current[k]?.focus()} className="text-left underline-offset-2 hover:underline">
                            {labels[k]}: {errors[k]}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted">
                Fields marked <span className="text-red-400">*</span> are required.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field k="name" icon={User} required error={errors.name} valid={!!isValid('name')}>
                  <input {...aria('name', true)} value={values.name} onChange={(e) => setField('name', e.target.value)} onBlur={() => blurField('name')} autoComplete="name" placeholder="Your full name" maxLength={80} className={inputCls('name')} />
                </Field>
                <Field k="email" icon={Mail} required error={errors.email} valid={!!isValid('email')}>
                  <input {...aria('email', true)} type="email" value={values.email} onChange={(e) => setField('email', e.target.value)} onBlur={() => blurField('email')} autoComplete="email" placeholder="you@example.com" className={inputCls('email')} />
                </Field>
              </div>

              <Field k="phone" icon={Phone} error={errors.phone} valid={!!isValid('phone')}>
                <input {...aria('phone', false)} type="tel" inputMode="tel" value={values.phone} onChange={(e) => setField('phone', e.target.value)} onBlur={() => blurField('phone')} autoComplete="tel" placeholder="+91 98765 43210" className={inputCls('phone')} />
              </Field>

              <fieldset aria-required="true" aria-invalid={!!errors.category} aria-describedby={errors.category ? 'category-err' : undefined}>
                <legend className="mb-2 text-sm font-medium">
                  Project category <span className="text-red-400" aria-hidden="true">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c, i) => (
                    <div key={c} className="relative">
                      <input
                        type="radio"
                        name="category"
                        id={`cat-${i}`}
                        value={c}
                        checked={values.category === c}
                        disabled={sending}
                        ref={i === 0 ? (el) => (refs.current.category = el) : undefined}
                        onChange={() => {
                          setField('category', c);
                          setTouched((t) => ({ ...t, category: true }));
                        }}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`cat-${i}`}
                        className={`block cursor-pointer rounded-full border px-4 py-2 text-xs transition peer-checked:border-electric peer-checked:bg-electric/20 peer-checked:text-fg peer-checked:shadow-[0_0_16px_-4px_rgba(59,130,246,0.9)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-cyan hover:border-electric/60 ${
                          errors.category ? 'border-red-500/60 text-red-200' : 'border-line text-muted'
                        }`}
                      >
                        {c}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <p id="category-err" role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-red-400">
                    <AlertCircle size={13} className="mt-px shrink-0" /> {errors.category}
                  </p>
                )}
              </fieldset>

              <Field
                k="message"
                icon={MessageSquare}
                required
                error={errors.message}
                valid={!!isValid('message')}
                hint={
                  <span className={`text-xs font-normal ${values.message.trim().length > LIMITS.messageMax ? 'text-red-400' : 'text-muted'}`}>
                    {values.message.trim().length}/{LIMITS.messageMax}
                  </span>
                }
              >
                <textarea {...aria('message', true)} rows={5} value={values.message} onChange={(e) => setField('message', e.target.value)} onBlur={() => blurField('message')} placeholder="Tell me about your project, goals and timeline…" className={`${inputCls('message')} resize-y`} />
              </Field>

              <button
                type="submit"
                disabled={!enabled || sending}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                style={{ background: 'linear-gradient(110deg,#15803d,#22c55e)', boxShadow: '0 0 26px -4px rgba(34,197,94,0.65)' }}
              >
                {sending ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} className="transition group-hover:translate-x-0.5" />}
                {sending ? 'Opening WhatsApp…' : 'Send on WhatsApp'}
              </button>

              {!enabled && (
                <p className="flex items-center gap-2 text-xs text-amber-300">
                  <AlertCircle size={14} /> The enquiry form is currently switched off.
                </p>
              )}

              <div aria-live="polite" className="space-y-3">
                {status === 'opened' && (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <p>WhatsApp opened with your message ready. Just press <strong>Send</strong> there to deliver it.</p>
                  </div>
                )}
                {status === 'blocked' && (
                  <div className="rounded-xl border border-amber-400/50 bg-amber-400/10 p-4 text-sm text-amber-200">
                    <p className="flex items-start gap-2">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      Your browser blocked the WhatsApp pop-up. Your details are safe, use one of these:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2 text-xs">
                        <MessageCircle size={14} /> Open WhatsApp
                      </a>
                      <button type="button" onClick={copyMessage} className="btn-ghost !px-4 !py-2 text-xs">
                        <Copy size={14} /> {copied ? 'Copied!' : 'Copy message'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
