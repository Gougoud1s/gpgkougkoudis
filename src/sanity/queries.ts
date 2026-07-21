import { groq } from "next-sanity";

export const homepageQuery = groq`*[_type == "homepage"][0]{
  ...,
  "heroImage": heroImage{ ..., asset->{url, metadata{lqip, dimensions}} },
  "storyImage": storyImage{ ..., asset->{url, metadata{lqip, dimensions}} },
  featuredCollections[]->{ _id, title, slug, image, description },
  featuredProducts[]->{
    _id, title, slug, sku, price, priceOnRequest,
    images[]{ ..., asset->{url, metadata{lqip, dimensions}} },
    category->{title, slug}
  },
  featuredServices[]->{ _id, title, tagline, slug, icon, image, shortDescription },
  featuredTestimonials[]->{ _id, author, quote, rating, source, publishedAt }
}`;

export const allCategoriesQuery = groq`*[_type == "category"] | order(order asc){
  _id, title, slug, image, description, icon, featured
}`;

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0]{
  _id, title, slug, image, description,
  "products": *[_type == "product" && references(^._id)] | order(publishedAt desc){
    _id, title, slug, sku, material, karat, stone, occasion, price, priceOnRequest,
    images[]{ ..., asset->{url, metadata{lqip, dimensions}} }
  }
}`;

export const allProductSlugsQuery = groq`*[_type == "product" && defined(slug.current)]{
  "slug": slug.current,
  "category": category->slug.current
}`;

export const allCategorySlugsQuery = groq`*[_type == "category" && defined(slug.current)]{
  "slug": slug.current
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  ...,
  category->{ _id, title, slug },
  images[]{ ..., asset->{url, metadata{lqip, dimensions}} },
  "related": *[_type == "product" && category._ref == ^.category._ref && _id != ^._id][0...4]{
    _id, title, slug, price, priceOnRequest,
    images[0]{ ..., asset->{url, metadata{lqip, dimensions}} }
  }
}`;

export const allServicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, tagline, slug, icon, image, shortDescription, featured
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  ...,
  image{..., asset->{url, metadata{lqip, dimensions}}},
  gallery[]{..., asset->{url, metadata{lqip, dimensions}}}
}`;

export const allTestimonialsQuery = groq`*[_type == "testimonial"] | order(publishedAt desc){
  _id, author, rating, quote, source, publishedAt
}`;

export const allFaqsQuery = groq`*[_type == "faq"] | order(order asc){
  _id, question, answer, category
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const contentPageByRouteQuery = groq`*[_type == "contentPage" && route == $route][0]{
  ...,
  heroImage{..., asset->{url, metadata{lqip, dimensions}}},
  sections[]{
    ...,
    image{..., asset->{url, metadata{lqip, dimensions}}},
    items[]{..., image{..., asset->{url, metadata{lqip, dimensions}}}}
  }
}`;

export const allUiTextQuery = groq`*[_type == "uiText"]{key, value}`;
