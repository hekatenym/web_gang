import React, { useState } from 'react';
import { Space, InputNumber, Button } from 'antd';
import { LinkOutlined, DisconnectOutlined } from '@ant-design/icons';

interface SpaceEditorProps {
  value?: number | string | { top?: number; right?: number; bottom?: number; left?: number };
  onChange?: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function SpaceEditor({ value, onChange, min = 0, max = 100, step = 1 }: SpaceEditorProps) {
  const [isLinked, setIsLinked] = useState(true);
  
  // 解析当前值
  const parseValue = () => {
    if (typeof value === 'number') {
      return {
        top: value,
        right: value,
        bottom: value,
        left: value,
      };
    } else if (typeof value === 'object' && value !== null) {
      return {
        top: value.top ?? 4,     // 修改默认值
        right: value.right ?? 12, // 修改默认值
        bottom: value.bottom ?? 4, // 修改默认值
        left: value.left ?? 12,   // 修改默认值
      };
    }
    return { top: 4, right: 12, bottom: 4, left: 12 }; // 修改默认值
  };

  const currentValue = parseValue();

  const handleUniformChange = (newValue: number | null) => {
    if (newValue === null) return;
    if (isLinked) {
      onChange?.(newValue);
    } else {
      onChange?.({
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue,
      });
    }
  };

  const handleIndividualChange = (position: 'top' | 'right' | 'bottom' | 'left', newValue: number | null) => {
    if (newValue === null) return;
    const updatedValue = { ...currentValue, [position]: newValue };
    onChange?.(updatedValue);
  };

  return (
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <Space>
        <InputNumber
          min={min}
          max={max}
          step={step}
          value={isLinked ? (typeof value === 'number' ? value : currentValue.top) : currentValue.top}
          onChange={isLinked ? handleUniformChange : (val) => handleIndividualChange('top', val)}
          addonAfter="px"
        />
        <Button
          type="text"
          icon={isLinked ? <LinkOutlined /> : <DisconnectOutlined />}
          onClick={() => setIsLinked(!isLinked)}
        />
      </Space>
      
      {!isLinked && (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <InputNumber
            min={min}
            max={max}
            step={step}
            value={currentValue.right}
            onChange={(val) => handleIndividualChange('right', val)}
            addonAfter="px"
            placeholder="右"
          />
          <InputNumber
            min={min}
            max={max}
            step={step}
            value={currentValue.bottom}
            onChange={(val) => handleIndividualChange('bottom', val)}
            addonAfter="px"
            placeholder="下"
          />
          <InputNumber
            min={min}
            max={max}
            step={step}
            value={currentValue.left}
            onChange={(val) => handleIndividualChange('left', val)}
            addonAfter="px"
            placeholder="左"
          />
        </Space>
      )}
    </Space>
  );
}

export default React.memo(SpaceEditor); 