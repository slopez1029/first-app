package Conf;

use strict;
use warnings;

my %conf = (
	logFile		=> "/home/jfustos/EECS448/Calendar/log.txt",
	commandFile 	=> "/home/jfustos/EECS448/Calendar/command.txt",
	dbFile	 	=> "/home/jfustos/EECS448/Calendar/db.txt",
);

sub get
{
	return \%conf;
}

1;
