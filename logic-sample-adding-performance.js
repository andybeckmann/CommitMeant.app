// Create date string to be set as this.date value
const today = new Date() 
const todaysDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' today.getDate()

// Set this.date
this.date: todaysDate

// Get the month from the instance
let month = this.month

// Calculate and set values to be used in axios calls
let todaysScore = function() {

	// Calculate decimal value and set it as the value of this.todaysScore
	this.todaysScore = this.totalGoals / this.totalGoalsCompleted

	// If this.todaysScore score is 50%-99%
	if (this.todaysScore <= .5 && this.todaysScore > 0) {
		this.score: 'fifty'

	// If this.todaysScore score is 100%
	} else if (this.todaysScore == 1) {
		this.score: 'onehundred'

	// Otherwise
	} else {
		this.score: 'zero'
	}
}

// Iterate through each day in the month
for (let = i; i < month.length; i++) {

	// Check if the i-th day matches todaysDate
	if (month[i].date == todaysDate) {

		// axios put request to the current day using this.id and string concatination, and update totalGoals, totalGoalsCompleted, and score 
		axios.put(database + '/' + month + today.getFullYear() + '/' + this.id, { totalGoals: this.totalGoals, totalGoalsCompleted: this.totalGoalsCompleted, score: todaysScore(), id: this.id })

	} else {

		// axios push request to create a new day using this.id this.date concatination, and update totalGoals, totalGoalsCompleted, and score 
		axios.push(database + '/' + month + today.getFullYear(), { date: todaysDate, totalGoals: this.totalGoals, totalGoalsCompleted: this.totalGoalsCompleted, score: todaysScore(), id: this.id })
			.then(() => {

			})
	}
}