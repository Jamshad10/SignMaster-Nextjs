import React, { useRef, useEffect, useState } from 'react';

interface SignatureCanvasProps {
  onSave: (signature: string) => void;
  initialValue: string;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSave,initialValue  }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setSignature(initialValue)
  }, [initialValue]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { offsetX, offsetY } = event.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = event.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // setSignature(canvas.toDataURL()); // Save the signature as a base64 encoded string
    onSave(canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  return (
    <div className="mt-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border border-gray-300"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
      <div className="flex mt-2">
        <button
        type='button'
          onClick={clearCanvas}
          className="px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-md mr-2"
        >
          Clear
        </button>
        {signature && (
          <div className="mt-2">
            <img src={signature} alt="Signature" className="h-20 border border-gray-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignatureCanvas;
