import { Schema, model, models } from 'mongoose';
import { PageStatus } from '@/types/page';

// SEO Schema
const SEOSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  keywords: String,
}, { _id: false });

// 页面 Schema
const PageSchema = new Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,  // 保留 unique 约束，但移除 index
    trim: true,
    lowercase: true,
  },
  description: String,
  seo: {
    type: SEOSchema,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(PageStatus),
    default: PageStatus.DRAFT,
  },
  components: [{ type: Schema.Types.Mixed }],
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

// 只在 Schema 级别定义索引
PageSchema.index({ slug: 1 });
PageSchema.index({ status: 1 });
PageSchema.index({ createdAt: -1 });

// 添加中间件
PageSchema.pre('save', function(next) {
  if (this.isModified() && this.status === PageStatus.PUBLISHED) {
    this.publishedAt = new Date();
  }
  next();
});

// 确保只在服务器端运行
if (typeof window === 'undefined') {
  export const Page = models.Page || model('Page', PageSchema);
} 