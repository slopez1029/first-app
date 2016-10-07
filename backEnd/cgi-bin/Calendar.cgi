#!/usr/bin/perl

use strict;
use warnings;

use lib "/home/slopez/perl5/share/perl5";
use lib "/home/slopez/perl5/lib64/perl5";
use lib "/home/slopez/perl5/lib/perl5";
use CGI qw(:standard);
use JSON;

use lib "/home/slopez/Calendar";

require "modules/Conf.pm";
require "modules/Report.pm";
require "modules/Command.pm";
require "modules/DataBase.pm";

### Start loging
my $conf = Conf::get();
my $reporter = Report::start( $conf->{'logFile'} );

### start the cgi, we will be sending json data
my $cgi = CGI->new;
print $cgi->header(
	-type    			=> 'application/json',
);


### check that they sent us a post request with data.
unless ( ( defined $cgi->request_method ) && (  $cgi->request_method eq 'POST' ) )
{
	$reporter->{'report'}->( "Request must be POST", "ERROR", "DIE" );
}

unless ( defined $cgi->param("POSTDATA"))
{
	$reporter->{'report'}->( "No post data found!!", "ERROR", "DIE" );
}


### get the encoded request.
my $my_input = $cgi->param("POSTDATA");
$my_input = "NO INPUT" unless defined $my_input;

### get the valid requests
my $requests = Command::getValid();

### parse the request
my $request = Command::get( $my_input, $reporter, $requests );
my $request_name = $request->{"name"};

### get the database structure
my $db = DataBase::get( $conf->{'dbFile'}, $reporter );

### Call the function that corresponds to the command.
$requests->{ $request_name }->( $request, $db, $reporter );

### Store any changes to the database and exit.
DataBase::set( $conf->{'dbFile'}, $reporter, $db );

exit 0;
