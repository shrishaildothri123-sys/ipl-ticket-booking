import { Link } from 'react-router-dom'

const matches = [
  {
    id: 'rcb-csk',
    team1: 'Royal Challengers Bengaluru',
    team2: 'Chennai Super Kings',
    date: '28 March 2027',
    isoDate: '2027-03-28',
    time: '7:30 PM IST',
    isoTime: '19:30',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
  },
  {
    id: 'mi-kkr',
    team1: 'Mumbai Indians',
    team2: 'Kolkata Knight Riders',
    date: '29 March 2027',
    isoDate: '2027-03-29',
    time: '3:30 PM IST',
    isoTime: '15:30',
    venue: 'Wankhede Stadium, Mumbai',
  },
  {
    id: 'srh-rr',
    team1: 'Sunrisers Hyderabad',
    team2: 'Rajasthan Royals',
    date: '30 March 2027',
    isoDate: '2027-03-30',
    time: '7:30 PM IST',
    isoTime: '19:30',
    venue: 'Rajiv Gandhi International Cricket Stadium, Hyderabad',
  },
  {
    id: 'dc-pbks',
    team1: 'Delhi Capitals',
    team2: 'Punjab Kings',
    date: '31 March 2027',
    isoDate: '2027-03-31',
    time: '7:30 PM IST',
    isoTime: '19:30',
    venue: 'Arun Jaitley Stadium, Delhi',
  },
  {
    id: 'gt-lsg',
    team1: 'Gujarat Titans',
    team2: 'Lucknow Super Giants',
    date: '1 April 2027',
    isoDate: '2027-04-01',
    time: '7:30 PM IST',
    isoTime: '19:30',
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },
  {
    id: 'csk-mi',
    team1: 'Chennai Super Kings',
    team2: 'Mumbai Indians',
    date: '2 April 2027',
    isoDate: '2027-04-02',
    time: '7:30 PM IST',
    isoTime: '19:30',
    venue: 'M. A. Chidambaram Stadium, Chennai',
  },
]

function MatchCard({ match }) {
  return (
    <article className="match-card">
      <p className="match-sample-label">Sample fixture</p>
      <div className="match-teams">
        <h2>{match.team1}</h2>
        <span aria-hidden="true">vs</span>
        <h2>{match.team2}</h2>
      </div>
      <div className="match-details">
        <p>
          <span>Date</span>
          <time dateTime={match.isoDate}>{match.date}</time>
        </p>
        <p>
          <span>Time</span>
          <time dateTime={`${match.isoDate}T${match.isoTime}:00+05:30`}>
            {match.time}
          </time>
        </p>
        <p>
          <span>Venue</span>
          {match.venue}
        </p>
      </div>
      <Link className="match-book-link" to="/booking" state={{ match }}>
        Book Tickets
      </Link>
    </article>
  )
}

function Matches() {
  return (
    <main className="matches-page">
      <h1>Upcoming IPL Matches</h1>
      <div className="matches-grid">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </main>
  )
}

export default Matches