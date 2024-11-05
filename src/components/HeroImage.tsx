import { FC } from "react";
import Container from "./Container";

const HeroImage: FC = () => {
  return (
    <div className="bg-creme min-h-[770px]">
      <Container>
        <div className="flex flex-row pt-[104px] gap-12">
          <div className="">
            <h1 className="font-libre text-[94px] text-burgundy font-bold leading-[78px]">
              Welcome To Karma Health's Nutritional Services
            </h1>
            <p className="font-sans text-xl text-gray">
              At Karma Health, we believe that good nutrition is the foundation of a healthy, vibrant life. Our team of
              expert nutritionists and registered dietitians is dedicated to helping you achieve your wellness goals
              through personalized, evidence-based nutritional guidance.
            </p>
          </div>
          <img
            className="w-[670px] h-[440px]"
            height="440"
            width="670"
            src="https://s3-alpha-sig.figma.com/img/c538/ca90/a2333ce79ab1afa7f35c030d4f85629d?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HVERJ-HtcYlCN223QnHseGjEa5z2xCjuW4~BPx6qhtgXFKKR1HkAc2V4SJMfLPYCVqO~NMhR7s2jFRf021b~WXZTM7hfSd2Rc6H-egeRBH-tmYu9R~wVqzeICbq0DBqHpvbpTcz0jjnKxv~bG54WHheU4gZTupoLKE4KFwxjInV6hR0lbemT7u8Fq7orMA45HzdQ3Gfw4IkXgRcpy2t~rlE8pKtdha2Dl0fM6AKAmqmyG6x~dDjSRmnTiuiFmMXjeUPobQywEfmOP-AUruPGQF5oowucRcOC8NCMyXJ-aHGnvraXAzDnh6y1RJWJVVBZDxJgx5tC~a~mrNw-JX3pbA__"
          >
          </img>
        </div>
      </Container>
    </div>
  );
};

export default HeroImage;
