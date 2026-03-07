import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const translations = {
  // About page
  'about.title': 'À PROPOS',
  'about.hero.title': 'Votre source de référence pour les e-cards publicitaires',
  'about.intro': 'Bienvenue sur le site dédié à la préservation et à la célébration des e-cards publicitaires, ces petites merveilles numériques qui ont marqué les débuts d\'Internet et continuent d\'évoluer aujourd\'hui.',
  'about.mission.title': 'Notre Mission',
  'about.mission.text': 'Nous avons créé cette plateforme pour archiver, cataloguer et mettre en valeur les e-cards publicitaires qui ont façonné la communication digitale. Des premiers designs animés en Flash aux créations modernes en HTML5, chaque e-card raconte une histoire unique de créativité et d\'innovation marketing.',
  'about.collection.title': 'Notre Collection',
  'about.collection.text': 'Notre base de données comprend des milliers d\'e-cards provenant de marques internationales, d\'agences créatives renommées et de designers indépendants. Chaque carte est soigneusement documentée avec ses métadonnées : année de création, annonceur, agence, créateurs, et contexte de diffusion. Nous nous efforçons de préserver ce patrimoine numérique éphémère pour les générations futures et les professionnels de la communication.',
  'about.join.title': 'Rejoignez-Nous',
  'about.join.text': 'Que vous soyez designer, marketeur, historien du web ou simple amateur de créations numériques, nous vous invitons à explorer notre collection et à contribuer en soumettant vos propres découvertes. Ensemble, préservons la mémoire de ces petites œuvres d\'art interactives qui ont égayé nos boîtes mail et marqué l\'histoire de la publicité digitale.',

  // Contact page
  'contact.title': 'CONTACT',
  'contact.hero.title': 'Envoyez-nous un message',
  'contact.intro': 'Vous avez une question, une suggestion ou souhaitez contribuer à l\'archive ? N\'hésitez pas à nous contacter via le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.',
  'contact.form.success.title': 'Message envoyé avec succès !',
  'contact.form.success.text': 'Nous vous répondrons dans les plus brefs délais.',
  'contact.form.error.title': 'Erreur',
  'contact.form.lastName': 'Votre nom',
  'contact.form.firstName': 'Votre prénom',
  'contact.form.userType': 'Vous êtes',
  'contact.form.userType.select': 'Sélectionnez...',
  'contact.form.userType.individual': 'Particulier',
  'contact.form.userType.professional': 'Professionnel',
  'contact.form.userType.journalist': 'Journaliste',
  'contact.form.userType.researcher': 'Chercheur',
  'contact.form.userType.other': 'Autre',
  'contact.form.email': 'Email',
  'contact.form.subject': 'Sujet',
  'contact.form.subject.placeholder': 'L\'objet de votre message',
  'contact.form.message': 'Message',
  'contact.form.message.placeholder': 'Votre message...',
  'contact.form.consent.title': 'En validant le formulaire, je transmets mon entier consentement pour le traitement de mes données',
  'contact.form.consent.text': 'J\'ai lu et j\'accepte les',
  'contact.form.consent.terms': 'Conditions Générales d\'Utilisation du site',
  'contact.form.consent.and': '& la',
  'contact.form.consent.privacy': 'Politique de Confidentialité',
  'contact.form.consent.error': 'Vous devez accepter les conditions pour envoyer votre message.',
  'contact.form.required': 'Champs obligatoires',
  'contact.form.submit': 'Envoyer',
  'contact.form.submitting': 'Envoi en cours...',
  'contact.form.error.timing': 'Veuillez prendre le temps de remplir le formulaire correctement.',
  'contact.form.error.consent': 'Vous devez accepter les Conditions Générales d\'Utilisation et la Politique de Confidentialité pour envoyer votre message.',
  'contact.form.error.general': 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',

  // GDPR page
  'gdpr.title': 'POLITIQUE DE CONFIDENTIALITÉ',
  'gdpr.hero.title': 'Protection de vos données personnelles (RGPD)',
  'gdpr.intro': 'Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, nous nous engageons à protéger la confidentialité et la sécurité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.',
  'gdpr.collected.title': 'Données Collectées',
  'gdpr.collected.intro': 'Dans le cadre de l\'utilisation de notre site, nous sommes susceptibles de collecter les données suivantes :',
  'gdpr.collected.item1': 'Données de navigation : adresse IP, type de navigateur, pages consultées, durée de visite',
  'gdpr.collected.item2': 'Données de contact : si vous nous contactez ou soumettez du contenu (nom, email)',
  'gdpr.collected.item3': 'Cookies et traceurs : pour améliorer votre expérience de navigation',
  'gdpr.usage.title': 'Utilisation des Données',
  'gdpr.usage.intro': 'Les données collectées sont utilisées pour les finalités suivantes :',
  'gdpr.usage.item1': 'Assurer le fonctionnement et l\'amélioration du site',
  'gdpr.usage.item2': 'Traiter et modérer les soumissions d\'e-cards',
  'gdpr.usage.item3': 'Répondre à vos demandes et communications',
  'gdpr.usage.item4': 'Analyser l\'utilisation du site pour améliorer nos services',
  'gdpr.usage.item5': 'Respecter nos obligations légales et réglementaires',
  'gdpr.usage.disclaimer': 'Vos données ne sont jamais vendues, louées ou partagées avec des tiers à des fins commerciales sans votre consentement explicite.',
  'gdpr.rights.title': 'Vos Droits',
  'gdpr.rights.intro': 'Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :',
  'gdpr.rights.access': 'Droit d\'accès :',
  'gdpr.rights.access.text': 'obtenir une copie de vos données personnelles',
  'gdpr.rights.rectification': 'Droit de rectification :',
  'gdpr.rights.rectification.text': 'corriger des données inexactes ou incomplètes',
  'gdpr.rights.erasure': 'Droit à l\'effacement :',
  'gdpr.rights.erasure.text': 'demander la suppression de vos données',
  'gdpr.rights.restriction': 'Droit à la limitation :',
  'gdpr.rights.restriction.text': 'limiter le traitement de vos données',
  'gdpr.rights.objection': 'Droit d\'opposition :',
  'gdpr.rights.objection.text': 'vous opposer au traitement de vos données',
  'gdpr.rights.portability': 'Droit à la portabilité :',
  'gdpr.rights.portability.text': 'recevoir vos données dans un format structuré',
  'gdpr.rights.contact': 'Pour exercer ces droits, contactez-nous à l\'adresse : privacy@ecards-archive.com',
  'gdpr.security.title': 'Sécurité et Conservation',
  'gdpr.security.text1': 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Nos serveurs sont sécurisés et les données sont chiffrées lors de leur transmission.',
  'gdpr.security.text2': 'Vos données personnelles sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, ou conformément aux obligations légales de conservation. Une fois cette période expirée, vos données sont supprimées ou anonymisées de manière sécurisée.',
  'gdpr.cookies.title': 'Cookies',
  'gdpr.cookies.text': 'Le site utilise des cookies techniques nécessaires à son fonctionnement. Ces cookies ne collectent pas de données personnelles identifiables et sont essentiels pour assurer la navigation et les fonctionnalités du site. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter votre expérience de navigation.',

  // Legal Notice page
  'legal.title': 'MENTIONS LÉGALES',
  'legal.hero.title': 'Informations légales et éditoriales',
  'legal.intro': 'Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l\'économie numérique, il est précisé aux utilisateurs du site l\'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.',
  'legal.editor.title': 'Éditeur du Site',
  'legal.editor.text': 'Le site est édité par [Nom de l\'organisation ou de la personne responsable], enregistré sous le numéro [SIRET/SIREN].',
  'legal.editor.address': 'Siège social :',
  'legal.editor.email': 'Email :',
  'legal.editor.phone': 'Téléphone :',
  'legal.editor.director': 'Directeur de la publication :',
  'legal.hosting.title': 'Hébergement',
  'legal.hosting.text': 'Le site est hébergé par Supabase Inc.',
  'legal.hosting.address': 'Adresse :',
  'legal.hosting.website': 'Site web :',
  'legal.ip.title': 'Propriété Intellectuelle',
  'legal.ip.text': 'L\'ensemble du contenu présent sur ce site, incluant mais ne se limitant pas aux textes, images, graphismes, logo, icônes, sons, logiciels, est la propriété exclusive de leurs auteurs respectifs ou fait l\'objet d\'une autorisation d\'utilisation. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable. Les e-cards présentées restent la propriété de leurs créateurs et annonceurs respectifs et sont présentées à des fins d\'archivage culturel et éducatif.',
  'legal.liability.title': 'Limitation de Responsabilité',
  'legal.liability.text': 'Les informations contenues sur ce site sont aussi précises que possible et le site est mis à jour régulièrement. Toutefois, l\'éditeur ne peut garantir l\'exactitude, la précision ou l\'exhaustivité des informations mises à disposition sur ce site. En conséquence, l\'éditeur décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.',

  // Terms of Use page
  'terms.title': 'CONDITIONS GÉNÉRALES D\'UTILISATION',
  'terms.hero.title': 'Règles d\'utilisation du site',
  'terms.intro': 'Les présentes Conditions Générales d\'Utilisation (CGU) régissent l\'accès et l\'utilisation du site. En accédant au site, vous acceptez sans réserve les présentes CGU. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser ce site.',
  'terms.purpose.title': 'Objet du Site',
  'terms.purpose.text': 'Le site a pour objet de fournir une plateforme d\'archivage et de consultation d\'e-cards publicitaires. Les utilisateurs peuvent explorer la collection, rechercher des e-cards par différents critères (année, annonceur, agence, créateur) et soumettre de nouvelles e-cards pour enrichir la base de données. Le site vise à préserver le patrimoine de la publicité numérique interactive et à offrir une ressource documentaire aux professionnels et passionnés.',
  'terms.access.title': 'Accès au Site',
  'terms.access.text1': 'L\'accès au site est gratuit et libre à tout utilisateur disposant d\'un accès Internet. Tous les frais supportés par l\'utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.',
  'terms.access.text2': 'L\'éditeur met en œuvre tous les moyens raisonnables à sa disposition pour assurer un accès de qualité au site, mais n\'est tenu à aucune obligation d\'y parvenir. L\'éditeur ne peut garantir que le site sera exempt d\'anomalies, d\'erreurs ou de bugs, ni que ces derniers pourront être corrigés. L\'éditeur se réserve la possibilité d\'interrompre, de suspendre momentanément ou de modifier sans préavis l\'accès à tout ou partie du site.',
  'terms.content.title': 'Utilisation du Contenu',
  'terms.content.text': 'Les e-cards présentées sur le site sont protégées par des droits d\'auteur et restent la propriété de leurs créateurs respectifs. L\'utilisation du contenu du site est autorisée à des fins personnelles, éducatives et de recherche uniquement. Toute utilisation commerciale, reproduction, distribution ou modification du contenu sans autorisation préalable écrite est strictement interdite. Les utilisateurs s\'engagent à respecter les droits de propriété intellectuelle des créateurs et annonceurs.',
  'terms.submission.title': 'Soumission de Contenu',
  'terms.submission.text': 'Les utilisateurs peuvent soumettre des e-cards pour enrichir la collection. En soumettant du contenu, l\'utilisateur garantit qu\'il dispose des droits nécessaires ou de l\'autorisation des ayants droit pour le partager sur la plateforme. L\'utilisateur accorde à l\'éditeur une licence non exclusive, gratuite et mondiale pour afficher, archiver et diffuser le contenu soumis dans le cadre des activités du site. L\'éditeur se réserve le droit de modérer, refuser ou supprimer tout contenu qui ne respecterait pas les présentes CGU ou les lois en vigueur.',
  'terms.liability.title': 'Responsabilité',
  'terms.liability.text': 'L\'utilisateur est seul responsable de l\'utilisation qu\'il fait du site et du contenu qu\'il consulte. L\'éditeur ne saurait être tenu responsable de tout dommage direct ou indirect qui pourrait résulter de l\'accès au site ou de l\'utilisation de son contenu. L\'éditeur décline toute responsabilité concernant les liens hypertextes pointant vers des sites tiers qui pourraient être présents sur le site.',
};

async function insertTranslations() {
  console.log('🚀 Starting translation insertion...\n');

  for (const [key, frValue] of Object.entries(translations)) {
    try {
      // Check if key exists
      const { data: existingKey } = await supabase
        .from('translation_keys')
        .select('id')
        .eq('key', key)
        .maybeSingle();

      let keyId;

      if (existingKey) {
        keyId = existingKey.id;
        console.log(`✓ Key exists: ${key}`);
      } else {
        // Create key
        const { data: newKey, error: keyError } = await supabase
          .from('translation_keys')
          .insert({ key })
          .select('id')
          .single();

        if (keyError) throw keyError;
        keyId = newKey.id;
        console.log(`+ Created key: ${key}`);
      }

      // Insert French translation
      const { data: existingFr } = await supabase
        .from('translations')
        .select('id')
        .eq('key_id', keyId)
        .eq('language_code', 'fr')
        .maybeSingle();

      if (existingFr) {
        await supabase
          .from('translations')
          .update({ value: frValue, updated_at: new Date().toISOString() })
          .eq('id', existingFr.id);
        console.log(`  ↻ Updated FR: ${key}`);
      } else {
        await supabase
          .from('translations')
          .insert({ key_id: keyId, language_code: 'fr', value: frValue });
        console.log(`  + Added FR: ${key}`);
      }

      // Auto-translate to English using edge function
      try {
        const response = await fetch(
          `${process.env.VITE_SUPABASE_URL}/functions/v1/auto-translate`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              keyId,
              sourceLang: 'fr',
              targetLang: 'en',
              sourceText: frValue
            }),
          }
        );

        if (response.ok) {
          console.log(`  🌍 Auto-translated to EN: ${key}`);
        }
      } catch (error) {
        console.log(`  ⚠️ Auto-translation skipped for: ${key}`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${key}:`, error.message);
    }
  }

  console.log('\n✅ Translation insertion complete!');
}

insertTranslations();
