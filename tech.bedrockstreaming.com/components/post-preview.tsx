import Authors from "./authors";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";
import markdownStyles from "./markdown-styles.module.css";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author[];
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <article className={"py-[5%]"}>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-5xl font-bold mb-3 tracking-tight">
        <Link href={`/posts/${slug}`} className="hover:text-orange-500">
          {title}
        </Link>
      </h3>
      <div className="mb-4 inline-flex flex-wrap items-center gap-1 text-lg text-neutral-500">
        <Authors authors={author} />
        <span>-</span>
        <DateFormatter dateString={date} />
      </div>
      <p
        className={"text-lg " + markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
    </article>
  );
};

export default PostPreview;