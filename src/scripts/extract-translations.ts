import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Make sure SUPABASE_SERVICE_ROLE_KEY is set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface TranslationEntry {
  key: string;
  frenchText: string;
  context: string;
}

const translations: TranslationEntry[] = [
  // Navigation
  { key: 'nav.inspire', frenchText: 'S\'INSPIRER', context: 'Main navigation link' },
  { key: 'nav.explore', frenchText: 'EXPLORER', context: 'Main navigation link' },
  { key: 'nav.bestof', frenchText: 'BEST-OF', context: 'Main navigation link' },
  { key: 'nav.submit', frenchText: 'SOUMETTRE', context: 'Main navigation link' },

  // About Page
  { key: 'about.page_title', frenchText: 'À PROPOS', context: 'Page title' },
  { key: 'about.hero_title', frenchText: 'Votre source de référence pour les e-cards publicitaires', context: 'Hero section subtitle' },
  { key: 'about.intro_paragraph', frenchText: 'Bienvenue sur le site dédié à la préservation et à la célébration des e-cards publicitaires, ces petites merveilles numériques qui ont marqué les débuts d\'Internet et continuent d\'évoluer aujourd\'hui.', context: 'Introduction paragraph' },
  { key: 'about.mission_title', frenchText: 'Notre Mission', context: 'Section heading' },
  { key: 'about.mission_paragraph', frenchText: 'Nous avons créé cette plateforme pour archiver, cataloguer et mettre en valeur les e-cards publicitaires qui ont façonné la communication digitale. Des premiers designs animés en Flash aux créations modernes en HTML5, chaque e-card raconte une histoire unique de créativité et d\'innovation marketing.', context: 'Mission statement' },
  { key: 'about.collection_title', frenchText: 'Notre Collection', context: 'Section heading' },
  { key: 'about.collection_paragraph', frenchText: 'Notre base de données comprend des milliers d\'e-cards provenant de marques internationales, d\'agences créatives renommées et de designers indépendants. Chaque carte est soigneusement documentée avec ses métadonnées : année de création, annonceur, agence, créateurs, et contexte de diffusion. Nous nous efforçons de préserver ce patrimoine numérique éphémère pour les générations futures et les professionnels de la communication.', context: 'Collection description' },
  { key: 'about.join_title', frenchText: 'Rejoignez-Nous', context: 'Section heading' },
  { key: 'about.join_paragraph', frenchText: 'Que vous soyez designer, marketeur, historien du web ou simple amateur de créations numériques, nous vous invitons à explorer notre collection et à contribuer en soumettant vos propres découvertes. Ensemble, préservons la mémoire de ces petites œuvres d\'art interactives qui ont égayé nos boîtes mail et marqué l\'histoire de la publicité digitale.', context: 'Call to action paragraph' },

  // Contact Page
  { key: 'contact.error_timing', frenchText: 'Veuillez prendre le temps de remplir le formulaire correctement.', context: 'Error message for form filled too quickly (bot detection)' },
  { key: 'contact.error_terms_required', frenchText: 'Vous devez accepter les Conditions Générales d\'Utilisation et la Politique de Confidentialité pour envoyer votre message.', context: 'Error message when terms not accepted' },
  { key: 'contact.error_send_failed', frenchText: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.', context: 'Generic error message for submission failure' },
  { key: 'contact.page_title', frenchText: 'CONTACT', context: 'Page title' },
  { key: 'contact.hero_title', frenchText: 'Envoyez-nous un message', context: 'Hero section title' },
  { key: 'contact.intro_paragraph', frenchText: 'Vous avez une question, une suggestion ou souhaitez contribuer à l\'archive ? N\'hésitez pas à nous contacter via le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.', context: 'Introductory text' },
  { key: 'contact.success_title', frenchText: 'Message envoyé avec succès !', context: 'Success message title' },
  { key: 'contact.success_message', frenchText: 'Nous vous répondrons dans les plus brefs délais.', context: 'Success message details' },
  { key: 'contact.error_title', frenchText: 'Erreur', context: 'Error message title' },
  { key: 'contact.field_lastname', frenchText: 'Votre nom *', context: 'Form field label' },
  { key: 'contact.placeholder_lastname', frenchText: 'Votre nom', context: 'Form field placeholder' },
  { key: 'contact.field_firstname', frenchText: 'Votre prénom *', context: 'Form field label' },
  { key: 'contact.placeholder_firstname', frenchText: 'Votre prénom', context: 'Form field placeholder' },
  { key: 'contact.field_user_type', frenchText: 'Vous êtes *', context: 'Form field label' },
  { key: 'contact.user_type_placeholder', frenchText: 'Sélectionnez...', context: 'Select dropdown placeholder' },
  { key: 'contact.user_type_individual', frenchText: 'Particulier', context: 'User type option' },
  { key: 'contact.user_type_professional', frenchText: 'Professionnel', context: 'User type option' },
  { key: 'contact.user_type_journalist', frenchText: 'Journaliste', context: 'User type option' },
  { key: 'contact.user_type_researcher', frenchText: 'Chercheur', context: 'User type option' },
  { key: 'contact.user_type_other', frenchText: 'Autre', context: 'User type option' },
  { key: 'contact.field_email', frenchText: 'Email *', context: 'Form field label' },
  { key: 'contact.placeholder_email', frenchText: 'votre@email.com', context: 'Email field placeholder' },
  { key: 'contact.field_subject', frenchText: 'Sujet *', context: 'Form field label' },
  { key: 'contact.placeholder_subject', frenchText: 'L\'objet de votre message', context: 'Subject field placeholder' },
  { key: 'contact.field_message', frenchText: 'Message *', context: 'Form field label' },
  { key: 'contact.placeholder_message', frenchText: 'Votre message...', context: 'Message field placeholder' },
  { key: 'contact.honeypot_label', frenchText: 'Website', context: 'Honeypot field label (hidden anti-spam)' },
  { key: 'contact.consent_statement', frenchText: 'En validant le formulaire, je transmets mon entier consentement pour le traitement de mes données *', context: 'Consent checkbox description' },
  { key: 'contact.terms_intro', frenchText: 'J\'ai lu et j\'accepte les', context: 'Terms acceptance text' },
  { key: 'contact.terms_cgu', frenchText: 'Conditions Générales d\'Utilisation du site', context: 'Terms of Use link text' },
  { key: 'contact.terms_and', frenchText: '& la', context: 'Conjunction between terms links' },
  { key: 'contact.terms_privacy', frenchText: 'Politique de Confidentialité', context: 'Privacy policy link text' },
  { key: 'contact.error_terms_inline', frenchText: 'Vous devez accepter les conditions pour envoyer votre message.', context: 'Inline error message for unchecked terms' },
  { key: 'contact.required_fields', frenchText: '* Champs obligatoires', context: 'Required fields notice' },
  { key: 'contact.button_sending', frenchText: 'Envoi en cours...', context: 'Button text while submitting' },
  { key: 'contact.button_send', frenchText: 'Envoyer', context: 'Submit button text' },

  // Best Of Page
  { key: 'bestof.description', frenchText: 'Sélection premium des e-cards les plus remarquables. Une curation éditoriale des meilleures créations de la plateforme.', context: 'Page description' },
  { key: 'bestof.editorial_title', frenchText: 'Sélection éditoriale', context: 'Editorial section heading' },
  { key: 'bestof.editorial_description', frenchText: 'Nos coups de cœur, choisis pour leur créativité, innovation et impact', context: 'Editorial section description' },
  { key: 'bestof.most_liked_title', frenchText: 'Les plus appréciées', context: 'Most liked section heading' },
  { key: 'bestof.most_liked_description', frenchText: 'Les e-cards qui ont reçu le plus de likes de la communauté', context: 'Most liked section description' },
  { key: 'bestof.top_rated_title', frenchText: 'Les mieux notées', context: 'Top rated section heading' },
  { key: 'bestof.top_rated_description', frenchText: 'Les e-cards ayant obtenu les meilleures notes moyennes', context: 'Top rated section description' },
  { key: 'bestof.empty_message', frenchText: 'Aucune e-card dans le Best-of pour le moment', context: 'Empty state message' },

  // Explorer Page
  { key: 'explorer.page_title', frenchText: 'Explorer', context: 'Page title' },
  { key: 'explorer.description', frenchText: 'Recherchez par mot-clé ou explorez par tags', context: 'Page description' },
  { key: 'explorer.search_placeholder', frenchText: 'Rechercher par annonceur, agence, thème...', context: 'Search input placeholder' },
  { key: 'explorer.search_button', frenchText: 'Rechercher', context: 'Search button text' },
  { key: 'explorer.tags_title', frenchText: 'Explorer par tags', context: 'Tags section heading' },
  { key: 'explorer.filter_all', frenchText: 'Tous', context: 'All tags filter button' },
  { key: 'explorer.no_tags_message', frenchText: 'Aucun tag ne commence par cette lettre', context: 'Empty tag filter message' },
  { key: 'explorer.results_title', frenchText: 'Résultats', context: 'Results section title' },
  { key: 'explorer.no_results_message', frenchText: 'Aucun résultat pour', context: 'No search results message' },

  // Catalogue Page
  { key: 'catalogue.page_title', frenchText: 'S\'inspirer', context: 'Page title' },
  { key: 'catalogue.description_prefix', frenchText: 'Explorez', context: 'Description prefix before count' },
  { key: 'catalogue.description_suffix', frenchText: 'dans notre collection', context: 'Description suffix after count' },
  { key: 'catalogue.no_results_title', frenchText: 'Aucune e-card ne correspond à vos critères de recherche', context: 'No results message' },
  { key: 'catalogue.no_results_hint', frenchText: 'Essayez de modifier ou supprimer certains filtres', context: 'No results suggestion' },

  // Millesime Page
  { key: 'millesime.page_title', frenchText: 'Millésime', context: 'Page title (before year)' },
  { key: 'millesime.description_prefix', frenchText: '', context: 'Description prefix before count' },
  { key: 'millesime.description_year', frenchText: 'de l\'année', context: 'Year connector' },
  { key: 'millesime.no_results', frenchText: 'Aucune e-card pour cette année', context: 'Empty state message' },
  { key: 'millesime.back_to_catalogue', frenchText: 'Retour au catalogue', context: 'Back link text' },

  // ECard Detail Page
  { key: 'ecard_detail.link_copied', frenchText: 'Lien copié dans le presse-papier !', context: 'Alert message when link is copied' },
  { key: 'ecard_detail.not_found_title', frenchText: 'E-card introuvable', context: '404 message title' },
  { key: 'ecard_detail.back_to_catalogue', frenchText: 'Retour au catalogue', context: 'Back link text' },
  { key: 'ecard_detail.view_original_button', frenchText: 'Voir la e-card originale', context: 'Button to view original e-card' },
  { key: 'ecard_detail.flash_preview_label', frenchText: 'Aperçu Flash (Ruffle)', context: 'Flash preview section label' },
  { key: 'ecard_detail.flash_unavailable', frenchText: 'Aperçu Flash non disponible', context: 'Flash preview error message' },
  { key: 'ecard_detail.field_vintage', frenchText: 'Millésime', context: 'Vintage field label' },
  { key: 'ecard_detail.field_language', frenchText: 'Langue', context: 'Language field label' },
  { key: 'ecard_detail.field_type', frenchText: 'Type', context: 'Type field label' },
  { key: 'ecard_detail.field_technology', frenchText: 'Technologie', context: 'Technology field label' },
  { key: 'ecard_detail.field_agency', frenchText: 'Agence', context: 'Agency field label' },
  { key: 'ecard_detail.field_distributor', frenchText: 'Diffuseur', context: 'Distributor field label' },
  { key: 'ecard_detail.share_button', frenchText: 'Partager', context: 'Share button label' },
  { key: 'ecard_detail.your_rating', frenchText: 'Votre note', context: 'Rating section label' },
  { key: 'ecard_detail.tags_title', frenchText: 'Tags', context: 'Tags section title' },
  { key: 'ecard_detail.credits_title', frenchText: 'Crédits', context: 'Credits section title' },
  { key: 'ecard_detail.description_title', frenchText: 'Description', context: 'Description section title' },

  // Admin Page
  { key: 'admin.access_denied', frenchText: 'Accès non autorisé', context: 'Error message for unauthorized access' },
  { key: 'admin.error_saving', frenchText: 'Erreur lors de la sauvegarde', context: 'Error alert for save failure' },
  { key: 'admin.confirm_delete', frenchText: 'Êtes-vous sûr de vouloir supprimer cette e-card ?', context: 'Delete confirmation dialog' },
  { key: 'admin.error_deleting', frenchText: 'Erreur lors de la suppression', context: 'Error alert for delete failure' },
  { key: 'admin.error_invalid_image', frenchText: 'Veuillez sélectionner une image valide', context: 'File upload validation error' },
  { key: 'admin.error_image_size', frenchText: 'L\'image ne doit pas dépasser 5 MB', context: 'File size validation error' },
  { key: 'admin.error_upload', frenchText: 'Erreur lors de l\'upload : ', context: 'Upload error message prefix' },
  { key: 'admin.rate_limit_error', frenchText: 'Trop de tentatives. Réessayez dans', context: 'Rate limit error message prefix' },
  { key: 'admin.rate_limit_minutes', frenchText: 'minutes.', context: 'Rate limit error message suffix' },
  { key: 'admin.login_error', frenchText: 'Erreur de connexion', context: 'Generic login error' },
  { key: 'admin.loading', frenchText: 'Chargement...', context: 'Loading state message' },
  { key: 'admin.page_title', frenchText: 'Administration', context: 'Page title' },
  { key: 'admin.subtitle', frenchText: 'E-Cards Corporate', context: 'Page subtitle' },
  { key: 'admin.field_email', frenchText: 'Email', context: 'Email field label' },
  { key: 'admin.field_password', frenchText: 'Mot de passe', context: 'Password field label' },
  { key: 'admin.login_button', frenchText: 'Se connecter', context: 'Login button text' },
  { key: 'admin.dashboard_title', frenchText: 'Administration', context: 'Dashboard title' },
  { key: 'admin.translations_link', frenchText: 'Traductions', context: 'Translations page link' },
  { key: 'admin.logout_button', frenchText: 'Déconnexion', context: 'Logout button text' },
  { key: 'admin.stat_total_ecards', frenchText: 'Total E-Cards', context: 'Stats card title' },
  { key: 'admin.stat_total_views', frenchText: 'Total Vues', context: 'Stats card title' },
  { key: 'admin.stat_total_likes', frenchText: 'Total Likes', context: 'Stats card title' },
  { key: 'admin.stat_avg_score', frenchText: 'Note Moyenne', context: 'Stats card title' },
  { key: 'admin.ecards_management_title', frenchText: 'Gestion des E-Cards', context: 'E-cards management section title' },
  { key: 'admin.button_new_ecard', frenchText: 'Annuler / Nouvelle E-Card', context: 'Toggle button for new e-card form' },
  { key: 'admin.field_thumbnail', frenchText: 'Image de preview', context: 'Thumbnail upload field label' },
  { key: 'admin.upload_mode', frenchText: 'Upload', context: 'Upload mode button' },
  { key: 'admin.url_mode', frenchText: 'URL externe', context: 'External URL mode button' },
  { key: 'admin.choose_image', frenchText: 'Choisir une image', context: 'File upload button text' },
  { key: 'admin.uploading', frenchText: 'Upload en cours...', context: 'Uploading status text' },
  { key: 'admin.field_advertiser', frenchText: 'Annonceur *', context: 'Advertiser name field label' },
  { key: 'admin.field_logo', frenchText: 'Logo de l\'annonceur *', context: 'Logo upload field label' },
  { key: 'admin.choose_logo', frenchText: 'Choisir un logo', context: 'Logo upload button text' },
  { key: 'admin.uploading_logo', frenchText: 'Upload en cours...', context: 'Logo uploading status' },
  { key: 'admin.logo_loaded', frenchText: 'Logo chargé', context: 'Logo loaded status message' },
  { key: 'admin.delete_button', frenchText: 'Supprimer', context: 'Delete button text' },
  { key: 'admin.field_business_sector', frenchText: 'Secteur d\'activité', context: 'Business sector field label' },
  { key: 'admin.field_vintage', frenchText: 'Millésime *', context: 'Vintage field label' },
  { key: 'admin.field_card_type', frenchText: 'Type de carte *', context: 'Card type field label' },
  { key: 'admin.placeholder_card_type', frenchText: 'Voeux, Anniversaire, etc.', context: 'Card type placeholder' },
  { key: 'admin.field_language', frenchText: 'Langue', context: 'Language field label' },
  { key: 'admin.language_options', frenchText: 'Français / Anglais / Espagnol / Allemand', context: 'Language dropdown options' },
  { key: 'admin.field_topic', frenchText: 'Thème', context: 'Topic field label' },
  { key: 'admin.field_technology', frenchText: 'Technologie', context: 'Technology field label' },
  { key: 'admin.placeholder_technology', frenchText: 'HTML5, Flash, Video, etc.', context: 'Technology placeholder' },
  { key: 'admin.field_url', frenchText: 'URL de la e-card', context: 'E-card URL field label' },
  { key: 'admin.field_tags', frenchText: 'Tags (séparés par des virgules)', context: 'Tags field label' },
  { key: 'admin.placeholder_tags', frenchText: 'voeux, luxe, digital, etc.', context: 'Tags placeholder' },
  { key: 'admin.field_description', frenchText: 'Description', context: 'Description field label' },
  { key: 'admin.button_update', frenchText: 'Mettre à jour', context: 'Submit button text in edit mode' },
  { key: 'admin.button_create', frenchText: 'Créer', context: 'Submit button text in create mode' },
  { key: 'admin.button_cancel', frenchText: 'Annuler', context: 'Cancel button text' },
  { key: 'admin.ecard_summary', frenchText: 'vues - likes', context: 'E-card summary in list' },
  { key: 'admin.no_ecards', frenchText: 'Aucune e-card dans la base de données', context: 'Empty state message' },

  // Admin Translations Page
  { key: 'admin_translations.error_loading', frenchText: 'Échec du chargement des traductions', context: 'Error message for loading failure' },
  { key: 'admin_translations.success_saved', frenchText: 'Traduction enregistrée avec succès', context: 'Success message for save' },
  { key: 'admin_translations.error_saving', frenchText: 'Échec de l\'enregistrement', context: 'Error message for save failure' },
  { key: 'admin_translations.success_created', frenchText: 'Clé créée avec succès', context: 'Success message for key creation' },
  { key: 'admin_translations.error_creating', frenchText: 'Échec de la création de la clé', context: 'Error message for creation failure' },
  { key: 'admin_translations.confirm_delete', frenchText: 'Êtes-vous sûr de vouloir supprimer cette clé et toutes ses traductions ?', context: 'Delete confirmation dialog' },
  { key: 'admin_translations.success_deleted', frenchText: 'Clé supprimée avec succès', context: 'Success message for deletion' },
  { key: 'admin_translations.error_deleting', frenchText: 'Échec de la suppression', context: 'Error message for deletion failure' },
  { key: 'admin_translations.confirm_auto_translate', frenchText: 'Voulez-vous lancer la traduction automatique pour toutes les clés manquantes en anglais ?', context: 'Auto-translate confirmation dialog' },
  { key: 'admin_translations.error_missing_languages', frenchText: 'Langues française et anglaise requises', context: 'Error for missing language setup' },
  { key: 'admin_translations.auto_translate_complete', frenchText: 'Toutes les traductions sont déjà présentes', context: 'Message when no translations needed' },
  { key: 'admin_translations.auto_translate_success', frenchText: 'traduction(s) générée(s) avec succès', context: 'Success message with count' },
  { key: 'admin_translations.error_auto_translate', frenchText: 'Échec de la traduction automatique', context: 'Error message for auto-translate failure' },
  { key: 'admin_translations.loading', frenchText: 'Chargement...', context: 'Loading state message' },
  { key: 'admin_translations.access_denied', frenchText: 'Accès refusé', context: 'Access denied message' },
  { key: 'admin_translations.admin_required', frenchText: 'Vous devez être administrateur pour accéder à cette page.', context: 'Admin access required message' },
  { key: 'admin_translations.back_home', frenchText: 'Retour à l\'accueil', context: 'Link back to home' },
  { key: 'admin_translations.page_title', frenchText: 'Gestion des traductions', context: 'Page title' },
  { key: 'admin_translations.back_admin', frenchText: 'Retour admin', context: 'Back to admin link' },
  { key: 'admin_translations.logout', frenchText: 'Déconnexion', context: 'Logout button' },
  { key: 'admin_translations.button_add_key', frenchText: 'Ajouter une clé de traduction', context: 'Add translation key button' },
  { key: 'admin_translations.button_auto_translate', frenchText: 'Auto-traduire FR → EN', context: 'Auto-translate button' },
  { key: 'admin_translations.auto_translating', frenchText: 'Traduction en cours...', context: 'Auto-translating status' },
  { key: 'admin_translations.new_key_title', frenchText: 'Nouvelle clé de traduction', context: 'New key form title' },
  { key: 'admin_translations.field_key_label', frenchText: 'Clé (ex: home.title)', context: 'Key field label' },
  { key: 'admin_translations.placeholder_key', frenchText: 'section.subsection.key', context: 'Key field placeholder' },
  { key: 'admin_translations.field_context_label', frenchText: 'Contexte (optionnel)', context: 'Context field label' },
  { key: 'admin_translations.placeholder_context', frenchText: 'Description pour les traducteurs', context: 'Context field placeholder' },
  { key: 'admin_translations.button_create', frenchText: 'Créer', context: 'Create button' },
  { key: 'admin_translations.button_cancel', frenchText: 'Annuler', context: 'Cancel button' },
  { key: 'admin_translations.button_save', frenchText: 'Enregistrer', context: 'Save button' },
  { key: 'admin_translations.delete_button', frenchText: 'Supprimer', context: 'Delete button title attribute' },
  { key: 'admin_translations.default_language', frenchText: '(par défaut)', context: 'Default language indicator' },
  { key: 'admin_translations.placeholder_translation', frenchText: 'Traduction en', context: 'Translation textarea placeholder prefix' },
  { key: 'admin_translations.no_keys', frenchText: 'Aucune clé de traduction pour le moment', context: 'Empty state message' },

  // GDPR Page
  { key: 'gdpr.page_title', frenchText: 'POLITIQUE DE CONFIDENTIALITÉ', context: 'Page title' },
  { key: 'gdpr.hero_title', frenchText: 'Protection de vos données personnelles (RGPD)', context: 'Hero section title' },
  { key: 'gdpr.intro_paragraph', frenchText: 'Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, nous nous engageons à protéger la confidentialité et la sécurité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.', context: 'Introduction paragraph' },
  { key: 'gdpr.collected_title', frenchText: 'Données Collectées', context: 'Section heading' },
  { key: 'gdpr.collected_intro', frenchText: 'Dans le cadre de l\'utilisation de notre site, nous sommes susceptibles de collecter les données suivantes :', context: 'Section introduction' },
  { key: 'gdpr.collected_navigation', frenchText: 'Données de navigation : adresse IP, type de navigateur, pages consultées, durée de visite', context: 'Bullet point item' },
  { key: 'gdpr.collected_contact', frenchText: 'Données de contact : si vous nous contactez ou soumettez du contenu (nom, email)', context: 'Bullet point item' },
  { key: 'gdpr.collected_cookies', frenchText: 'Cookies et traceurs : pour améliorer votre expérience de navigation', context: 'Bullet point item' },
  { key: 'gdpr.usage_title', frenchText: 'Utilisation des Données', context: 'Section heading' },
  { key: 'gdpr.usage_intro', frenchText: 'Les données collectées sont utilisées pour les finalités suivantes :', context: 'Section introduction' },
  { key: 'gdpr.usage_site', frenchText: 'Assurer le fonctionnement et la sécurité du site', context: 'Bullet point item' },
  { key: 'gdpr.usage_improve', frenchText: 'Améliorer nos services et l\'expérience utilisateur', context: 'Bullet point item' },
  { key: 'gdpr.usage_contact', frenchText: 'Répondre à vos demandes et suggestions', context: 'Bullet point item' },
  { key: 'gdpr.usage_stats', frenchText: 'Réaliser des statistiques de fréquentation anonymes', context: 'Bullet point item' },
  { key: 'gdpr.usage_guarantee', frenchText: 'Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales sans votre consentement explicite.', context: 'Data protection guarantee' },
  { key: 'gdpr.rights_title', frenchText: 'Vos Droits', context: 'Section heading' },
  { key: 'gdpr.rights_intro', frenchText: 'Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :', context: 'Section introduction' },
  { key: 'gdpr.rights_access', frenchText: 'Droit d\'accès : consulter les données que nous détenons', context: 'User right' },
  { key: 'gdpr.rights_rectify', frenchText: 'Droit de rectification : corriger les données inexactes', context: 'User right' },
  { key: 'gdpr.rights_delete', frenchText: 'Droit à l\'effacement : supprimer vos données', context: 'User right' },
  { key: 'gdpr.rights_limit', frenchText: 'Droit à la limitation : restreindre le traitement', context: 'User right' },
  { key: 'gdpr.rights_portability', frenchText: 'Droit à la portabilité : recevoir vos données dans un format structuré', context: 'User right' },
  { key: 'gdpr.rights_oppose', frenchText: 'Droit d\'opposition : vous opposer au traitement de vos données', context: 'User right' },
  { key: 'gdpr.rights_contact', frenchText: 'Pour exercer ces droits, contactez-nous à l\'adresse : privacy@ecards-archive.com', context: 'Contact information for rights' },
  { key: 'gdpr.security_title', frenchText: 'Sécurité et Conservation', context: 'Section heading' },
  { key: 'gdpr.security_measures', frenchText: 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération. Les données sont hébergées sur des serveurs sécurisés et ne sont accessibles qu\'au personnel autorisé.', context: 'Security measures paragraph' },
  { key: 'gdpr.security_retention', frenchText: 'Nous conservons vos données uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées, ou conformément aux obligations légales. Les données de navigation sont conservées pour une durée maximale de 13 mois.', context: 'Data retention policy' },
  { key: 'gdpr.cookies_title', frenchText: 'Cookies', context: 'Section heading' },
  { key: 'gdpr.cookies_paragraph', frenchText: 'Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic. Vous pouvez à tout moment paramétrer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site peuvent être limitées sans l\'acceptation des cookies.', context: 'Cookie policy explanation' },

  // Terms of Use Page
  { key: 'terms.page_title', frenchText: 'CONDITIONS GÉNÉRALES D\'UTILISATION', context: 'Page title' },
  { key: 'terms.hero_title', frenchText: 'Règles d\'utilisation du site', context: 'Hero section title' },
  { key: 'terms.intro_paragraph', frenchText: 'Les présentes Conditions Générales d\'Utilisation (CGU) définissent les règles d\'utilisation du site E-Cards Archive. En accédant et en utilisant ce site, vous acceptez sans réserve les présentes conditions.', context: 'Introduction paragraph' },
  { key: 'terms.purpose_title', frenchText: 'Objet du Site', context: 'Section heading' },
  { key: 'terms.purpose_paragraph', frenchText: 'E-Cards Archive est une plateforme dédiée à l\'archivage, à la documentation et à la mise en valeur des e-cards publicitaires. Le site propose une collection accessible au public pour des fins de recherche, d\'inspiration créative et de préservation du patrimoine numérique publicitaire.', context: 'Site purpose description' },
  { key: 'terms.access_title', frenchText: 'Accès au Site', context: 'Section heading' },
  { key: 'terms.access_free', frenchText: 'L\'accès au site est gratuit et ouvert à tous les utilisateurs disposant d\'une connexion Internet. Nous nous réservons le droit de suspendre ou de limiter l\'accès au site, notamment pour des raisons de maintenance, de sécurité ou en cas d\'utilisation abusive.', context: 'Access conditions paragraph' },
  { key: 'terms.access_disclaimer', frenchText: 'Nous ne garantissons pas l\'absence d\'interruptions ou d\'erreurs dans l\'accès au site et déclinons toute responsabilité en cas d\'indisponibilité temporaire ou permanente.', context: 'Disclaimer paragraph' },
  { key: 'terms.content_title', frenchText: 'Utilisation du Contenu', context: 'Section heading' },
  { key: 'terms.content_paragraph', frenchText: 'Les e-cards et contenus présents sur le site restent la propriété de leurs créateurs et annonceurs respectifs. Le site agit uniquement comme plateforme d\'archivage et de référencement. Toute reproduction, représentation ou utilisation commerciale du contenu archivé nécessite l\'autorisation préalable des ayants droit.', context: 'Content usage rules' },
  { key: 'terms.submission_title', frenchText: 'Soumission de Contenu', context: 'Section heading' },
  { key: 'terms.submission_paragraph', frenchText: 'En soumettant du contenu (e-cards, informations, commentaires), vous garantissez disposer des droits nécessaires et acceptez que votre contribution soit publiée et archivée sur notre plateforme. Nous nous réservons le droit de refuser ou de supprimer tout contenu inapproprié, illégal ou contraire à nos valeurs.', context: 'Content submission rules' },
  { key: 'terms.liability_title', frenchText: 'Responsabilité', context: 'Section heading' },
  { key: 'terms.liability_paragraph', frenchText: 'Les informations publiées sur le site sont fournies à titre indicatif. Nous nous efforçons d\'assurer l\'exactitude des informations, mais ne pouvons garantir leur exhaustivité ou leur mise à jour permanente. L\'utilisateur est seul responsable de l\'usage qu\'il fait du contenu consulté.', context: 'Liability disclaimer' },

  // Legal Notice Page
  { key: 'legal.page_title', frenchText: 'MENTIONS LÉGALES', context: 'Page title' },
  { key: 'legal.hero_title', frenchText: 'Informations légales et éditoriales', context: 'Hero section title' },
  { key: 'legal.intro_paragraph', frenchText: 'Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l\'économie numérique, nous vous informons des mentions légales relatives au site E-Cards Archive.', context: 'Introduction paragraph' },
  { key: 'legal.editor_title', frenchText: 'Éditeur du Site', context: 'Section heading' },
  { key: 'legal.editor_name', frenchText: 'Nom ou raison sociale : [À COMPLÉTER]', context: 'Editor name' },
  { key: 'legal.editor_address', frenchText: 'Adresse : [À COMPLÉTER]', context: 'Editor address' },
  { key: 'legal.editor_email', frenchText: 'Email : contact@ecards-archive.com', context: 'Editor email' },
  { key: 'legal.editor_director', frenchText: 'Directeur de la publication : [À COMPLÉTER]', context: 'Publication director' },
  { key: 'legal.hosting_title', frenchText: 'Hébergement', context: 'Section heading' },
  { key: 'legal.hosting_provider', frenchText: 'Le site est hébergé par :', context: 'Hosting provider intro' },
  { key: 'legal.hosting_name', frenchText: 'Supabase Inc.', context: 'Hosting company name' },
  { key: 'legal.hosting_address', frenchText: '970 Toa Payoh North, #07-04, Singapore 318992', context: 'Hosting company address' },
  { key: 'legal.ip_title', frenchText: 'Propriété Intellectuelle', context: 'Section heading' },
  { key: 'legal.ip_paragraph', frenchText: 'L\'ensemble du contenu de ce site (structure, textes, logos, images) est la propriété exclusive de ses créateurs ou fait l\'objet d\'une autorisation d\'utilisation. Toute reproduction, distribution, modification ou exploitation, même partielle, sans autorisation préalable est strictement interdite et constituerait une contrefaçon sanctionnée par le Code de la propriété intellectuelle.', context: 'IP rights description' },
  { key: 'legal.liability_title', frenchText: 'Limitation de Responsabilité', context: 'Section heading' },
  { key: 'legal.liability_paragraph', frenchText: 'Nous nous efforçons de fournir des informations exactes et à jour, mais ne pouvons garantir l\'absence d\'erreurs ou d\'omissions. L\'utilisateur reconnaît utiliser les informations sous sa seule responsabilité. Nous déclinons toute responsabilité quant aux dommages directs ou indirects résultant de l\'utilisation du site.', context: 'Liability disclaimer' },

  // Footer
  { key: 'footer.submit_ecard', frenchText: 'SOUMETTRE E-CARD', context: 'Footer link' },
  { key: 'footer.about', frenchText: 'À PROPOS', context: 'Footer link' },
  { key: 'footer.contact', frenchText: 'CONTACT', context: 'Footer link' },
  { key: 'footer.admin', frenchText: 'ADMIN', context: 'Footer link' },
  { key: 'footer.legal_notice', frenchText: 'MENTIONS LÉGALES', context: 'Footer link' },
  { key: 'footer.terms', frenchText: 'CGU', context: 'Footer link' },
  { key: 'footer.privacy', frenchText: 'CONFIDENTIALITÉ', context: 'Footer link' },

  // Filters
  { key: 'filters.label', frenchText: 'Filtres :', context: 'Filters section label' },
  { key: 'filters.advertiser', frenchText: 'Annonceur', context: 'Advertiser filter dropdown' },
  { key: 'filters.vintage', frenchText: 'Millésime', context: 'Vintage filter dropdown' },
  { key: 'filters.agency', frenchText: 'Agence', context: 'Agency filter dropdown' },
  { key: 'filters.distributor', frenchText: 'Diffuseur', context: 'Distributor filter dropdown' },
  { key: 'filters.technology', frenchText: 'Techno', context: 'Technology filter dropdown' },
  { key: 'filters.topic', frenchText: 'Thème', context: 'Topic filter dropdown' },
  { key: 'filters.clear_all', frenchText: 'Tout effacer', context: 'Clear all filters button' },

  // ECard Grid
  { key: 'ecard_grid.no_results', frenchText: 'Aucune e-card trouvée', context: 'Empty state message' },

  // App
  { key: 'app.not_found_title', frenchText: 'Page non trouvée', context: '404 page title' },
  { key: 'app.back_to_home', frenchText: 'Retour à l\'accueil', context: 'Back to home link' },
];

async function insertTranslations() {
  try {
    const { data: languages, error: langError } = await supabase
      .from('languages')
      .select('code, name, is_default')
      .order('is_default', { ascending: false });

    if (langError) {
      console.error('Error loading languages:', langError);
      return;
    }

    if (!languages || languages.length === 0) {
      console.error('No languages found in database');
      return;
    }

    const frenchLang = languages.find(l => l.code === 'fr');
    if (!frenchLang) {
      console.error('French language not found');
      return;
    }

    console.log(`Found ${languages.length} languages, French code: ${frenchLang.code}`);
    console.log(`Starting insertion of ${translations.length} translation keys...`);

    let inserted = 0;
    let skipped = 0;

    for (const translation of translations) {
      const { data: existingKey, error: checkError } = await supabase
        .from('translation_keys')
        .select('id')
        .eq('key', translation.key)
        .maybeSingle();

      if (checkError) {
        console.error(`Error checking key ${translation.key}:`, checkError);
        continue;
      }

      if (existingKey) {
        console.log(`Key already exists: ${translation.key}`);
        skipped++;
        continue;
      }

      const { data: newKey, error: keyError } = await supabase
        .from('translation_keys')
        .insert({
          key: translation.key,
          context: translation.context,
        })
        .select('id')
        .single();

      if (keyError) {
        console.error(`Error inserting key ${translation.key}:`, keyError);
        continue;
      }

      const { error: transError } = await supabase
        .from('translations')
        .insert({
          key_id: newKey.id,
          language_code: frenchLang.code,
          value: translation.frenchText,
        });

      if (transError) {
        console.error(`Error inserting translation for ${translation.key}:`, transError);
        continue;
      }

      inserted++;
      console.log(`✓ Inserted: ${translation.key}`);
    }

    console.log('\n=== SUMMARY ===');
    console.log(`Total translations: ${translations.length}`);
    console.log(`Inserted: ${inserted}`);
    console.log(`Skipped (already exists): ${skipped}`);
    console.log('Done!');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

insertTranslations();
