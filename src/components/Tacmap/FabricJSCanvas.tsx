/* eslint-disable react/require-default-props */
import { fabric } from "fabric";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type FabricJSCanvasProps = {
  className?: string;
  onReady?: (canvas: fabric.Canvas) => void;
} & ({ height: number; width: number } | Record<string, never>);

export const FabricJSCanvas = forwardRef<HTMLDivElement, FabricJSCanvasProps>(
  ({ className, onReady, height, width }, ref) => {
    const canvasEl = useRef(null);
    const canvasElParent = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const canvas = new fabric.Canvas(canvasEl.current);
      const setCurrentDimensions = () => {
        canvas.setHeight(height || canvasElParent.current?.clientHeight || 0);
        canvas.setWidth(width || canvasElParent.current?.clientWidth || 0);
        if (height && canvasElParent.current?.clientHeight) {
          canvas
            .getContext()
            .scale(
              canvasElParent.current.clientHeight / height,
              canvasElParent.current.clientWidth / width
            );
        }
        canvas.renderAll();
      };
      const resizeCanvas = () => {
        setCurrentDimensions();
      };
      setCurrentDimensions();

      window.addEventListener("resize", resizeCanvas, false);

      if (onReady) {
        onReady(canvas);
      }

      return () => {
        canvas.dispose();
        window.removeEventListener("resize", resizeCanvas);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => canvasElParent.current as HTMLDivElement);

    return (
      <div ref={canvasElParent} className={className}>
        <canvas ref={canvasEl} />
      </div>
    );
  }
);
