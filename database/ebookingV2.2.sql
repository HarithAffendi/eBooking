-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2024 at 07:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebooking`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `a_id` int(5) NOT NULL,
  `a_name` varchar(50) NOT NULL,
  `a_email` varchar(30) NOT NULL,
  `a_phone` varchar(12) NOT NULL,
  `a_position` varchar(20) NOT NULL,
  `a_type` varchar(10) NOT NULL,
  `a_password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`a_id`, `a_name`, `a_email`, `a_phone`, `a_position`, `a_type`, `a_password`) VALUES
(4, 'KKSB Admin', 'adminkksb@gmail.com', '01010343478', 'KKSB Admin', 'SUPER', '$2y$12$wPQpwqmThFN9Jlapfdq8huB6GsFRQmgqvVkh07CQ7SKi2Bgvujq1.'),
(5, 'Abu', 'abu@staf.kksbs.edu.my', '01010101010', 'Head of IT', 'eICT', '$2y$12$53LlNgjWODSl4Kunp085R.vW3GlCWhc8VNU8N/fcv453vpW.LUAoC'),
(6, 'Mira', 'mira@staf.kksbs.edu.my', '0106477394', 'Head of Facility', 'eFasiliti', '$2y$12$Yt0yoq/4bFlbgulXKDT06ufQIE4Cy.N8664HrW0yPsCn2XbZk/m7y'),
(7, 'Ahmad', 'ahmad@staf.kksbs.edu.my', '01035676345', 'Head of Vehicle', 'eKenderaan', '$2y$12$EZwcEfBXM7EUGzASnHpXfOLJLSfq3FjY2obAI/IOE.ql5T99RU9Ym');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `s_id` int(5) NOT NULL,
  `s_name` varchar(50) NOT NULL,
  `s_email` varchar(30) NOT NULL,
  `s_phone` varchar(12) NOT NULL,
  `s_position` varchar(20) NOT NULL,
  `s_password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`s_id`, `s_name`, `s_email`, `s_phone`, `s_position`, `s_password`) VALUES
(6, 'Mira', 'mira@staf.kksbs.edu.my', '0106477394', 'Head of Facility', '$2y$12$T.9fB5b6TiUacTv.sAzNAewItLMWAp0eBCxjcDSNyooSa3A6q4t2q'),
(7, 'Ahmad Faris', 'faris@staf.kksbs.edu.my', '01012345678', 'Head IT', '$2y$12$VIl3euxZ/rBjCI/7wog.yuEH6QXxweCuYdzSIABDsYhO1nVt78X16'),
(8, 'Irfan Wafi', 'wafi@staf.kksbs.edu.my', '01234567890', 'Programmer', '$2y$12$1ovNegqkTrAtwellMzClAeoTifBSF3kEATFhPZUDLBoJZlXJu2YX6'),
(11, 'Abu', 'abu@staf.kksbs.edu.my', '01010101010', 'Head of IT', '$2y$12$L/mpM0KGiOubzsT0vzkzre0DmVtDpNY9yfwl4CycqYqNqyZzKhz0y');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`a_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`s_id`),
  ADD UNIQUE KEY `s_email` (`s_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `a_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `s_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
