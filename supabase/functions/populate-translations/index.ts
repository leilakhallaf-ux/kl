import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface TranslationEntry {
  key: string;
  frenchText: string;
  context: string;
}

const translations: TranslationEntry[] = [
  { key: 'about.page_title', frenchText: 'À PROPOS', context: 'Page title' },
  { key: 'about.hero_title', frenchText: 'Votre source de référence pour les e-cards publicitaires', context: 'Hero section subtitle' },
  { key: 'about.intro_paragraph', frenchText: 'Bienvenue sur le site dédié à la préservation et à la célébration des e-cards publicitaires, ces petites merveilles numériques qui ont marqué les débuts d\'Internet et continuent d\'évoluer aujourd\'hui.', context: 'Introduction paragraph' },
  { key: 'about.mission_title', frenchText: 'Notre Mission', context: 'Section heading' },
  { key: 'about.mission_paragraph', frenchText: 'Nous avons créé cette plateforme pour archiver, cataloguer et mettre en valeur les e-cards publicitaires qui ont façonné la communication digitale. Des premiers designs animés en Flash aux créations modernes en HTML5, chaque e-card raconte une histoire unique de créativité et d\'innovation marketing.', context: 'Mission statement' },
  { key: 'about.collection_title', frenchText: 'Notre Collection', context: 'Section heading' },
  { key: 'about.collection_paragraph', frenchText: 'Notre base de données comprend des milliers d\'e-cards provenant de marques internationales, d\'agences créatives renommées et de designers indépendants. Chaque carte est soigneusement documentée avec ses métadonnées : année de création, annonceur, agence, créateurs, et contexte de diffusion. Nous nous efforçons de préserver ce patrimoine numérique éphémère pour les générations futures et les professionnels de la communication.', context: 'Collection description' },
  { key: 'about.join_title', frenchText: 'Rejoignez-Nous', context: 'Section heading' },
  { key: 'about.join_paragraph', frenchText: 'Que vous soyez designer, marketeur, historien du web ou simple amateur de créations numériques, nous vous invitons à explorer notre collection et à contribuer en soumettant vos propres découvertes. Ensemble, préservons la mémoire de ces petites œuvres d\'art interactives qui ont égayé nos boîtes mail et marqué l\'histoire de la publicité digitale.', context: 'Call to action paragraph' },
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
  { key: 'bestof.description', frenchText: 'Sélection premium des e-cards les plus remarquables. Une curation éditoriale des meilleures créations de la plateforme.', context: 'Page description' },
  { key: 'bestof.editorial_title', frenchText: 'Sélection éditoriale', context: 'Editorial section heading' },
  { key: 'bestof.editorial_description', frenchText: 'Nos coups de cœur, choisis pour leur créativité, innovation et impact', context: 'Editorial section description' },
  { key: 'bestof.most_liked_title', frenchText: 'Les plus appréciées', context: 'Most liked section heading' },
  { key: 'bestof.most_liked_description', frenchText: 'Les e-cards qui ont reçu le plus de likes de la communauté', context: 'Most liked section description' },
  { key: 'bestof.top_rated_title', frenchText: 'Les mieux notées', context: 'Top rated section heading' },
  { key: 'bestof.top_rated_description', frenchText: 'Les e-cards ayant obtenu les meilleures notes moyennes', context: 'Top rated section description' },
  { key: 'bestof.empty_message', frenchText: 'Aucune e-card dans le Best-of pour le moment', context: 'Empty state message' },
  { key: 'explorer.page_title', frenchText: 'Explorer', context: 'Page title' },
  { key: 'explorer.description', frenchText: 'Recherchez par mot-clé ou explorez par tags', context: 'Page description' },
  { key: 'explorer.search_placeholder', frenchText: 'Rechercher par annonceur, agence, thème...', context: 'Search input placeholder' },
  { key: 'explorer.search_button', frenchText: 'Rechercher', context: 'Search button text' },
  { key: 'explorer.tags_title', frenchText: 'Explorer par tags', context: 'Tags section heading' },
  { key: 'explorer.filter_all', frenchText: 'Tous', context: 'All tags filter button' },
  { key: 'explorer.no_tags_message', frenchText: 'Aucun tag ne commence par cette lettre', context: 'Empty tag filter message' },
  { key: 'explorer.results_title', frenchText: 'Résultats', context: 'Results section title' },
  { key: 'explorer.no_results_message', frenchText: 'Aucun résultat pour', context: 'No search results message' },
  { key: 'catalogue.page_title', frenchText: 'S\'inspirer', context: 'Page title' },
  { key: 'catalogue.description_prefix', frenchText: 'Explorez', context: 'Description prefix before count' },
  { key: 'catalogue.description_suffix', frenchText: 'dans notre collection', context: 'Description suffix after count' },
  { key: 'catalogue.no_results_title', frenchText: 'Aucune e-card ne correspond à vos critères de recherche', context: 'No results message' },
  { key: 'catalogue.no_results_hint', frenchText: 'Essayez de modifier ou supprimer certains filtres', context: 'No results suggestion' },
  { key: 'millesime.page_title', frenchText: 'Millésime', context: 'Page title (before year)' },
  { key: 'millesime.description_prefix', frenchText: '', context: 'Description prefix before count' },
  { key: 'millesime.description_year', frenchText: 'de l\'année', context: 'Year connector' },
  { key: 'millesime.no_results', frenchText: 'Aucune e-card pour cette année', context: 'Empty state message' },
  { key: 'millesime.back_to_catalogue', frenchText: 'Retour au catalogue', context: 'Back link text' },
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
  { key: 'footer.submit_ecard', frenchText: 'SOUMETTRE E-CARD', context: 'Footer link' },
  { key: 'footer.about', frenchText: 'À PROPOS', context: 'Footer link' },
  { key: 'footer.contact', frenchText: 'CONTACT', context: 'Footer link' },
  { key: 'footer.admin', frenchText: 'ADMIN', context: 'Footer link' },
  { key: 'footer.legal_notice', frenchText: 'MENTIONS LÉGALES', context: 'Footer link' },
  { key: 'footer.terms', frenchText: 'CGU', context: 'Footer link' },
  { key: 'footer.privacy', frenchText: 'CONFIDENTIALITÉ', context: 'Footer link' },
  { key: 'filters.label', frenchText: 'Filtres :', context: 'Filters section label' },
  { key: 'filters.advertiser', frenchText: 'Annonceur', context: 'Advertiser filter dropdown' },
  { key: 'filters.vintage', frenchText: 'Millésime', context: 'Vintage filter dropdown' },
  { key: 'filters.agency', frenchText: 'Agence', context: 'Agency filter dropdown' },
  { key: 'filters.distributor', frenchText: 'Diffuseur', context: 'Distributor filter dropdown' },
  { key: 'filters.technology', frenchText: 'Techno', context: 'Technology filter dropdown' },
  { key: 'filters.topic', frenchText: 'Thème', context: 'Topic filter dropdown' },
  { key: 'filters.clear_all', frenchText: 'Tout effacer', context: 'Clear all filters button' },
  { key: 'ecard_grid.no_results', frenchText: 'Aucune e-card trouvée', context: 'Empty state message' },
  { key: 'app.not_found_title', frenchText: 'Page non trouvée', context: '404 page title' },
  { key: 'app.back_to_home', frenchText: 'Retour à l\'accueil', context: 'Back to home link' },
];

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: languages, error: langError } = await supabase
      .from('languages')
      .select('code, name, is_default')
      .order('is_default', { ascending: false });

    if (langError) throw langError;

    const frenchLang = languages?.find(l => l.code === 'fr');
    if (!frenchLang) throw new Error('French language not found');

    let inserted = 0;
    let skipped = 0;
    const errors = [];

    for (const translation of translations) {
      const { data: existingKey } = await supabase
        .from('translation_keys')
        .select('id')
        .eq('key', translation.key)
        .maybeSingle();

      if (existingKey) {
        skipped++;
        continue;
      }

      const { data: newKey, error: keyError } = await supabase
        .from('translation_keys')
        .insert({ key: translation.key, context: translation.context })
        .select('id')
        .single();

      if (keyError) {
        errors.push({ key: translation.key, error: keyError.message });
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
        errors.push({ key: translation.key, error: transError.message });
        continue;
      }

      inserted++;
    }

    return new Response(
      JSON.stringify({
        success: true,
        total: translations.length,
        inserted,
        skipped,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
