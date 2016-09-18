package Command::ModifyDetail;

use strict;
use warnings;

require "modules/Command/Helper.pm";

sub modifyDetail
{
	my $args = shift;
	my $db = shift;
	my $reporter = shift;
	
	unless ( ( defined $args ) && ( defined $args->{"day"} ) )
	{
		$reporter->{'report'}->( "Request did not have a |day| field.", "ERROR", "DIE");
	}
	
	my $day = $args->{"day"};
	
	unless ( Command::Helper::isIntegerWithinRange( $day, 0, 364 ) )
	{
		$reporter->{'report'}->( "day needs to be a number between 0 and 364, was |$day|.", "ERROR", "DIE");
	}
	
	my $details = $db->{"days"}->[$day];
	my $num_details = scalar @{$details};
	my $max_index = $num_details - 1;
	
	unless ( defined $args->{"detailNum"} )
	{
		$reporter->{'report'}->( "Request did not have a |detailNum| field.", "ERROR", "DIE");
	}
	
	my $detail_num = '' . $args->{"detailNum"};
	
	unless ( Command::Helper::isIntegerWithinRange( $detail_num, 0, $num_details - 1 ) )
	{
		my $bad_request = "detail_num needs to be a number between 0 and $max_index, was |$detail_num|.";
		$reporter->{'report'}->( $bad_request, "ERROR", "DIE");
	}
	
	unless ( defined $args->{"detail"} )
	{
		$reporter->{'report'}->( "Request did not have a |detail| field.", "ERROR", "DIE");
	}
	
	my $detail = '' . $args->{"detail"};
	
	$details->[ $detail_num ] = $detail;
	
	$reporter->{'log'}->( "successfully modified detail to |$detail| from day |$day| at index |$detail_num|." );
	$reporter->{'send'}->( "NONE" );
	
	return;
}

1;
