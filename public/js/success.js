var queryString = decodeURIComponent(window.location.search); //parsing 
queryString = queryString.substring(1); 

document.getElementById("score-text1").textContent="Test id = "+queryString;
document.getElementById("score-text2").textContent="Test link= http://localhost:3000/teststart.html?testid="+queryString;