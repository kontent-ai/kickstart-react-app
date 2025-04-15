import { NavLink, useSearchParams } from "react-router-dom";
import { createPreviewLink } from "../utils/link";

const PersonCard: React.FC<{
  prefix?: string;
  firstName: string;
  lastName: string;
  suffix?: string;
  jobTitle: string;
  image: {
    url: string;
    alt: string;
  };
}> = ({ prefix, firstName, lastName, suffix, jobTitle, image }) => {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  return (
    <div className="flex gap-4 items-center">
      <img src={image.url} alt={image.alt} className="w-[95px] h-[95px] object-cover rounded-full" />
      <div className="flex flex-col gap-2 items-start max-w-[325px]">
        <NavLink
          to={createPreviewLink(`/team/${firstName}-${lastName}`, isPreview)}
          className="text-heading-4 underline text-burgundy hover:text-azure"
        >
          {prefix && <span>{prefix}</span>}
          {firstName} {lastName}
          {suffix && <span>, {suffix}</span>}
        </NavLink>
        <p className="text-small text-grey">
          {jobTitle}
        </p>
      </div>
    </div>
  );
};

export default PersonCard;
