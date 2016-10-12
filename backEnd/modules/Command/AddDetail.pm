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
  my $time  = '' . $args->{"time"};
  my $timeEnd = '' . $args->{"timeEnd"};
  my $event = $time . '-' . $timeEnd . ' ' . $detail;


  my $details = $db->{"days"}->[$day];
  my $num_details = scalar @{$details};
  my $max_index = $num_details - 1;

  my ($hour, $minutes) = split /:/, $time;

  my $counter = 0;
  if($num_details == 0)
  {
    push @{ $db->{"days"}->[$day] }, $event;
  }
  else
  {
    while($counter < $num_details)
    {
      my $savedHour = substr $details->[$counter], 0, 2;
      my $savedMin = substr $details->[$counter], 3, 2;

      if($hour == $savedHour)
      {
        if($minutes < $savedMin)
        {
          splice @{ $db->{"days"}->[$day] }, $counter, 0, $event;
          last;
        }
        elsif($minutes == $savedMin)
        {
          splice @{ $db->{"days"}->[$day] }, $counter, 1, $event;
          last;
        }

      }
      elsif($hour < $savedHour)
      {
        splice @{ $db->{"days"}->[$day] }, $counter, 0, $event;
        last;
      }
      elsif($counter == ($num_details-1))
      {
        push @{ $db->{"days"}->[$day] }, $event;
      }
      $counter = $counter + 1;
    }
  }

  $reporter->{'log'}->( "successfully added detail |$detail| to day |$day|." );
  $reporter->{'send'}->( "NONE" );

  return;
}

1;
