import {WithId} from "mongodb";

/**
 * Global Types used across the application
 */
export type TextBlock = {
    headline: string
    subHeading?: string
    text: string
}
export type Rating = {
    label: string
    stars: number
}
export type EmailPayload = {
    to: string
    subject: string
    html: string
}

export interface Testimonial {
    name: string
    testimonial: string
    stars: number
    image: string
}

export type HomeFeatureBlock = {
    tagline: string
    headline: string
    text: string
    action: Action
    portraitImage: ImageItem
    squareImage: ImageItem
}
export type Social = {
    name: string
    href: string
}
export type StaffDetails = {
    name: string
    role: string
    image: string
    featured: boolean
    portraitImage: string
    social: Social[],
    description?: string
}
export type StaffDescription = {
    name: string
    description: string
}
export type StaffAssurancesBlock = {
    assurances?: string[]
    heading?: string
    action?: Action
}
export type Staff = {
    assurancesBlock?: StaffAssurancesBlock
    staffDetails?: WithId<StaffDetails>[]
    featuredStaffDescription?: WithId<StaffDescription>[]
    heading?: string
    pageTitle?: string
    subHeading?: string
}
export type SchoolFeatures = {
    featureBlocks?: WithId<HomeFeatureBlock>[]
    features?: string[]
    heading?: string
    subHeading?: string
}
type Action = {
    label: string
    href: string
    icon: boolean
}

export type Hero = {
    tagline?: string
    headline?: string
    text?: string
    action?: Action
    image?: ImageItem,
    youTubeLink?: string
}

export type InfoSection = {
    headline: string
    text: string
    ages: string
    dates: string
    schedule: string
    classSize: string
}

export type DescriptionSection = {
    text: string
    portraitImage: string
    squareImage1: string
    squareImage2: string
}

export type Feature = {
    feature: string
}

export type Pricing = {
    name: string
    price: string
    interval: string
    shortDescription: string
    features: WithId<Feature>[]
    action: Action
}

export type PricingSection = {
    tagline: string
    headline: string
    text: string
    pricing1: Pricing
    pricing2: Pricing
    callToAction?: CallToActionBlock
}

export type SchoolProgram = {
    name: string
    dropdownDescription: string
    featured: boolean
    slug: string
    hero: Hero
    infoSection: InfoSection
    descriptionSection: DescriptionSection
    pricingSection: PricingSection
}
export type Faq = {
    question: string
    answer: string
}
export type ImageItem = { src: string; alt: string }
export type ValueItem = { value: string; description: string }
export type ValueData = {
    heading: string
    subHeading: string
    values: WithId<ValueItem>[]
    image: ImageItem
}
export type AlternatingFeaturesItem = {
    tagline: string
    headline: string
    text: string
    image: ImageItem
}
export type Stat = { label: string; value: string }

export type ParentsHeroItem = {
    label: string
    href: string
    description: string
    icon: string
}
export type EventItem = {
    name: string
    description: string
    dates: string
    image: string
}
export type NewsletterItem = {
    name: string
    description: string
    link: string
}
export type ContactInformationItem = {
    address?: string
    phone?: string
    email?: string
    hero?: Hero
}
export type GalleryItem = {
    src: string
    alt: string
    tag: string
}
export type FAQBlock = {
    faqs?: WithId<Faq>[]
    heading?: string
}
export type TestimonialsBlock = {
    heading?: string
    subHeading?: string
    testimonials?: Testimonial[]
}
export type SchoolProgramsBlock = {
    heading?: string
    schoolPrograms?: WithId<SchoolProgram>[]
    dateCreated: Date
}
export type HomeHeroBlock = {
    hero: Hero
    ratings: Rating[]
}
export type AlternatingFeaturesData = {
    sectionTitle?: string
    underlinedText?: string
    blocks: WithId<AlternatingFeaturesItem>[]
}
export type CallToActionBlock = {
    sectionTitle?: string
    underlinedText?: string
    action?: Action
}
export type StatsBlock = {
    heading: string
    subHeading: string
    stats: WithId<Stat>[]
}
export type StaffBlock = {
    staffDetails: WithId<StaffDetails>[]
}
export type StaffPageData = {
    assurancesBlock: StaffAssurancesBlock
    homeTextBlock: TextBlock
    aboutTextBlock: TextBlock
    dateCreated: Date
} & StaffBlock
export type HomePageData = {
    homeHero: WithId<HomeHeroBlock>
    ratings: Rating[]
    schoolFeatures: SchoolFeatures
    staff: Staff
    schoolProgramsBlock: SchoolProgramsBlock
    testimonialsBlock: TestimonialsBlock
    faqBlock: FAQBlock
    callToActionBlock: CallToActionBlock
    footer: TextBlock
    dateCreated: Date
}
export type AboutPageData = {
    title?: string
    subTitle?: string
    paragraph?: string
    aboutHero?: WithId<ImageItem>[]
    description?: string
    alternatingFeatures: AlternatingFeaturesData
    statsBlock: StatsBlock
    staffBlock: StaffBlock
    valueData: ValueData
    dateCreated: Date
}
export type ParentsPageData = {
    hero: Hero
    heroItems: WithId<ParentsHeroItem>[]
    events: WithId<EventItem>[]
    eventsText: TextBlock
    newsletters: WithId<NewsletterItem>[]
    dateCreated: Date
}
export type GalleryPageData = {
    gallery: WithId<GalleryItem>[]
    textBlock: TextBlock
    pageHero?: Hero
    dateCreated: Date
}
export type ContactPageData = {
    textBlock: TextBlock
    contactInformation: ContactInformationItem
    dateCreated: Date
}
export type SocialLinkProps = {
    className?: string
    href: string
    icon: string
}
type Status = {
    system: string;
    status: string;
};

type Incident = {
    // Define properties for Incident here
};

type Scheduled = {
    // Define properties for Scheduled here
};

export type HerokuStatuaResponseType = {
    status: Status[];
    incidents: Incident[];
    scheduled: Scheduled[];
};
