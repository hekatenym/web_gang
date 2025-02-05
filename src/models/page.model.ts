import { Schema, model, models, Document } from 'mongoose';

// SEO 相关字段接口
interface ISEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// 页面状态枚举
enum PageStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// 组件接口
interface IComponent {
  id: string;
  type: string;
  props: Record<string, any>;
  style: Record<string, any>;
  children?: IComponent[];
}

// 页面文档接口
export interface IPage extends Document {
  title: string;
  slug: string;
  description?: string;
  seo: ISEO;
  status: PageStatus;
  components: IComponent[];
  createdBy: string;
  isTemplate: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// SEO Schema
const SEOSchema = new Schema<ISEO>({
  title: { 
    type: String, 
    required: true,
    trim: true,
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
  },
  keywords: [{ 
    type: String,
    trim: true,
  }],
  ogImage: { 
    type: String,
    trim: true,
    default: '',
  },
  canonicalUrl: { 
    type: String,
    trim: true,
    default: '',
  },
});

// 组件 Schema
const ComponentSchema = new Schema<IComponent>({
  id: { 
    type: String, 
    required: true 
  },
  type: { type: String, required: true },
  props: { type: Schema.Types.Mixed, default: {} },
  style: { type: Schema.Types.Mixed, default: {} },
  children: [{ type: Schema.Types.Mixed }],
});

// 页面 Schema
const PageSchema = new Schema<IPage>({
  title: { 
    type: String, 
    required: true,
    trim: true,
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  seo: {
    type: SEOSchema,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(PageStatus),
    default: PageStatus.DRAFT,
  },
  components: [ComponentSchema],
  createdBy: {
    type: String,
    required: true,
  },
  isTemplate: {
    type: Boolean,
    default: false,
  },
  version: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// 统一在这里定义索引
PageSchema.index({ slug: 1 }, { unique: true });
PageSchema.index({ status: 1 });
PageSchema.index({ createdAt: -1 });

// 添加中间件
PageSchema.pre('save', function(next) {
  if (this.isModified() && this.status === PageStatus.PUBLISHED) {
    this.publishedAt = new Date();
  }
  next();
});

// 导出模型
export const Page = models.Page || model<IPage>('Page', PageSchema); 