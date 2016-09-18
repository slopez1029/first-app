package DataBase;

use strict;
use warnings;

use JSON;

sub get
{
	my $dbFile = shift;
	my $reporter = shift;
	
	my $db;
	eval{
		my $dbHandle;
		
		unless (   open( $dbHandle, "<", $dbFile )   )
		{
			die "Cannot open db file |$dbFile|: $!";
		}
		
		my $encodedDB = <$dbHandle>;
		$db = decode_json( $encodedDB );
		close $dbHandle;
	};
	if ( $@ )
	{
		$reporter->{'log'}->( "Problem reading from database, says: |$@|", "ERROR" );
		$reporter->{'send'}->( "Problem accessing database.", "DIE" );
	}
	
	unless ( ( defined $db->{"error"}  ) && ( $db->{error} eq "NONE" ) )
	{
		$reporter->{'report'}->( "Currupt data in database!!!", "ERROR", "DIE" );
	}
	
	return $db;
}

sub set
{
	my $dbFile = shift;
	my $reporter = shift;
	my $db = shift;
	
	eval{   
		my $dbHandle;
		my $encodedOut = encode_json ( $db );
		
		unless (   open( $dbHandle, ">", $dbFile )   )
		{
			die "Cannot open db file |$dbFile|: $!";
		}
		
		print $dbHandle $encodedOut;
		close $dbHandle;
	};
	if ( $@ )
	{
		$reporter->{'log'}->( "Problem storing to database, possible loss of data. Says: |$@|", "ERROR" );
		$reporter->{'send'}->( "Problem storing to database, possible loss of data.", "DIE" );
	}
	
	return;
}

1;
