export type Project = {
  slug: string;
  title: string;
  location: string;
  type: string;
  year: string;
  area: string;
  accent: 'sand' | 'clay' | 'olive';
};

export const projects: Project[] = [
  { slug: 'courtyard-house', title: 'The Courtyard House', location: 'Pune, Maharashtra', type: 'Residential', year: '2025', area: '3,800 sq.ft.', accent: 'sand' },
  { slug: 'casa-verde', title: 'Casa Verde', location: 'Alibaug, Maharashtra', type: 'Residential', year: '2025', area: '4,600 sq.ft.', accent: 'clay' },
  { slug: 'urban-frame', title: 'Urban Frame', location: 'Mumbai, Maharashtra', type: 'Residential', year: '2024', area: '5,200 sq.ft.', accent: 'olive' },
  { slug: 'atrium-office', title: 'The Atrium Office', location: 'Pune, Maharashtra', type: 'Commercial', year: '2024', area: '7,800 sq.ft.', accent: 'sand' },
  { slug: 'aranya-retreat', title: 'Aranya Retreat', location: 'Lonavala, Maharashtra', type: 'Hospitality', year: '2023', area: '9,400 sq.ft.', accent: 'clay' },
  { slug: 'garden-pavilion', title: 'Garden Pavilion', location: 'Nashik, Maharashtra', type: 'Landscape', year: '2023', area: '12,000 sq.ft.', accent: 'olive' },
];
