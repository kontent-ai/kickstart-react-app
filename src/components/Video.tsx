import { FC } from "react";

const Video: FC = () => {
  return (
    <div className="inline-flex flex-col items-center">
      <h2 className="text-azure text-[64px] leading-[54px] w-2/4 text-center">
        Personalized Nutrition Plans
      </h2>
      <p className="w-4/6 text-center text-xl pt-6 text-gray">
        We create tailored nutrition plans that fit your unique lifestyle, health concerns, and dietary preferences. Our
        experts work closely with you to develop realistic, achievable goals that promote long-term health and
        well-being.
      </p>
      <figure className="pt-20">
        <img
          className="w-4/6 block m-auto"
          src="https://s3-alpha-sig.figma.com/img/8e6a/818f/cd7d1661c8c0dc1fb6059331c67755a2?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iwkc5kFUQAJW0200J~vTvgGqV0ESVThGNcQhVXqth-CPR1ItOOHAzKHdoGRrUNzVQBYuAG~v6lbVTPFxnMD05smjphsPEPC4QgRWdX31pNZL9AMd8e1rQLZ7jC5DfsHG9vbvInvMTC75q1ejUEbye0ZkKtaR036bftedA64DDHlouhUffRmDMnU-OhGfq1~8LZvoVXemu4EJMqAk~aMku-o21iTUGqL5fyg~5HSk2198u~8bDc59YoQJl9uKfA8fJs2DbdLBE00l0QbmVeyCUST2EnusS~0hBykETgyCCN0frm4XEiCr5X66yViMEFT~34XMIS4YEFZmuyITqEsUVQ__"
        >
        </img>
        <figcaption className="text-gray-light block m-auto w-fit text-xl pt-6">
          How we optimize your performance
        </figcaption>
      </figure>
    </div>
  );
};

export default Video;
