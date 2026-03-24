-- Insert all English translations
-- This SQL script inserts English translations for all keys

-- Batch 1: Contact page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'contact.user_type_placeholder' THEN 'Select...'
    WHEN 'contact.user_type_individual' THEN 'Individual'
    WHEN 'contact.user_type_professional' THEN 'Professional'
    WHEN 'contact.user_type_journalist' THEN 'Journalist'
    WHEN 'contact.user_type_researcher' THEN 'Researcher'
    WHEN 'contact.user_type_other' THEN 'Other'
    WHEN 'contact.field_email' THEN 'Email *'
    WHEN 'contact.placeholder_email' THEN 'your@email.com'
    WHEN 'contact.field_subject' THEN 'Subject *'
    WHEN 'contact.placeholder_subject' THEN 'Your message subject'
    WHEN 'contact.field_message' THEN 'Message *'
    WHEN 'contact.placeholder_message' THEN 'Your message...'
    WHEN 'contact.honeypot_label' THEN 'Website'
    WHEN 'contact.consent_statement' THEN 'By submitting the form, I give my full consent for the processing of my data *'
    WHEN 'contact.terms_intro' THEN 'I have read and accept the'
    WHEN 'contact.terms_cgu' THEN 'Terms of Use'
    WHEN 'contact.terms_and' THEN '& the'
    WHEN 'contact.terms_privacy' THEN 'Privacy Policy'
    WHEN 'contact.error_terms_inline' THEN 'You must accept the terms to send your message.'
    WHEN 'contact.required_fields' THEN '* Required fields'
    WHEN 'contact.button_sending' THEN 'Sending...'
    WHEN 'contact.button_send' THEN 'Send'
    WHEN 'contact.error_timing' THEN 'Please take the time to fill out the form correctly.'
    WHEN 'contact.error_terms_required' THEN 'You must accept the Terms of Use and Privacy Policy to send your message.'
    WHEN 'contact.error_send_failed' THEN 'An error occurred while sending the message. Please try again.'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'contact.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 2: BestOf page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'bestof.description' THEN 'Premium selection of the most remarkable e-cards. Editorial curation of the best creations on the platform.'
    WHEN 'bestof.editorial_title' THEN 'Editorial Selection'
    WHEN 'bestof.editorial_description' THEN 'Our favorites, chosen for their creativity, innovation and impact'
    WHEN 'bestof.most_liked_title' THEN 'Most Liked'
    WHEN 'bestof.most_liked_description' THEN 'E-cards that have received the most likes from the community'
    WHEN 'bestof.top_rated_title' THEN 'Top Rated'
    WHEN 'bestof.top_rated_description' THEN 'E-cards with the highest average ratings'
    WHEN 'bestof.empty_message' THEN 'No e-cards in the Best-of yet'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'bestof.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 3: Explorer page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'explorer.page_title' THEN 'Explorer'
    WHEN 'explorer.description' THEN 'Search by keyword or browse by tags'
    WHEN 'explorer.search_placeholder' THEN 'Search by advertiser, agency, theme...'
    WHEN 'explorer.search_button' THEN 'Search'
    WHEN 'explorer.tags_title' THEN 'Explore by tags'
    WHEN 'explorer.filter_all' THEN 'All'
    WHEN 'explorer.no_tags_message' THEN 'No tags starting with this letter'
    WHEN 'explorer.results_title' THEN 'Results'
    WHEN 'explorer.no_results_message' THEN 'No results for'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'explorer.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 4: Catalogue page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'catalogue.page_title' THEN 'Get Inspired'
    WHEN 'catalogue.description_prefix' THEN 'Explore'
    WHEN 'catalogue.description_suffix' THEN 'in our collection'
    WHEN 'catalogue.no_results_title' THEN 'No e-cards match your search criteria'
    WHEN 'catalogue.no_results_hint' THEN 'Try modifying or removing some filters'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'catalogue.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 5: Millesime page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'millesime.page_title' THEN 'Vintage'
    WHEN 'millesime.description_prefix' THEN ''
    WHEN 'millesime.description_year' THEN 'from year'
    WHEN 'millesime.no_results' THEN 'No e-cards for this year'
    WHEN 'millesime.back_to_catalogue' THEN 'Back to catalog'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'millesime.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 6: ECard Detail page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'ecard_detail.link_copied' THEN 'Link copied to clipboard!'
    WHEN 'ecard_detail.not_found_title' THEN 'E-card not found'
    WHEN 'ecard_detail.back_to_catalogue' THEN 'Back to catalog'
    WHEN 'ecard_detail.view_original_button' THEN 'View original e-card'
    WHEN 'ecard_detail.flash_preview_label' THEN 'Flash Preview (Ruffle)'
    WHEN 'ecard_detail.flash_unavailable' THEN 'Flash preview unavailable'
    WHEN 'ecard_detail.field_vintage' THEN 'Vintage'
    WHEN 'ecard_detail.field_language' THEN 'Language'
    WHEN 'ecard_detail.field_type' THEN 'Type'
    WHEN 'ecard_detail.field_technology' THEN 'Technology'
    WHEN 'ecard_detail.field_agency' THEN 'Agency'
    WHEN 'ecard_detail.field_distributor' THEN 'Distributor'
    WHEN 'ecard_detail.share_button' THEN 'Share'
    WHEN 'ecard_detail.your_rating' THEN 'Your rating'
    WHEN 'ecard_detail.tags_title' THEN 'Tags'
    WHEN 'ecard_detail.credits_title' THEN 'Credits'
    WHEN 'ecard_detail.description_title' THEN 'Description'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'ecard_detail.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 7: Filters
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'filters.label' THEN 'Filters:'
    WHEN 'filters.advertiser' THEN 'Advertiser'
    WHEN 'filters.vintage' THEN 'Vintage'
    WHEN 'filters.agency' THEN 'Agency'
    WHEN 'filters.distributor' THEN 'Distributor'
    WHEN 'filters.technology' THEN 'Tech'
    WHEN 'filters.topic' THEN 'Theme'
    WHEN 'filters.clear_all' THEN 'Clear all'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'filters.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 8: Footer
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'footer.submit_ecard' THEN 'SUBMIT E-CARD'
    WHEN 'footer.about' THEN 'ABOUT'
    WHEN 'footer.contact' THEN 'CONTACT'
    WHEN 'footer.admin' THEN 'ADMIN'
    WHEN 'footer.legal_notice' THEN 'LEGAL NOTICE'
    WHEN 'footer.terms' THEN 'TERMS'
    WHEN 'footer.privacy' THEN 'PRIVACY'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'footer.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 9: ECard Grid & App
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'ecard_grid.no_results' THEN 'No e-cards found'
    WHEN 'app.not_found_title' THEN 'Page not found'
    WHEN 'app.back_to_home' THEN 'Back to home'
  END
FROM translation_keys tk
WHERE tk.key IN ('ecard_grid.no_results', 'app.not_found_title', 'app.back_to_home')
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 10: Admin pages (part 1)
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'admin.access_denied' THEN 'Access denied'
    WHEN 'admin.error_saving' THEN 'Error saving'
    WHEN 'admin.confirm_delete' THEN 'Are you sure you want to delete this e-card?'
    WHEN 'admin.error_deleting' THEN 'Error deleting'
    WHEN 'admin.error_invalid_image' THEN 'Please select a valid image'
    WHEN 'admin.error_image_size' THEN 'Image must not exceed 5 MB'
    WHEN 'admin.error_upload' THEN 'Upload error: '
    WHEN 'admin.rate_limit_error' THEN 'Too many attempts. Try again in'
    WHEN 'admin.rate_limit_minutes' THEN 'minutes.'
    WHEN 'admin.login_error' THEN 'Login error'
    WHEN 'admin.loading' THEN 'Loading...'
    WHEN 'admin.page_title' THEN 'Administration'
    WHEN 'admin.subtitle' THEN 'Corporate E-Cards'
    WHEN 'admin.field_email' THEN 'Email'
    WHEN 'admin.field_password' THEN 'Password'
    WHEN 'admin.login_button' THEN 'Sign in'
    WHEN 'admin.dashboard_title' THEN 'Administration'
    WHEN 'admin.translations_link' THEN 'Translations'
    WHEN 'admin.logout_button' THEN 'Logout'
    WHEN 'admin.stat_total_ecards' THEN 'Total E-Cards'
    WHEN 'admin.stat_total_views' THEN 'Total Views'
    WHEN 'admin.stat_total_likes' THEN 'Total Likes'
    WHEN 'admin.stat_avg_score' THEN 'Average Rating'
    WHEN 'admin.ecards_management_title' THEN 'E-Cards Management'
    WHEN 'admin.button_new_ecard' THEN 'Cancel / New E-Card'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'admin.%'
AND tk.key NOT LIKE 'admin_translations.%'
AND tk.key NOT IN ('admin.field_thumbnail', 'admin.upload_mode', 'admin.url_mode')
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 11: Admin pages (part 2)
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'admin.field_thumbnail' THEN 'Preview image'
    WHEN 'admin.upload_mode' THEN 'Upload'
    WHEN 'admin.url_mode' THEN 'External URL'
    WHEN 'admin.choose_image' THEN 'Choose image'
    WHEN 'admin.uploading' THEN 'Uploading...'
    WHEN 'admin.field_advertiser' THEN 'Advertiser *'
    WHEN 'admin.field_logo' THEN 'Advertiser logo *'
    WHEN 'admin.choose_logo' THEN 'Choose logo'
    WHEN 'admin.uploading_logo' THEN 'Uploading...'
    WHEN 'admin.logo_loaded' THEN 'Logo loaded'
    WHEN 'admin.delete_button' THEN 'Delete'
    WHEN 'admin.field_business_sector' THEN 'Business sector'
    WHEN 'admin.field_vintage' THEN 'Vintage *'
    WHEN 'admin.field_card_type' THEN 'Card type *'
    WHEN 'admin.placeholder_card_type' THEN 'Wishes, Birthday, etc.'
    WHEN 'admin.field_language' THEN 'Language'
    WHEN 'admin.language_options' THEN 'French / English / Spanish / German'
    WHEN 'admin.field_topic' THEN 'Theme'
    WHEN 'admin.field_technology' THEN 'Technology'
    WHEN 'admin.placeholder_technology' THEN 'HTML5, Flash, Video, etc.'
    WHEN 'admin.field_url' THEN 'E-card URL'
    WHEN 'admin.field_tags' THEN 'Tags (comma-separated)'
    WHEN 'admin.placeholder_tags' THEN 'wishes, luxury, digital, etc.'
    WHEN 'admin.field_description' THEN 'Description'
    WHEN 'admin.button_update' THEN 'Update'
    WHEN 'admin.button_create' THEN 'Create'
    WHEN 'admin.button_cancel' THEN 'Cancel'
    WHEN 'admin.ecard_summary' THEN 'views - likes'
    WHEN 'admin.no_ecards' THEN 'No e-cards in the database'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'admin.%'
AND tk.key NOT LIKE 'admin_translations.%'
AND tk.key IN (
  'admin.field_thumbnail', 'admin.upload_mode', 'admin.url_mode', 'admin.choose_image',
  'admin.uploading', 'admin.field_advertiser', 'admin.field_logo', 'admin.choose_logo',
  'admin.uploading_logo', 'admin.logo_loaded', 'admin.delete_button', 'admin.field_business_sector',
  'admin.field_vintage', 'admin.field_card_type', 'admin.placeholder_card_type', 'admin.field_language',
  'admin.language_options', 'admin.field_topic', 'admin.field_technology', 'admin.placeholder_technology',
  'admin.field_url', 'admin.field_tags', 'admin.placeholder_tags', 'admin.field_description',
  'admin.button_update', 'admin.button_create', 'admin.button_cancel', 'admin.ecard_summary', 'admin.no_ecards'
)
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 12: Admin Translations page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'admin_translations.error_loading' THEN 'Failed to load translations'
    WHEN 'admin_translations.success_saved' THEN 'Translation saved successfully'
    WHEN 'admin_translations.error_saving' THEN 'Failed to save'
    WHEN 'admin_translations.success_created' THEN 'Key created successfully'
    WHEN 'admin_translations.error_creating' THEN 'Failed to create key'
    WHEN 'admin_translations.confirm_delete' THEN 'Are you sure you want to delete this key and all its translations?'
    WHEN 'admin_translations.success_deleted' THEN 'Key deleted successfully'
    WHEN 'admin_translations.error_deleting' THEN 'Failed to delete'
    WHEN 'admin_translations.confirm_auto_translate' THEN 'Do you want to launch automatic translation for all missing English keys?'
    WHEN 'admin_translations.error_missing_languages' THEN 'French and English languages required'
    WHEN 'admin_translations.auto_translate_complete' THEN 'All translations already present'
    WHEN 'admin_translations.auto_translate_success' THEN 'translation(s) generated successfully'
    WHEN 'admin_translations.error_auto_translate' THEN 'Automatic translation failed'
    WHEN 'admin_translations.loading' THEN 'Loading...'
    WHEN 'admin_translations.access_denied' THEN 'Access denied'
    WHEN 'admin_translations.admin_required' THEN 'You must be an administrator to access this page.'
    WHEN 'admin_translations.back_home' THEN 'Back to home'
    WHEN 'admin_translations.page_title' THEN 'Translation Management'
    WHEN 'admin_translations.back_admin' THEN 'Back to admin'
    WHEN 'admin_translations.logout' THEN 'Logout'
    WHEN 'admin_translations.button_add_key' THEN 'Add translation key'
    WHEN 'admin_translations.button_auto_translate' THEN 'Auto-translate FR → EN'
    WHEN 'admin_translations.auto_translating' THEN 'Translating...'
    WHEN 'admin_translations.new_key_title' THEN 'New translation key'
    WHEN 'admin_translations.field_key_label' THEN 'Key (e.g. home.title)'
    WHEN 'admin_translations.placeholder_key' THEN 'section.subsection.key'
    WHEN 'admin_translations.field_context_label' THEN 'Context (optional)'
    WHEN 'admin_translations.placeholder_context' THEN 'Description for translators'
    WHEN 'admin_translations.button_create' THEN 'Create'
    WHEN 'admin_translations.button_cancel' THEN 'Cancel'
    WHEN 'admin_translations.button_save' THEN 'Save'
    WHEN 'admin_translations.delete_button' THEN 'Delete'
    WHEN 'admin_translations.default_language' THEN '(default)'
    WHEN 'admin_translations.placeholder_translation' THEN 'Translation in'
    WHEN 'admin_translations.no_keys' THEN 'No translation keys yet'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'admin_translations.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 13: GDPR page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'gdpr.page_title' THEN 'PRIVACY POLICY'
    WHEN 'gdpr.hero_title' THEN 'Protection of your personal data (GDPR)'
    WHEN 'gdpr.intro_paragraph' THEN 'In accordance with the General Data Protection Regulation (GDPR) and data protection laws, we are committed to protecting the confidentiality and security of your personal data. This policy explains how we collect, use and protect your information.'
    WHEN 'gdpr.collected_title' THEN 'Data Collected'
    WHEN 'gdpr.collected_intro' THEN 'As part of the use of our site, we may collect the following data:'
    WHEN 'gdpr.collected_navigation' THEN 'Navigation data: IP address, browser type, pages viewed, visit duration'
    WHEN 'gdpr.collected_contact' THEN 'Contact data: if you contact us or submit content (name, email)'
    WHEN 'gdpr.collected_cookies' THEN 'Cookies and trackers: to improve your browsing experience'
    WHEN 'gdpr.usage_title' THEN 'Use of Data'
    WHEN 'gdpr.usage_intro' THEN 'The data collected is used for the following purposes:'
    WHEN 'gdpr.usage_site' THEN 'Ensure the operation and security of the site'
    WHEN 'gdpr.usage_improve' THEN 'Improve our services and user experience'
    WHEN 'gdpr.usage_contact' THEN 'Respond to your requests and suggestions'
    WHEN 'gdpr.usage_stats' THEN 'Perform anonymous visitor statistics'
    WHEN 'gdpr.usage_guarantee' THEN 'Your data is never sold, rented or shared with third parties for commercial purposes without your explicit consent.'
    WHEN 'gdpr.rights_title' THEN 'Your Rights'
    WHEN 'gdpr.rights_intro' THEN 'In accordance with GDPR, you have the following rights regarding your personal data:'
    WHEN 'gdpr.rights_access' THEN 'Right of access: view the data we hold'
    WHEN 'gdpr.rights_rectify' THEN 'Right of rectification: correct inaccurate data'
    WHEN 'gdpr.rights_delete' THEN 'Right to erasure: delete your data'
    WHEN 'gdpr.rights_limit' THEN 'Right to limitation: restrict processing'
    WHEN 'gdpr.rights_portability' THEN 'Right to portability: receive your data in a structured format'
    WHEN 'gdpr.rights_oppose' THEN 'Right to object: object to the processing of your data'
    WHEN 'gdpr.rights_contact' THEN 'To exercise these rights, contact us at: privacy@ecards-archive.com'
    WHEN 'gdpr.security_title' THEN 'Security and Retention'
    WHEN 'gdpr.security_measures' THEN 'We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, destruction or alteration. Data is hosted on secure servers and is only accessible to authorized personnel.'
    WHEN 'gdpr.security_retention' THEN 'We retain your data only for the time necessary for the purposes for which it was collected, or in accordance with legal obligations. Navigation data is kept for a maximum of 13 months.'
    WHEN 'gdpr.cookies_title' THEN 'Cookies'
    WHEN 'gdpr.cookies_paragraph' THEN 'Our site uses cookies to improve your browsing experience and analyze traffic. You can configure your browser to refuse cookies at any time. However, some features of the site may be limited without cookie acceptance.'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'gdpr.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 14: Terms page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'terms.page_title' THEN 'TERMS OF USE'
    WHEN 'terms.hero_title' THEN 'Site usage rules'
    WHEN 'terms.intro_paragraph' THEN 'These Terms of Use define the rules for using the E-Cards Archive site. By accessing and using this site, you unreservedly accept these terms.'
    WHEN 'terms.purpose_title' THEN 'Purpose of the Site'
    WHEN 'terms.purpose_paragraph' THEN 'E-Cards Archive is a platform dedicated to archiving, documenting and showcasing advertising e-cards. The site offers a publicly accessible collection for research, creative inspiration and preservation of digital advertising heritage.'
    WHEN 'terms.access_title' THEN 'Site Access'
    WHEN 'terms.access_free' THEN 'Access to the site is free and open to all users with an Internet connection. We reserve the right to suspend or limit access to the site, particularly for maintenance, security or in case of abusive use.'
    WHEN 'terms.access_disclaimer' THEN 'We do not guarantee the absence of interruptions or errors in site access and disclaim all responsibility in case of temporary or permanent unavailability.'
    WHEN 'terms.content_title' THEN 'Content Use'
    WHEN 'terms.content_paragraph' THEN 'E-cards and content on the site remain the property of their respective creators and advertisers. The site acts only as an archiving and referencing platform. Any reproduction, representation or commercial use of archived content requires prior authorization from the rights holders.'
    WHEN 'terms.submission_title' THEN 'Content Submission'
    WHEN 'terms.submission_paragraph' THEN 'By submitting content (e-cards, information, comments), you guarantee that you have the necessary rights and agree that your contribution will be published and archived on our platform. We reserve the right to refuse or remove any inappropriate, illegal or contrary to our values content.'
    WHEN 'terms.liability_title' THEN 'Liability'
    WHEN 'terms.liability_paragraph' THEN 'Information published on the site is provided for informational purposes. We strive to ensure the accuracy of information, but cannot guarantee its completeness or permanent updating. The user is solely responsible for the use made of the content consulted.'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'terms.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');

-- Batch 15: Legal page
INSERT INTO translations (key_id, language_code, value)
SELECT tk.id, 'en',
  CASE tk.key
    WHEN 'legal.page_title' THEN 'LEGAL NOTICE'
    WHEN 'legal.hero_title' THEN 'Legal and editorial information'
    WHEN 'legal.intro_paragraph' THEN 'In accordance with the provisions of French law n° 2004-575 of June 21, 2004 for confidence in the digital economy, we inform you of the legal notices relating to the E-Cards Archive site.'
    WHEN 'legal.editor_title' THEN 'Site Editor'
    WHEN 'legal.editor_name' THEN 'Name or company name: [TO BE COMPLETED]'
    WHEN 'legal.editor_address' THEN 'Address: [TO BE COMPLETED]'
    WHEN 'legal.editor_email' THEN 'Email: contact@ecards-archive.com'
    WHEN 'legal.editor_director' THEN 'Publication director: [TO BE COMPLETED]'
    WHEN 'legal.hosting_title' THEN 'Hosting'
    WHEN 'legal.hosting_provider' THEN 'The site is hosted by:'
    WHEN 'legal.hosting_name' THEN 'Supabase Inc.'
    WHEN 'legal.hosting_address' THEN '970 Toa Payoh North, #07-04, Singapore 318992'
    WHEN 'legal.ip_title' THEN 'Intellectual Property'
    WHEN 'legal.ip_paragraph' THEN 'All content of this site (structure, texts, logos, images) is the exclusive property of its creators or is subject to a license to use. Any reproduction, distribution, modification or exploitation, even partial, without prior authorization is strictly prohibited and would constitute infringement sanctioned by intellectual property laws.'
    WHEN 'legal.liability_title' THEN 'Limitation of Liability'
    WHEN 'legal.liability_paragraph' THEN 'We strive to provide accurate and up-to-date information, but cannot guarantee the absence of errors or omissions. The user acknowledges using the information at his sole responsibility. We disclaim any responsibility for direct or indirect damages resulting from the use of the site.'
  END
FROM translation_keys tk
WHERE tk.key LIKE 'legal.%'
AND NOT EXISTS (SELECT 1 FROM translations t WHERE t.key_id = tk.id AND t.language_code = 'en');
