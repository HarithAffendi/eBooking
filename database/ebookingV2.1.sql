-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2024 at 03:53 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
(1, 'Admin1', 'admin1@gmail.com', '01981187879', 'admin', 'eICT', '$2y$12$VTLj0cWIs7a5ZJU/H8tuTuQqVOK0Czmvro1Qu/.mJeiSWONLEXIwa'),
(2, 'Admin2', 'admin2@gmail.com', '01981187879', 'admin', 'eKenderaan', '$2y$12$VTLj0cWIs7a5ZJU/H8tuTuQqVOK0Czmvro1Qu/.mJeiSWONLEXIwa'),
(3, 'Admin3', 'admin3@gmail.com', '01981187879', 'admin', 'eFasiliti', '$2y$12$VTLj0cWIs7a5ZJU/H8tuTuQqVOK0Czmvro1Qu/.mJeiSWONLEXIwa'),
(4, 'KKSB Admin', 'adminkksb@gmail.com', '01010343478', 'KKSB Admin', 'SUPER', '$2y$12$wPQpwqmThFN9Jlapfdq8huB6GsFRQmgqvVkh07CQ7SKi2Bgvujq1.');

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
(6, 'Harith Affendi', 'harith@staf.kksbs.edu.my', '0105066467', 'Intern IT', '$2y$12$T.9fB5b6TiUacTv.sAzNAewItLMWAp0eBCxjcDSNyooSa3A6q4t2q'),
(7, 'Ahmad Faris', 'faris@staf.kksbs.edu.my', '01012345678', 'Head IT', '$2y$12$VIl3euxZ/rBjCI/7wog.yuEH6QXxweCuYdzSIABDsYhO1nVt78X16'),
(8, 'Irfan Wafi', 'wafi@staf.kksbs.edu.my', '01234567890', 'Head Programmer', '$2y$12$1ovNegqkTrAtwellMzClAeoTifBSF3kEATFhPZUDLBoJZlXJu2YX6');

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
  MODIFY `a_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `s_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
