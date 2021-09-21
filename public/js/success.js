var queryString = decodeURIComponent(window.location.search); //parsing 
queryString = queryString.substring(1); 

document.getElementById("score-text1").textContent="Test id = "+queryString;
document.getElementById("score-text2").textContent="Test link= https://mcqs-app.herokuapp.com/teststart.html?testid="+queryString;