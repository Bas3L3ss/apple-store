import ProductHero from "../components/product/product-hero";
import { images1, images2, products } from "../lib/mockData";
import ProductGrid from "../components/product/product-home-grid";
import { CardCarousel } from "../components/ui/card-carousel";
import { SkiperCard } from "../components/ui/skiper-card";
import { cn } from "../lib/utils";
import { AppleProductMarquee } from "../components/ui/skiper-marquee";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Apple Store"
        description="Welcome to the Apple Store Clone. Shop the latest Apple products."
        canonical="https://your-website.com/" //TODO: fix later
        image="https://your-website.com/banner.png"
      />
      <section>
        {products.map((product) => (
          <ProductHero key={product._id} product={product} />
        ))}
        <ProductGrid />
        <article className="w-full">
          <CardCarousel
            images1={images1}
            images2={images2}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}
          />
        </article>
        <article className="relative w-full">
          <div className="select-none absolute w-full">
            <AppleProductMarquee />
          </div>
          <div className=" p-2">
            <div className="mb-8 mx-auto pt-4 md:container">
              <div className=" mx-auto">
                <div className=" mx-auto max-w-4xl rounded-[34px] bg-neutral-700">
                  <div className="relative z-10 grid w-full gap-8 rounded-[28px] bg-neutral-950 p-2">
                    <SkiperCard
                      step1img1Class={cn(
                        "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                        "left-1/4 top-[57%] rounded-[24px] max-md:scale-[160%] max-md:rounded-[24px] md:left-[35px] md:top-[29%]",
                        "md:group-hover:translate-y-2"
                      )}
                      step1img2Class={cn(
                        "pointer-events-none w-3/5 overflow-hidden border border-stone-100/10 transition-all duration-500 dark:border-stone-700/50",
                        "left-[69%] top-[53%] rounded-2xl max-md:scale-[160%] max-md:rounded-[24px] md:left-[calc(50%+35px+1rem)] md:top-[21%]",
                        "md:group-hover:-translate-y-6 "
                      )}
                      step2img1Class={cn(
                        "pointer-events-none w-[50%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                        "left-1/4 top-[69%] max-md:scale-[160%] md:left-[35px] md:top-[30%]",
                        "md:group-hover:translate-y-2"
                      )}
                      step2img2Class={cn(
                        "pointer-events-none w-2/5 overflow-hidden rounded-2xl rounded-t-[24px] border border-stone-100/10 transition-all duration-500 group-hover:-translate-y-6 dark:border-stone-700",
                        "left-[70%] top-[53%] max-md:scale-[140%] md:left-[calc(50%+27px+1rem)] md:top-1/4",
                        "md:group-hover:-translate-y-6"
                      )}
                      step3imgClass={cn(
                        "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                        "left-[5%] top-[50%] md:left-1/2 md:left-[68px] md:top-[30%]"
                      )}
                      step4imgClass={cn(
                        "pointer-events-none w-[90%] overflow-hidden rounded-t-[24px] border border-stone-100/10 transition-all duration-500 dark:border-stone-700",
                        "left-[5%] top-[50%] md:left-1/2 md:left-[68px] md:top-[30%]"
                      )}
                      description="Choose your product 🤌"
                      bgClass="lg:bg-gradient-to-tr"
                      // @ts-expect-error: ProductHero expects different props, but this is intentional
                      image={{
                        step1light1: "family",
                        step1light2: "shiftCard",
                        step2light1: "carousel",
                        step2light2: "textureFull",
                        step3light: "textureCard",
                        step4light: "skiper,",
                        alt: "Something",
                      }}
                      title="Fit your style"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Home;
