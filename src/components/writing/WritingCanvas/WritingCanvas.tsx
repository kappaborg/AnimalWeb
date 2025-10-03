import { Button } from '@/components/common';
import { Eraser, RefreshCw, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface WritingCanvasProps {
  word: string;
  onSave?: (dataUrl: string) => void;
  onClear?: () => void;
}

export const WritingCanvas = ({ word, onSave, onClear }: WritingCanvasProps) => {
  const { i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Set drawing style
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw guide text
      drawGuideText(ctx, canvas);
    };

    updateCanvasSize();
    setContext(ctx);

    // Handle window resize
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [word]);

  const drawGuideText = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.font = '48px Arial';
    ctx.fillStyle = '#E5E7EB';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, rect.width / 2, rect.height / 2);
    ctx.restore();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!context || !canvasRef.current) return;

    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    e.preventDefault();
    
    const rect = canvasRef.current.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;

    const canvas = canvasRef.current;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGuideText(context, canvas);
    
    onClear?.();
  };

  const saveDrawing = () => {
    if (!canvasRef.current) return;

    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave?.(dataUrl);
  };

  return (
    <div className="space-y-4">
      {/* Canvas Area */}
      <div className="relative border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <canvas
          ref={canvasRef}
          className="w-full touch-none cursor-crosshair"
          style={{ height: '400px' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        {i18n.language === 'zh'
          ? '在画布上写出单词。使用鼠标、触摸或手写笔。'
          : 'Write the word on the canvas. Use mouse, touch, or stylus.'}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={clearCanvas}
          variant="outline"
          size="md"
        >
          <Eraser className="w-5 h-5 mr-2" />
          {i18n.language === 'zh' ? '清除' : 'Clear'}
        </Button>

        <Button
          onClick={() => {
            clearCanvas();
            if (canvasRef.current && context) {
              drawGuideText(context, canvasRef.current);
            }
          }}
          variant="ghost"
          size="md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {i18n.language === 'zh' ? '重置' : 'Reset'}
        </Button>

        <Button
          onClick={saveDrawing}
          variant="primary"
          size="md"
        >
          <Save className="w-5 h-5 mr-2" />
          {i18n.language === 'zh' ? '保存' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default WritingCanvas;

