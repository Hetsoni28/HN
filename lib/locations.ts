export interface City {
  slug: string;
  name: string;
  state: string;
}

export interface ServiceItem {
  slug: string;
  name: string;
}

export const CITIES: City[] = [
  { slug: 'ahmedabad',  name: 'Ahmedabad',  state: 'Gujarat'           },
  { slug: 'surat',      name: 'Surat',      state: 'Gujarat'           },
  { slug: 'vadodara',   name: 'Vadodara',   state: 'Gujarat'           },
  { slug: 'rajkot',     name: 'Rajkot',     state: 'Gujarat'           },
  { slug: 'gandhinagar',name: 'Gandhinagar',state: 'Gujarat'           },
  { slug: 'mumbai',     name: 'Mumbai',     state: 'Maharashtra'       },
  { slug: 'pune',       name: 'Pune',       state: 'Maharashtra'       },
  { slug: 'bangalore',  name: 'Bangalore',  state: 'Karnataka'         },
  { slug: 'delhi',      name: 'Delhi',      state: 'Delhi'             },
  { slug: 'hyderabad',  name: 'Hyderabad',  state: 'Telangana'         },
];

export const SERVICES_LIST: ServiceItem[] = [
  { slug: 'web-development',        name: 'Web Development'         },
  { slug: 'web-app-development',    name: 'Web App Development'     },
  { slug: 'saas-development',       name: 'SaaS Development'        },
  { slug: 'mobile-app-development', name: 'Mobile App Development'  },
  { slug: 'ai-development',         name: 'AI Development'          },
];

export function getCityName(slug: string): string {
  return CITIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function getServiceName(slug: string): string {
  return SERVICES_LIST.find((s) => s.slug === slug)?.name ?? slug;
}
