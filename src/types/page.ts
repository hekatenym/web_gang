export interface SEO {
  title: string;
  description: string;
  keywords: string;
}

export interface Page {
  id: string;
  title: string;
  route: string;
  seo: SEO;
  components: Component[];
  createdAt: Date;
  updatedAt: Date;
}

export type PageStatus = 'draft' | 'published';

export interface PageListItem extends Omit<Page, 'components'> {
  status: PageStatus;
}
