import React, { useState } from 'react';
import { Building, MapPin, Mail, Phone, Clock, Zap } from 'lucide-react';
import Modal from '../components/Modal';

const Footer: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isUserAgreementModalOpen, setIsUserAgreementModalOpen] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToUseCaseAndSelect = (caseIndex: number) => {
    const useCasesSection = document.getElementById('use-cases');
    if (useCasesSection) {
      useCasesSection.scrollIntoView({ behavior: 'smooth' });
      // Небольшая задержка для прокрутки, затем имитируем клик по карточке
      setTimeout(() => {
        const cards = document.querySelectorAll('[data-use-case-card]');
        if (cards[caseIndex]) {
          (cards[caseIndex] as HTMLElement).click();
        }
      }, 500);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 ml-10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-7 h-7"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-2xl">Support360</span>
                <p className="text-gray-400 text-sm">Поддержка нового поколения</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Превращаем хаос заявок в простой диалог.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center text-light">
                <Zap className="w-5 h-5 mr-2" />
                <span className="font-semibold">Запуск за 1 день</span>
              </div>
              <div className="flex items-center text-light">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">Без месяцев обучения</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://t.me/dev_support360_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Посмотреть, как работает
              </a>
              <button 
                onClick={scrollToContact}
                className="border-2 border-primary text-primary hover:bg-primary/10 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Задать вопрос
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Решение</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToSection('use-cases')} className="text-gray-400 hover:text-white transition-colors text-left">Применение</button></li>
              <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition-colors text-left">Возможности</button></li>
              <li><button onClick={() => scrollToSection('workflow')} className="text-gray-400 hover:text-white transition-colors text-left">Как работает</button></li>
              <li><button onClick={() => scrollToSection('statistics')} className="text-gray-400 hover:text-white transition-colors text-left">Результаты</button></li>
              <li><button onClick={() => scrollToSection('service-history')} className="text-gray-400 hover:text-white transition-colors text-left">История создания</button></li>
              <li><button onClick={() => scrollToSection('ai-section')} className="text-gray-400 hover:text-white transition-colors text-left">Умный помощник</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition-colors text-left">Частые вопросы</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Сферы применения</h3>
            <ul className="space-y-3">
              <li><button onClick={() => scrollToUseCaseAndSelect(0)} className="text-gray-400 hover:text-white transition-colors text-left">IT-поддержка</button></li>
              <li><button onClick={() => scrollToUseCaseAndSelect(1)} className="text-gray-400 hover:text-white transition-colors text-left">Мероприятия и конференции</button></li>
              <li><button onClick={() => scrollToUseCaseAndSelect(2)} className="text-gray-400 hover:text-white transition-colors text-left">Гостиницы и отели</button></li>
              <li><button onClick={() => scrollToUseCaseAndSelect(3)} className="text-gray-400 hover:text-white transition-colors text-left">Интернет-магазины</button></li>
              <li><button onClick={() => scrollToUseCaseAndSelect(4)} className="text-gray-400 hover:text-white transition-colors text-left">ЖКХ и управляющие компании</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Building className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">ООО "ИТ Лаборатория"</p>
                  <p className="text-gray-400 text-sm">Разработчик Support360</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+73833838004" className="text-white hover:text-primary transition-colors">
                    +7 (383) 383-80-04
                  </a>
                  <p className="text-gray-400 text-sm">Пн-Пт: 9:00-18:00 (НСК)</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:info@support360.ru" className="text-white hover:text-primary transition-colors">
                    info@support360.ru
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white">Новосибирск</p>
                  <p className="text-gray-400 text-sm">ул. Большевистская, 97</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 ml-10 mr-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Support360. Все права защищены.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Превращаем хаос заявок в простой диалог с 2024 года
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </button>
              <button 
                onClick={() => setIsUserAgreementModalOpen(true)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Пользовательское соглашение
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-4 max-w-2xl mx-auto block hover:from-primary/30 hover:to-secondary/30 transition-all"
            >
              <p className="text-white font-medium mb-2">
                🚀 Хватит терять клиентов из-за плохой поддержки
              </p>
              <p className="text-gray-300 text-sm">
                Запустите Support360 сегодня. Без обучения. Без ожиданий.
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно политики конфиденциальности */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Политика в отношении обработки персональных данных"
      >
        <div className="prose max-w-none text-black">
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

      {/* Модальное окно пользовательского соглашения */}
      <Modal
        isOpen={isUserAgreementModalOpen}
        onClose={() => setIsUserAgreementModalOpen(false)}
        title="Пользовательское соглашение"
      >
        <div className="prose max-w-none text-black">
          <p className="mb-4">
            Настоящее пользовательское соглашение (далее — Соглашение) определяет порядок и условия использования материалов и сервисов, размещённых в сети Интернет по адресу (далее — Сайт) Пользователями (как этот термин определён ниже) данного Сайта. Использование Пользователями Сайта означает, что они безоговорочно принимают и обязуются соблюдать все условия настоящего Соглашения.
          </p>

          <h2 className="text-xl font-bold mb-4">1. Общие положения</h2>
          <p className="mb-4">
            1.1. В настоящем Соглашении, если из текста Соглашения прямо не вытекает иное, следующие указываемые в письменной форме с заглавной буквы слова и выражения, используемые при взаимодействии сторон в ходе исполнения обязательств, будут иметь указанные ниже значения:
          </p>
          <p className="mb-4">
            <strong>Администратор</strong> — ООО «ИТ Лаборатория», которому принадлежат все соответствующие права на Сайт.
          </p>
          <p className="mb-4">
            <strong>Акцепт</strong> — полное и безоговорочное принятие условий настоящего Соглашения, размещённого на Сайте по адресу https://support360.ru/, осуществляемое путём совершения Пользователем любых действий по использованию Сайта.
          </p>
          <p className="mb-4">
            <strong>Аутентификационные данные Пользователя</strong> — логин (номер мобильного телефона / адрес электронной почты Пользователя) и пароль (код доступа, который направляется Пользователю на указанный им в качестве логина номер мобильного телефона или адрес электронной почты), которые в совокупности признаются простой электронной подписью Пользователя. Пользователь самостоятельно обеспечивает сохранность своих Аутентификационных данных, а также возможность получения направляемых ему кодов доступа;
          </p>
          <p className="mb-4">
            <strong>Пользователь</strong> — лицо, осуществляющее доступ к Сайту и использующее материалы и сервисы, размещённые на Сайте.
          </p>
          <p className="mb-4">
            <strong>Контент</strong> — любое информационно значимое наполнение Сайта, включая, но не ограничиваясь, фото, аудио, видео, текст и иные медиаматериалы.
          </p>
          <p className="mb-4">
            <strong>Личный кабинет</strong> — персонализированная часть Сайта, посредством которой обеспечивается обмен информацией и документацией в электронном виде между Пользователем и Сайтом. Доступ к Личному кабинету осуществляется путём ввода Пользователем Аутентификационных данных.
          </p>
          <p className="mb-4">
            <strong>Персональные данные</strong> — любая информация, относящаяся к определённому или определяемому на основании такой информации физическому лицу (субъекту персональных данных), в том числе его фамилия, имя, отчество, год, месяц, день и место рождения, адрес, семейное, социальное, имущественное положение, образование, профессия, доходы, другая информация.
          </p>
          <p className="mb-4">
            <strong>Обработка персональных данных</strong> — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
          </p>
          <p className="mb-4">
            <strong>Сайт</strong> — ресурс в сети Интернет, представляющий собой совокупность содержащихся в информационной системе информации и объектов интеллектуальной собственности (в том числе программа для ЭВМ, база данных, графическое оформление интерфейса (дизайн) и др.), доступ к которому обеспечивается с различных пользовательских устройств, подключённых к сети Интернет, посредством специального программного обеспечения для просмотра веб-страниц (браузер) по сетевому адресу https://support360.ru/ (и адресам подразделов Сайта).
          </p>
          <p className="mb-4">
            1.2. Все остальные термины и определения, встречающиеся в тексте Соглашения, толкуются в соответствии с действующим законодательством Российской Федерации.
          </p>

          <h2 className="text-xl font-bold mb-4">2. Предмет соглашения</h2>
          <p className="mb-4">
            2.1. В соответствии с настоящим Соглашением Администратор предоставляет любому Пользователю право безвозмездного использования Сайта любым способом и в любой форме в пределах его объявленных функциональных возможностей и на условиях, изложенных в настоящем Соглашении.
          </p>
          <p className="mb-4">
            2.2. Использование Сайта осуществляется в соответствии с принятым в мировой правоприменительной практике принципом «как есть» (as is). В соответствии с данным принципом никакие гарантии, что Сайт будет соответствовать всем требованиям Пользователя, работать непрерывно, быстро и без ошибок; результаты, которые могут быть получены с использованием Сайта, будут точными и надёжными не прилагаются и не предусматриваются.
          </p>

          <h2 className="text-xl font-bold mb-4">10. Информация об администраторе</h2>
          <p className="mb-2"><strong>ОГРН:</strong> 1225400013475</p>
          <p className="mb-2"><strong>ИНН:</strong> 5404310286</p>
          <p className="mb-2"><strong>Адрес:</strong> Новосибирск, ул. Большевистская, д. 97, 630009</p>
          <p className="mb-2"><strong>Телефон:</strong> +7 (383) 383-80-04</p>
          <p className="mb-4"><strong>Адрес электронной почты:</strong> info@support360.ru</p>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;