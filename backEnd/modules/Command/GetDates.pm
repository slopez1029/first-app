package Command::GetDates;

use strict;
use warnings;

use JSON;

sub getDates
{
	my $args = shift;
	my $db = shift;
	my $reporter = shift;
	
	### just incode the data and send it out.
	### don't catch error, database should be formatted correctly.
	my $json_out = encode_json ( $db );
	print "$json_out";
	
	return;
}

1;
