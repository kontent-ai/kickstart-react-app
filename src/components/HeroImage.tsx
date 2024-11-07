import { FC } from "react";

const HeroImage: FC = () => {
  return (
    <div className="flex flex-col xl:flex-row pt-10 xl:pt-[104px] pb-10 xl:pb-[160px] gap-12">
      <div className="xl:basis-1/2">
        <h1 className="text-center xl:text-left font-libre text-[64px] md:text-[94px] text-burgundy font-bold leading-[64px] md:leading-[78px]">
          Welcome To Karma Health's Nutritional Services
        </h1>
        <p className="text-center xl:text-left font-sans text-xl text-gray">
          At Karma Health, we believe that good nutrition is the foundation of a healthy, vibrant life. Our team of
          expert nutritionists and registered dietitians is dedicated to helping you achieve your wellness goals through
          personalized, evidence-based nutritional guidance.
        </p>
      </div>
      <div className="xl:basis-1/2">
        <img
          className=" object-cover"
          src="https://s3-alpha-sig.figma.com/img/c538/ca90/a2333ce79ab1afa7f35c030d4f85629d?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HVERJ-HtcYlCN223QnHseGjEa5z2xCjuW4~BPx6qhtgXFKKR1HkAc2V4SJMfLPYCVqO~NMhR7s2jFRf021b~WXZTM7hfSd2Rc6H-egeRBH-tmYu9R~wVqzeICbq0DBqHpvbpTcz0jjnKxv~bG54WHheU4gZTupoLKE4KFwxjInV6hR0lbemT7u8Fq7orMA45HzdQ3Gfw4IkXgRcpy2t~rlE8pKtdha2Dl0fM6AKAmqmyG6x~dDjSRmnTiuiFmMXjeUPobQywEfmOP-AUruPGQF5oowucRcOC8NCMyXJ-aHGnvraXAzDnh6y1RJWJVVBZDxJgx5tC~a~mrNw-JX3pbA__"
        >
        </img>
      </div>
    </div>
  );
};

export default HeroImage;
