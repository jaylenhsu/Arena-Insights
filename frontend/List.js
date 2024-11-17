const teamsWithLogos = [
    { name: "Atlanta Hawks", value: "hawks", logo: "/logos/atlanta-hawks.png" },
    { name: "Boston Celtics", value: "celtics", logo: "/logos/boston-celtics.png" },
    { name: "Brooklyn Nets", value: "nets", logo: "/logos/brooklyn-nets.png" },
    { name: "Charlotte Hornets", value: "hornets", logo: "/logos/charlotte-hornets.png" },
    { name: "Chicago Bulls", value: "bulls", logo: "/logos/chicago-bulls.png" },
    { name: "Cleveland Cavaliers", value: "cavaliers", logo: "/logos/cleveland-cavaliers.png" },
    { name: "Dallas Mavericks", value: "mavericks", logo: "/logos/dallas-mavericks.png" },
    { name: "Denver Nuggets", value: "nuggets", logo: "/logos/denver-nuggets.png" },
    { name: "Detroit Pistons", value: "pistons", logo: "/logos/detroit-pistons.png" },
    { name: "Golden State Warriors", value: "warriors", logo: "/logos/golden-state-warriors.png" },
    { name: "Houston Rockets", value: "rockets", logo: "/logos/houston-rockets.png" },
    { name: "Indiana Pacers", value: "pacers", logo: "/logos/indiana-pacers.png" },
    { name: "Los Angeles Clippers", value: "clippers", logo: "/logos/los-angeles-clippers.png" },
    { name: "Los Angeles Lakers", value: "lakers", logo: "/logos/los-angeles-lakers.png" },
    { name: "Memphis Grizzlies", value: "grizzlies", logo: "/logos/memphis-grizzlies.png" },
    { name: "Miami Heat", value: "heat", logo: "/logos/miami-heat.png" },
    { name: "Milwaukee Bucks", value: "bucks", logo: "/logos/milwaukee-bucks.png" },
    { name: "Minnesota Timberwolves", value: "timberwolves", logo: "/logos/minnesota-timberwolves.png" },
    { name: "New Orleans Pelicans", value: "pelicans", logo: "/logos/new-orleans-pelicans.png" },
    { name: "New York Knicks", value: "knicks", logo: "/logos/new-york-knicks.png" },
    { name: "Oklahoma City Thunder", value: "thunder", logo: "/logos/oklahoma-city-thunder.png" },
    { name: "Orlando Magic", value: "magic", logo: "/logos/orlando-magic.png" },
    { name: "Philadelphia 76ers", value: "76ers", logo: "/logos/philadelphia-76ers.png" },
    { name: "Phoenix Suns", value: "suns", logo: "/logos/phoenix-suns.png" },
    { name: "Portland Trail Blazers", value: "trailblazers", logo: "/logos/portland-trail-blazers.png" },
    { name: "Sacramento Kings", value: "kings", logo: "/logos/sacramento-kings.png" },
    { name: "San Antonio Spurs", value: "spurs", logo: "/logos/san-antonio-spurs.png" },
    { name: "Toronto Raptors", value: "raptors", logo: "/logos/toronto-raptors.png" },
    { name: "Utah Jazz", value: "jazz", logo: "/logos/utah-jazz.png" },
    { name: "Washington Wizards", value: "wizards", logo: "/logos/washington-wizards.png" },
];

function List() {
    return teamsWithLogos.map((team, index) => (
        <option key={index} value={team.value}>
            {team.name}
        </option>
    ));
}

export { List, teamsWithLogos };
export default List;
