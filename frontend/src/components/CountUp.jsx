import { useEffect, useRef, useState } from "react";

const CountUp = ({ start = 1000, end = 50000, duration = 2500 }) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(
              (timestamp - startTime) / duration,
              1
            );

            const value = Math.floor(
              start + progress * (end - start)
            );

            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [start, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}+
    </span>
  );
};

export default CountUp;
