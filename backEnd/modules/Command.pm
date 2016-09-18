package Command;

use strict;
use warnings;

use JSON;
require "modules/Command/GetDates.pm";
require "modules/Command/SetCurDay.pm";
require "modules/Command/SetView.pm";
require "modules/Command/AddDetail.pm";
require "modules/Command/RemoveDetail.pm";
require "modules/Command/ModifyDetail.pm";

my %requests = (
	getDates        => \&Command::GetDates::getDates,
	setCurDay       => \&Command::SetCurDay::setCurDay,
	setView         => \&Command::SetView::setView,
	addDetail       => \&Command::AddDetail::addDetail,
	removeDetail    => \&Command::RemoveDetail::removeDetail,
	modifyDetail    => \&Command::ModifyDetail::modifyDetail,
);

sub getValid
{
	return \%requests;
}

sub set
{
	my $command_file = shift;
	my $reporter = shift;
	my $command = shift;
	
	my $command_handle;
	unless ( open( $command_handle, '>', $command_file ) )
	{
		$reporter->{'report'}->( "Could not open command file says: |$!|", "ERROR", "DIE" );
	}
	
	print $command_handle $command;
	
	close $command_handle;
}

sub get
{
	my $encodedRequest = shift;
	my $reporter = shift;
	my $requests = shift;
	
	my $request;
	
	eval{   $request = decode_json( $encodedRequest );    };
	if ( $@ )
	{
	        $reporter->{'log'}->( "Problem decoding JSON string: |$encodedRequest|. says:\n$@", "ERROR" );
	        $reporter->{'send'}->( "Unable to decode input JSON!!", "DIE" );
	}
	
	unless ( ( defined $request ) && ( defined $request->{"name"} ) )
	{
	        $reporter->{'report'}->( "Request did not have a |name| field. Request was: |$encodedRequest|", "ERROR", "DIE" );
	}

	my $request_name = $request->{"name"};
	unless ( defined $requests->{ $request_name } )
	{
	        $reporter->{'report'}->( "The name of the request was not valid. Request was: |$encodedRequest|", "ERROR", "DIE" );
	}
	
	$reporter->{'log'}->( "Valid request, was |$request_name|" );
	
	return $request;
}

1;
