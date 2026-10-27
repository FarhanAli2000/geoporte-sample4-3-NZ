// Site navigation data shared by the header, mobile menu, footer and page sidebars.

export const GEOTECHNICAL = [
  ['proof-engineering-services-of-geotechnical-design', 'Proof Engineering Services of geotechnical design'],
  ['slope-stability-assessment-and-design-of-slope-stabilization-works', 'Slope Stability Assessment & Stabilization Design'],
  ['reclamation-works-design', 'Reclamation works design'],
  ['road-subgrade-assessment-and-design', 'Road Subgrade Assessment and Design'],
  ['temporary-works-design', 'Temporary Works Design'],
  ['retention-systems', 'Retention Systems'],
  ['earthworks-design', 'Earthworks Design'],
  ['pipelines', 'Pipelines'],
  ['ground-settlement-static-and-seismic', 'Ground Settlement (Static and Seismic)'],
  ['ground-improvement-design', 'Ground Improvement design'],
  ['seismic-hazard-analyses-and-earthquake-geotechnical-design', 'Seismic hazard analyses and earthquake geotechnical design'],
  ['site-investigation-planning-and-reporting', 'Site Investigation Planning and Reporting'],
  ['forensic-geotechnical-engineering-including-investigations-of-geotechnical-failures', 'Forensic Geotechnical Engineering and investigating failures'],
  ['numerical-modelling', 'Numerical Modelling'],
  ['pavement-profile-design', 'Pavement Profile Design'],
  ['desktop-studies-and-geohazard-geotechnical-assessment', 'Desktop Studies and Geohazard Geotechnical Assessment'],
];

// `null` slug marks the Geotechnical Engineering entry, which links to the home page services section.
export const SERVICES = [
  ['civil-engineering', 'Civil Engineering'],
  ['design-and-drafting', 'Design and Drafting'],
  [null, 'Geotechnical Engineering'],
  ['structural-engineering', 'Structural Engineering'],
  ['stormwater-and-flood-modelling', 'Stormwater and Flood Modelling'],
  ['project-control-services', 'Project Control Services'],
  ['advisory-services', 'Advisory Services'],
  ['telecom-services', 'Telecom Services'],
];

export const ABOUT = [
  ['about-us', 'About Us'],
  ['our-team', 'Our Team'],
];

export const LEGAL = [
  ['privacy-policy', 'Privacy Policy'],
  ['terms-of-use', 'Terms of Use'],
  ['cookie-policy', 'Cookie Policy'],
  ['disclaimer', 'Disclaimer'],
];

export const OFFICES = [
  ['Auckland', 'New Zealand', '110 Carlton Gore Road, New Market, Auckland, New Zealand 1023'],
];

export const PHONES = [
  ['+64212870714', '+64 (0) 212 87 0714', 'New Zealand'],
];

export const EMAIL = 'enquiries@geoporte.com.au';

// Links to home-page sections stay in-page on the home page (smooth scroll) and absolute elsewhere.
export const homeLink = (home, hash = '') => (home ? hash || '#home' : '/' + hash);
