import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import Modal from '../components/Modal';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    acceptTerms: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Проверка согласия
    if (!formData.acceptTerms) {
      setShowError(true);
      return;
    }
  
    // Валидация телефона
    const phoneRegex = /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Пожалуйста, введите номер телефона в формате +7-XXX-XXX-XX-XX');
      return;
    }
  
    setShowError(false);
  
    // Получаем roistat_visit из куки
    const roistatVisit = document.cookie
      .split('; ')
      .find(row => row.startsWith('roistat_visit='))
      ?.split('=')[1];
  
    // Подготовка данных для отправки
    const payload = {
      name: formData.name,
      phone: formData.phone,
      roistat: {
        visit: roistatVisit || null,
        formName: "Контактная форма с сайта", // Можно менять при необходимости
        source: "Support360",
        status: "C11:NEW"
      }
    };
  
    try {
      // Отправка данных на ваш PHP-скрипт
      const response = await fetch('https://api.dev.helpdesk.1gt.ru/api/leads', {
        // если он в той же папке, что и index.html:
        // const response = await fetch('/handle_lead.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Обработка ответа
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // Успех: сервер обработал данные и передал их в Roistat
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', acceptTerms: false });
        // console.log('Ответ от сервера:', responseData.data);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        // Ошибка: сервер вернул ошибку или Roistat вернул ошибку
        console.error('Ошибка отправки формы:', responseData);
        alert(`Не удалось отправить заявку: ${responseData.error || 'Неизвестная ошибка'}. Попробуйте позже.`);
      }
    } catch (error) {
      // Сетевая ошибка (сервер недоступен, ошибка CORS и т.д.)
      console.error('Сетевая ошибка при отправке формы:', error);
      alert('Ошибка соединения с сервером. Проверьте подключение к интернету и попробуйте позже.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, ''); // Remove non-digits
      if (formattedValue.length > 0) {
        // Format the phone number
        formattedValue = formattedValue.substring(0, 11); // Limit to 11 digits
        let formatted = '+7';
        if (formattedValue.length > 1) {
          formatted += '-' + formattedValue.substring(1, 4);
        }
        if (formattedValue.length > 4) {
          formatted += '-' + formattedValue.substring(4, 7);
        }
        if (formattedValue.length > 7) {
          formatted += '-' + formattedValue.substring(7, 9);
        }
        if (formattedValue.length > 9) {
          formatted += '-' + formattedValue.substring(9, 11);
        }
        setFormData(prev => ({ ...prev, [name]: formatted }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (type === 'checkbox' && checked) {
      setShowError(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Хватит терять клиентов из-за поддержки"
          subtitle="Запустите Support360 сегодня. Без обучения. Без сложностей и затяжных интеграций."
          center
          light
        />
        
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Получите персональную консультацию</h3>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Что вы получите:</h4>
                <ul className="space-y-2 text-sm text-gray-700 mb-3">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Анализ ваших текущих процессов поддержки
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Демонстрацию системы на ваших примерах
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    План внедрения
                  </li>
                </ul>

                <p className="text-sm text-gray-700">30 минут — и вы поймёте, как можно упростить поддержку без сложного внедрения.</p>
              </div>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <p className="font-semibold">Спасибо за заявку!</p>
                  <p>Мы свяжемся с вами в течение 30 минут и покажем, как Support360 решит ваши задачи.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Как к вам обращаться?"
                      required/>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон для связи</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+7-XXX-XXX-XX-XX"
                      required
                    />
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3">
                      <label className="text-sm text-gray-700">
                        Я согласен на обработку персональных данных согласно{' '}
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          className="text-primary hover:underline focus:outline-none"
                        >
                          политике конфиденциальности
                        </button>
                      </label>
                      {showError && (
                        <p className="text-red-500 text-sm mt-1">
                          Необходимо согласие на обработку данных
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button primary className="w-full">Получить консультацию</Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Никакого спама — только полезная информация о том, как улучшить вашу поддержку
                  </p>
                </form>
              )}
            </div>
            
            <div className="md:w-1/2 bg-gray-50 p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Свяжитесь с нами прямо сейчас</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-gray-700">Компания:</p>
                  <p className="text-gray-600">ООО "ИТ Лаборатория"</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-700">Email:</p>
                  <a href="mailto:info@support360.ru" className="text-primary hover:underline">info@support360.ru</a>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Телефон:</p>
                  <a href="tel:+73833838286" className="podmenasupport360 text-primary hover:underline"> +7 (383) 383-82-86 </a>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Адрес:</p>
                  <p className="text-gray-600">630007, г. Новосибирск, ул. Большевистская, д.97</p>
                </div>

                <div className="pt-4">
                  <p className="font-semibold text-gray-700 mb-3">Режим работы:</p>
                  <p className="text-gray-600">Пн-Пт: 9:00 - 18:00 (НСК)</p>
                  <p className="text-gray-600">Сб-Вс: Выходные</p>
                </div>
                
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="font-semibold text-primary mb-2">Постоянная связь</p>
                  <p className="text-sm text-gray-700">
                    Для действующих клиентов доступна поддержка через Support360
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Политика в отношении обработки персональных данных"
      >
        <div className="prose max-w-none">
          <h2 className="text-xl font-bold mb-4">1. Общие положения</h2>
          <p className="mb-4">Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных ООО "ИТ ЛАБОРАТОРИЯ" (далее – Оператор).</p>
          
          <p className="mb-4">1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
          
          <p className="mb-4">1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее – Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://support360.ru.</p>

          <h2 className="text-xl font-bold mb-4">2. Основные понятия, используемые в Политике</h2>
          <p className="mb-4">2.1. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники;</p>
          
          <p className="mb-4">2.2. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных);</p>
          
          <p className="mb-4">2.3. Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://support360.ru;</p>

          <h2 className="text-xl font-bold mb-4">3. Оператор может обрабатывать следующие персональные данные Пользователя</h2>
          <p className="mb-4">3.1. Фамилия, имя, отчество;</p>
          <p className="mb-4">3.2. Электронный адрес;</p>
          <p className="mb-4">3.3. Номера телефонов;</p>
          
          <h2 className="text-xl font-bold mb-4">4. Цели обработки персональных данных</h2>
          <p className="mb-4">4.1. Цель обработки персональных данных Пользователя — информирование Пользователя посредством отправки электронных писем; заключение, исполнение и прекращение гражданско-правовых договоров; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте.</p>

          <h2 className="text-xl font-bold mb-4">5. Правовые основания обработки персональных данных</h2>
          <p className="mb-4">5.1. Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы, расположенные на сайте https://support360.ru. Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору, Пользователь выражает свое согласие с данной Политикой.</p>

          <h2 className="text-xl font-bold mb-4">6. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h2>
          <p className="mb-4">Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.</p>

          <h2 className="text-xl font-bold mb-4">7. Трансграничная передача персональных данных</h2>
          <p className="mb-4">7.1. Оператор до начала осуществления трансграничной передачи персональных данных обязан убедиться в том, что иностранным государством, на территорию которого предполагается осуществлять передачу персональных данных, обеспечивается надежная защита прав субъектов персональных данных.</p>

          <h2 className="text-xl font-bold mb-4">8. Заключительные положения</h2>
          <p className="mb-4">8.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты info@support360.ru.</p>
          <p className="mb-4">8.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
        </div>
      </Modal>
    </section>
  );
};

export default ContactSection;