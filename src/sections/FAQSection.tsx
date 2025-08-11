import React from 'react';
import SectionTitle from '../components/SectionTitle';
import FAQItem from '../components/FAQItem';

const faqItems = [
  {
    question: "Чем отличается Support360?",
    answer: "Мы убрали всё лишнее: формы, порталы и тикеты.\n Support360 работает как чат — пользователь просто пишет в одно окно, а система сама определяет суть запроса и направляет его нужному специалисту."
  },
  {
    question: "Как создать пользователей в системе?",
    answer: "Список пользователей можно передать через Bitrix24 или Active Directory.\n Если идентификация не требуется — они создаются автоматически при первом обращении."
  },
  {
    question: "Cложно ли запустить сервис?",
    answer: "Support360 запускается за 15 минут — без участия ИТ.\n Создаёте портал, подключаете Telegram — и уже принимаете обращения."
  },
  {
    question: "Можно ли адаптировать систему под нашу компанию?",
    answer: "Да. Настраиваются категории обращений, роли, шаблоны ответов и правила маршрутизации.\n Если потребуется — мы поможем адаптировать всё под ваш процесс."
  },
  {
    question: "Как обеспечивается безопасность и защита данных?",
    answer: "Используем защищённые соединения, авторизацию по номеру, регулярное резервное копирование.\n Сервис соответствует требованиям 152-ФЗ по защите персональных данных."
  },
  {
    question: "Сколько стоит?",
    answer: "В базовой версии - 1 990₽/мес + 490₽ за каждого дополнительного оператора"
  }
];

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Вопросы и ответы"
          subtitle="Развеиваем сомнения и показываем, почему Support360 — это правильный выбор"
          center
        />

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;