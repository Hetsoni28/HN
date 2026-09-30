import { defineConfig } from 'sanity';
import { visionTool } from '@sanity/vision';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'hn-studio',
  title: 'HN Studio',
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'replace-me',
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  auth: {
    providers: [
      {
        name: 'token',
        title: 'Token',
        url: '',
        logo: '',
      },
    ],
    loginMethod: 'cookie',
  },
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
