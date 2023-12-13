export type CreatePostType = {
  post_id?: number;
  author_id: number;
  text: string;
  title: string;
  image?: any;
  keywords: string[];
  as_draft: boolean;
};

export type PostType = {
  authorId: number;
  text: string;
  title: string;
  id: number;
  createdAt: string;
  draft: boolean;
  imageId?: number;
  image?: ImageType;
  mdContentId: number;
  md_content?: MdContentType;
  keywords: KeywordType[];
  author: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export type MineaturPostType = {
  authorId: number;
  title: string;
  id: number;
  createdAt: string;
  draft: boolean;
  imageId?: number;
  image?: ImageType | null; // change later
  mdContentId: number;
  keywords: KeywordType[];
  readTime: number;
  complexity: string;
};

export type KeywordType = {
  id: number;
  Keyword: {
    id: number;
    word: string;
  };
};

export type MdContentType = {
  id: number;
  text: string;
  lastUpdated: string;
};

export type ImageType = {
  id: number;
  url: string;
  public_id: string;
  createdA: string;
};
