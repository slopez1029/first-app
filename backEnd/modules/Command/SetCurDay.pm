package Command::SetCurDay;

use strict;
use warnings;

require "modules/Command/Helper.pm";

sub setCurDay
{
	my $args = shift;
	my $db = shift;
	my $reporter = shift;
	
	unless ( ( defined $args ) && ( defined $args->{"newDay"} ) )
	{
		$reporter->{'report'}->( "Request did not have a |newDay| field.", "ERROR", "DIE" );
	}
	
	my $newDay = $args->{"newDay"};
	
	unless ( Command::Helper::isIntegerWithinRange( $newDay, 0, 364 ) )
	{
		$reporter->{'report'}->( "newDay needs to be a number between 0 and 364, was |$newDay|.", "ERROR", "DIE" );
	}
	
	$db->{"curDay"} = $newDay;
	
	$reporter->{'log'}->( "updated current day to " . $newDay );
	$reporter->{'send'}->( "NONE" );
	
	return;
}

1;
