import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

/**
 * Данные статистики для отображения
 */
const statistics = [
  { value: 75, label: 'Быстрее обработка обращений', symbol: '%' },
  { value: 90, label: 'Клиентов довольны поддержкой', symbol: '%' },
  { value: 60, label: 'Меньше рутины для команды', symbol: '%' },
  { label: 'Время запуска', text: '15 мин' }
];

/**
 * Компонент для отображения статистики с анимацией
 */
const StatisticItem: React.FC<{ 
  stat: typeof statistics[0]; 
  isVisible: boolean; 
}> = ({ stat, isVisible }) => {
  const animatedValue = useAnimatedCounter({
    end: stat.value || 0,
    isActive: isVisible && !!stat.value
  });

  if (!stat.value) {
    return (
      <div className="text-center flex flex-col items-center justify-center">
        <div className="relative inline-block w-32 h-32">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{stat.text}</span>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium">{stat.label}</p>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = isVisible 
    ? `${(animatedValue / 100) * circumference}, ${circumference}` 
    : `0, ${circumference}`;

  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="relative inline-block w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.2)" 
            strokeWidth="8" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="8" 
            strokeDasharray={strokeDasharray}
            strokeLinecap="round" 
            transform="rotate(-90 50 50)"
            style={{ 
              transition: "stroke-dasharray 2s ease-in-out"
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">
            {animatedValue}{stat.symbol}
          </span>
        </div>
      </div>
      <p className="mt-4 text-lg font-medium">{stat.label}</p>
    </div>
  );
};

const StatisticsSection: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  return (
    <section id="statistics"
      ref={elementRef}
      className="py-20 bg-primary text-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Результат: всегда довольный клиент
          </h2>
          <p className="text-lg">
            На основе данных Support360
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <StatisticItem 
              key={index} 
              stat={stat} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;