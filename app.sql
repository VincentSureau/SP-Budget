-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: mysql-vincentsureau.alwaysdata.net
-- Generation Time: Apr 15, 2020 at 01:35 PM
-- Server version: 10.3.17-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vincentsureau_app_budget`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounting_type`
--

CREATE TABLE `accounting_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coefficient` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounting_type`
--

INSERT INTO `accounting_type` (`id`, `type`, `coefficient`, `created_at`, `updated_at`) VALUES
(1, 'expense', -1, '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(2, 'income', 1, '2020-04-12 00:00:00', '2020-04-12 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `accounting_type_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `accounting_type_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'courses', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(2, 1, 'transport', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(3, 1, 'assurance', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(4, 1, 'vêtements', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(5, 1, 'loisirs', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(6, 1, 'crédit', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(7, 1, 'restaurant', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(8, 1, 'loyer', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(9, 1, 'téléphone', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(10, 1, 'internet', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(11, 1, 'culture', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(12, 1, 'vacances', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(13, 2, 'salaire', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(14, 2, 'intérêts', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(15, 2, 'remboursement', '2020-04-12 00:00:00', '2020-04-12 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` datetime NOT NULL,
  `comment` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`id`, `payment_method_id`, `user_id`, `category_id`, `amount`, `date`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 8, '10.00', '2020-04-13 15:09:05', '10', '2020-04-13 15:09:05', '2020-04-13 15:09:05'),
(2, 1, 1, 8, '10.00', '2020-04-13 15:09:11', '10', '2020-04-13 15:09:11', '2020-04-13 15:09:11'),
(3, 1, 1, 8, '10.00', '2020-04-13 15:09:30', '10', '2020-04-13 15:09:30', '2020-04-13 15:09:30'),
(4, 2, 1, 2, '200.00', '2020-04-13 16:14:06', '200', '2020-04-13 16:14:06', '2020-04-13 16:14:06'),
(5, 4, 1, 9, '200.00', '2020-04-13 16:14:24', '200', '2020-04-13 16:14:24', '2020-04-13 16:14:24'),
(6, 3, 1, 11, '20.00', '2020-04-13 16:14:35', '20', '2020-04-13 16:14:35', '2020-04-13 16:14:35'),
(7, 4, 1, 13, '1000.00', '2020-04-13 16:15:20', '1000', '2020-04-13 16:15:20', '2020-04-13 16:15:20'),
(8, 4, 1, 13, '1000.00', '2020-04-13 16:15:21', '1000', '2020-04-13 16:15:21', '2020-04-13 16:15:21'),
(9, 5, 1, 3, '30.00', '2020-04-13 19:43:56', '30', '2020-04-13 19:43:56', '2020-04-13 19:43:56'),
(10, 2, 1, 13, '1800.00', '2020-03-02 19:44:50', '1800', '2020-04-13 19:44:50', '2020-04-13 19:44:50'),
(11, 1, 1, 6, '55.00', '2020-04-13 19:46:10', '55', '2020-04-13 19:46:10', '2020-04-13 19:46:10'),
(12, 1, 1, 7, '1000.00', '2020-04-13 19:46:41', '1000', '2020-04-13 19:46:41', '2020-04-13 19:46:41'),
(13, 3, 1, 1, '10.00', '2020-04-01 21:27:16', '10', '2020-04-13 21:27:16', '2020-04-13 21:27:16'),
(14, 4, 1, 13, '1200.00', '2020-04-15 01:05:19', '1200', '2020-04-15 01:05:19', '2020-04-15 01:05:19'),
(15, 1, 1, 3, '200.00', '2020-04-15 01:05:37', '200', '2020-04-15 01:05:37', '2020-04-15 01:05:37'),
(16, 4, 1, 1, '150.00', '2020-04-15 05:13:04', '150', '2020-04-15 05:13:04', '2020-04-15 05:13:04'),
(17, 1, 1, 7, '25.00', '2020-03-02 10:23:58', '25', '2020-04-15 10:23:58', '2020-04-15 10:23:58');

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'CB', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(2, 'Chèque', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(3, 'Espèce', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(4, 'Virement', '2020-04-12 00:00:00', '2020-04-12 00:00:00'),
(5, 'Prélèvement', '2020-04-12 00:00:00', '2020-04-12 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'User', 'Anonymous', 'vincentsureau5@gmail.com', '$2y$10$q/Rw9zPLfbixx3e4FSRSVO2qNNB8WK7/.hUxfMYX0KK3c6R5gbZpS', '2020-04-12 00:00:00', '2020-04-12 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounting_type`
--
ALTER TABLE `accounting_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_64C19C1FCC471A4` (`accounting_type_id`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1981A66D5AA1164F` (`payment_method_id`),
  ADD KEY `IDX_1981A66DA76ED395` (`user_id`),
  ADD KEY `IDX_1981A66D12469DE2` (`category_id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounting_type`
--
ALTER TABLE `accounting_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `operation`
--
ALTER TABLE `operation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_64C19C1FCC471A4` FOREIGN KEY (`accounting_type_id`) REFERENCES `accounting_type` (`id`);

--
-- Constraints for table `operation`
--
ALTER TABLE `operation`
  ADD CONSTRAINT `FK_1981A66D12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FK_1981A66D5AA1164F` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  ADD CONSTRAINT `FK_1981A66DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
