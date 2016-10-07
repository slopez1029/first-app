package Command::AddDetail;

use strict;
use warnings;

require "modules/Command/Helper.pm";

sub addDetail
{
	my $args = shift;
	my $db = shift;
	my $reporter = shift;

	unless ( ( defined $args ) && ( defined $args->{"day"} ) )
	{
		$reporter->{'report'}->( "Request did not have a |day| field.", "ERROR", "DIE" );
	}

	my $day = $args->{"day"};

	unless ( Command::Helper::isIntegerWithinRange( $day, 0, 364 ) )
	{
		$reporter->{'report'}->( "day needs to be a number between 0 and 364, was |$day|.", "ERROR", "DIE" );
	}

	unless ( defined $args->{"detail"} )
	{
		$reporter->{'report'}->( "Request did not have a |detail| field.", "ERROR", "DIE" );
	}

	my $detail = '' . $args->{"detail"};

	push @{ $db->{"days"}->[$day] }, $detail;

	$reporter->{'log'}->( "successfully added detail |$detail| to day |$day|." );
	$reporter->{'send'}->( "NONE" );

	return;
}

1;
