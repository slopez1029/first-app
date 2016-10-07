package Conf;

use strict;
use warnings;

my %conf = (
	logFile		=> "/home/slopez/Calendar/log.txt",
	commandFile 	=> "/home/slopez/Calendar/command.txt",
	dbFile	 	=> "/home/slopez/Calendar/db.txt",
);

sub get
{
	return \%conf;
}

1;
