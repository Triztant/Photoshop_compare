// Fetch player, team, nation lists & template on load
let names = [], teams = [], nations = [], template = "";

Promise.all([
  fetch('names.txt').then(r => r.text()),         // player names
  fetch('all_teams.txt').then(r => r.text()),     // team names
  fetch('all_countries.txt').then(r => r.text()), // country names
  fetch('template.jsx').then(r => r.text())       // ExtendScript template
]).then(([namesTxt, teamsTxt, natsTxt, tpl]) => {
  names    = namesTxt.trim().split('\n');
  teams    = teamsTxt.trim().split('\n');
  nations  = natsTxt.trim().split('\n');
  template = tpl;

  // Populate the three datalists
  const dlNames    = document.getElementById('namesList');
  const dlTeams    = document.getElementById('teamsList');
  const dlNations  = document.getElementById('nationsList');

  names.forEach(n => {
    const o = document.createElement('option');
    o.value = n;
    dlNames.appendChild(o);
  });
  teams.forEach(t => {
    const o = document.createElement('option');
    o.value = t;
    dlTeams.appendChild(o);
  });
  nations.forEach(n => {
    const o = document.createElement('option');
    o.value = n;
    dlNations.appendChild(o);
  });

  // When the form is submitted…
  document.getElementById('squadForm').addEventListener('submit', e => {
    e.preventDefault();

    // Collect exactly 8 of each
    const collect = name =>
      Array.from(document.querySelectorAll(`input[name="${name}"]`))
           .map(i => i.value.trim());

    const P = collect('player');  // e.g. ["Player1", "Player2", …]
    const T = collect('team');    // e.g. ["Team1", "Team2", …]
    const N = collect('nation');  // e.g. ["Nation1", "Nation2", …]

    if (P.length !== 8 || T.length !== 8 || N.length !== 8) {
      return alert('Please fill exactly 8 players, 8 teams, and 8 nations.');
    }

    // Build imageFiles array (lowercase, hyphens, .png)
    const imgArr = '[' +
      P.map(nm => `"${nm.toLowerCase().replace(/\s+/g, '-')}.png"`).join(',') +
      ']';

    // Build teamFiles array (exact + ".png")
    const teamArr = '[' +
      T.map(nm => `"${nm}.png"`).join(',') +
      ']';

    // Build nationFiles array (exact + ".png")
    const natArr = '[' +
      N.map(nm => `"${nm}.png"`).join(',') +
      ']';

    // Inject into template
    const js = template
      .replace(/{{\s*PLAYERS\s*}}/,  JSON.stringify(P))
      .replace(/{{\s*IMAGE_FILES\s*}}/, imgArr)
      .replace(/{{\s*TEAM_FILES\s*}}/,  teamArr)
      .replace(/{{\s*NATION_FILES\s*}}/, natArr);

    // Download the generated .jsx
    const blob = new Blob([js], { type: 'application/javascript' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'photoshop_xi_script.jsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
});
