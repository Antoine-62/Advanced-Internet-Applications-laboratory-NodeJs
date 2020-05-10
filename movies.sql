-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: May 10, 2020 at 02:15 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejsdata`
--
CREATE DATABASE nodejsdata2; 
USE nodejsdata2; 
-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `name`, `description`) VALUES
(1, 'Pocahontas (1995)', 'Disney takes on a historical figure in this musical romance. Journey back to the 17th century with young Pocahontas, an empowering Native American heroine who falls for colonist  Captain John Smith—a love interest that her father strongly disapproves of.'),
(2, 'Aladdin (1992)', "Aladdin has had a rough go of it, but things are on an upswing when he discovers a lamp with a wish-granting genie inside. Things are copacetic for only so long. Soon, evil steps in and it's up to Aladdin to save his love interest, Princess Jasmine"),
(3, 'The Aristocats (1970) ', "In the heart of Paris, a kind and eccentric millionairess wills her entire estate to Duchess, her high-society cat, and her three little kittens. Laughs and adventure ensue as the greedy, bumbling butler pulls off the ultimate catnap caper. Now it's up to the rough-and-tumble alley cat, Thomas O'Malley, and his band of swingin' jazz cats to save the day."),
(4, 'The Little Mermaid (1989)', "Musical mermaid Ariel longs for a pair of legs. She's dying to get a taste of life above water, and an evil sea urchent named Ursula grants her wish. However, she instills a few rules and has her eye on stealing Ariel's gorgeous singing voice, so what's happening on land isn't necessarily all fun and games."),
(5, 'Peter Pan (1953)', "Never-ending adolescence seems like a dream come true for Wendy and her two brothers. They're immediately intrigued when the magical Peter Pan and Tinkerbell fly into their home, discussing the forever youth they achieved in Neverland. Naturally, it's only right for Wendy and co to take a peek at what all the hype is about. When they do, things take a turn, largely thanks to Captain Hook."),
(6, 'Pinocchio (1940)', "Geppetto is a woodmaker who wishes his puppet would turn into a real boy. Magically, his wish comes true! A teeny cricket acts as the conscience for the young marionette-turned-child, and it appears he's getting into a bit of trouble!"),
(7, 'Bambi (1942)', "Endearing and emotional, Bambi is the story of a super-cute deer who comes into his own with help of family and friends in the forest. We'll admit we have a soft spot for Thumper. "),
(8, 'Fantasia (1940)', "This marriage of fantasy and classical music is what put Mickey on the map (with all due respect to Steamboat Willy, of course). Fantasia is considered one of Disney's most inventive flicks and showcases our leading mouse as a magician who can't quite get things right. Be forewarned: The 40s film is definitely a classic, but some of its scary moments might be too much for the tots to handle."),
(9, 'Finding Nemo (2003)', "Like most kids, Nemo can be somewhat defiant. His father warns him to swim close, yet he's always in search of independence. When the little fish goes MIA under the sea, and encounters a great white named Bruce along the way, he realizes that his pop just might know a thing or two he doesn't! Sometimes it doesn't hurt to listen to 'ol dad."),
(10, 'Dumbo (1941)', "Dumbo's certainly the most eccentric part of the circus. The poor elephant with gigantic ears is the target of much ridicule, which makes things even more grueling during the circus. However, the joke's on everyone else when Dumbo learns his ears allow him to fly! Expect to shed a few tears with this one."),
(11, 'The Jungle Book (1967)', "Mowgli can't seem to find his place in this world. In Disney's rendition of the Rudyard Kipling story, this young orphan is set out on a quest to learn more about his identity, with the help of animal companions, all while warding off Shere Khan. "),
(12, 'Hercules (1997)', "With an ode to Greek mythology, Hercules follows the story of a young man who's half human, half god. This causes him to lose his immortality, but if he's up to the challenge, he can get it back and score a place among the gods of Mount Olympus.");
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
