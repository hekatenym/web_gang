import { Schema, model, models, Document } from 'mongoose';

// 组件类型枚举
export enum ComponentType {
  CONTAINER = 'container',
  TEXT = 'text',
  IMAGE = 'image',
  BUTTON = 'button',
  FORM = 'form',
  INPUT = 'input',
  LIST = 'list',
  CARD = 'card',
  NAVIGATION = 'navigation',
  FOOTER = 'footer'
}

// 组件事件接口
interface IComponentEvent {
  type: string;
  handler: string; // 存储事件处理函数的字符串表示
  params?: Record<string, any>;
}

// 组件样式接口
interface IComponentStyle {
  layout?: {
    width?: string;
    height?: string;
    margin?: string;
    padding?: string;
    position?: string;
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    color?: string;
  };
  background?: {
    color?: string;
    image?: string;
    size?: string;
    position?: string;
  };
  border?: {
    width?: string;
    style?: string;
    color?: string;
    radius?: string;
  };
  animation?: {
    name?: string;
    duration?: string;
    timing?: string;
    delay?: string;
  };
}

// 组件文档接口
export interface IComponent extends Document {
  id: string;
  name: string;
  type: ComponentType;
  props: Record<string, any>;
  style: IComponentStyle;
  events: IComponentEvent[];
  children: string[]; // 存储子组件的ID
  parentId?: string;
  order: number;
  isVisible: boolean;
  isLocked: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// 组件事件 Schema
const ComponentEventSchema = new Schema<IComponentEvent>({
  type: { type: String, required: true },
  handler: { type: String, required: true },
  params: { type: Schema.Types.Mixed }
});

// 组件样式 Schema
const ComponentStyleSchema = new Schema<IComponentStyle>({
  layout: {
    width: String,
    height: String,
    margin: String,
    padding: String,
    position: String
  },
  typography: {
    fontSize: String,
    fontWeight: String,
    lineHeight: String,
    color: String
  },
  background: {
    color: String,
    image: String,
    size: String,
    position: String
  },
  border: {
    width: String,
    style: String,
    color: String,
    radius: String
  },
  animation: {
    name: String,
    duration: String,
    timing: String,
    delay: String
  }
});

// 组件 Schema
const ComponentSchema = new Schema<IComponent>({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  type: { 
    type: String, 
    enum: Object.values(ComponentType),
    required: true 
  },
  props: { 
    type: Schema.Types.Mixed, 
    default: {} 
  },
  style: { 
    type: ComponentStyleSchema, 
    default: {} 
  },
  events: [ComponentEventSchema],
  children: [{ 
    type: String,
    ref: 'Component' 
  }],
  parentId: { 
    type: String,
    ref: 'Component' 
  },
  order: { 
    type: Number, 
    default: 0 
  },
  isVisible: { 
    type: Boolean, 
    default: true 
  },
  isLocked: { 
    type: Boolean, 
    default: false 
  },
  metadata: { 
    type: Schema.Types.Mixed 
  }
}, {
  timestamps: true,
  versionKey: false
});

// 创建索引
ComponentSchema.index({ id: 1 });
ComponentSchema.index({ parentId: 1 });
ComponentSchema.index({ type: 1 });
ComponentSchema.index({ order: 1 });

// 导出模型
export const Component = models.Component || model<IComponent>('Component', ComponentSchema); 