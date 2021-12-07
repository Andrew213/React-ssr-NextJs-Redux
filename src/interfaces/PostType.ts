import { RedditUser, Submission } from "snoowrap";

export type authorT = {
  icon_img?: string;
  name?: string;
};

type ContentT = {
  type: "Gif" | "GifV" | "Image" | "Self" | "Video" | "RichVideo" | "justLink";
  url?: string;
};

type DescriptionT = {
  type?: "html" | "URL";
  content?: string;
};

type imgSizeT = {
  width: number;
  height: number;
};

export default interface PostType {
  authorName?: string;
  commentsCount?: number;
  content?: ContentT;
  content_size?: imgSizeT;
  created?: string | number;
  domain?: string;
  distinguished?: "moderator" | "admin";
  description?: DescriptionT;
  headerImg?: string;
  id?: string;
  imgPreview_Size?: imgSizeT;
  isLike?: boolean;
  isHidden?: boolean;
  linkFlaitText?: string;
  muted?: boolean;
  over18?: boolean;
  permalink?: string;
  post_himt?: string;
  preview?: string;
  saved?: boolean;
  score?: number;
  selfTextHtml?: string;
  spoiler?: boolean;
  sticked?: boolean;
  subredditName_display?: string;
  subredditName_prefix?: string;
  title?: string;
  thumbnail?: string;
  url?: string;
  originalPost?: Submission;
}

export type PostFetchedT = {
  data?: PostType;
  originalPost?: Submission;
  icon_img?: string;
  comments?: Comment[];
};
