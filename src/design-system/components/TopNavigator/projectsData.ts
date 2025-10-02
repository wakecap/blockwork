export const projectsData = [
  {
    organizationId: "wakecap-tech",
    organizationName: "Wakecap Technologies",
    projects: [
      { id: "proj-1", name: "Construction Site Alpha" },
      { id: "proj-2", name: "Building Project Beta" },
      { id: "proj-3", name: "Infrastructure Gamma" },
      { id: "proj-4", name: "Highway Extension" },
      { id: "proj-5", name: "Metro Station Delta" },
      { id: "proj-6", name: "Airport Terminal" },
    ],
  },
  {
    organizationId: "smart-construction",
    organizationName: "Smart Construction Ltd",
    projects: [
      { id: "proj-7", name: "Tower Development" },
      { id: "proj-8", name: "Mall Construction" },
      { id: "proj-9", name: "Parking Garage" },
      { id: "proj-10", name: "Hotel Complex" },
      { id: "proj-11", name: "Stadium Project" },
    ],
  },
  {
    organizationId: "urban-builders",
    organizationName: "Urban Builders Inc",
    projects: [
      { id: "proj-12", name: "Residential Complex" },
      { id: "proj-13", name: "Office Building" },
      { id: "proj-14", name: "Shopping Center" },
      { id: "proj-15", name: "University Campus" },
      { id: "proj-16", name: "Medical Center" },
      { id: "proj-17", name: "Tech Park" },
    ],
  },
  {
    organizationId: "global-infrastructure",
    organizationName: "Global Infrastructure Corp",
    projects: [
      { id: "proj-18", name: "Bridge Construction" },
      { id: "proj-19", name: "Water Treatment Plant" },
      { id: "proj-20", name: "Power Station" },
      { id: "proj-21", name: "Tunnel Project" },
      { id: "proj-22", name: "Port Expansion" },
    ],
  },
  {
    organizationId: "metropolitan-developers",
    organizationName: "Metropolitan Developers",
    projects: [
      { id: "proj-23", name: "City Center Plaza" },
      { id: "proj-24", name: "Luxury Condominiums" },
      { id: "proj-25", name: "Business District" },
      { id: "proj-26", name: "Cultural Center" },
      { id: "proj-27", name: "Sports Complex" },
      { id: "proj-28", name: "Transportation Hub" },
    ],
  },
  {
    organizationId: "industrial-solutions",
    organizationName: "Industrial Solutions Ltd",
    projects: [
      { id: "proj-29", name: "Manufacturing Plant" },
      { id: "proj-30", name: "Warehouse Facility" },
      { id: "proj-31", name: "Distribution Center" },
      { id: "proj-32", name: "Factory Expansion" },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
};

export type Organization = {
  organizationId: string;
  organizationName: string;
  projects: Project[];
};

export type ProjectsData = Organization[];
