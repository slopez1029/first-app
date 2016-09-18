package Report;

use strict;
use warnings;

use JSON;
use POSIX qw(strftime);

my $logger;

sub start
{
	my $logFile = shift;
	
	unless (   open( $logger, ">>", $logFile )   )
	{
		print err_2_json( "Cannot open log file |$logFile|: $!" );
		exit 1;
	}
	
	my $std_back = select( $logger );
	$| = 1;
	select( $std_back );
	
	myLog( "Starting." );
	
	return {
		report	=> \&report,
		send	=> \&send_err_json,
		log	=> \&myLog,
	};
}

sub report
{
	my $message = shift;
	$message = "Hey no message passed to report" unless defined $message;
	my $error = shift;
	my $myDie = shift;
	
	myLog( $message, $error );
	send_err_json( $message );
	
	if( (defined $myDie) && ($myDie eq "DIE") )
	{
		exit 1;
	}
}

sub send_err_json
{
	my $message = shift;
	$message = "Hey no message passed to send_err_json" unless defined $message;
	my $myDie = shift;
	
	print err_2_json( $message );
	
	if( (defined $myDie) && ($myDie eq "DIE") )
        {
                exit 1;
        }
}

sub myLog
{
        my $message = shift;
	$message = "Hey no message passed to myLog" unless defined $message;
        my $error = shift;
        $error = defined $error ? "ERROR :: " : "";
        my $dateTime = strftime "%F %T", localtime();
        print $logger "${dateTime} :: ${0} :: ${error}${message}.\n\n";
        return;
}

sub err_2_json
{
        my $message = shift;
	$message = "Hey no message passed to err_2_json" unless defined $message;
        my $json_message = encode_json ( { error => "$message" } );
        return $json_message;
}

1;
