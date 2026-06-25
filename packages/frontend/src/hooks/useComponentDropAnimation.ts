import { useEffect, useRef } from 'react';
import Konva from 'konva';

export function useComponentDropAnimation(
  component: { isNew?: boolean, properties?: any },
  groupRef: React.RefObject<any>
) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (component.isNew && groupRef.current && !hasRun.current) {
      hasRun.current = true;
      const targetScaleX = component.properties?.flipX ? -1 : 1;
      const targetScaleY = component.properties?.flipY ? -1 : 1;

      // Set initial scale to 70% of target
      groupRef.current.scale({ x: targetScaleX * 0.7, y: targetScaleY * 0.7 });
      
      // Animate with Konva Tween
      const tween = new Konva.Tween({
        node: groupRef.current,
        duration: 0.25,
        scaleX: targetScaleX,
        scaleY: targetScaleY,
        easing: Konva.Easings.ElasticEaseOut,
      });
      
      tween.play();

      return () => {
        tween.destroy();
      };
    }
  }, [component.isNew, groupRef]);
}
