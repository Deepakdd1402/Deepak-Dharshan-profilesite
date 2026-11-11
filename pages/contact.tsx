import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import Head from 'next/head';

import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import { LINKS } from '../lib/portfolio';

interface ContactProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

function Contact({ serviceId, templateId, publicKey }: ContactProps) {
  const form = useRef<HTMLFormElement>(null);
  const [submitResult, setSubmitResult] = useState<
    'success' | 'failure' | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit() {
    if (!serviceId || !templateId || !publicKey || !form.current) {
      console.error(
        'EmailJS environment variables or form reference are not defined'
      );
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setSubmitResult('success');
      setIsModalOpen(true);
      reset();
    } catch (error) {
      setSubmitResult('failure');
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const id = window.setTimeout(closeModal, 5000);
    return () => window.clearTimeout(id);
  }, [isModalOpen, closeModal]);

  const inputCls =
    'w-full rounded-lg border border-sf-g5 bg-white px-3 py-2 text-sm text-sf-ink outline-none transition-shadow focus:border-brand-400 focus:shadow-[0_0_0_3px_rgba(27,150,255,.2)]';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || LINKS.email;

  return (
    <div>
      <Head>
        <title>Deepak Dharshan | Contact</title>
      </Head>
      <PageHeader icon={FiMail} eyebrow="New lead" title="Get in touch" />

      <div className="grid gap-4 lg:grid-cols-3">
        <form
          ref={form}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[22px] border border-sf-g5 bg-white p-5 shadow-widget lg:col-span-2"
        >
          <p className="mb-4 text-sm text-sf-weak">
            Reach out, leave feedback, or report a bug on this site. Fields marked
            <span className="text-sf-error"> *</span> are required.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-medium text-sf-weak">
              <span className="text-sf-error">*</span> Name
              <input {...register('name', { required: true })} placeholder="Your name" className={`${inputCls} mt-1`} />
              {errors.name && <span className="mt-1 block text-sf-error">This field is required.</span>}
            </label>
            <label className="block text-xs font-medium text-sf-weak">
              <span className="text-sf-error">*</span> Email
              <input
                {...register('email', {
                  required: 'This field is required.',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please provide a valid email address.',
                  },
                })}
                placeholder="you@company.com"
                className={`${inputCls} mt-1`}
              />
              {errors.email && typeof errors.email.message === 'string' && (
                <span className="mt-1 block text-sf-error">{errors.email.message}</span>
              )}
            </label>
          </div>
          <label className="mt-4 block text-xs font-medium text-sf-weak">
            <span className="text-sf-error">*</span> Message
            <textarea
              {...register('message', {
                required: 'This field is required.',
                minLength: { value: 10, message: 'Your message must be at least 10 characters.' },
              })}
              placeholder="How can I help?"
              rows={5}
              className={`${inputCls} mt-1`}
            />
            {errors.message && typeof errors.message.message === 'string' && (
              <span className="mt-1 block text-sf-error">{errors.message.message}</span>
            )}
          </label>
          <div className="mt-5 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600">
              <FiSend size={14} /> Send message
            </button>
          </div>
        </form>

        <aside className="space-y-3 rounded-[22px] border border-white/80 bg-white/80 p-5 shadow-widget backdrop-blur-xl">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">Direct contact</h2>
          {[
            { icon: FiMail, label: email, href: `mailto:${email}` },
            { icon: FiLinkedin, label: 'LinkedIn', href: LINKS.linkedin },
            { icon: FiGithub, label: 'GitHub', href: LINKS.github },
          ].map((c) => (
            <a key={c.label} href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl p-2 text-sm text-sf-ink transition-colors hover:bg-brand-50">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-500">
                <c.icon size={17} />
              </span>
              <span className="truncate">{c.label}</span>
            </a>
          ))}
        </aside>
      </div>

      {/* macOS-style notification toast */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed right-4 top-20 z-50 flex w-80 items-start gap-3 rounded-2xl border border-white/80 bg-white/85 p-3 shadow-window backdrop-blur-xl"
            role="status"
          >
            {submitResult === 'success' ? (
              <FiCheckCircle className="mt-0.5 shrink-0 text-sf-success" size={22} />
            ) : (
              <FiAlertCircle className="mt-0.5 shrink-0 text-sf-error" size={22} />
            )}
            <div className="flex-1">
              <p className="text-sm font-semibold text-sf-ink">
                {submitResult === 'success' ? 'Message sent' : 'Could not send'}
              </p>
              <p className="text-xs text-sf-weak">
                {submitResult === 'success'
                  ? 'Thanks for reaching out. I will get back to you soon.'
                  : 'Failed to submit form. Please try again later.'}
              </p>
            </div>
            <button type="button" onClick={closeModal} aria-label="Dismiss" className="text-sf-weak hover:text-sf-ink">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export async function getStaticProps() {
  const serviceId = process.env.EMAILJS_SERVICE_ID ?? null;
  const templateId = process.env.EMAILJS_TEMPLATE_ID ?? null;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY ?? null;

  return {
    props: {
      serviceId,
      templateId,
      publicKey,
    },
  };
}

export default Contact;
// export const runtime = 'experimental-edge';
