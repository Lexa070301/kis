-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Ноя 30 2021 г., 12:48
-- Версия сервера: 10.3.30-MariaDB-cll-lve
-- Версия PHP: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bhx20166_kis`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`bhx20166`@`localhost` PROCEDURE `spAddClient` (IN `series` INT, `number` INT, `issuance_date` DATE, `end_date` DATE, `issued_at` CHAR(255), `name` CHAR(63), `fullname` CHAR(255), `sex` ENUM('male','female'), `date_of_birth` DATE, `place_of_birth` CHAR(255), `status_id` INT, OUT `passport_id` INT)  BEGIN
    INSERT INTO Passport (id, Series, Number, IssuanceDate, EndDate, IssuedAt) VALUES (NULL, series, number, issuance_date, end_date, issued_at);
    SELECT LAST_INSERT_ID() INTO passport_id;
	INSERT INTO User (id, Name, FullName, Sex, DateOfBirth, PlaceOfBirth, Status_id, Passport_id) VALUES (NULL, name, fullname, sex, date_of_birth, place_of_birth, status_id, passport_id);
END$$

CREATE DEFINER=`bhx20166`@`localhost` PROCEDURE `spGetAgreements` ()  BEGIN
    SELECT PreliminaryAgreement.Date AS Date, PreliminaryAgreement.id AS Id, PreliminaryAgreement.Number AS Number, PreliminaryAgreement.StartDate AS StartDate, PreliminaryAgreement.EndDate AS EndDate, PreliminaryAgreement.MembersCount AS MembersCount, PreliminaryAgreement.Status AS Status, Employee.Name AS Employee, Organisation.Title AS Organization, User.FullName AS Client FROM PreliminaryAgreement LEFT JOIN Employee ON PreliminaryAgreement.Employee_id = Employee.id LEFT JOIN Organisation ON Employee.Organisation_id = Organisation.id INNER JOIN User ON PreliminaryAgreement.User_id = User.id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `City`
--

CREATE TABLE `City` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `City`
--

INSERT INTO `City` (`id`, `Name`, `Country_id`) VALUES
(1, 'Берлин', 1),
(2, 'Баден-Баден', 1),
(3, 'Дрезден', 1),
(4, 'Милан', 2),
(5, 'Флоренция', 2),
(6, 'Рим', 2),
(7, 'Мадрид', 3),
(8, 'Малага', 3),
(9, 'Валенсия', 3),
(10, 'Любляна', 4),
(11, 'Свети Влас', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `CityToVisit`
--

CREATE TABLE `CityToVisit` (
  `id` int(11) NOT NULL,
  `Order` int(11) DEFAULT NULL,
  `PreliminaryAgreement_id` int(11) NOT NULL,
  `City_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `CityToVisit`
--

INSERT INTO `CityToVisit` (`id`, `Order`, `PreliminaryAgreement_id`, `City_id`) VALUES
(36, 0, 61, 10),
(37, 0, 62, 1),
(38, 1, 62, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `Contract`
--

CREATE TABLE `Contract` (
  `id` int(11) NOT NULL,
  `Number` int(11) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Sum` float(10,2) DEFAULT NULL,
  `Status` enum('open','active','closed') DEFAULT NULL,
  `MembersCount` varchar(45) DEFAULT NULL,
  `PreliminaryAgreement_id` int(11) NOT NULL,
  `Organisation_id` int(11) NOT NULL,
  `Employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Contract`
--

INSERT INTO `Contract` (`id`, `Number`, `Date`, `StartDate`, `EndDate`, `Sum`, `Status`, `MembersCount`, `PreliminaryAgreement_id`, `Organisation_id`, `Employee_id`) VALUES
(15, 1233, '0000-00-00 00:00:00', '0123-02-13', '2321-12-31', 1243.00, 'active', '12', 61, 2, NULL),
(16, NULL, NULL, '2312-12-31', '2321-12-31', NULL, 'open', '3', 62, 1, 12);

-- --------------------------------------------------------

--
-- Структура таблицы `ContractCurrency`
--

CREATE TABLE `ContractCurrency` (
  `id` int(11) NOT NULL,
  `Currency_id` int(11) NOT NULL,
  `Contract_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Country`
--

CREATE TABLE `Country` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Country`
--

INSERT INTO `Country` (`id`, `Name`) VALUES
(1, 'Германия'),
(2, 'Италия'),
(3, 'Испания'),
(4, 'Словения'),
(5, 'Болгария');

-- --------------------------------------------------------

--
-- Структура таблицы `Currency`
--

CREATE TABLE `Currency` (
  `id` int(11) NOT NULL,
  `CurrencyName` varchar(255) DEFAULT NULL,
  `Code` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Employee`
--

CREATE TABLE `Employee` (
  `id` int(11) NOT NULL,
  `Name` varchar(63) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `PhotoLink` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Position_id` int(11) NOT NULL,
  `Organisation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Employee`
--

INSERT INTO `Employee` (`id`, `Name`, `FullName`, `DateOfBirth`, `PhotoLink`, `Email`, `Password`, `Position_id`, `Organisation_id`) VALUES
(1, 'Иванов А.А.', 'Иванов Александр Александрович', '1961-11-01', './static/images/employees/Фото_Иванов.jpg', 'ivanov@mail.ru', 'ebc555e3a81ae3a3759418202ff51b543ffbefa859da2aaae33164b28377de31533756df24ec35c10750c3ad12429f9424ea114f2f23ec9a0a281887c44a535e', 1, 1),
(2, 'Сидоров К.Л.', 'Сидоров Константин Леонидович', '1984-11-20', './static/images/employees/Фото_Сидоров.jpg', 'sidorov@mail.ru', '', 1, 1),
(3, 'Федорова М.И.', 'Федорова Мария Ивановна', '1992-07-23', './static/images/employees/Фото_Федорова.jpg', 'fedorova@mail.ru', 'ebc555e3a81ae3a3759418202ff51b543ffbefa859da2aaae33164b28377de31533756df24ec35c10750c3ad12429f9424ea114f2f23ec9a0a281887c44a535e', 2, 1),
(4, 'Константинов А.Л. ', 'Константинов Артем Леонидович', '1986-01-10', './static/images/employees/Фото_Константинов.jpg', 'konstantinov@mail.ru', 'ebc555e3a81ae3a3759418202ff51b543ffbefa859da2aaae33164b28377de31533756df24ec35c10750c3ad12429f9424ea114f2f23ec9a0a281887c44a535e', 3, 1),
(5, 'Романенко И.С.', 'Романенко Ирина Сергеевна', '1979-05-25', 'НЕТ', 'romanenko@mail.ru', '', 1, 2),
(6, 'Зоммер Г. Я.', 'Зоммер Генрих Янович', '2000-02-12', 'НЕТ', 'zommer@mail.ru', '', 2, 2),
(7, 'Николаев С.С.', 'Николаев Сергей Сергеевич', '1980-05-01', 'НЕТ', 'nikolaev@mail.ru', '', 3, 2),
(8, 'Филатов И.В.', 'Филатов Игорь Владимирович', '1983-05-02', 'НЕТ', 'filatov@mail.ru', '', 1, 3),
(9, 'Крохин М. И.', 'Крохин Михаил Измайлович', '2000-10-12', 'НЕТ', 'krohin@mail.ru', '', 2, 3),
(10, 'Петров Р. С.', 'Петров Роман Семенович', NULL, 'НЕТ', 'petrov@mail.ru', 'ebc555e3a81ae3a3759418202ff51b543ffbefa859da2aaae33164b28377de31533756df24ec35c10750c3ad12429f9424ea114f2f23ec9a0a281887c44a535e', 4, 3),
(11, 'Одинцова В. И.', 'Одинцова Варвара Ивановна', NULL, 'НЕТ', 'odincova@mail.ru', '', 4, 3),
(12, 'Ливидников К. С.', 'Ливидников Константин Сергеевич', NULL, 'НЕТ', 'lividnikov@mail.ru', '', 4, 1),
(13, 'Липко Г. Г.', 'Липко Галина Григорьевна', NULL, 'НЕТ', 'lipko@mail.ru', '', 4, 2),
(14, 'Броншнейн А. М.', 'Броншнейн Александр Михайлович', NULL, 'НЕТ', 'bronshtein@mail.ru', '', 4, 2),
(15, 'Виценко А. А.', 'Виценко Анатолий Анатольевич', NULL, 'НЕТ', 'vicenkoa@mail.ru', '', 4, 2),
(16, 'Виценко М. А.', 'Виценко Маргарита Александровна', NULL, 'НЕТ', 'vicenkom@mail.ru', '', 4, 2),
(119, 'Александр', 'Иванов Александр Александрович', '1961-11-01', NULL, 'ivanov@mail.ru', '18cf30bdbf342b11718bebf857debfe542c7b813dba768b91d3b301ce2c11fc6a2f6d6d18809c7439bdd0d99460437403e32d34aa12ef5b94708ce962666ee86', 1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `Hotel`
--

CREATE TABLE `Hotel` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Category` enum('1','2','3','4','5','апартаменты') DEFAULT NULL,
  `City_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Hotel`
--

INSERT INTO `Hotel` (`id`, `Name`, `Address`, `Category`, `City_id`) VALUES
(1, 'ECONTEL HOTEL Berlin***', 'Sömmeringstraße 24-26, Шарлоттенбург-Вильмерсдорф, 10589 Берлин, Германия', '3', 1),
(2, 'Leonardo Hotel Berlin***', 'Wilmersdorfer Str. 32, Шарлоттенбург-Вильмерсдорф, 10585 Берлин, Германия –', '3', 1),
(3, 'Sheraton Berlin Grand Hotel Esplanade*****', ' Lützowufer 15, Митте, 10785 Берлин, Германия', '5', 1),
(4, 'Radisson Blu Badischer Hof Hotel', 'Lange Str. 47, 76530 Baden-Baden, Германия', '4', 2),
(5, 'Leonardo Royal Hotel Baden- Baden', 'Falkenstr. 2, 76530 Баден-Баден, Германия', '4', 2),
(6, 'Cityherberge', 'Lingnerallee 3, 01069 Дрезден, Германия', '1', 3),
(7, 'Holiday Inn Express Dresden City Centre ', 'Dr-Kuelz Ring 15a, Старый город, 01067 Дрезден, Германия', '3', 3),
(8, 'Hotel Da Vinci ', 'Via Senigallia 6, 20161 Милан, Италия', '4', 4),
(9, 'Hotel Berna', 'Via Napo Torriani 18, Центральный вокзал, 20124 Милан, Италия', '4', 4),
(10, 'Hotel Royal ', 'Via delle Ruote 52, 50129 Флоренция, Италия', '3', 5),
(11, 'Palazzo San Lorenzo', '13 Borgo San Lorenzo, Сан-Лоренцо, 50123 Флоренция, Италия', 'апартаменты', 5),
(12, 'Hotel Gabriella', 'Via Palestro 88, Вокзал Термини, 00185 Рим, Италия', '3', 6),
(13, 'Grand Hotel Plaza', 'Via del Corso 126, Спанья, 00186 Рим, Италия', '5', 6),
(14, 'Eurostars Madrid Tower', 'Castellana, 259B, Фуэнкарраль – Эль-Пардо, 28046 Мадрид, Испания', '5', 7),
(15, 'Holiday Inn Express Málaga Airport', 'Avenida de Velazquez 294, Exit 3B Road MA-21, Churriana, 29004 Малага, Испания', '3', 8),
(16, 'Hotel Valencia Center', 'Avenida de Francia, 33, Camins al Grau, 46023 Валенсия, Испания', '4', 9),
(17, 'City Hotel Ljubljana', 'Dalmatinova Street 15, 1000 Любляна, Словения', '3', 10),
(18, 'Urban Hotel', '4 Štefanova ulica, 1000 Любляна, Словения', '4', 10),
(19, 'Комплекс Райский сад', 'Центральной дороги, 8250 Свети-Влас, Болгария', '5', 11);

-- --------------------------------------------------------

--
-- Структура таблицы `HotelToVisit`
--

CREATE TABLE `HotelToVisit` (
  `id` int(11) NOT NULL,
  `Order` int(11) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Contract_id` int(11) NOT NULL,
  `Hotel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `HotelToVisit`
--

INSERT INTO `HotelToVisit` (`id`, `Order`, `StartDate`, `EndDate`, `Contract_id`, `Hotel_id`) VALUES
(2, 0, '0003-03-12', '0312-03-12', 15, 17);

-- --------------------------------------------------------

--
-- Структура таблицы `Members`
--

CREATE TABLE `Members` (
  `id` int(11) NOT NULL,
  `Contract_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Members`
--

INSERT INTO `Members` (`id`, `Contract_id`, `User_id`) VALUES
(1, 15, 2),
(2, 15, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `Organisation`
--

CREATE TABLE `Organisation` (
  `id` int(11) NOT NULL,
  `Title` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Organisation`
--

INSERT INTO `Organisation` (`id`, `Title`) VALUES
(1, 'Офис'),
(2, 'Филиал №1'),
(3, 'Филиал №2');

-- --------------------------------------------------------

--
-- Структура таблицы `Passport`
--

CREATE TABLE `Passport` (
  `id` int(11) NOT NULL,
  `Series` int(11) DEFAULT NULL,
  `Number` int(11) DEFAULT NULL,
  `IssuanceDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `IssuedAt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Passport`
--

INSERT INTO `Passport` (`id`, `Series`, `Number`, `IssuanceDate`, `EndDate`, `IssuedAt`) VALUES
(1, 51, 9874563, '2010-10-02', '2020-10-01', 'УФМС'),
(2, 51, 1478529, '2013-03-29', '2023-03-28', 'УФМС'),
(3, 51, 2589631, '2017-02-28', '2027-02-27', 'УФМС'),
(4, 71, 3692581, '2010-12-12', '2020-12-11', 'УФМС'),
(5, 71, 8523691, '2016-03-02', '2026-03-01', 'УФМС'),
(6, 71, 1236542, '2014-06-02', '2019-06-01', 'УФМС'),
(7, 71, 7894562, '2017-04-06', '2027-04-05', 'УФМС'),
(8, 49, 9873215, '2017-06-16', '2027-06-15', 'УФМС'),
(9, 49, 2563214, '2010-12-05', '2020-12-04', 'УФМС'),
(10, 49, 3652365, '2010-12-05', '2020-12-04', 'УФМС'),
(28, 12312, 123214, '2532-03-25', '0214-12-04', 'fewgwe');

-- --------------------------------------------------------

--
-- Структура таблицы `Payment`
--

CREATE TABLE `Payment` (
  `id` int(11) NOT NULL,
  `Number` int(11) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Amount` float(10,2) DEFAULT NULL,
  `IsPaid` tinyint(4) DEFAULT NULL,
  `Status` enum('open','active','closed') DEFAULT NULL,
  `Organisation_id` int(11) NOT NULL,
  `Employee_id` int(11) NOT NULL,
  `Contract_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Position`
--

CREATE TABLE `Position` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Position`
--

INSERT INTO `Position` (`id`, `Title`) VALUES
(1, 'Менеджер'),
(2, 'Бухгалтер'),
(3, 'Администратор'),
(4, 'Агент');

-- --------------------------------------------------------

--
-- Структура таблицы `PreliminaryAgreement`
--

CREATE TABLE `PreliminaryAgreement` (
  `id` int(11) NOT NULL,
  `Date` datetime DEFAULT NULL,
  `Number` int(11) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `MembersCount` int(11) DEFAULT NULL,
  `Status` enum('open','active','closed') DEFAULT NULL,
  `Employee_id` int(11) DEFAULT NULL,
  `Organisation_id` int(11) NOT NULL,
  `User_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `PreliminaryAgreement`
--

INSERT INTO `PreliminaryAgreement` (`id`, `Date`, `Number`, `StartDate`, `EndDate`, `MembersCount`, `Status`, `Employee_id`, `Organisation_id`, `User_id`) VALUES
(61, '2112-11-25 16:11:00', 1, '0123-02-13', '2321-12-31', 12, 'open', 14, 2, 1),
(62, '2021-11-24 10:47:00', 2, '2312-12-31', '2321-12-31', 3, 'open', 12, 1, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `Status`
--

CREATE TABLE `Status` (
  `id` int(11) NOT NULL,
  `Status` varchar(63) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Status`
--

INSERT INTO `Status` (`id`, `Status`) VALUES
(1, 'Обычный'),
(2, 'Привилегированный'),
(3, 'VIP');

-- --------------------------------------------------------

--
-- Структура таблицы `Tiсket`
--

CREATE TABLE `Tiсket` (
  `id` int(11) NOT NULL,
  `TransportName` varchar(255) DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Number` int(11) DEFAULT NULL,
  `Voucher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `Name` varchar(63) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `Sex` enum('male','female') DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `PlaceOfBirth` varchar(255) DEFAULT NULL,
  `Status_id` int(11) NOT NULL,
  `Passport_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`id`, `Name`, `FullName`, `Sex`, `DateOfBirth`, `PlaceOfBirth`, `Status_id`, `Passport_id`) VALUES
(1, 'Вышегородцев', 'Вышегородцев Сергей Иванович', 'male', '1977-12-02', 'Курск', 1, 1),
(2, 'Смирнова', 'Смирнова Татьяна Ивановка', 'female', '1980-05-25', 'Курск', 1, 2),
(3, 'Смотрила', 'Смотрила Елена Владимировна', 'female', '1998-09-28', 'Курск', 1, 3),
(4, 'Гвоздев', 'Гвоздев Роман Евгеньевич', 'male', '1966-05-20', 'Москва', 1, 4),
(5, 'Шевченко', 'Шевченко Георгий Михайлович', 'male', '1961-07-12', 'Москва', 1, 5),
(6, 'Ким', 'Ким Евгений Славнович', 'male', '1996-03-15', 'Москва', 1, 6),
(7, 'Симонов', 'Симонов Вячеслав Григорьевич', 'male', '1995-11-18', 'Москва', 1, 7),
(8, 'Довженко', 'Довженко Михаил Григорьевич', 'male', '1987-09-14', 'Краснодар', 1, 8),
(9, 'Гусев', 'Гусев Владмир Федорович', 'male', '1988-04-25', 'Краснодар', 1, 9),
(10, 'Гусева', 'Гусева Людмила Михайловна', 'female', '1989-04-22', 'Краснодар', 1, 10),
(21, 'test', 'test test', 'male', '1242-02-14', 'fdsfdsf', 1, 28);

-- --------------------------------------------------------

--
-- Структура таблицы `Voucher`
--

CREATE TABLE `Voucher` (
  `id` int(11) NOT NULL,
  `Ttransfer` tinyint(4) DEFAULT NULL,
  `Status` enum('open','active','closed') DEFAULT NULL,
  `Contract_id` int(11) NOT NULL,
  `Employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `City`
--
ALTER TABLE `City`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_City_Country1` (`Country_id`);

--
-- Индексы таблицы `CityToVisit`
--
ALTER TABLE `CityToVisit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_CityToVisit_PreliminaryAgreement1_idx` (`PreliminaryAgreement_id`),
  ADD KEY `fk_CityToVisit_City1_idx` (`City_id`) USING BTREE;

--
-- Индексы таблицы `Contract`
--
ALTER TABLE `Contract`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Contract_PreliminaryAgreement1_idx` (`PreliminaryAgreement_id`),
  ADD KEY `fk_Contract_Organisation1_idx` (`Organisation_id`),
  ADD KEY `fk_Contract_Employee1_idx` (`Employee_id`);

--
-- Индексы таблицы `ContractCurrency`
--
ALTER TABLE `ContractCurrency`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ContractCurrency_Currency1_idx` (`Currency_id`),
  ADD KEY `fk_ContractCurrency_Contract1_idx` (`Contract_id`);

--
-- Индексы таблицы `Country`
--
ALTER TABLE `Country`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Currency`
--
ALTER TABLE `Currency`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Employee_Position_idx` (`Position_id`),
  ADD KEY `fk_Employee_Organisation1_idx` (`Organisation_id`);

--
-- Индексы таблицы `Hotel`
--
ALTER TABLE `Hotel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Hotel_City1` (`City_id`);

--
-- Индексы таблицы `HotelToVisit`
--
ALTER TABLE `HotelToVisit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_HotelToVisit_Contract1_idx` (`Contract_id`),
  ADD KEY `fk_HotelToVisit_Hotel1_idx` (`Hotel_id`);

--
-- Индексы таблицы `Members`
--
ALTER TABLE `Members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Members_Contract1_idx` (`Contract_id`),
  ADD KEY `fk_Members_User1_idx` (`User_id`);

--
-- Индексы таблицы `Organisation`
--
ALTER TABLE `Organisation`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Passport`
--
ALTER TABLE `Passport`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Payment_Organisation1_idx` (`Organisation_id`),
  ADD KEY `fk_Payment_Employee1_idx` (`Employee_id`),
  ADD KEY `fk_Payment_Contract1_idx` (`Contract_id`);

--
-- Индексы таблицы `Position`
--
ALTER TABLE `Position`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `PreliminaryAgreement`
--
ALTER TABLE `PreliminaryAgreement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_PreliminaryAgreement_Employee1_idx` (`Employee_id`),
  ADD KEY `fk_PreliminaryAgreement_Organisation1_idx` (`Organisation_id`),
  ADD KEY `fk_PreliminaryAgreement_Users1_idx` (`User_id`);

--
-- Индексы таблицы `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Tiсket`
--
ALTER TABLE `Tiсket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Tiсket_Voucher1_idx` (`Voucher_id`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_User_Status1_idx` (`Status_id`),
  ADD KEY `fk_User_Passport1_idx` (`Passport_id`);

--
-- Индексы таблицы `Voucher`
--
ALTER TABLE `Voucher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Voucher_Contract1_idx` (`Contract_id`),
  ADD KEY `fk_Voucher_Employee1_idx` (`Employee_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `City`
--
ALTER TABLE `City`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `CityToVisit`
--
ALTER TABLE `CityToVisit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `Contract`
--
ALTER TABLE `Contract`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `ContractCurrency`
--
ALTER TABLE `ContractCurrency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Country`
--
ALTER TABLE `Country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Currency`
--
ALTER TABLE `Currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Employee`
--
ALTER TABLE `Employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT для таблицы `Hotel`
--
ALTER TABLE `Hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `HotelToVisit`
--
ALTER TABLE `HotelToVisit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Members`
--
ALTER TABLE `Members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Organisation`
--
ALTER TABLE `Organisation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Passport`
--
ALTER TABLE `Passport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `Payment`
--
ALTER TABLE `Payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Position`
--
ALTER TABLE `Position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `PreliminaryAgreement`
--
ALTER TABLE `PreliminaryAgreement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT для таблицы `Status`
--
ALTER TABLE `Status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `Tiсket`
--
ALTER TABLE `Tiсket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `Voucher`
--
ALTER TABLE `Voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `City`
--
ALTER TABLE `City`
  ADD CONSTRAINT `fk_City_Country1` FOREIGN KEY (`Country_id`) REFERENCES `Country` (`id`);

--
-- Ограничения внешнего ключа таблицы `CityToVisit`
--
ALTER TABLE `CityToVisit`
  ADD CONSTRAINT `fk_CityToVisit_City1` FOREIGN KEY (`City_id`) REFERENCES `City` (`id`),
  ADD CONSTRAINT `fk_CityToVisit_PreliminaryAgreement1` FOREIGN KEY (`PreliminaryAgreement_id`) REFERENCES `PreliminaryAgreement` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Contract`
--
ALTER TABLE `Contract`
  ADD CONSTRAINT `fk_Contract_Employee1` FOREIGN KEY (`Employee_id`) REFERENCES `Employee` (`id`),
  ADD CONSTRAINT `fk_Contract_Organisation1` FOREIGN KEY (`Organisation_id`) REFERENCES `Organisation` (`id`),
  ADD CONSTRAINT `fk_Contract_PreliminaryAgreement1` FOREIGN KEY (`PreliminaryAgreement_id`) REFERENCES `PreliminaryAgreement` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `ContractCurrency`
--
ALTER TABLE `ContractCurrency`
  ADD CONSTRAINT `fk_ContractCurrency_Contract1` FOREIGN KEY (`Contract_id`) REFERENCES `Contract` (`id`),
  ADD CONSTRAINT `fk_ContractCurrency_Currency1` FOREIGN KEY (`Currency_id`) REFERENCES `Currency` (`id`);

--
-- Ограничения внешнего ключа таблицы `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `fk_Employee_Organisation1` FOREIGN KEY (`Organisation_id`) REFERENCES `Organisation` (`id`),
  ADD CONSTRAINT `fk_Employee_Position` FOREIGN KEY (`Position_id`) REFERENCES `Position` (`id`);

--
-- Ограничения внешнего ключа таблицы `Hotel`
--
ALTER TABLE `Hotel`
  ADD CONSTRAINT `fk_Hotel_City1` FOREIGN KEY (`City_id`) REFERENCES `City` (`id`);

--
-- Ограничения внешнего ключа таблицы `HotelToVisit`
--
ALTER TABLE `HotelToVisit`
  ADD CONSTRAINT `fk_HotelToVisit_Contract1` FOREIGN KEY (`Contract_id`) REFERENCES `Contract` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_HotelToVisit_Hotel1` FOREIGN KEY (`Hotel_id`) REFERENCES `Hotel` (`id`);

--
-- Ограничения внешнего ключа таблицы `Members`
--
ALTER TABLE `Members`
  ADD CONSTRAINT `fk_Members_Contract1` FOREIGN KEY (`Contract_id`) REFERENCES `Contract` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_Members_User1` FOREIGN KEY (`User_id`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `fk_Payment_Contract1` FOREIGN KEY (`Contract_id`) REFERENCES `Contract` (`id`),
  ADD CONSTRAINT `fk_Payment_Employee1` FOREIGN KEY (`Employee_id`) REFERENCES `Employee` (`id`),
  ADD CONSTRAINT `fk_Payment_Organisation1` FOREIGN KEY (`Organisation_id`) REFERENCES `Organisation` (`id`);

--
-- Ограничения внешнего ключа таблицы `PreliminaryAgreement`
--
ALTER TABLE `PreliminaryAgreement`
  ADD CONSTRAINT `fk_PreliminaryAgreement_Employee1` FOREIGN KEY (`Employee_id`) REFERENCES `Employee` (`id`),
  ADD CONSTRAINT `fk_PreliminaryAgreement_Organisation1` FOREIGN KEY (`Organisation_id`) REFERENCES `Organisation` (`id`),
  ADD CONSTRAINT `fk_PreliminaryAgreement_Users1` FOREIGN KEY (`User_id`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Tiсket`
--
ALTER TABLE `Tiсket`
  ADD CONSTRAINT `fk_Tiсket_Voucher1` FOREIGN KEY (`Voucher_id`) REFERENCES `Voucher` (`id`);

--
-- Ограничения внешнего ключа таблицы `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `fk_User_Passport1` FOREIGN KEY (`Passport_id`) REFERENCES `Passport` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_User_Status1` FOREIGN KEY (`Status_id`) REFERENCES `Status` (`id`);

--
-- Ограничения внешнего ключа таблицы `Voucher`
--
ALTER TABLE `Voucher`
  ADD CONSTRAINT `fk_Voucher_Contract1` FOREIGN KEY (`Contract_id`) REFERENCES `Contract` (`id`),
  ADD CONSTRAINT `fk_Voucher_Employee1` FOREIGN KEY (`Employee_id`) REFERENCES `Employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
