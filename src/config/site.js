// Coordonnées et envoi du formulaire — tout ce qui est à personnaliser est ici.

export const SITE = {
  // Numéro WhatsApp au format international, chiffres uniquement (ex. '971501234567').
  // Vide = boutons WhatsApp masqués.
  whatsapp: '971505955616',

  // Numéro affiché dans la section Contact (ex. '+971 50 123 4567'). Vide = masqué.
  phone: '+971 50 595 5616',

  // Email principal (affiché + destinataire du formulaire en mode secours).
  email: 'contact@afrihorn.com',

  // Email support affiché. Vide = masqué.
  supportEmail: 'support@afrihorn.com',

  // Clé d'accès Web3Forms (https://web3forms.com) — les messages arrivent
  // dans la boîte mail liée à la clé. Vide = le formulaire ouvre le client mail
  // du visiteur avec le message pré-rempli.
  web3formsKey: '',
};

export const whatsappLink = (text = '') =>
  SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;
