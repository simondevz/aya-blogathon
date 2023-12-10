export type CreatePostType = {
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
  image?: any; // change later
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
  image?: any; // change later
  mdContentId: number;
  keywords: KeywordType[];
  readTime: number;
  complexity: string;
};

export type KeywordType = {
  id: number;
  keyword: {
    id: number;
    word: string;
  };
};

export type MdContentType = {
  id: number;
  text: string;
  lastUpdated: string;
};
