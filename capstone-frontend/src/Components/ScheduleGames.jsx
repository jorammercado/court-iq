import React from 'react'

fetch("https://v2.nba.api-sports.io/games?date=2022-03-09", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v2.nba.api-sports.io",
		"x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});



function ScheduleGames() {
  return (
    <div>
      this test
    </div>
  )
}

export default ScheduleGames
