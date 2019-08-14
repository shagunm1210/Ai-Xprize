// Global variables
var company = []
var category = []
var mission = []
var product = []
var matchData = []
var matchIndexes = []
var nColumns = 4

// Get information in JSON from google sheets URL
$(function(){
  sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1eYEqq2eKR654wmHEJ4u65KxnlnkRKUNxCx3D4OZ-la4/od6/public/values?alt=json'
  $.getJSON(sheetUrl, function(data){
    var entry = data.feed.entry;
    company = []
    category = []
    mission = []
    product = []

    for (var i = nColumns; i < entry.length; i += nColumns){
      // entry[i].content.$t retrieves the content of each cell
      // Company is in the first column, category is second column, etc
      company.push(entry[i].content.$t);
      category.push(entry[i+1].content.$t);
      mission.push(entry[i+2].content.$t);
      product.push(entry[i+3].content.$t);
    }
  })
});

// Add index of rows within a column that include the query to matchIndexes
function getColumnMatches(column, query) {
for (i = 0; i < column.length; i++){
  if (column[i].toLowerCase().indexOf(query) >= 0){
    matchIndexes.push(i)
  }
}
}

// Get matches across all rows and redirect user to the first match
function getMatches(query) {
  query = query.toLowerCase()

  matchIndexes = []

  getColumnMatches(company, query)
  getColumnMatches(category, query)
  getColumnMatches(mission, query)
  getColumnMatches(product, query)

  // Remove duplicate indicies
  matchIndexes = [...new Set(matchIndexes)]

  // Remove index 0 (column names), from matchIndexes
  var index = matchIndexes.indexOf(0);
  if (index > -1) {
    matchIndexes.splice(index, 1);
  }
for i in matchIndexes:
  console.log(company[i], category[i], mission[i], product[i]
  window.location = './results.html?matchId='+matchIndexes[0];
}
