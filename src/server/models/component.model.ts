import { Schema, model, models } from 'mongoose';
import { IComponent } from '@/types/component.types';

// 确保只在服务器端运行
if (typeof window === 'undefined') {
  const ComponentSchema = new Schema<IComponent>({
    id: { 
      type: String, 
      required: true, 
      unique: true 
    },
    type: { 
      type: String, 
      required: true 
    },
    parentId: String,
    order: Number,
    props: {
      style: Schema.Types.Mixed,
      data: Schema.Types.Mixed
    },
    children: [{ type: Schema.Types.Mixed }]
  });

  ComponentSchema.index({ id: 1 });
  ComponentSchema.index({ parentId: 1 });
  ComponentSchema.index({ type: 1 });
  ComponentSchema.index({ order: 1 });

  export const Component = models.Component || model<IComponent>('Component', ComponentSchema);
} 