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

export interface IComponent {
  id: string;
  type: ComponentType;
  parentId?: string;
  order?: number;
  props: {
    style: Record<string, string>;
    data: Record<string, any>;
  };
  children?: IComponent[];
}

export interface ComponentDefinition {
  type: ComponentType;
  label: string;
  icon: string;
  defaultProps: {
    style: Record<string, string>;
    data: Record<string, any>;
  };
} 