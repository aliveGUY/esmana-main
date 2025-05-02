import { createSlice } from '@reduxjs/toolkit'

import {
  ALUSEF,
  GUK,
  HAITOVICH,
  HLYBOVA,
  HNYLOSKURENKO,
  KOST,
  SHEVCHENO,
  TARASUK,
} from '../../constants/predefinedAvatars'

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth() // zero-based
const day = today.getDate()

const mockedCourseText1 =
  '{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"AGREEMENT № 16-04-2025","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"on the provision of IT services concluded on 16 April 2025 ","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"between","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A) Borvo Limited with its registered office in First Floor, Penrose 2, Penrose Dock Cork City – Ireland VAT n° IE 3485517DH, representated by Mr. Mykhailo Nakonechnyi as Director","type":"text","version":1}],"direction":"ltr","format":"justify","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1,"textFormat":1}}'

const mockedCourseText2 =
  '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"SUBJECT OF THE AGREEMENT","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"textFormat":1,"value":1}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"number","start":1,"tag":"ol"},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"1.1 The contractor undertakes to provide the customer with the services specified in clause 1.2 in the manner and under the conditions specified in this Agreement. The customer undertakes to pay the contractor in accordance with the terms of this Agreement.","type":"text","version":1}],"direction":"ltr","format":"justify","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1,"textFormat":1}}'
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    highlightedCourse: null,
    ownedCourses: [
      {
        title: 'Міжнародна фахова школа "Медицина сну"',
        description:
          'Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку',
        lectures: [
          {
            id: 0,
            title: '1 Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day + 1, 13, 0),
            endTime: new Date(year, month, day + 1, 15, 0),
            status: {
              completed: true,
            },
            materials: {
              richText: mockedCourseText1,
              test: [
                {
                  question: 'question example',
                  options: ['option 1', 'option 2', 'option 3'],
                },
              ],
            },
          },
          {
            id: 1,
            title: '2 Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day, 13, 0),
            endTime: new Date(year, month, day, 17, 0),
            status: {
              completed: false,
            },
            materials: {
              richText: mockedCourseText2,
              test: [
                {
                  question: 'question example',
                  options: ['option 1', 'option 2', 'option 3'],
                },
              ],
            },
          },
          {
            id: 2,
            title: '3 Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day + 1, 13, 0),
            endTime: new Date(year, month, day + 1, 15, 0),
            status: null,
            materials: null,
          },
          {
            id: 3,
            title: '4 Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day, 13, 0),
            endTime: new Date(year, month, day, 17, 0),
            status: {
              completed: false,
            },
            materials: null,
          },
        ],
      },
    ],
    availableCourses: [
      {
        title: 'Міжнародна фахова школа "Медицина сну" 2025',
        description:
          'Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку',
        mobileDescription: 'Сон: фізіологія, діагностика, лікування. Теорія та практика для всіх вікових груп.',
        lectures: [
          {
            id: 0,
            title: 'Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day + 1, 13, 0),
            endTime: new Date(year, month, day + 1, 15, 0),
            status: {
              completed: true,
            },
            materials: {
              test: [
                {
                  question: 'question example',
                  options: ['option 1', 'option 2', 'option 3'],
                },
              ],
            },
          },
          {
            id: 1,
            title: 'Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day, 13, 0),
            endTime: new Date(year, month, day, 17, 0),
            status: {
              completed: false,
            },
            materials: {
              test: [
                {
                  question: 'question example',
                  options: ['option 1', 'option 2', 'option 3'],
                },
              ],
            },
          },
          {
            id: 2,
            title: 'Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day + 1, 13, 0),
            endTime: new Date(year, month, day + 1, 15, 0),
            status: null,
            materials: null,
          },
          {
            id: 3,
            title: 'Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day, 13, 0),
            endTime: new Date(year, month, day, 17, 0),
            status: {
              completed: false,
            },
            materials: null,
          },
        ],
        lectors: [
          {
            avatar: KOST,
            name: 'Дарія Костюкова',
            title: 'к. мед. н., лікарка-неврологиня дитяча, лікарка функціональної діагностики, неонатологиня',
            qualification:
              'Президентка ГО “Європейська асоціація медицину сну та нейрофізіології” Співробітниця дитячої лабораторії сну Кліники Вестбранденбург, Потсдам, Німеччина Наукова співробітниця Health and Medical University (Потсдам, Німеччина) Засновниця нейрокритичної групи Організаторка та перша завідувачка «Кабінету комплексного нейромоніторингу з дитячою лабораторією сну» відділення інтенсивного виходжування НДСЛ «Охматдит» МОЗ України Членкиня Німецького товариства досліджень сну та медицини сну (Deutsche Gesellschaft für Schlafforschung und Schlafmedizin e.V) Стипендіатка програми для українських науковців за підтримкою VolkswagenStiftung 2022-2023 рр. Організаторка міжнародних конференцій в Україні, учасниця та доповідачка на міжнародних науково практичних конференціях, координаторка проєктів від Міністерства охорони здоров я Німеччині для розвитку та підтримки медичної системи та освіти в Україні Сомнотерапевтка базового рівня за напрямком сомнотерапія медицина та нейропсихологія сну від Інституту розладів сну та психотравматичних розладів та Українського Католицького Університету',
          },
          {
            avatar: SHEVCHENO,
            name: 'Олександр Шевченко',
            title: 'Завідувач педіатричної електрофізіологічної лабораторії',
            qualification:
              'Доктор медицини, старший лікар (оберарцт) Соціально педіатричного центру Інн Зальцах Ротт, Академічної лікарні Мюнхенського університету Лікар-нейропедіатр, сертифікований з електроенцефалографії, викликаним потенціалам та нейрофідбеку Німецьким товариством клінічної нейрофізіології та функціональної візуалізації (Deutsche Gesellschaft für klinische Neurophysiologie und funktionelle Bildgebung) Автор монографії „EEG historische und aktuelle klinische Aspekte der Elektroenzephalographie (EEG) im Kindes und Jugendalter“ (2022), співавтор підручника „Педіатрія“ для студентів вищих медичних закладів України (2023)',
          },
          {
            avatar: HAITOVICH,
            name: 'Микола Хайтович',
            title: 'доктор медичних наук, професор, лікар-педіатр, лікар-психотерапевт',
            qualification:
              'Завідуючий кафедри клінічної фармакології та клінічної фармації НМУ імені О.О. Богомольця Член президії ГО "Українська ліга розвитку паліативної та хоспісної допомоги", член правління ГО "Медичний канабіс України" Автор монографії "Психотерапія в педіатрії", навчального посібника "Клінічна психофармакологія", науковий редактор перекладу підручника Dale & Rang Pharmacology',
          },
          {
            avatar: ALUSEF,
            name: 'Майя Альюсеф',
            title: 'PhD',
            qualification:
              'Викладачка кафедри педіатрії факультету медицини та природничих наук, Латвійський університет (Рига, Латвія) PhD ТУ "Актуальні аспекти функціональної діагностики в практиці сімейного лікаря" "Діагностика та лікування синдрому обструктивного апное сну" Членкиня Товариства Молодих Вчених Національного медичного університету ім. О.О. Богомольця Членкиня Американської Академії Медицину Сну (AASM)',
          },
          {
            avatar: GUK,
            name: 'Світлана Гук',
            title: 'лікарка-пульмонолог',
            qualification:
              'Керівниця центру респіраторної медицини та алергології КЛ Феофанія ДУС Президентка ГО Українське товариство медицини сну',
          },
          {
            avatar: TARASUK,
            name: 'Ольга Тарасюк',
            title: 'лікарка неонатологиня, лікарка функціональної діагностики',
            qualification:
              'Лікарка функціональної діагностики в кабінеті «Комплексного нейромоніторингу та дитячої лабораторії сну» відділення інтенсивного виходжування глибоко недоношених дітей НДСЛ “Охматдит” МОЗ України лікарка неонатологиня, лікарка функціональної діагностики Випускниця ІІ-ї Школи лікарів консультантів зі сну, членкиня Європейської асоціації медицини сну та нейрофізіології (ESMANA) ТУ Діагностика та лікування синдрому обструктивного апное сну',
          },
          {
            avatar: HNYLOSKURENKO,
            name: 'Ганна Гнилоскуренко',
            title: 'к. мед. н., лікар-педіатр, лікар-гастроентеролог дитячий',
            qualification:
              'Доцентка кафедри педіатрії, акушерства і гінекології ННЦ "Інститут біології та медицини" КНУ імені Тараса Шевченко Керівниця педіатричної служби клініки Інто сана Постійна учасниця науково практичних конференцій в Україні та за кордоном Більше 120 друкованих наукових робіт Членкиня міжнародної асоціації медицини сну (IPSA), членкиня європейської академії педіатрії (ЕАР)',
          },
          {
            avatar: HLYBOVA,
            name: 'Вікторія Хлибова',
            title: 'лікарка-пульмонолог',
            qualification:
              'Лікарка фтизіатр лабораторії сну КЛ Феофанія ДУС Членкиня правління та секретар ГО Українське товариство медицини сну Членкиня AASM',
          },
        ],
      },
      {
        title: 'Міжнародна фахова школа "Медицина сну"',
        description:
          'Ключові аспекти фізіології, діагностики та лікування розладів сну. Актуальні наукові знання та практичні навички для ефективної роботи з пацієнтами різного віку',
        lectures: [
          {
            title: 'Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day + 1, 17, 0),
            endTime: new Date(year, month, day + 1, 20, 0),
          },
          {
            title: 'Медицина сну: історія та розвиток',
            description: 'Розвиток сомнології як науки, її ключові досягнення та сучасні тенденції ',
            price: 2000,
            startTime: new Date(year, month, day, 16, 0),
            endTime: new Date(year, month, day, 20, 0),
          },
        ],
      },
    ],
  },
  reducers: {
    highlightCourse: (state, action) => {
      state.highlightedCourse = action.payload
    },
    removeHighlightedCourse: (state) => {
      state.highlightedCourse = null
    },
  },
})

export const { highlightCourse, removeHighlightedCourse } = coursesSlice.actions
export default coursesSlice.reducer
