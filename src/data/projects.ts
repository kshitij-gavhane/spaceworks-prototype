export type Project = {
  slug: string;
  title: string;
  type: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  { slug: 'courtyard-house', title: 'The Courtyard House', type: 'Residential', excerpt: 'A climate-conscious home organised around a quiet internal court.', image: '/images/inspiration/courtyard-house.jpg', imageAlt: 'Contemporary timber and glass home set among mature trees' },
  { slug: 'casa-verde', title: 'Casa Verde', type: 'Residential', excerpt: 'A relaxed weekend house with deep thresholds between indoors and landscape.', image: '/images/inspiration/living-space.jpg', imageAlt: 'Contemporary living room arranged around daylight and natural materials' },
  { slug: 'urban-frame', title: 'Urban Frame', type: 'Residential', excerpt: 'A compact urban residence shaped around privacy, light and framed views.', image: '/images/inspiration/architecture-exterior.jpg', imageAlt: 'Sculptural contemporary building with a glass and metal facade' },
  { slug: 'atrium-office', title: 'The Atrium Office', type: 'Commercial', excerpt: 'A work environment using an internal atrium to make daylight the organiser.', image: '/images/inspiration/workplace.jpg', imageAlt: 'Modern glass-and-steel workplace architecture' },
  { slug: 'aranya-retreat', title: 'Aranya Retreat', type: 'Hospitality', excerpt: 'A low-key retreat that keeps built form close to the terrain and trees.', image: '/images/inspiration/landscape.jpg', imageAlt: 'Sunlight filtering through a dense green woodland' },
  { slug: 'garden-pavilion', title: 'Garden Pavilion', type: 'Landscape', excerpt: 'A landscape-led pavilion connecting arrival, shade, planting and gathering.', image: '/images/inspiration/architecture-study.jpg', imageAlt: 'Interior architectural study with glazed partitions and warm finishes' },
];
