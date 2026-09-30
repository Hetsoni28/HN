'use client';

// The hosted studio is also available at https://zpuvaooc.sanity.studio
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
