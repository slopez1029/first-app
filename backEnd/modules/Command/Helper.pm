package Command::Helper;

use strict;
use warnings;

sub isIntegerWithinRange
{
	my $test = shift;
	my $lower = shift;
	my $upper = shift;
	
	unless (    ( $test =~ /\A[1-9][0-9]{0,8}\Z/ || $test eq "0" )
                 && ( $test >= $lower )
                 && ( $test <= $upper )    )
        {
		return 0;   
        }
	
	return 1;
}

1;
