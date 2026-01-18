import React from 'react';
import { useThemeColors } from '../components/ThemeContext';

const Contact = () => {
  const colors = useThemeColors();

  return (
    <main className="pt-28 pb-20 px-6" style={{ background: colors.bgPrimary }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] font-semibold" style={{ color: colors.accent }}>
              Contact
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}
            >
              Parlons de votre prochaine surprise
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: colors.textSecondary }}>
              Décrivez-nous l'émotion que vous souhaitez créer. Nous vous répondrons rapidement avec une proposition personnalisée.
            </p>

            <div className="rounded-3xl p-6 md:p-8 space-y-4" style={{ backgroundColor: colors.bgCard }}>
              <div>
                <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: colors.textMuted }}>
                  Disponibilités
                </p>
                <p className="text-base md:text-lg font-semibold" style={{ color: colors.textPrimary }}>
                  7j/7 – Réponses sous 24h
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: colors.textMuted }}>
                  Email
                </p>
                <p className="text-base md:text-lg" style={{ color: colors.textSecondary }}>
                  servicecordiale@gmail.com
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: colors.textMuted }}>
                  Téléphone / WhatsApp
                </p>
                <p className="text-base md:text-lg" style={{ color: colors.textSecondary }}>
                  +1 514 574 3785 · +237 686 35 35 24
                </p>
              </div>
            </div>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="rounded-3xl p-6 md:p-10 shadow-xl"
            style={{ backgroundColor: colors.bgSecondary, border: `1px solid ${colors.accent}30` }}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden">
              <label>
                Ne pas remplir si vous êtes humain :
                <input name="bot-field" />
              </label>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: colors.bgCard,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.accent}30`,
                    boxShadow: 'none'
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: colors.bgCard,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.accent}30`
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows="6"
                  required
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: colors.bgCard,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.accent}30`
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full px-6 py-4 text-sm md:text-base font-semibold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.isDark ? '#0F172A' : '#0B1220',
                  boxShadow: '0 18px 40px rgba(255, 193, 7, 0.25)'
                }}
              >
                Envoyer la demande
              </button>
              <p className="text-xs text-center" style={{ color: colors.textMuted }}>
                En envoyant ce formulaire, vous acceptez d'être recontacté par notre équipe.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
