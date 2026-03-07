-- Insert all page content translations

-- Helper function to insert translation key and value
CREATE OR REPLACE FUNCTION insert_translation(
  p_key TEXT,
  p_fr_value TEXT,
  p_en_value TEXT DEFAULT NULL
) RETURNS VOID AS $$
DECLARE
  v_key_id UUID;
BEGIN
  -- Insert or get key ID
  INSERT INTO translation_keys (key)
  VALUES (p_key)
  ON CONFLICT (key) DO UPDATE SET key = p_key
  RETURNING id INTO v_key_id;

  -- Insert French translation
  INSERT INTO translations (key_id, language_code, value)
  VALUES (v_key_id, 'fr', p_fr_value)
  ON CONFLICT (key_id, language_code) DO UPDATE
  SET value = p_fr_value, updated_at = NOW();

  -- Insert English translation if provided
  IF p_en_value IS NOT NULL THEN
    INSERT INTO translations (key_id, language_code, value)
    VALUES (v_key_id, 'en', p_en_value)
    ON CONFLICT (key_id, language_code) DO UPDATE
    SET value = p_en_value, updated_at = NOW();
  END IF;
END;
$$ LANGUAGE plpgsql;

-- About page
SELECT insert_translation('about.title', 'À PROPOS', 'ABOUT');
SELECT insert_translation('about.hero.title', 'Votre source de référence pour les e-cards publicitaires', 'Your reference source for advertising e-cards');
SELECT insert_translation('about.intro', 'Bienvenue sur le site dédié à la préservation et à la célébration des e-cards publicitaires, ces petites merveilles numériques qui ont marqué les débuts d''Internet et continuent d''évoluer aujourd''hui.', 'Welcome to the website dedicated to preserving and celebrating advertising e-cards, those little digital marvels that marked the early days of the Internet and continue to evolve today.');
SELECT insert_translation('about.mission.title', 'Notre Mission', 'Our Mission');
SELECT insert_translation('about.mission.text', 'Nous avons créé cette plateforme pour archiver, cataloguer et mettre en valeur les e-cards publicitaires qui ont façonné la communication digitale. Des premiers designs animés en Flash aux créations modernes en HTML5, chaque e-card raconte une histoire unique de créativité et d''innovation marketing.', 'We created this platform to archive, catalog and showcase the advertising e-cards that have shaped digital communication. From early Flash animated designs to modern HTML5 creations, each e-card tells a unique story of creativity and marketing innovation.');
SELECT insert_translation('about.collection.title', 'Notre Collection', 'Our Collection');
SELECT insert_translation('about.collection.text', 'Notre base de données comprend des milliers d''e-cards provenant de marques internationales, d''agences créatives renommées et de designers indépendants. Chaque carte est soigneusement documentée avec ses métadonnées : année de création, annonceur, agence, créateurs, et contexte de diffusion. Nous nous efforçons de préserver ce patrimoine numérique éphémère pour les générations futures et les professionnels de la communication.', 'Our database includes thousands of e-cards from international brands, renowned creative agencies and independent designers. Each card is carefully documented with its metadata: year of creation, advertiser, agency, creators, and distribution context. We strive to preserve this ephemeral digital heritage for future generations and communication professionals.');
SELECT insert_translation('about.join.title', 'Rejoignez-Nous', 'Join Us');
SELECT insert_translation('about.join.text', 'Que vous soyez designer, marketeur, historien du web ou simple amateur de créations numériques, nous vous invitons à explorer notre collection et à contribuer en soumettant vos propres découvertes. Ensemble, préservons la mémoire de ces petites œuvres d''art interactives qui ont égayé nos boîtes mail et marqué l''histoire de la publicité digitale.', 'Whether you are a designer, marketer, web historian or simply a fan of digital creations, we invite you to explore our collection and contribute by submitting your own discoveries. Together, let''s preserve the memory of these little interactive works of art that brightened our inboxes and marked the history of digital advertising.');

-- Contact page
SELECT insert_translation('contact.title', 'CONTACT', 'CONTACT');
SELECT insert_translation('contact.hero.title', 'Envoyez-nous un message', 'Send us a message');
SELECT insert_translation('contact.intro', 'Vous avez une question, une suggestion ou souhaitez contribuer à l''archive ? N''hésitez pas à nous contacter via le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.', 'Do you have a question, a suggestion or would you like to contribute to the archive? Feel free to contact us via the form below. We will respond to you as soon as possible.');
SELECT insert_translation('contact.form.success.title', 'Message envoyé avec succès !', 'Message sent successfully!');
SELECT insert_translation('contact.form.success.text', 'Nous vous répondrons dans les plus brefs délais.', 'We will respond to you as soon as possible.');
SELECT insert_translation('contact.form.error.title', 'Erreur', 'Error');
SELECT insert_translation('contact.form.lastName', 'Votre nom', 'Your last name');
SELECT insert_translation('contact.form.firstName', 'Votre prénom', 'Your first name');
SELECT insert_translation('contact.form.userType', 'Vous êtes', 'You are');
SELECT insert_translation('contact.form.userType.select', 'Sélectionnez...', 'Select...');
SELECT insert_translation('contact.form.userType.individual', 'Particulier', 'Individual');
SELECT insert_translation('contact.form.userType.professional', 'Professionnel', 'Professional');
SELECT insert_translation('contact.form.userType.journalist', 'Journaliste', 'Journalist');
SELECT insert_translation('contact.form.userType.researcher', 'Chercheur', 'Researcher');
SELECT insert_translation('contact.form.userType.other', 'Autre', 'Other');
SELECT insert_translation('contact.form.email', 'Email', 'Email');
SELECT insert_translation('contact.form.subject', 'Sujet', 'Subject');
SELECT insert_translation('contact.form.subject.placeholder', 'L''objet de votre message', 'The subject of your message');
SELECT insert_translation('contact.form.message', 'Message', 'Message');
SELECT insert_translation('contact.form.message.placeholder', 'Votre message...', 'Your message...');
SELECT insert_translation('contact.form.consent.title', 'En validant le formulaire, je transmets mon entier consentement pour le traitement de mes données', 'By validating the form, I give my full consent for the processing of my data');
SELECT insert_translation('contact.form.consent.text', 'J''ai lu et j''accepte les', 'I have read and accept the');
SELECT insert_translation('contact.form.consent.terms', 'Conditions Générales d''Utilisation du site', 'Terms of Use of the site');
SELECT insert_translation('contact.form.consent.and', '& la', '& the');
SELECT insert_translation('contact.form.consent.privacy', 'Politique de Confidentialité', 'Privacy Policy');
SELECT insert_translation('contact.form.consent.error', 'Vous devez accepter les conditions pour envoyer votre message.', 'You must accept the terms to send your message.');
SELECT insert_translation('contact.form.required', 'Champs obligatoires', 'Required fields');
SELECT insert_translation('contact.form.submit', 'Envoyer', 'Send');
SELECT insert_translation('contact.form.submitting', 'Envoi en cours...', 'Sending...');
SELECT insert_translation('contact.form.error.timing', 'Veuillez prendre le temps de remplir le formulaire correctement.', 'Please take the time to fill out the form correctly.');
SELECT insert_translation('contact.form.error.consent', 'Vous devez accepter les Conditions Générales d''Utilisation et la Politique de Confidentialité pour envoyer votre message.', 'You must accept the Terms of Use and Privacy Policy to send your message.');
SELECT insert_translation('contact.form.error.general', 'Une erreur est survenue lors de l''envoi du message. Veuillez réessayer.', 'An error occurred while sending the message. Please try again.');

-- GDPR page
SELECT insert_translation('gdpr.title', 'POLITIQUE DE CONFIDENTIALITÉ', 'PRIVACY POLICY');
SELECT insert_translation('gdpr.hero.title', 'Protection de vos données personnelles (RGPD)', 'Protection of your personal data (GDPR)');
SELECT insert_translation('gdpr.intro', 'Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, nous nous engageons à protéger la confidentialité et la sécurité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.', 'In accordance with the General Data Protection Regulation (GDPR) and the Data Protection Act, we are committed to protecting the confidentiality and security of your personal data. This policy explains how we collect, use and protect your information.');

-- Legal Notice page
SELECT insert_translation('legal.title', 'MENTIONS LÉGALES', 'LEGAL NOTICE');
SELECT insert_translation('legal.hero.title', 'Informations légales et éditoriales', 'Legal and editorial information');

-- Terms of Use page
SELECT insert_translation('terms.title', 'CONDITIONS GÉNÉRALES D''UTILISATION', 'TERMS OF USE');
SELECT insert_translation('terms.hero.title', 'Règles d''utilisation du site', 'Website usage rules');

-- Clean up helper function
DROP FUNCTION insert_translation(TEXT, TEXT, TEXT);
