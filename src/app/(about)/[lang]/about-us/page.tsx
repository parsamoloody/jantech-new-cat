import React from 'react'
import { getDictionary } from "@/lib/dictionaries";
import { Locale } from '@/lib/i18n.config';
import AboutUs from './about';

const About = async ({ params }: {
  params: Promise<{ lang: Locale }>
}) => {
  const lang = (await params).lang || "fa"
  const d = (await getDictionary(lang)).about;
  if (!d) return
  return (
    <div>
      <AboutUs props={d} />
    </div>
  )
}

export default About
