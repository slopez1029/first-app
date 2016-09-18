package Command::SetView;

use strict;
use warnings;

sub setView
{
	my $args = shift;
        my $db = shift;
        my $reporter = shift;
	
	my %is_allowed_view = (
		day     => 1,
		week    => 1,
		month   => 1,
		year    => 1,
	);
	
	unless ( ( defined $args ) && ( defined $args->{"newView"} ) )
	{
		$reporter->{'report'}->( "Request did not have a |newView| field.", "ERROR", "DIE" );
	}
	
	my $newView = $args->{"newView"};
	
	unless (   ( defined $is_allowed_view{ $newView } ) && ( $is_allowed_view{ $newView } )         )
	{
		my $ok_views = keys %is_allowed_view;
		$reporter->{'report'}->( "newView needs to be one of $ok_views, was |$newView|.", "ERROR", "DIE" );
	}
	
	$db->{"view"} = $newView;
	
	$reporter->{'log'}->( "updated current view to" . $newView );
	$reporter->{'send'}->( "NONE" );
	
	return;
}

1;
