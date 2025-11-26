import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'

import DynamicNavbar from '../components/DynamicNavbar'
import Hero from '../components/hero'
import Features1 from '../components/features1'
import CTA from '../components/cta'
import Features2 from '../components/features2'
import Steps from '../components/steps'
import Testimonial from '../components/testimonial'
import Contact from '../components/contact'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import './home.css'

const Home = () => {
  const { getText, getImage } = usePageContent('home')

  const heroImages = useMemo(
    () => ({
      image1: getImage('hero', 'image1'),
      image2: getImage('hero', 'image2'),
      image3: getImage('hero', 'image3'),
      image4: getImage('hero', 'image4'),
      image5: getImage('hero', 'image5'),
      image6: getImage('hero', 'image6'),
      image7: getImage('hero', 'image7'),
      image8: getImage('hero', 'image8'),
      image9: getImage('hero', 'image9'),
      image10: getImage('hero', 'image10'),
      image11: getImage('hero', 'image11'),
      image12: getImage('hero', 'image12'),
    }),
    [getImage]
  )

  return (
    <div className="home-container">
      <Helmet>
        <title>
          {getText(
            'seo',
            'title',
            'HĀRVÉST (Holistic Advancement for Rural Vitality, Empowerment, and Sustainable Transformation)'
          )}
        </title>
      </Helmet>
      <DynamicNavbar rootClassName="navbarroot-class-name" />
      <Hero
        heading1={getText('hero', 'heading1')}
        content1={getText('hero', 'content1')}
        action1={getText('hero', 'action_primary')}
        action2={getText('hero', 'action_secondary')}
        image1Src={heroImages.image1?.src || '/images/image1.png'}
        image1Alt={heroImages.image1?.alt}
        image2Src={heroImages.image2?.src}
        image2Alt={heroImages.image2?.alt}
        image3Src={heroImages.image3?.src}
        image3Alt={heroImages.image3?.alt}
        image4Src={heroImages.image4?.src}
        image4Alt={heroImages.image4?.alt}
        image5Src={heroImages.image5?.src}
        image5Alt={heroImages.image5?.alt}
        image6Src={heroImages.image6?.src}
        image6Alt={heroImages.image6?.alt}
        image7Src={heroImages.image7?.src}
        image7Alt={heroImages.image7?.alt}
        image8Src={heroImages.image8?.src}
        image8Alt={heroImages.image8?.alt}
        image9Src={heroImages.image9?.src}
        image9Alt={heroImages.image9?.alt}
        image10Src={heroImages.image10?.src}
        image10Alt={heroImages.image10?.alt}
        image11Src={heroImages.image11?.src}
        image11Alt={heroImages.image11?.alt}
        image12Src={heroImages.image12?.src}
        image12Alt={heroImages.image12?.alt}
      />
      <Features1
        feature1Title={getText('features', 'feature1_title')}
        feature1Description={getText('features', 'feature1_description')}
        feature1ImgSrc={getImage('features', 'feature1_image')?.src}
        feature1ImgAlt={getImage('features', 'feature1_image')?.alt}
        feature2Title={getText('features', 'feature2_title')}
        feature2Description={getText('features', 'feature2_description')}
        feature2ImgSrc={getImage('features', 'feature2_image')?.src}
        feature2ImgAlt={getImage('features', 'feature2_image')?.alt}
        feature3Title={getText('features', 'feature3_title')}
        feature3Description={getText('features', 'feature3_description')}
        feature3ImgSrc={getImage('features', 'feature3_image')?.src}
        feature3ImgAlt={getImage('features', 'feature3_image')?.alt}
      />
      <CTA
        heading1={getText('cta', 'heading1')}
        content1={getText('cta', 'content1')}
        action1={getText('cta', 'action1', 'Get Involved')}
      />
      <Features2
        feature1Title={getText('programs', 'feature1_title')}
        feature1Description={getText('programs', 'feature1_description')}
        feature2Title={getText('programs', 'feature2_title')}
        feature2Description={getText('programs', 'feature2_description')}
        feature3Title={getText('programs', 'feature3_title')}
        feature3Description={getText('programs', 'feature3_description')}
      />
      <Steps
        step1Title={getText('steps', 'step1_title')}
        step1Description={getText('steps', 'step1_description')}
        step2Title={getText('steps', 'step2_title')}
        step2Description={getText('steps', 'step2_description')}
        step3Title={getText('steps', 'step3_title')}
        step3Description={getText('steps', 'step3_description')}
      />
      <Testimonial
        quote1={getText('testimonials', 'quote1')}
        author1={getText('testimonials', 'author1')}
        quote2={getText('testimonials', 'quote2')}
        author2={getText('testimonials', 'author2')}
      />
      <Contact
        heading1={getText('contact', 'heading1')}
        content1={getText('contact', 'content1')}
        content2={getText('contact', 'eyebrow')}
        content3={getText('contact', 'email_helper')}
        email1={getText('contact', 'email')}
        content4={getText('contact', 'phone_helper')}
        phone1={getText('contact', 'phone')}
        content5={getText('contact', 'address_helper')}
        address1={getText('contact', 'address')}
      />
      <DynamicFooter />
    </div>
  )
}

export default Home
