-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 07:56 AM
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
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `d_id` int(6) NOT NULL,
  `d_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ekenform`
--

CREATE TABLE `ekenform` (
  `kf_id` int(6) NOT NULL,
  `kf_purpose` varchar(70) NOT NULL,
  `kf_numStudent` int(2) NOT NULL,
  `kf_numStaff` int(2) NOT NULL,
  `kf_destination` int(50) NOT NULL,
  `kf_departureDate` date NOT NULL,
  `kf_departureTime` time NOT NULL,
  `kf_returnDate` date NOT NULL,
  `kf_returnTime` time NOT NULL,
  `kf_startDate` date NOT NULL,
  `kf_startTime` time NOT NULL,
  `kf_status` varchar(10) NOT NULL,
  `kf_available` tinyint(1) NOT NULL,
  `d_id` int(6) DEFAULT NULL,
  `f_name` varchar(70) NOT NULL,
  `s_id` int(5) NOT NULL,
  `a_id` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ekenform`
--

INSERT INTO `ekenform` (`kf_id`, `kf_purpose`, `kf_numStudent`, `kf_numStaff`, `kf_destination`, `kf_departureDate`, `kf_departureTime`, `kf_returnDate`, `kf_returnTime`, `kf_startDate`, `kf_startTime`, `kf_status`, `kf_available`, `d_id`, `f_name`, `s_id`, `a_id`) VALUES
(367043, 'test', 0, 0, 0, '2024-11-20', '14:20:00', '2024-11-20', '14:20:00', '2024-11-20', '14:20:00', 'Pending', 0, NULL, 'BORANG PERMOHONAN JAWATAN.pdf', 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ekenlist`
--

CREATE TABLE `ekenlist` (
  `kl_id` int(9) NOT NULL,
  `kv_id` int(5) NOT NULL,
  `kf_id` int(6) NOT NULL,
  `kl_type` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ekenlist`
--

INSERT INTO `ekenlist` (`kl_id`, `kv_id`, `kf_id`, `kl_type`) VALUES
(7, 1, 367043, 'Request'),
(8, 2, 367043, 'Request');

-- --------------------------------------------------------

--
-- Table structure for table `ekenvehicle`
--

CREATE TABLE `ekenvehicle` (
  `kv_id` int(5) NOT NULL,
  `kv_name` varchar(20) NOT NULL,
  `kv_plate` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ekenvehicle`
--

INSERT INTO `ekenvehicle` (`kv_id`, `kv_name`, `kv_plate`) VALUES
(1, 'Aruz', 'VLR 4711'),
(2, 'Fortuner', 'BJG 2783'),
(3, 'Van', 'WSC 5483'),
(4, 'Bas', 'WKK 6769');

-- --------------------------------------------------------

--
-- Table structure for table `file_upload`
--

CREATE TABLE `file_upload` (
  `f_name` varchar(70) NOT NULL,
  `f_path` varchar(20) NOT NULL,
  `f_timeStamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file_upload`
--

INSERT INTO `file_upload` (`f_name`, `f_path`, `f_timeStamp`) VALUES
('BORANG PERMOHONAN JAWATAN.pdf', '../eken/', '2024-11-19 23:23:39');

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
(6, 'Harith Affendi', 'harith@staf.kksbs.edu.my', '0106477394', 'Intern IT', '$2y$12$T.9fB5b6TiUacTv.sAzNAewItLMWAp0eBCxjcDSNyooSa3A6q4t2q'),
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
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `ekenform`
--
ALTER TABLE `ekenform`
  ADD PRIMARY KEY (`kf_id`),
  ADD KEY `f_name` (`f_name`),
  ADD KEY `ekenform_ibfk_1` (`s_id`),
  ADD KEY `a_id` (`a_id`),
  ADD KEY `d_id` (`d_id`);

--
-- Indexes for table `ekenlist`
--
ALTER TABLE `ekenlist`
  ADD PRIMARY KEY (`kl_id`),
  ADD KEY `ekenlist_ibfk_2` (`kf_id`),
  ADD KEY `kv_id` (`kv_id`);

--
-- Indexes for table `ekenvehicle`
--
ALTER TABLE `ekenvehicle`
  ADD PRIMARY KEY (`kv_id`);

--
-- Indexes for table `file_upload`
--
ALTER TABLE `file_upload`
  ADD PRIMARY KEY (`f_name`);

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
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `d_id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ekenlist`
--
ALTER TABLE `ekenlist`
  MODIFY `kl_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ekenvehicle`
--
ALTER TABLE `ekenvehicle`
  MODIFY `kv_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `s_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ekenform`
--
ALTER TABLE `ekenform`
  ADD CONSTRAINT `ekenform_ibfk_1` FOREIGN KEY (`s_id`) REFERENCES `staff` (`s_id`),
  ADD CONSTRAINT `ekenform_ibfk_5` FOREIGN KEY (`f_name`) REFERENCES `file_upload` (`f_name`),
  ADD CONSTRAINT `ekenform_ibfk_6` FOREIGN KEY (`a_id`) REFERENCES `admins` (`a_id`),
  ADD CONSTRAINT `ekenform_ibfk_7` FOREIGN KEY (`d_id`) REFERENCES `driver` (`d_id`);

--
-- Constraints for table `ekenlist`
--
ALTER TABLE `ekenlist`
  ADD CONSTRAINT `ekenlist_ibfk_2` FOREIGN KEY (`kf_id`) REFERENCES `ekenform` (`kf_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ekenlist_ibfk_3` FOREIGN KEY (`kv_id`) REFERENCES `ekenvehicle` (`kv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
