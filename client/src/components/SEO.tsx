import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

interface AlternateLanguage {
  lang: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  language?: string;
  meta?: Record<string, string>; // Key-value meta tags
  type?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: Record<string, unknown>;
  alternateLanguages?: AlternateLanguage[];
}

const SEO = ({
  title,
  description,
  canonical,
  image,
  language = "en",
  meta = {},
  type = "website",
  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,
  structuredData,
  alternateLanguages = [],
}: SEOProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount((prev) => prev + 1);
    console.log(count);
  }, [title]);
  const metaTags = [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (canonical) {
    //@ts-expect-error: it's fine
    metaTags.push({ rel: "canonical", href: canonical } as {
      rel: string;
      href: string;
    });
  }

  if (image) {
    metaTags.push({ property: "og:image", content: image });
    metaTags.push({ name: "twitter:image", content: image });
  }

  if (twitterSite) {
    metaTags.push({ name: "twitter:site", content: twitterSite });
  }

  if (twitterCreator) {
    metaTags.push({ name: "twitter:creator", content: twitterCreator });
  }

  Object.entries(meta).forEach(([name, content]) => {
    metaTags.push({ name, content });
  });

  return (
    <Helmet
      htmlAttributes={{ lang: language }}
      title={title}
      meta={metaTags}
      link={[
        ...(canonical ? [{ rel: "canonical", href: canonical }] : []),
        ...alternateLanguages.map(({ lang, url }) => ({
          rel: "alternate",
          hrefLang: lang,
          href: url,
        })),
      ]}
    >
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
