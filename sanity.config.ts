import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const isSanityConfigured = Boolean(
  rawProjectId &&
  rawProjectId !== 'placeholder-project-id' &&
  rawProjectId !== 'your_project_id_here' &&
  rawProjectId !== 'dummy123' &&
  rawProjectId !== 'unconfigured' &&
  !rawProjectId.includes('placeholder')
);

export const projectId = isSanityConfigured ? rawProjectId! : '';
export const dataset = rawDataset || 'production';

export default defineConfig({
  name: 'hn-studio',
  title: 'HN Studio',
  projectId: projectId || 'unconfigured',
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});

