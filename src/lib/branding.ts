interface BrandConfig {
  name: string;
  logoPath: string;
  logoAlt: string;
  docsUrl: string;
  githubUrl?: string;
  githubText: string;
  showGithub: boolean;
}

const brandConfigs: Record<string, BrandConfig> = {
  'OpenFGA': {
    name: 'OpenFGA',
    logoPath: '/openfga-logo.svg',
    logoAlt: 'The OpenFGA Logo',
    docsUrl: 'https://openfga.dev/docs',
    githubUrl: 'https://github.com/openfga',
    githubText: 'View the code on GitHub →',
    showGithub: true,
  },
  'Auth0 FGA': {
    name: 'Auth0 FGA',
    logoPath: '/auth0fga-logo.svg',
    logoAlt: 'The Auth0 FGA Logo',
    docsUrl: 'https://docs.fga.dev/',
    githubText: 'View Auth0 FGA on GitHub →',
    showGithub: false,
  }
};

function getBrandName(): string {
  // For server-side rendering, use process.env
  if (typeof process !== 'undefined' && process.env) {
    return process.env.FGA_BRAND || 'OpenFGA';
  }
  // For client-side, check if process.env is available (Next.js makes it available)
  if (typeof window !== 'undefined' && process?.env) {
    return process.env.FGA_BRAND || 'OpenFGA';
  }
  // Fallback to default
  return 'OpenFGA';
}

function getBrandConfig(): BrandConfig {
  const brandName = getBrandName();
  return brandConfigs[brandName] || brandConfigs['OpenFGA'];
}

export const brand = getBrandConfig();
export { getBrandName };
